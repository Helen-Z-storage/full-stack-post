const jwt = require('jsonwebtoken');

function makeToken(id) {
  return jwt.sign({ id }, process.env.SESSION_SECRET, { expiresIn: 86400 });
}

module.exports = {
  makeToken,
};
