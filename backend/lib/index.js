module.exports = function (session) {
  const Store = session.Store;
  class PrismaStore extends Store {
    constructor(options) {
      super(options);

      if (!options.client) {
        throw new Error('A client must be directly provided to PrismaStore');
      }

      this.client = options.client;
      this.serializer = options.serializer || JSON;
      this.ttl = options.ttl || 86400; // One day in seconds.
      this.disableTTL = options.disableTTL || false;
      this.disableTouch = options.disableTouch || false;
    }

    async get(sid, cb) {
      let sess;
      try {
        sess = await this.client.session.findUnique({
          where: {
            sid: sid,
          },
        });
      } catch (e) {
        console.log(e);
        return;
      }
      if (!sess) {
        console.log('didnt find the session {Prisma Store}');
        return cb(null, null);
      }

      let results;
      try {
        results = this.serializer.parse(sess.data);
      } catch (e) {
        console.log('cannot seriliaze GET sess data {Prisma Store}');
      }

      cb(null, results);
      return results;
    }

    async set(sid, sess, cb) {
      console.log('Creating A Session {Prisma Store}');
      let now = new Date();
      let expires = new Date(now.valueOf() + this.ttl);
      let sessionString;
      try {
        sessionString = this.serializer.stringify(sess);
      } catch (e) {
        console.log('cannot convert sess to string data {Prisma Store}');
        return;
      }

      const existingSession = await this.client.session
        .findUnique({
          where: { sid },
        })
        .catch(() => null);

      const data = {
        sid,
        expires,
        data: sessionString,
      };

      if (existingSession) {
        await this.client.session.update({
          data,
          where: { sid },
        });
      } else {
        await this.client.session.create({
          data: { ...data },
        });
      }
      cb(null);
    }

    async destroy(sid, cb) {
      console.log('Destroy The Session {Prisma Store}');
      try {
        await this.client.session.delete({
          where: { sid },
        });
      } catch (err) {
        console.log('some error in destroyed {Prisma Store}');
        return;
      }
      if (cb) cb(null);
    }

    async touch(sid, sess, cb) {
      let now = new Date();
      let expires = new Date(now.valueOf() + this.ttl);
      let existingSess;
      try {
        existingSess = await this?.client.session.findUnique({
          where: { sid },
        });

        if (existingSess !== null) {
          let existingSessData = {
            ...this.serializer.parse(existingSess?.data),
            cookie: sess.cookie,
          };

          try {
            await this.client.session.update({
              where: {
                sid: existingSess?.sid,
              },
              data: {
                expires: expires,
                data: this.serializer.stringify(existingSessData),
              },
            });
          } catch (e) {
            console.log(e);
          }
        }

        if (cb) cb(null);
      } catch (e) {
        console.log('Touch ERROR {Prisma Store}');
      }
    }
  }
  return PrismaStore;
};
