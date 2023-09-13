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
import { useContext, useEffect, useState } from 'react';
import { UserContext, User } from './contexts/UserContext';
import { useCookies } from 'react-cookie';

export interface PostTypes {
  _id: string;
  author: User;
  body: string;
  comment: string[];
  date: Date;
  img: string;
  tags: string[];
  title: string;
  intro: string;
}

interface GetUserResponse {
  user: User;
}

function App() {
  const [posts, setPosts] = useState<PostTypes[]>();
  const [cookies, setCookie] = useCookies(['userId', 'token']);
  const { user, setUser } = useContext(UserContext);
  console.log(cookies.token, cookies.userId);

  useEffect(() => {
    console.log('Effect triggered');
    if (cookies.userId && cookies.token) {
      console.log('Fetching user...');
      axios
        .get<GetUserResponse>(
          `http://127.0.0.1:3000/api/user/${cookies.userId}`
        )
        .then((response) => {
          console.log('User fetched:', response.data);
          setUser(response.data.user);
        })
        .catch((error) => console.log(error));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cookies.userId, cookies.token]);

  useEffect(() => {
    axios
      .get<PostTypes[]>('http://127.0.0.1:3000/api/posts')
      .then((response) => {
        const posts = response.data;
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
