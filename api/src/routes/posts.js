const express = require('express');
const router = express.Router();
const { PostController } = require('./controllers');
/**
 * Create a new blog post
 * req.body is expected to contain {text: required(string), tags: optional(Array<string>)}
 */
router.post('/', PostController.addPosts);
router.get('/', PostController.fetchPosts);
router.get('/allPosts', PostController.fetchAllPosts);
router.patch('/:postId', PostController.updatePost);

module.exports = router;
