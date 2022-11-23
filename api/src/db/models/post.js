const Sequelize = require('sequelize');
const db = require('./../db');
const UserPost = require('./user_post');

const Post = db.define(
  'post',
  {
    text: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    likes: {
      type: Sequelize.NUMBER,
      allowNull: false,
      defaultValue: 0,
    },
    reads: {
      type: Sequelize.NUMBER,
      allowNull: false,
      defaultValue: 0,
    },
    popularity: {
      type: Sequelize.FLOAT,
      allowNull: false,
      defaultValue: 0.0,
      validate: {
        min: 0.0,
        max: 1.0,
      },
    },
    tags: {
      // note: comma separated string since sqlite does not support arrays
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    underscored: true,
    freezeTableName: true,
  }
);

Post.getPostsByUserId = async function (userId) {
  return Post.findAll({
    include: [
      {
        model: UserPost,
        attributes: [],
        where: {
          userId: userId,
        },
      },
    ],
  });
};

Post.existPost = async function () {
  return (await Post.findOne()) !== null;
};


Post.getPostById = async function (postId) {
  return Post.findOne({
    where: {
      id: postId,
    },
  });
};

Post.updateTagsById = async function (tags, postId) {
  return await Post.update({
      tags: tags.join(","),
    },
    {
      where: { id: postId },
    }
  );
};

Post.updateTextById = async function (text, postId) {
  return await Post.update(
    {
      text: text,
    },
    {
      where: { id: postId },
    }
  );
};

Post.deleteOrphanPost = function (postsHasOwner) {
  Post.destroy(
    { 
      where: {id: { [Sequelize.Op.notIn]: postsHasOwner }} 
    }
  );
};

module.exports = Post;
