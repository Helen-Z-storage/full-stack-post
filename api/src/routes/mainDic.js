const string = 'String';
const tagSpliter = ",";
const sortByDefault = ['id', 'reads', 'likes', 'popularity'];
const sortDiretDefault = ['asc', 'desc'];
const defaultSortBy = 'id';
const defaultDirection = 'asc';
const validations = {
    authorIds: "author ids",
    postId: "post id"
}
const fetchPostsVarNames = {
    authorIds: "author ids", 
    sortBy: "sort by", 
    direction: "direction"};
const updatePostVarNames = {
    authorIds: "author ids", 
    tags: "tags", 
    text: "text"};

module.exports = {
    string,
    tagSpliter,
    sortByDefault,
    sortDiretDefault,
    defaultSortBy,
    defaultDirection,
    validations,
    fetchPostsVarNames,
    updatePostVarNames,
};