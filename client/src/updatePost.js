//import './App.css';
import { useNavigate} from 'react-router-dom';
import React, { useState } from 'react';

import { connect } from "react-redux";
import * as uiActions from "./redux/actions/uiActions";
import * as pageActions from "./redux/actions/pageActions";
import { post } from './utilities/fetch';
const tagSpliter = ",";

function UpdatePost(props) {
    
  let error = props.posts.getIn("posts.errorMsg".split("."));
  const [postId, setPostIds] = useState(0);
  const [authorIds, setAuthorIds] = useState([]);
  const [tags, setTags] = useState([]);
  const [text, setText] = useState("");
  const navigate = useNavigate();
  
  const handleUpdating = (event) => {
    const user = window.localStorage.getItem("user");
    const { token } = JSON.parse(user);

    let postBody = {}
    if (authorIds.length) {
      postBody.authorIds = authorIds;
    }
    if (tags.length) {
      postBody.tags = tags;
    }
    if (text) {
      postBody.text = text;
    }
    console.log(postBody);
    props.dispatch(pageActions.pageUpdatePosts(postId, postBody, token, navigate));
    event.preventDefault();
  }

  return (
    <div>
    <form onSubmit={(event) => handleUpdating(event)}>
      <label>
        Post Id required, only integer:
        <input type="text" name="PostId" value={postId} 
            onChange={(event) => setPostIds(event.target.value)}/>
      </label>
      <label>
        Author Ids split by ",", optional:
        <input type="text" name="AuthorIds" value={authorIds} 
            onChange={(event) => setAuthorIds(event.target.value.split(tagSpliter).map(id => parseInt(id, 10)))}/>
      </label>
      <label>
        Post Text, optional:
        <input type="text" name="Text" value={text} 
            onChange={(event) => setText(event.target.value)}/>
      </label>
      <label>
        Post Tags split by ",", optional:
        <input type="text" name="Tags" value={tags} 
            onChange={(event) => setTags(event.target.value.split(tagSpliter))}/>
      </label>
      <input type="submit" value="Submit" />
    </form>
          <button key={1} onClick={() => navigate('/home')}>Back</button>
          <div>{error}</div>
    </div>
  );
}


export default connect (
  (state) => {
    return {
      ui: state.ui,
      posts: state.posts
    }
  })(UpdatePost);
