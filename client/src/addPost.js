//import './App.css';
import { useNavigate} from 'react-router-dom';
import React, { useEffect } from 'react';
import { Dropdown } from 'semantic-ui-react';
import { connect } from "react-redux";
import { Alert, Button, Form, FloatingLabel } from 'react-bootstrap';

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
      
      <Form>    

        <FloatingLabel
            controlId="floatingInput"
            label="Post Text"
            className="mb-3"
          >
          <Form.Control type="Post Text" placeholder="name@example.com" 
            onChange={(event) => props.dispatch(uiActions.setText(event.target.value))}/>
        </FloatingLabel>

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

        <Button variant="primary" type="submit" onClick={(event) => handleAdding(event)}>
          Add
        </Button>
        
        {error && <Alert key="danger" variant="danger"> {error} </Alert>}
      </Form>
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
