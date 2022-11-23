const Sequelize = require('sequelize');

const db = require('./../db');
const Post = require('./post');
const User = require('./user');

const UserPost = db.define(
  'user_post',
  {
    userId: {
      type: Sequelize.INTEGER,
      references: {
        model: User,
        key: 'id',
      },
      field: 'user_id',
    },
    postId: {
      type: Sequelize.INTEGER,
      references: {
        model: Post,
        key: 'id',
      },
      field: 'post_id',
    },
  },
  {
    timestamps: false,
    underscored: true,
    freezeTableName: true,
  }
);

UserPost.getUserIdsByPost = async function (postId) {
  return UserPost.findAll({
    attributes: ['userId'],
    where: {
      postId: postId,
    },
  });
};

UserPost.getPostIdsByUser = async function (userId) {
  return UserPost.findAll({
    attributes: ['postId'],
    where: {
      userId: userId,
    },
  });
};

UserPost.getPostIdHasOwner = async function () {
  const distinctPosts = await UserPost.aggregate('postId', 'DISTINCT', { plain: false });
  return distinctPosts.map(postObj => postObj.DISTINCT);
};
module.exports = UserPost;
