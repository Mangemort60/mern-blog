import './App.css';
import Footer from './components/Footer';
import Home from './components/Home';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Post from './components/Post';
import Register from './components/Register';
import UserProfile from './components/UserProfile';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

export interface PostTypes {
  _id: string;
  author: string;
  body: string;
  comment: string[];
  date: Date;
  img: string;
  tags: string[];
  title: string;
  intro: string;
}

function App() {
  const [posts, setPosts] = useState<PostTypes[]>();
  console.log('PostState : ', posts);

  useEffect(() => {
    axios
      .get<PostTypes[]>('http://127.0.0.1:3000/api/posts')
      .then((response) => {
        const posts = response.data;
        console.log(posts);
        setPosts(posts);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home posts={posts} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/user-profile" element={<UserProfile />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
