const globals = require('@jest/globals');
const request = require('supertest');
const app = require('./../src/app');
const { makeToken } = require('./utils');
const { Post, UserPost } = require('./../src/db/models');
const { describe, it, expect } = globals;

// ---------------------------------------------------------------- //
//                                                                  //
//                 THIS FILE IS FOR MORE SELF TEST                  //
//                                                                  //
// ---------------------------------------------------------------- //

describe('POST /api/posts', () => {
  it('should adding new post of author ID 5 with tags', async () => {
    const token = makeToken(5);
    const res = await request(app)
      .post('/api/posts')
      .set('x-access-token', token)
      .send({
        text: 'making new post',
        tags: ['tag1', 'tag2', 'tag3'],
      });
    expect(res.body).toEqual({
      post: {
        tags: 'tag1,tag2,tag3',
        id: 5,
        text: 'making new post',
        likes: 0,
        reads: 0,
        popularity: 0,
      },
    });
    expect(res.status).toEqual(200);
  });

  it('should adding new post of author ID 5 without tags', async () => {
    const token = makeToken(5);
    const res = await request(app)
      .post('/api/posts')
      .set('x-access-token', token)
      .send({
        text: 'making another new post',
      });
    expect(res.body).toEqual({
      post: {
        tags: '',
        id: 5,
        text: 'making another new post',
        likes: 0,
        reads: 0,
        popularity: 0,
      },
    });
    expect(res.status).toEqual(200);
  });

  it('fail for user not log in want to adding new post', async () => {
    const res = await request(app)
      .post('/api/posts')
      .send({
        text: 'making new post',
        tags: ['tag1', 'tag2', 'tag3'],
      });
    expect(res.status).toEqual(401);
  });

  it('fail for adding new post does not have text', async () => {
    const token = makeToken(5);
    const res = await request(app)
      .post('/api/posts')
      .set('x-access-token', token)
      .send({
        tags: ['tag1', 'tag2', 'tag3'],
      });
    expect(res.body.error).toEqual('Must provide text for the new post');
    expect(res.status).toEqual(400);
  });
});

