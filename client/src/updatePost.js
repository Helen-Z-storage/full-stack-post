//import './App.css';
import { useNavigate} from 'react-router-dom';
import React, { useEffect } from 'react';
import { Dropdown } from 'semantic-ui-react';

import { connect } from "react-redux";
import * as uiActions from "./redux/actions/uiActions";
import * as pageActions from "./redux/actions/pageActions";
import { post } from './utilities/fetch';
const tagSpliter = ",";

function UpdatePost(props) {
  const error = props.posts.getIn("posts.errorMsg".split("."));
  const users = props.users.getIn("users.usersData".split("."));
  const authorIds = props.ui.get("authorIds");
  const tags = props.ui.get("tags");
  const text = props.ui.get("text");
  const navigate = useNavigate();

  
  const handleUpdating = (event) => {
    const token = props.ui.get("token");
    const postId = props.ui.get("postId");

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

  useEffect(() => {
    // componentWillMount
    props.dispatch(uiActions.setAuthorIds(""));
    props.dispatch(uiActions.setText(""));
    props.dispatch(uiActions.setTags([]));
    if (!users.length) {
      const token = window.localStorage.getItem("token");
      props.dispatch(pageActions.pageSearchAllUsers(token));
    }
    // return () => {// componmentWillUnmount}
  }, []);

  const options = users.map((user, i) => ({key: i, text: user.username, value: user.id}));

  return (
    <div>
    <form onSubmit={(event) => handleUpdating(event)}>
    <Dropdown placeholder='Author Ids' fluid multiple selection clearable
        options={users.length ? users.map((user, i) => ({key: i, text: user.username, value: user.id})) : []} 
        onChange={(_, data) => props.dispatch(uiActions.setAuthorIds(data.value))}/>
      <label>
        Post Text, optional:
        <input type="text" name="Text" value={text} 
            onChange={(event) => props.dispatch(uiActions.setText(event.target.value))}/>
      </label>
      <label>
        Post Tags split by ",", optional:
        <input type="text" name="Tags" value={tags} 
            onChange={(event) => props.dispatch(uiActions.setTags(event.target.value.split(tagSpliter)))}/>
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
      posts: state.posts,
      users: state.users
    }
  })(UpdatePost);
