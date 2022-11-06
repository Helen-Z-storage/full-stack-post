//import './App.css';
import SearchPost from './searchPost';
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import NavigationBar from './navigationBar';

const tagSpliter = ",";
const localStorage = window.localStorage;

function MainPage(props) {
    const {posts, setPosts, error, setError} = props;
    let postLst = <div></div>

  console.log(posts);
/*
  if (!posts) {
    const response = fetchData();
    if (response.error) {
        setError(response.error);
    } else {
        localStorage.setItem("posts", response.posts);
        setPosts(response.posts);
    }
  }

*/

    postLst = JSON.parse((posts || [])).map((post) => {
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
    <NavigationBar setError={setError}/>
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

export default MainPage;
