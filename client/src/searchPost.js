//import './App.css';
import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import * as uiActions from "./redux/actions/uiActions";
import * as pageActions from "./redux/actions/pageActions";
import { Dropdown } from 'semantic-ui-react';
import { Alert, Button, Form, FloatingLabel } from 'react-bootstrap';


const tagSpliter = ",";
const defaultSortByList = ["id", "reads", "likes", "popularity"];
const sortByOptions = defaultSortByList.map((sortBy, i) => ({key: i, text: sortBy, value: sortBy}));

const defaultDirectionList = ["asc", "desc"];
const directionOptions = defaultDirectionList.map((direction, i) => ({key: i, text: direction, value: direction}));

function SearchPost(props) {
  const error = props.posts.getIn("posts.errorMsg".split("."));
  const users = props.users.getIn("users.usersData".split("."));
  const posts = props.posts.getIn("posts.postsData".split("."));

  const authorIds = props.ui.get("authorIds");
  const sortBy = props.ui.get("sortBy");
  const direction = props.ui.get("direction");
  const navigate = useNavigate();
  
  const handleSearching = (event) => {
    const token = props.ui.get("token");

    let postQuery = {authorIds: authorIds}
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
    const users = props.users.getIn("users.usersData".split("."));
    if (!users.length) {
      const token = window.localStorage.getItem("token");
      props.dispatch(pageActions.pageSearchAllUsers(token));
    }
    // return () => {// componmentWillUnmount}
  }, []);

  return (

    <div>
      
      <Form>    
        <Dropdown placeholder='Select Author Ids' fluid multiple selection clearable 
            options={users.length ? users.map((user, i) => ({key: i, text: user.username, value: user.id})) : []} 
            onChange={(_, { value }) => props.dispatch(uiActions.setAuthorIds(value))}/>
        
        <Dropdown
          placeholder='Select Sort by'
          fluid
          selection
          options={sortByOptions}
          onChange={(_, { value }) => props.dispatch(uiActions.setSortBy(value))}/>

        <Dropdown
            placeholder='Select Direction'
            fluid
            selection
            options={directionOptions}
            onChange={(_, { value }) => props.dispatch(uiActions.setDirection(value))}/>


        <Button variant="primary" type="submit" onClick={(event) => handleSearching(event)}>
          Search
        </Button>
        
        {error && <Alert key="danger" variant="danger"> {error} </Alert>}
      </Form>
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
      posts: state.posts,
      users: state.users
    }
  })(SearchPost);
