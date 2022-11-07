//import './App.css';
import { useNavigate} from 'react-router-dom';
import React, { useState } from 'react';
import { connect } from "react-redux";
import * as uiActions from "./redux/actions/uiActions";

function AddPost(props) {
  const {posts, setPosts, error, setError} = props;
  const [text, setText] = useState("");
  const [tags, setTags] = useState("");
  const navigate = useNavigate();
  
  const handleAdding = (event) => {
    if (text) {
      alert("成功add" + " tags: " + JSON.stringify(tags)
      + " text: " + text);
      navigate('/home');
      
      props.dispatch(uiActions.setError(""));
      event.preventDefault();
    } else {
      props.dispatch(uiActions.setError("请输入post的内容！"));
    }
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
            onChange={(event) => setTags(event.target.value)}/>
      </label>
      <input type="submit" value="Submit" />
    </form>
          <button key={1} onClick={() => {navigate('/home');
                props.dispatch(uiActions.setError(""));}}>Back</button>
          <div>{props.ui.get("error")}</div>
    </div>
  );
}

export default connect ((state) => {return {ui:state.ui}})(AddPost);
