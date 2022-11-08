//import './App.css';
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import NavigationBar from './navigationBar';

import { connect } from "react-redux";
import * as pageActions from "./redux/actions/pageActions";

const tagSpliter = ",";
const localStorage = window.localStorage;

function MainPage(props) {
    let error = props.posts.getIn("posts.errorMsg".split("."));

    const posts = props.posts.getIn("posts.postsData".split("."));

    useEffect(() => {
        // componentWillMount
    const user = window.localStorage.getItem("user");
    const { id, token } = JSON.parse(user);
        props.dispatch(pageActions.pageSearchPosts({authorIds: id}, token));
        // return () => {// componmentWillUnmount}
    }, []);

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
  return (
    <div>
    <NavigationBar/>
    <table>
        <tbody>
            <tr>
                <td>
                </td>
            </tr>
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
