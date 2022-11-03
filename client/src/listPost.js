//import './App.css';
import SearchPost from './searchPost';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

const tagSpliter = ",";

function ListPost() {
    let posts = localStorage.getItem("Post");
    posts = JSON.parse(posts);
    const postLst = posts.map((post, i) => {
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
                            {post.tags.split(tagSpliter)}
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
    <table>
        <tbody>
            <tr>
                <td>
                </td>
            </tr>
            <tr>
                <td>
                    <ul>
                        {postLst}
                    </ul>
                </td>
            </tr>
        </tbody>
    </table>
  );
}

export default ListPost;
