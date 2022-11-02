const express = require('express');
const router = express.Router();
const { Post, UserPost } = require('./../db/models');
const { PostController } = require('./controllers');
const { ErrorHandler } = require('./utilities');
const ErrorDic = require('./errorDic');
const MainDic = require('./mainDic');

/**
 * Create a new blog post
 * req.body is expected to contain {text: required(string), tags: optional(Array<string>)}
 */
router.post('/', async (req, res, next) => {
    try {
      // Validation
      if (!req.user) {
        return res.sendStatus(401);
      }

      const { text, tags } = req.body;

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
  );
router.get('/', PostController.fetchPosts);
router.patch('/:postId', PostController.updatePost);

module.exports = router;
