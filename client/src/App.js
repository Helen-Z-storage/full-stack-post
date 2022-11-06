import './App.css';
import React, { useState, useEffect } from 'react';
import Login from './Login';
import Register from './Register';
import MainPage from './mainPage';
import AddPost from './addPost';
import SearchPost from './searchPost';
import UpdatePost from './updatePost';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

const localStorage = window.localStorage;
// fetch posts Hook
const useFetchPosts = () => {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [prevState, setPrevState] = useState([]);
  const [error, setError] = useState("");
  const [post, setPost] = useState(() => {
      try {
          // Get posts from local storage
          const existPosts = localStorage.getItem("Posts");
          return existPosts ? JSON.parse(existPosts) : [];
      } catch (error) {
          console.error('Error:', error);
          return [];
      }
  });

  // update post by value of fetch
  const setNewpost = () => {
      try {
          // fetch new posts from 
          const userId = localStorage.getItem("UserId");
          const token = localStorage.getItem("token");
          const requestBody = {
              method: 'GET',
              headers: { 
                  'Content-Type': 'application/json',
                  "x-access-token": token
              }
            };
          const request = new Request(`http://localhost:8080/api/posts?authorIds=${userId}`, requestBody);
          fetch(request)
          .then(res => res.json())
          .then(data => {
              if (data.error) {
                  setError(data.error);
              } else {

                  // Save new posts in state and update new state for synchronize render
                  setPost(data.posts);
                  setPrevState([...prevState]);
                  // Save new posts to local storage
                  localStorage.setItem("Posts", data.posts);
              }
          })
          .catch(error => console.error('Error:', error));
      } catch (error) {
          console.error('Error:', error);
      }
    };

  return [post, setNewpost, error, setError];
}

function App() {
  const [posts, setPosts, error, setError] = useFetchPosts();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={
          <Login posts={posts} setPosts={setPosts} error={error} setError={setError}/>} />
        <Route path="/register" element={
          <Register error={error} setError={setError}/>} />
        <Route path="/home" element={
          <MainPage posts={posts} setPosts={setPosts} error={error} setError={setError}/>} />
        <Route path="/add" element={
          <AddPost posts={posts} setPosts={setPosts} error={error} setError={setError}/>} />
        <Route path="/search" element={
          <SearchPost error={error} setError={setError}/>} />
        <Route path="/update" element={
        <UpdatePost posts={posts} setPosts={setPosts} error={error} setError={setError}/>} />
        <Route path="/" element={<Navigate to="/login" exact />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
