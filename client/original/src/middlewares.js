const jwt = require('jsonwebtoken');

function notFound(req, res) {
  res.status(404);
  res.json({
    error: 'The route is not defined',
  });
}
const { User } = require('./db/models');

/* eslint-disable-next-line no-unused-vars */
function errorHandler(err, req, res, next) {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '' : err.stack,
  });
}

/* eslint-disable-next-line no-unused-vars */
function auth(req, res, next) {
  const token = req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, process.env.SESSION_SECRET, (err, decoded) => {
      if (err) {
        return next();
      }
      User.findOne({
        where: { id: decoded.id },
      })
        .then((user) => {
          if (!user) {
            throw new Error('No user found with provided token');
          }
          req.user = user.toJSON();
          return next();
        })
        .catch(() => {
          next();
        });
    });
  } else {
    return next();
  }
}

module.exports = {
  notFound,
  errorHandler,
  auth,
};
