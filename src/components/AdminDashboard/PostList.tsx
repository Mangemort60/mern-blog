import { Link } from 'react-router-dom';
import { AdminDashBoardPostProps } from './AdminDashboard';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { MyCookie } from '../Post/UpdatePost';
import { PostContext } from '../../contexts/PostContext';
import { useContext } from 'react';

const PostList = ({ posts }: AdminDashBoardPostProps) => {
  const [cookies] = useCookies(['token']);
  const { post, setPost } = useContext(PostContext);

  const onDelete = async (id: string) => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:3000/api/post/delete/${id}`,
        {
          headers: {
            Authorization: (cookies as MyCookie).token,
          },
        }
      );
      const updatedPosts = posts?.filter((post) => post._id !== id);
      if (updatedPosts) {
        setPost(updatedPosts);
      }
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {(posts?.length ?? 0) > 0 ? (
        posts?.map((post) => (
          <div
            className="sm:m-auto sm:mt-6 m-6 border shadow-sm flex justify-between sm:w-4/6 "
            key={post._id}
          >
            <h3>{post.title}</h3>
            <span>{post.author?.pseudo}</span>
            <div className="">
              <Link to={`/post/update/${post._id}`}>
                <button>editer</button>
              </Link>

              <button onClick={() => onDelete(post._id)}>supprimer</button>
            </div>
          </div>
        ))
      ) : (
        <p>aucune Post</p>
      )}
    </div>
  );
};

export default PostList;
