const express = require('express');
const session = require('express-session');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const categoriesRoutes = require('./routes/categoriesRoutes');

const app = express();
const port = process.env.PORT || 5000;
const { prisma } = require('./constats/config');
const PrismaStore = require('./lib/index')(session);

app.use(express.static(path.join(__dirname, 'client')));

app.use(
  cors({
    origin: [
      'http://localhost:3006',
      'https://localhost:5000',
      'https://nucbaexpensesapp.herokuapp.com/',
    ],
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD', 'DELETE', 'PATCH'],
    credentials: true,
  })
);

app.use(
  session({
    name: 'sess',
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    store: new PrismaStore({ client: prisma }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
      secure: false,
    },
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', expenseRoutes);
app.use('/api', categoriesRoutes);
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

app.listen(port, () => {
  console.log(`SERVER STARTED : ${port}`);
});
