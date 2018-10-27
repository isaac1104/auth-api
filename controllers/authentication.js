const User = require('../models/user');
const jwt = require('jwt-simple');
const keys = require('../config/keys');

function generateToken(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, keys.secret);
}

exports.signin = (req, res, next) => {
  res.send({ token: generateToken(req.user) });
};

exports.signup = function(req, res, next) {
  const { email, password, firstname, lastname } = req.body;
  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide email and password!' });
  }

  if (!firstname || !lastname) {
    return res.status(422).send({ error: 'You must provide first and last name!' });
  }

  User.findOne({ email }, (err, existingUser) => {
    if (err) {
      return next(err);
    }

    if (existingUser) {
      return res.status(422).send({ error: 'Email is already in use!' });
    }

    const user = new User({
      email,
      password,
      firstname,
      lastname
    });

    user.save(err => {
      if (err) {
        return next(err);
      }

      res.json({ token: generateToken(user) });
    });
  });
};