describe('GET /api/posts', () => {
  // a list of input author, sort by decrease reads, DNE duplicates
  it('should return all posts of author ID 1 and 3 in specific order.', async () => {
    const token = makeToken(2);
    const res = await request(app)
      .get('/api/posts')
      .set('x-access-token', token)
      .query({
        authorIds: '1,3',
        sortBy: 'reads',
        direction: 'desc',
      })
      .send();
    expect(res.body).toEqual({
      posts: [
        {
          tags: ['vacation', 'spa'],
          id: 4,
          text: 'This is post 4',
          likes: 50,
          reads: 300,
          popularity: 0.4,
        },
        {
          tags: ['travel', 'airbnb', 'vacation'],
          id: 3,
          text: 'Voluptate consequat minim commodo nisi minim ut. Exercitation incididunt eiusmod qui duis enim sunt dolor sit nisi laboris qui enim mollit. Proident pariatur elit est elit consectetur. Velit anim eu culpa adipisicing esse consequat magna. Id do aliquip pariatur laboris consequat cupidatat voluptate incididunt sint ea.',
          likes: 10,
          reads: 32,
          popularity: 0.7,
        },
        {
          tags: ['food', 'recipes', 'baking'],
          id: 1,
          text: 'Excepteur occaecat minim reprehenderit cupidatat dolore voluptate velit labore pariatur culpa esse mollit. Veniam ipsum amet eu dolor reprehenderit quis tempor pariatur labore. Tempor excepteur velit dolor commodo aute. Proident aute cillum dolor sint laborum tempor cillum voluptate minim. Amet qui eiusmod duis est labore cupidatat excepteur occaecat nulla.',
          likes: 12,
          reads: 5,
          popularity: 0.19,
        },
      ],
    });
    expect(res.status).toEqual(200);
  });

  // a list of input author, sort by likes, with duplicates
  it('should return all posts of author ID 1 and 2 in specific order.', async () => {
    const token = makeToken(2);
    const res = await request(app)
      .get('/api/posts')
      .set('x-access-token', token)
      .query({
        authorIds: '1,2',
        sortBy: 'likes',
      })
      .send();
    expect(res.body).toEqual({
      posts: [
        {
          tags: ['travel', 'airbnb', 'vacation'],
          id: 3,
          text: 'Voluptate consequat minim commodo nisi minim ut. Exercitation incididunt eiusmod qui duis enim sunt dolor sit nisi laboris qui enim mollit. Proident pariatur elit est elit consectetur. Velit anim eu culpa adipisicing esse consequat magna. Id do aliquip pariatur laboris consequat cupidatat voluptate incididunt sint ea.',
          likes: 10,
          reads: 32,
          popularity: 0.7,
        },
        {
          tags: ['food', 'recipes', 'baking'],
          id: 1,
          text: 'Excepteur occaecat minim reprehenderit cupidatat dolore voluptate velit labore pariatur culpa esse mollit. Veniam ipsum amet eu dolor reprehenderit quis tempor pariatur labore. Tempor excepteur velit dolor commodo aute. Proident aute cillum dolor sint laborum tempor cillum voluptate minim. Amet qui eiusmod duis est labore cupidatat excepteur occaecat nulla.',
          likes: 12,
          reads: 5,
          popularity: 0.19,
        },
        {
          tags: ['travel', 'hotels'],
          id: 2,
          text: 'Ea cillum incididunt consequat ullamco nisi aute labore cupidatat exercitation et sunt nostrud. Occaecat elit tempor ex anim non nulla sit culpa ipsum aliquip. In amet in Lorem ut enim. Consectetur ea officia reprehenderit pariatur magna eiusmod voluptate. Nostrud labore id adipisicing culpa sunt veniam qui deserunt magna sint mollit. Cillum irure pariatur occaecat amet reprehenderit nisi qui proident aliqua.',
          likes: 104,
          reads: 200,
          popularity: 0.7,
        },
      ],
    });
    expect(res.status).toEqual(200);
  });

  // single author, sort by popularity
  it('should return all posts of author ID 3 in specific order.', async () => {
    const token = makeToken(2);
    const res = await request(app)
      .get('/api/posts')
      .set('x-access-token', token)
      .query({
        authorIds: '3',
        sortBy: 'popularity',
      })
      .send();
    expect(res.body).toEqual({
      posts: [
        {
          tags: ['vacation', 'spa'],
          id: 4,
          text: 'This is post 4',
          likes: 50,
          reads: 300,
          popularity: 0.4,
        },
        {
          tags: ['travel', 'airbnb', 'vacation'],
          id: 3,
          text: 'Voluptate consequat minim commodo nisi minim ut. Exercitation incididunt eiusmod qui duis enim sunt dolor sit nisi laboris qui enim mollit. Proident pariatur elit est elit consectetur. Velit anim eu culpa adipisicing esse consequat magna. Id do aliquip pariatur laboris consequat cupidatat voluptate incididunt sint ea.',
          likes: 10,
          reads: 32,
          popularity: 0.7,
        },
      ],
    });
    expect(res.status).toEqual(200);
  });

  // single author, without any post
  it('should return all posts of author ID 4 in specific order.', async () => {
    const token = makeToken(2);
    const res = await request(app)
      .get('/api/posts')
      .set('x-access-token', token)
      .query({
        authorIds: '4',
        sortBy: 'popularity',
      })
      .send();
    expect(res.body).toEqual({
      posts: [],
    });
    expect(res.status).toEqual(200);
  });

  // didn't logged in
  it('fail for user not log in want to search on post from authorId', async () => {
    const res = await request(app)
      .get('/api/posts')
      .query({
        authorIds: '4',
        sortBy: 'popularity',
      })
      .send();
    expect(res.body.error).toEqual("Didn't have logged in user");
    expect(res.status).toEqual(401);
  });

  // fail for not exist authorId
  it('should fail for not input author argument.', async () => {
    const token = makeToken(2);
    const res = await request(app)
      .get('/api/posts')
      .set('x-access-token', token)
      .query({
        sortBy: 'popularity',
      })
      .send();
    expect(res.body.error).toEqual('Author ids required');
    expect(res.status).toEqual(400);
  });

  // fail for invalid authorid
  it('should fail for not string author argument.', async () => {
    const token = makeToken(2);
    const res = await request(app)
      .get('/api/posts')
      .set('x-access-token', token)
      .query({
        authorIds: [2, 6],
      })
      .send();
    expect(res.body.error).toEqual("Author id shold be string");
    expect(res.status).toEqual(400);
  });

  it('should fail for not stringfy integer author argument.', async () => {
    const token = makeToken(2);
    const res = await request(app)
      .get('/api/posts')
      .set('x-access-token', token)
      .query({
        authorIds: 't',
        sortBy: 'popularity',
      })
      .send();
    expect(res.body.error).toEqual('Author ids should be stringfy integer or stringfy integer list');
    expect(res.status).toEqual(400);
  });

  it('should fail for not stringfy integer list author in list.', async () => {
    const token = makeToken(2);
    const res = await request(app)
      .get('/api/posts')
      .set('x-access-token', token)
      .query({
        authorIds: '3,t',
        sortBy: 'popularity',
      })
      .send();
    expect(res.body.error).toEqual('Author ids should be stringfy integer or stringfy integer list');
    expect(res.status).toEqual(400);
  });

  // fail for author does not exist in database
  it('should fail for author ID 9 does not exist in database.', async () => {
    const token = makeToken(2);
    const res = await request(app)
      .get('/api/posts')
      .set('x-access-token', token)
      .query({
        authorIds: '9',
        sortBy: 'popularity',
      })
      .send();
    expect(res.body.error).toEqual('Author id 9 not registered');
    expect(res.status).toEqual(403);
  });

  // fail for non-valid sortBy input
  it('should fail for non-string sortBy input.', async () => {
    const token = makeToken(2);
    const res = await request(app)
      .get('/api/posts')
      .set('x-access-token', token)
      .query({
        authorIds: '1',
        sortBy: [7, 3],
      })
      .send();
    expect(res.body.error).toEqual('Non valid sort By');
    expect(res.status).toEqual(400);
  });

  it('should fail for non-in-range sortBy input.', async () => {
    const token = makeToken(2);
    const res = await request(app)
      .get('/api/posts')
      .set('x-access-token', token)
      .query({
        authorIds: '1',
        sortBy: '7',
      })
      .send();
    expect(res.body.error).toEqual('Non valid sort By');
    expect(res.status).toEqual(400);
  });

  // fail for non-valid direction input
  it('should fail for non-string direction input.', async () => {
    const token = makeToken(2);
    const res = await request(app)
      .get('/api/posts')
      .set('x-access-token', token)
      .query({
        authorIds: '1',
        direction: [7, 3],
      })
      .send();
    expect(res.body.error).toEqual('Non valid direction');
    expect(res.status).toEqual(400);
  });

  it('should fail for non-in-range direction input.', async () => {
    const token = makeToken(2);
    const res = await request(app)
      .get('/api/posts')
      .set('x-access-token', token)
      .query({
        authorIds: '1',
        direction: '7',
      })
      .send();
    expect(res.body.error).toEqual('Non valid direction');
    expect(res.status).toEqual(400);
  });
});

