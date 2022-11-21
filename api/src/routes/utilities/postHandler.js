const _ = require('lodash');
const { Post } = require('./../../db/models');
const ErrorHandler = require('./errorHandler');
const ErrorDic = require('./../errorDic');
const MainDic = require('./../mainDic');

class PostHandler {
  static async validPostId(res, postId) {
    // check whether postId is number
    postId = parseInt(postId, 10);
    if (!Number.isInteger(postId)) {
      return ErrorHandler.codeError(res, 404, ErrorDic.invalidVariable(MainDic.validations.postId));
    }
    
    // check whether Post table is empty
    if (!(await Post.existPost())) {
      return ErrorHandler.codeError(res, 404, ErrorDic.unExistPost);
    }
    const post = await Post.getPostById(postId);
    if (!post) {
      return ErrorHandler.codeError(res, 404, ErrorDic.unCreatedPost(postId));
    }
    return post.dataValues;
  }

  static validVar(res, variable, type, lst, message, valRange = null) {
    let error = false;

    if (!lst && type === MainDic.string && !_.isString(variable)) {
      error = true;
    }
    else if (!lst && variable && valRange && !valRange.includes(variable)) {
      error = true;
    }
    else if (lst && !Array.isArray(variable)) {
      if (type === MainDic.string && !_.isString(variable)) {
        error = true;
      }
      if (!error) {
        variable = [variable];
      }
    }
    else if (lst && type === MainDic.string && variable.some((item) => !_.isString(item))) { 
      error = true;
    }
    
    if (error) {
      return ErrorHandler.codeError(res, 400, ErrorDic.invalidVariable(message));
    }
    return variable;
  }

  static removeDuplicate(postList) {    
  const res = new Map();
  return postList.filter((post) => !res.has(post.id) && res.set(post.id, 1)).map(postObj => ({...postObj, tags: postObj.tags.split(MainDic.tagSpliter)}));
  }
}

module.exports = PostHandler;
