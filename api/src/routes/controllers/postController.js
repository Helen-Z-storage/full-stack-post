const _ = require('lodash');
const { 
  ErrorHandler, 
  UserHandler, 
  PostHandler, 
  UserPostHandler 
} = require('./../utilities');
const MainDic = require('./../mainDic');
const ErrorDic = require('./../errorDic');
const { Post, UserPost } = require('./../../db/models');

class PostController {
  static async addPosts(req, res, next) {
    try {
      // Validation
      if (!req.user) {
        return res.sendStatus(401);
      }

      const { text, tags } = req.body;
      console.log(req.body);

      if (!text) {
        return ErrorHandler.codeError(res, 400, ErrorDic.newPostText);
      }

      // Create new post
      const values = {
        text,
      };
      if (tags) {
        values.tags = tags.join(MainDic.tagSpliter);
      } else {
        values.tags = '';
      }
      const post = await Post.create(values);
      await UserPost.create({
        userId: req.user.id,
        postId: post.id,
      });

      res.json({ post });
    } catch (error) {
      next(error);
    }
  }

  static async fetchPosts(req, res, next) {
    try {

      // authority Validation
      if (!req.user) {
        return ErrorHandler.codeError(res, 401, ErrorDic.unAuthorizedUser);
      }

      console.log(req.query);
      const { authorIds } = req.query;
      let { sortBy, direction } = req.query;

      // check validation 
      let allPost = (await UserHandler.validAuthorId(res, authorIds, true, MainDic.tagSpliter, true)).allPost;
      if (!sortBy) {
        sortBy = MainDic.defaultSortBy;
      } else {
        const message = Object.keys({sortBy})[0].split(/(?=[A-Z])/).join(" ");
        sortBy = PostHandler.validVar(res, sortBy, MainDic.string, false, message, MainDic.sortByDefault);
      }
      if (!direction) {
        direction = MainDic.defaultDirection;
      } else {
        const message = Object.keys({direction})[0].split(/(?=[A-Z])/).join(" ");
        direction = PostHandler.validVar(res, direction, MainDic.string, false, message, MainDic.sortDiretDefault);
      }

      // get posts
      allPost = PostHandler.removeDuplicate(allPost);

      if (direction === MainDic.defaultDirection) {
        allPost = allPost.sort((a, b) => a[sortBy] - b[sortBy]);
      } else {
        allPost = allPost.sort((a, b) => b[sortBy] - a[sortBy]);
      }

      res.json({ posts: allPost });
    } catch (error) {
      next(error);
    }
  }

  static async updatePost(req, res, next) {
    try {
      // authority Validation
      if (!req.user || !req.user.id) {
        return ErrorHandler.codeError(res, 401, ErrorDic.unAuthorizedUser);
      }
      
      let { authorIds, tags, text } = req.body;
      

      // check validation
      const postId = req.params.postId;
      const postObj = await PostHandler.validPostId(res, postId);
      authorIds = (await UserHandler.validAuthorId(res, authorIds)).authorIds;
      const oldLst = await UserHandler.validPostAuthor(res, req.user.id, postId);

      // check validation of tags and text
      if (!tags) {
        if (_.isString(postObj.tags)) {
          tags = postObj.tags.split(MainDic.tagSpliter);
        }
      } else {
        const message = Object.keys({tags})[0].split(/(?=[A-Z])/).join(" ");
        tags = PostHandler.validVar(res, tags, MainDic.string, true, message);
      }

      if (text !== undefined) {
        const message = Object.keys({text})[0].split(/(?=[A-Z])/).join(" ");
        text = PostHandler.validVar(res, text, MainDic.string, false, message);
      }

      //update the post
      if (authorIds) {
        postObj.authorIds = authorIds;
        await UserPostHandler.updateNewAuthor(authorIds, postId);
      } else {
        postObj.authorIds = oldLst;
      }
      if (tags) {
        postObj.tags = tags;
        await Post.updateTagsById(tags, postId);
      }
      if (text) {
        postObj.text = text;
        await Post.updateTextById(text, postId);
      }

      res.json({ post: postObj });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = PostController;
