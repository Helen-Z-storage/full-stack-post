//import './App.css';
import { useNavigate} from 'react-router-dom';
import React, { useEffect } from 'react';
import { Dropdown } from 'semantic-ui-react';

import { connect } from "react-redux";
import * as uiActions from "./redux/actions/uiActions";
import * as pageActions from "./redux/actions/pageActions";


function AddPost(props) {
  let error = props.posts.getIn("posts.errorMsg".split("."));
  const text = props.ui.get("text");
  const tags = props.ui.get("tags");
  const tagOptions = props.ui.get("tagOptions");
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
    <Dropdown
      options={tagOptions.length? tagOptions : []}
      placeholder="Add Tags"
      search
      selection
      fluid
      multiple
      allowAdditions
      value={tags.length? tags : []}
      onAddItem={(_, { value }) => props.dispatch(uiActions.setTagOptions([{ text: value, value }, ...tagOptions]))}
      onChange={(_, { value }) => props.dispatch(uiActions.setTags(value))}
    />
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
