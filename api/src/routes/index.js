const express = require('express');

const posts = require('./posts');
const auth = require('./auth');
const testAPI = require('./testAPI');

const router = express.Router();

router.use('/', auth);

router.use('/posts', posts);
router.use('/testAPI', testAPI);

module.exports = router;
