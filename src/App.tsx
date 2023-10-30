import './App.css';
import Footer from './components/Footer';
import Home from './components/Home';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Post from './components/Post/Post';
import Register from './components/Register';
import UserProfile from './components/UserProfile/UserProfile';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { UserContext, User } from './contexts/UserContext';
import { useCookies } from 'react-cookie';
import PostEditor from './components/Post/PostEditor';
import 'flowbite';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import UpdatePost from './components/Post/UpdatePost';
import { PostContext } from './contexts/PostContext';
import ProtectedAdminRoute from './components/Routing/ProtectedAdminRoute';
import CalendlyWidget from './components/Calendly/CalendlyWidget';
import Articles from './components/Post/Articles';
import Offre from './components/Offre';
import ProtectedUserRoute from './components/Routing/ProtectedUserRoute';
import PublicUserProfile from './components/UserProfile/PublicUserProfile';
import config from '../src/config/config';
import Apropos from './components/Apropos';

export interface PostTypes {
  _id: string;
  author: User;
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
  const { setPosts, setIsLoading } = useContext(PostContext);
  const [cookies] = useCookies(['userId', 'token']);
  const { user, setUser } = useContext(UserContext);
  const { setIsUserLoading } = useContext(UserContext);
  const [confirmationPostMessage, setConfirmationPostMessage] = useState('');
  console.log(confirmationPostMessage);

  useEffect(() => {
    if (cookies.userId && cookies.token) {
      axios
        .get<GetUserResponse>(`${config.apiUrl}/api/user/${cookies.userId}`)
        .then((response) => {
          setUser(response.data.user);
          setIsUserLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsUserLoading(false);
        });
    } else {
      setIsUserLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cookies.userId, cookies.token]);

  useEffect(() => {
    axios
      .get<PostTypes[]>(`${config.apiUrl}/api/posts`)
      .then((response) => {
        const posts = response.data;
        setPosts(posts);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Navbar />
      {confirmationPostMessage && (
        <div
          className="flex items-center justify-center p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
          role="alert"
        >
          <svg
            className="flex-shrink-0 inline w-4 h-4 mr-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <span className="sr-only">Info</span>
          <div>{confirmationPostMessage}</div>
        </div>
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            <Login setConfirmationPostMessage={setConfirmationPostMessage} />
          }
        />
        <Route
          path="/register"
          element={
            <Register setConfirmationPostMessage={setConfirmationPostMessage} />
          }
        />
        <Route path="/post/:id" element={<Post />} />
        <Route element={<ProtectedAdminRoute user={user} />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route
            path="/post/editor"
            element={
              <PostEditor
                setConfirmationPostMessage={setConfirmationPostMessage}
              />
            }
          />
          <Route path="/post/update/:id" element={<UpdatePost />} />
        </Route>
        <Route element={<ProtectedUserRoute />}>
          <Route
            path="/user-profile"
            element={
              <UserProfile
                setConfirmationPostMessage={setConfirmationPostMessage}
              />
            }
          />
        </Route>
        <Route
          path="/user-profile/:userProfileId"
          element={<PublicUserProfile />}
        />
        <Route path="/calendly" element={<CalendlyWidget />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/offre" element={<Offre />} />
        <Route path="/apropos" element={<Apropos />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
