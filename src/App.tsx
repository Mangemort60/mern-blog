import './App.css';
import Footer from './components/Footer';
import Home from './components/Home';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Post from './components/Post/Post';
import Register from './components/Register';
import UserProfile from './components/UserProfile';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { useContext, useEffect } from 'react';
import { UserContext, User } from './contexts/UserContext';
import { useCookies } from 'react-cookie';
import PostEditor from './components/Post/PostEditor';
import 'flowbite';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import UpdatePost from './components/Post/UpdatePost';
import { PostContext } from './contexts/PostContext';
import ProtectedAdminRoute from './components/Routing/ProtectedAdminRoute';

export interface PostTypes {
  _id: string;
  author: User[] | null;
  body: string;
  comment: string[];
  date: Date | null;
  img: string;
  tags: string[];
  title: string;
  intro: string;
}

interface GetUserResponse {
  user: User;
}

function App() {
  const { posts, setPosts, setIsLoading, isLoading } = useContext(PostContext);
  const [cookies] = useCookies(['userId', 'token']);
  const { user, setUser } = useContext(UserContext);
  console.log('IS ADMIN APP : ', user.isAdmin);

  useEffect(() => {
    if (cookies.userId && cookies.token) {
      axios
        .get<GetUserResponse>(
          `http://127.0.0.1:3000/api/user/${cookies.userId}`
        )
        .then((response) => {
          setUser(response.data.user);
        })
        .catch((error) => console.log(error));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cookies.userId, cookies.token]);

  useEffect(() => {
    console.log('GET POST APP');

    axios
      .get<PostTypes[]>('http://127.0.0.1:3000/api/posts')
      .then((response) => {
        const posts = response.data;
        setPosts(posts);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route element={<ProtectedAdminRoute user={user.isAdmin} />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/post/editor" element={<PostEditor />} />
          <Route path="/post/update/:id" element={<UpdatePost />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
