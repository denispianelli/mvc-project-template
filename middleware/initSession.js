const session = require('express-session');

const initSession = session({
  secret: process.env.APP_SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: {
    secure: false,
  },
});

module.exports = initSession;
