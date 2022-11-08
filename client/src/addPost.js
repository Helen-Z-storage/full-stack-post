//import './App.css';
import { useNavigate} from 'react-router-dom';
import React, { useState } from 'react';

import { connect } from "react-redux";
import * as uiActions from "./redux/actions/uiActions";
import * as pageActions from "./redux/actions/pageActions";


function AddPost(props) {
  let error = props.posts.getIn("posts.errorMsg".split("."));
  const [text, setText] = useState("");
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();
  
  const handleAdding = (event) => {
    const user = window.localStorage.getItem("user");
    const { token } = JSON.parse(user);

    props.dispatch(pageActions.pageAddPosts({text: text, tags: tags}, token, navigate));
    event.preventDefault();
  }

  return (
    <div>
    <form onSubmit={(event) => handleAdding(event)}>
      <label>
        Post Text, required:
        <input type="text" name="Text" value={text} 
            onChange={(event) => setText(event.target.value)}/>
      </label>
      <label>
        Post Tags split by ",", optional:
        <input type="text" name="Tags" value={tags} 
            onChange={(event) => setTags(event.target.value.split(","))}/>
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
    })(AddPost);
