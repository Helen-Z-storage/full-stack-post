const jwt = require('jsonwebtoken');
const { User } = require('./../db/models');
const { ErrorHandler } = require('./utilities');
const express = require('express');
const router = express.Router();
const ErrorDic = require('./errorDic');

/**
 * Register a new user
 * req.body is expected to contain {username: required(string), password: required(string)}
 */
router.post('/register', async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // check validation of username and password
    if (!username || !password) {
      return ErrorHandler.codeError(res, 400, ErrorDic.emptyLogInField);
    }

    if (password.length < 6) {
      return ErrorHandler.codeError(res, 400, ErrorDic.passwordLen);
    }

    // create new user
    const user = await User.create(req.body);

    const token = jwt.sign(
      { id: user.dataValues.id },
      process.env.SESSION_SECRET,
      { expiresIn: 86400 }
    );
    res.json({
      ...user.dataValues,
      token,
    });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return ErrorHandler.codeError(res, 401, ErrorDic.duplicateUsername);
    }
    if (error.name === 'SequelizeValidationError') {
      return ErrorHandler.codeError(res, 401, ErrorDic.valid);
    }
    next(error);
  }
});

/**
 * Authenticate an existing user
 * req.body is expected to contain {username: required(string), password: required(string)}
 */
router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    console.log(req.body);

    // check validation of username and password
    if (!username || !password) {
      return ErrorHandler.codeError(res, 400, ErrorDic.emptyLogInField);
    }
    console.log("valid password");

    const user = await User.findUserByUsername(req.body.username);
    if (!user || !User.correctPassword(user, password)) {
      return ErrorHandler.codeError(res, 401, ErrorDic.failLogIn);
    }
    console.log("correct password");
    console.log(JSON.stringify(user.dataValues, null, 2));
    console.log(process.env);
    
    // create new log in token
    const token = jwt.sign(
      { id: user.dataValues.id },
      process.env.SESSION_SECRET,
      { expiresIn: 86400 }
    );
    console.log("created token");
    res.json({
      ...user.dataValues,
      token,
    });
    console.log("set res");
  } catch (error) {
    next(error);
  }
}
);

module.exports = router;
