const _ = require('lodash');
const { Post, UserPost, User } = require('./../../db/models');
const ErrorHandler = require('./errorHandler');
const { PassThrough } = require('stream');
const ErrorDic = require('./../errorDic');

class UserHandler {
  // check validation of authorIds if author ids is geven from req.body
  // return the list find from given valid authorIds
  static async validAuthorId(
    res,
    authorIds,
    required = false,
    splitBy = '',
    findPost = false
  ) {

    let stringauthorIds = false;
    if (required && !authorIds) {
      return ErrorHandler.codeError(res, 400, ErrorDic.emptyRequiredAuthor);
    } else if (!required && !authorIds) {
      return PassThrough;
    }

    if (splitBy !== '') {
      if (!_.isString(authorIds)) {
        return ErrorHandler.codeError(res, 400, ErrorDic.nonStringAuthor);
      }
      stringauthorIds = true;
      authorIds = authorIds.split(splitBy).map((authorId) => parseInt(authorId, 10));
    }
    else if (!Array.isArray(authorIds)) {
      authorIds = [authorIds];
    }

    let allPost = [];
    let user = null;
    let postsList;

    for (const id of authorIds) {
      if (!Number.isInteger(id)) {
        let message = ErrorDic.nonIntAuthor;
        if (stringauthorIds) {
          message = ErrorDic.nonStrIntAuthor;
        }
        return ErrorHandler.codeError(res, 400, message);
      }
      user = await User.findUserById(id);
      if (!user) {
        return ErrorHandler.codeError(res, 403, ErrorDic.unExistAuthor(id));
      }

      if (findPost) {
        postsList = await Post.getPostsByUserId(id);
        allPost = allPost.concat(postsList.map((postObj) => postObj.dataValues));
      }
    }
    const postAndId = {allPost, authorIds}
    return postAndId;
  }

  // check whether author who want to update post is the author of post
  // and return old author list if result is true
  static async validPostAuthor(res, authorId, postId) {
    const authorList = await UserPost.getUserIdsByPost(postId);
    const oldAuthorIds = authorList.map((autorIdObj) => autorIdObj.dataValues.userId);
    if (!oldAuthorIds.includes(authorId)) {
      return ErrorHandler.codeError(res, 403, ErrorDic.unOwnerAuthor);
    }
    return oldAuthorIds;
  }
}

module.exports = UserHandler;