describe('PATCH /api/posts/:postId', () => {
  it('should only update tags and authorIds when only they are provided', async () => {
    const token = makeToken(2);
    const postId = 3;
    const res = await request(app)
      .patch(`/api/posts/${postId}`)
      .set('x-access-token', token)
      .send({
        tags: 'travel',
        authorIds: 1,
      });
    expect(res.body).toEqual({
      post: {
        authorIds: [1],
        id: 3,
        likes: 10,
        popularity: 0.7,
        reads: 32,
        tags: ['travel'],
        text: 'Voluptate consequat minim commodo nisi minim ut. Exercitation incididunt eiusmod qui duis enim sunt dolor sit nisi laboris qui enim mollit. Proident pariatur elit est elit consectetur. Velit anim eu culpa adipisicing esse consequat magna. Id do aliquip pariatur laboris consequat cupidatat voluptate incididunt sint ea.',
      },
    });
    expect((await UserPost.getUserIdsByPost(3)).map((obj) => obj.dataValues.userId).sort()).toEqual([1]);
    expect((await Post.getPostById(3)).dataValues).toEqual({
          id: 3,
          likes: 10,
          popularity: 0.7,
          reads: 32,
          tags: 'travel',
          text: 'Voluptate consequat minim commodo nisi minim ut. Exercitation incididunt eiusmod qui duis enim sunt dolor sit nisi laboris qui enim mollit. Proident pariatur elit est elit consectetur. Velit anim eu culpa adipisicing esse consequat magna. Id do aliquip pariatur laboris consequat cupidatat voluptate incididunt sint ea.',
        });
    });

  // fail for user not log in
  it('fail for user not log in want to update post', async () => {
    const postId = 3;
    const res = await request(app)
      .patch(`/api/posts/${postId}`)
      .send({
        tags: ['travel', 'vacation'],
        authorIds: [1, 2, 5],
      });
    expect(res.body.error).toEqual("Didn't have logged in user");
    expect(res.status).toEqual(401);
  });

  // fail for post does not exist in database
  it('should not update for post ID 9 does not exist in database.', async () => {
    const token = makeToken(2);
    const postId = 9;
    const res = await request(app)
      .patch(`/api/posts/${postId}`)
      .set('x-access-token', token)
      .send({
        authorIds: [1, 2, 5],
      });
    expect(res.body.error).toEqual('Post id 9 not created');
    expect(res.status).toEqual(404);
  });
  
  it('should not update for any post are not exist in database.', async () => {
    // clear the Post table
    Post.destroy({where: {}, truncate: true})

    const token = makeToken(2);
    const postId = 1;
    const res = await request(app)
      .patch(`/api/posts/${postId}`)
      .set('x-access-token', token)
      .send({
        authorIds: [1, 2, 5],
      });
    expect(res.body.error).toEqual('Post id does not exist');
    expect(res.status).toEqual(404);
  });

  // fail for not author update
  it('should fail for not author of post update post.', async () => {
    const token = makeToken(1);
    const postId = 3;
    const res = await request(app)
      .patch(`/api/posts/${postId}`)
      .set('x-access-token', token)
      .send({
        authorIds: [1, 2],
      });
    expect(res.body.error).toEqual('Only author can update this post');
    expect(res.status).toEqual(403);
  });

  it('should fail for user does not have id.', async () => {
    const token = {};
    const postId = 3;
    const res = await request(app)
      .patch(`/api/posts/${postId}`)
      .set('x-access-token', token)
      .send({
        authorIds: [1, 2],
      });
    expect(res.body.error).toEqual("Didn't have logged in user");
    expect(res.status).toEqual(401);
  });

  // fail for invalid author
  it('should fail for not array and not integer author argument.', async () => {
    const token = makeToken(2);
    const postId = 3;
    const res = await request(app)
      .patch(`/api/posts/${postId}`)
      .set('x-access-token', token)
      .send({
        authorIds: 't',
      });
    expect(res.body.error).toEqual('Author ids should be a integer list or integer');
    expect(res.status).toEqual(400);
  });

  it('should fail for not list of all integer author.', async () => {
    const token = makeToken(2);
    const postId = 3;
    const res = await request(app)
      .patch(`/api/posts/${postId}`)
      .set('x-access-token', token)
      .send({
        authorIds: [2, 't'],
      });
    expect(res.body.error).toEqual('Author ids should be a integer list or integer');
    expect(res.status).toEqual(400);
  });

  // fail for author does not exist in database
  it('should fail for updated author ID 9 does not exist in database.', async () => {
    const token = makeToken(2);
    const postId = 3;
    const res = await request(app)
      .patch(`/api/posts/${postId}`)
      .set('x-access-token', token)
      .send({
        authorIds: [9],
      });
    expect(res.body.error).toEqual('Author id 9 not registered');
    expect(res.status).toEqual(403);
  });

  // fail for non-valid tags input
  it('should fail for non-list tags input.', async () => {
    const token = makeToken(2);
    const postId = 3;
    const res = await request(app)
      .patch(`/api/posts/${postId}`)
      .set('x-access-token', token)
      .send({
        authorIds: [1],
        tags: ['s', 4],
      });
    expect(res.body.error).toEqual('Non valid tags');
    expect(res.status).toEqual(400);
  });

  it('should fail for non-list of string tags input.', async () => {
    const token = makeToken(2);
    const postId = 3;
    const res = await request(app)
      .patch(`/api/posts/${postId}`)
      .set('x-access-token', token)
      .send({
        tags: [3, 5, 1],
      });
    expect(res.body.error).toEqual('Non valid tags');
    expect(res.status).toEqual(400);
  });

  // fail for non-valid text input
  it('should fail for non-valid text input.', async () => {
    const token = makeToken(2);
    const postId = 3;
    const res = await request(app)
      .patch(`/api/posts/${postId}`)
      .set('x-access-token', token)
      .send({
        text: [3, 5, 1],
      });
    expect(res.body.error).toEqual('Non valid text');
    expect(res.status).toEqual(400);
  });
});
