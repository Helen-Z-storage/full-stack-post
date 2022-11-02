const { UserPost } = require('./../../db/models');

class UserPostHandler {
  static async updateNewAuthor(authorIds, postId) {
    UserPost.destroy({ where: { postId: postId } });
    await UserPost.bulkCreate(authorIds.map(author => ({userId: author, postId: postId})),
      {
        updateOnDuplicate: ["userId", "postId"],
      }
    );
  }
}

module.exports = UserPostHandler;