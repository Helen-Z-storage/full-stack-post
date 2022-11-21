const emptyLogInField = 'username and password required';
const passwordLen = 'Password must be at least 6 characters';
const failLogIn = 'Wrong username and/or password';
const duplicateUsername = 'User with provided username already exists';
const valid = 'Validation error';
const newPostText = 'Must provide text for the new post';
const emptyRequiredAuthor = 'Author ids required';
const nonStrIntAuthor = 'Author ids should be stringfy integer or stringfy integer list';
const nonIntAuthor = 'Author ids should be a integer list or integer';
const unExistAuthor = (authorId) => `Author id ${authorId} not registered`;
const unOwnerAuthor = 'Only author can update this post';
const unExistPost = 'Post id does not exist';
const unCreatedPost = (postId) => `Post id ${postId} not created`;
const invalidVariable = (message) => `Non valid ${message}`;
const unAuthorizedUser = "Didn't have logged in user";
const nonStringAuthor = "Author id shold be string";

module.exports = {
    emptyLogInField,
    passwordLen,
    failLogIn,
    duplicateUsername,
    valid,
    newPostText,
    emptyRequiredAuthor,
    nonStrIntAuthor,
    nonIntAuthor,
    unExistAuthor,
    unOwnerAuthor,
    unExistPost,
    unCreatedPost,
    invalidVariable,
    unAuthorizedUser,
    nonStringAuthor,
};