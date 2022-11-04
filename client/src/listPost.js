//import './App.css';
import SearchPost from './searchPost';
import React, { useState, useEffect }from 'react';
import { v4 as uuidv4 } from 'uuid';

const tagSpliter = ",";
const localStorage = window.localStorage;

    
const fetchData = async () => {
    const userId = localStorage.getItem("UserId");
    let url = new URL("http://localhost:8080/api/post");
    url.searchParams.append("authorIds", userId);
    const token = localStorage.getItem("token");

    const requestBody = {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            "x-access-token": token
        }
        
      };
    const request = new Request("http://localhost:8080/api/posts?authorIds=1", requestBody);
    console.log(url);
    console.log(request);

    fetch(request)
    .then(res => res.json())
    .then((response) => {
      console.log(response);
    })
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
  }
  /*
    const responseBody = await res.json();
    console.log(responseBody);
    return responseBody.posts
    
};
*/


function ListPost() {
  const [posts, setPosts] = useState([]);
    useEffect(() =>{
        fetchData();
        // return () => {componmentWillUnmount}
    }, []);

    const p = fetchData();
    console.log(p);
    setPosts(p);

    const postLst = JSON.parse(posts).map((post, i) => {
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
