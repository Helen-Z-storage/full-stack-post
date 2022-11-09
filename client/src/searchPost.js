//import './App.css';
import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import * as uiActions from "./redux/actions/uiActions";
import * as pageActions from "./redux/actions/pageActions";

const tagSpliter = ",";

function SearchPost(props) {
  const error = props.posts.getIn("posts.errorMsg".split("."));
  const posts = props.posts.getIn("posts.postsData".split("."));

  const authorIds = props.ui.get("authorIds");
  const sortBy = props.ui.get("sortBy");
  const direction = props.ui.get("direction");
  const navigate = useNavigate();
  
  const handleSearching = (event) => {
    const token = props.ui.get("token");

    let postQuery = {authorIds: authorIds.split(tagSpliter).filter(Boolean).map(id => parseInt(id, 10))}
    if (sortBy) {
      postQuery.sortBy = sortBy;
    }
    if (direction) {
      postQuery.direction = direction;
    }

    props.dispatch(pageActions.pageSearchPosts(postQuery, token));
    event.preventDefault();
  }
  
  let postLst = <div></div>

  postLst = posts.map((post) => {
      return (
      <li key={uuidv4()}>
          <table>
              <tbody>
                  <tr>
                      <td colSpan="3">
                          {post.text}
                      </td>
                  </tr>
                  <tr>
                      <td colSpan="3">
                          {post.tags}
                      </td>
                  </tr>
                  <tr>
                      <td>likes: {post.likes}</td>
                      <td>popularity: {post.popularity}</td>
                      <td>reads: {post.reads}</td>
                  </tr>
              </tbody>
          </table>
      </li>);
  });

  useEffect(() => {
    // componentWillMount
    props.dispatch(uiActions.setAuthorIds(""));
    props.dispatch(uiActions.setSortBy(""));
    props.dispatch(uiActions.setDirection(""));
    // return () => {// componmentWillUnmount}
}, []);

  return (
    <div>
    <form onSubmit={(event) => handleSearching(event)}>
      <label>
        Author Ids split by ",", required:
        <input type="text" name="AuthorIds" value={authorIds} 
            onChange={(event) => props.dispatch(uiActions.setAuthorIds(event.target.value))}/>
      </label>
      <label>
        Sort by, optional, default "id", choose from "id", "reads", "likes", "popularity":
        <input type="text" name="SortBy" value={sortBy} 
            onChange={(event) => props.dispatch(uiActions.setSortBy(event.target.value))}/>
      </label>
      <label>
        Direction, optional, default "asc", choose from "asc", "desc":
        <input type="text" name="Direction" value={direction} 
            onChange={(event) => props.dispatch(uiActions.setDirection(event.target.value))}/>
      </label>
      <input type="submit" value="Submit" />
    </form>
          <button key={1} onClick={() => navigate('/home')}>Back</button>
      <table>
          <tbody>
              <tr>
                  <td>
                      {error}
                      <ul>
                          {postLst}
                      </ul>
                  </td>
              </tr>
          </tbody>
      </table>
    </div>
  );
}

export default connect (
  (state) => {
    return {
      ui: state.ui,
      posts: state.posts
    }
  })(SearchPost);
