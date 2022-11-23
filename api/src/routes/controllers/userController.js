const _ = require('lodash');
const { 
  ErrorHandler, 
  UserHandler, 
  PostHandler, 
  UserPostHandler 
} = require('./../utilities');
const MainDic = require('./../mainDic');
const ErrorDic = require('./../errorDic');
const { User, Post, UserPost } = require('./../../db/models');

const jwt = require('jsonwebtoken');


class UserController {
  
  static async fetchAllUsers(req, res, next) {
    try {
      // authority Validation
      if (!req.user || !req.user.id) {
        return ErrorHandler.codeError(res, 401, ErrorDic.unAuthorizedUser);
      }

      const allUserList = await User.findAll({attributes: ['id', 'username']});
      const allUser = allUserList.map((postObj) => postObj.dataValues);
      
      res.json({ users: allUser });
    } catch (error) {
      next(error);
    }
  }

  static async addNewUser(req, res, next) {
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
  }

  static async loginUser(req, res, next) {
    try {
      const { username, password } = req.body;
  
      // check validation of username and password
      if (!username || !password) {
        return ErrorHandler.codeError(res, 400, ErrorDic.emptyLogInField);
      }
      const user = await User.findUserByUsername(req.body.username);
      if (!user || !User.correctPassword(user, password)) {
        return ErrorHandler.codeError(res, 401, ErrorDic.failLogIn);
      }
      // create new log in token
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
      next(error);
    }
  }

  static async deleteUser(req, res, next) {
    try {
      // authority Validation
      if (!req.user || !req.user.id) {
        return ErrorHandler.codeError(res, 401, ErrorDic.unAuthorizedUser);
      }      

      // check validation
      const authorId = ((await UserHandler.validAuthorId(res, [req.user.id])).authorIds)[0];

      // delete user
      if (authorId) {
        User.destroy({ where: { id: authorId } });
        const PostsHasOwner = await UserPost.getPostIdHasOwner();
        Post.deleteOrphanPost(PostsHasOwner);
      }
      res.json({ deletedUser: authorId });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;