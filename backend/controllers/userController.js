const { prisma } = require('../constats/config.js');
const bcrypt = require('bcrypt');

const user_update_meta = async (req, res) => {
  const { firstName, lastName } = req.body;
  if (req.session.userId) {
    try {
      await prisma.user.update({
        where: {
          id: req.session.userId,
        },
        data: {
          firstName: firstName,
          lastName: lastName,
        },
      });
      res.status(200).send('Updated');
    } catch (e) {
      console.log(e);
      res.status(500).send('Error {Update Meta}');
    }
  } else {
    res.status(401).send('Please Login');
  }
};

const user_update_password = async (req, res) => {
  const { password, oldPassword } = req.body;

  const isValidPw = (password) => {
    return password !== '';
  };

  let user;
  if (req.session.userId) {
    try {
      user = await prisma.user.findUnique({
        where: {
          id: req.session.userId,
        },
      });

      if (!isValidPw(password)) {
        return res.status(403).send('Introduzca una nueva contraseña');
      }
    } catch {
      res.status(500).send('err');
      return;
    }
  } else {
    res.status(401).send('Please Login');
  }

  if (user) {
    const isPassCorrect = await bcrypt.compare(oldPassword, user.password);
    if (isPassCorrect) {
      const saltRounds = 10;
      let newPassword = await bcrypt.hash(password, saltRounds);
      try {
        await prisma.user.update({
          where: {
            id: req.session.userId,
          },
          data: {
            password: newPassword,
          },
        });
        try {
          await prisma.session.deleteMany({
            where: {
              data: {
                endsWith: `,"userId":${req.session.userId}}`,
              },
            },
          });
          res.clearCookie('sess').status(200).send('Updated');
        } catch {
          res.status(500).send('err deleting sessions');
        }
      } catch {
        res.status(500).send('Cannot update pw');
      }
    } else {
      res.status(403).send('Contraseña incorrecta');
    }
  } else {
    res.status(401).send('please log in');
  }
};

module.exports = { user_update_meta, user_update_password };
