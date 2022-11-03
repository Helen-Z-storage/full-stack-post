import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Login from './Login';
import Register from './Register';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

// adding data for pure frontend testing
const SEED_PW = '123456';
/*
let localStorage = window.localStorage;
let users = [
  {id: 1, username: 'thomas', password: SEED_PW},
  {id: 2, username: 'santiago', password: SEED_PW},
  {id: 3, username: 'ashanti', password: SEED_PW},
  {id: 4, username: 'julia', password: SEED_PW},
  {id: 5, username: 'cheng', password: SEED_PW},
];
let posts = [
  {
    id: 1,
    text: 'Excepteur occaecat minim reprehenderit cupidatat dolore voluptate velit labore pariatur culpa esse mollit. Veniam ipsum amet eu dolor reprehenderit quis tempor pariatur labore. Tempor excepteur velit dolor commodo aute. Proident aute cillum dolor sint laborum tempor cillum voluptate minim. Amet qui eiusmod duis est labore cupidatat excepteur occaecat nulla.',
    likes: 12,
    reads: 5,
    tags: 'food,recipes,baking',
    popularity: 0.19,
  }, 
  {
    id: 2,
    text: 'Ea cillum incididunt consequat ullamco nisi aute labore cupidatat exercitation et sunt nostrud. Occaecat elit tempor ex anim non nulla sit culpa ipsum aliquip. In amet in Lorem ut enim. Consectetur ea officia reprehenderit pariatur magna eiusmod voluptate. Nostrud labore id adipisicing culpa sunt veniam qui deserunt magna sint mollit. Cillum irure pariatur occaecat amet reprehenderit nisi qui proident aliqua.',
    likes: 104,
    reads: 200,
    tags: 'travel,hotels',
    popularity: 0.7,
  }, 
  {
    id: 3,
    text: 'Voluptate consequat minim commodo nisi minim ut. Exercitation incididunt eiusmod qui duis enim sunt dolor sit nisi laboris qui enim mollit. Proident pariatur elit est elit consectetur. Velit anim eu culpa adipisicing esse consequat magna. Id do aliquip pariatur laboris consequat cupidatat voluptate incididunt sint ea.',
    likes: 10,
    reads: 32,
    tags: 'travel,airbnb,vacation',
    popularity: 0.7,
  },
  {
    id:4,
    text: 'This is post 4',
    likes: 50,
    reads: 300,
    tags: 'vacation,spa',
    popularity: 0.4,
  }
];
let userPosts = [
  {userId: 1, postId: 1}, 
  {userId: 2, postId: 1}, 
  {userId: 2, postId: 2}, 
  {userId: 2, postId: 3}, 
  {userId: 3, postId: 3}, 
  {userId: 3, postId: 4}, 
]

localStorage.setItem("User", JSON.stringify(users));
localStorage.setItem("Post", JSON.stringify(posts));
localStorage.setItem("UserPost", JSON.stringify(userPosts));
*/
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<App/>} />
        <Route path="/add" element={<AddPost/>} />
        <Route path="/search" element={<SearchPost/>} />
        <Route path="/update" element={<UpdatePost/>} />
        <Route path="/" element={<Navigate to="/login" exact />}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
