//import './App.css';
import { useNavigate} from 'react-router-dom';
import React, { useEffect } from 'react';
import { Dropdown } from 'semantic-ui-react';
import { connect } from "react-redux";
import { Alert, Button, Form, FloatingLabel } from 'react-bootstrap';

import * as uiActions from "./redux/actions/uiActions";
import * as pageActions from "./redux/actions/pageActions";
const tagSpliter = ",";

function UpdatePost(props) {
  const error = props.posts.getIn("posts.errorMsg".split("."));
  const users = props.users.getIn("users.usersData".split("."));
  const authorIds = props.ui.get("authorIds");
  const tags = props.ui.get("tags");
  const tagOptions = props.ui.get("tagOptions");
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

  const handleDeleting = (event) => {
    const token = props.ui.get("token");
    const postId = props.ui.get("postId");
    props.dispatch(pageActions.pageDeletePosts(postId, token, navigate));
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

  return (
    <div>
      
      <Form>    
        <Dropdown placeholder='Author Ids' fluid multiple selection clearable
            options={users.length ? users.map((user, i) => ({key: i, text: user.username, value: user.id})) : []} 
            onChange={(_, { value }) => props.dispatch(uiActions.setAuthorIds(value))}/>
      
      <FloatingLabel controlId="floatingTextarea2" label="Post Text">
        <Form.Control
          as="textarea"
          placeholder="This is default Post body"
          style={{ height: '100px' }}
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

        <Button variant="primary" type="submit" onClick={(event) => handleUpdating(event)}>
          Update
        </Button>
        <Button onClick={(event) => handleDeleting(event)}>
          Delete
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
      posts: state.posts,
      users: state.users
    }
  })(UpdatePost);
