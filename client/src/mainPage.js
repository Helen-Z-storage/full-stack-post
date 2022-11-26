//import './App.css';
import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import NavigationBar from './navigationBar';
import {useNavigate} from 'react-router-dom';

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
        <li key={uuidv4()}>
            <table onClick={() => handleClick(post.id)}>
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
  return (
    <div class="table-responsive">
    <table class="table">
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
        posts: state.posts
      }
    })(MainPage);
