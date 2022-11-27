//import './App.css';
import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import NavigationBar from './navigationBar';
import {useNavigate} from 'react-router-dom';
import { Dropdown, Label } from 'semantic-ui-react';
import { Alert, ListGroup, Table } from 'react-bootstrap';


import { connect } from "react-redux";
import * as uiActions from "./redux/actions/uiActions";
import * as pageActions from "./redux/actions/pageActions";

const tagSpliter = ",";

function MainPage(props) {
    let error = props.posts.getIn("posts.errorMsg".split("."));
    const posts = props.posts.getIn("posts.postsData".split("."));
    const navigate = useNavigate();
    
    const handleClick = (postId) => {
        props.dispatch(uiActions.setPostId(postId));
        navigate('/update');
    }

    useEffect(() => {
        // componentWillMount
        const token = window.localStorage.getItem("token");
        console.log(token);
        if (token) {
            props.dispatch(uiActions.setToken(token));
        } else {
            navigate('/login');
            alert("需要登录");
        }
        props.dispatch(pageActions.pageSearchAllPosts(token));
        // return () => {// componmentWillUnmount}
    }, []);

    let postLst = <div></div>

    postLst = posts.map((post) => {
        return (
        <ListGroup.Item action key={uuidv4()}>
            <Table onClick={() => handleClick(post.id)}>
                <tbody>
                    <tr>
                        <td colSpan="3">
                            {post.text}
                        </td>
                    </tr>
                    
                    {post.tags? 
                    <tr>
                        <td colSpan="3">
                          {post.tags.split(",").map((tag) => <Label as='a' tag> {tag} </Label>)}
                        </td>
                    </tr>
                    : 
                    <tr></tr>}
                    
                    <tr>
                        <td>likes: {post.likes}</td>
                        <td>popularity: {post.popularity}</td>
                        <td>reads: {post.reads}</td>
                    </tr>
                </tbody>
            </Table>
        </ListGroup.Item>);
    });
  return (
    <div>
    <table class="table">
        <tbody>
            <tr>
                <td>
                    {error && <Alert key="danger" variant="danger"> {error} </Alert>}
                    <ListGroup>
                        {postLst}
                    </ListGroup>
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
    })(MainPage);
