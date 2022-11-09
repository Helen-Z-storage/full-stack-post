//import './App.css';
import { useNavigate} from 'react-router-dom';
import React, { useEffect } from 'react';

import { connect } from "react-redux";
import * as uiActions from "./redux/actions/uiActions";
import * as pageActions from "./redux/actions/pageActions";


function AddPost(props) {
  let error = props.posts.getIn("posts.errorMsg".split("."));
  const text = props.ui.get("text");
  const tags = props.ui.get("tags");
  const navigate = useNavigate();
  
  const handleAdding = (event) => {
    const token = props.ui.get("token");

    props.dispatch(pageActions.pageAddPosts({text: text, tags: tags}, token, navigate));
    event.preventDefault();
  }
  
  useEffect(() => {
    // componentWillMount
    props.dispatch(uiActions.setText(""));
    props.dispatch(uiActions.setTags([]));
    // return () => {// componmentWillUnmount}
}, []);


  return (
    <div>
    <form onSubmit={(event) => handleAdding(event)}>
      <label>
        Post Text, required:
        <input type="text" name="Text" value={text} 
            onChange={(event) => props.dispatch(uiActions.setText(event.target.value))}/>
      </label>
      <label>
        Post Tags split by ",", optional:
        <input type="text" name="Tags" value={tags.join()} 
            onChange={(event) => props.dispatch(uiActions.setTags(event.target.value.split(",")))}/>
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
