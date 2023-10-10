import { Link } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { PostContext } from '../../contexts/PostContext';
import { useContext } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import moment from 'moment';
import config from '../../config/config';

const PostList = () => {
  const [cookies] = useCookies(['token']);
  const { posts, setPosts } = useContext(PostContext);

  const onDelete = (id: string) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    confirmAlert({
      title: 'Confirmation de suppression',
      message: 'Êtes-vous sûr(e) de vouloir supprimer ce post ?',
      buttons: [
        {
          label: 'oui',
          onClick: async () => {
            try {
              const response = await axios.delete(
                `${config.apiUrl}/api/post/delete/${id}`,
                {
                  headers: {
                    Authorization: cookies.token as string,
                  },
                }
              );
              const updatedPosts = posts?.filter((post) => post._id !== id);
              if (updatedPosts) {
                setPosts(updatedPosts);
              }
              console.log(response.data);
            } catch (error) {
              console.log(error);
            }
          },
        },
        {
          label: 'Non',
          // onClick: () => alert("Click No")
        },
      ],
    });
  };

  return (
    <div className="mt-6 flex flex-col items-center ">
      <Link
        to="/post/editor"
        className="border-2  sm:w-4/6 w-4/6 h-44 flex justify-center items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8 text-gray-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </Link>

      {(posts?.length ?? 0) > 0 ? (
        posts?.map((post) => (
          <div
            className="sm:m-auto p-4 shadow-sm-light flex flex-col justify-between sm:w-4/6 h-44"
            key={post._id}
          >
            <Link to={`/post/${post._id}`}>
              <h3 className="text-2xl">{post.title}</h3>
            </Link>

            <div className="flex justify-between text-gray-400">
              <span>de {post.author?.pseudo}</span>
              <span className="ml-2">
                le{' '}
                {post?.date
                  ? moment(post.date).format('DD MMMM YYYY')
                  : 'Date inconnue'}
              </span>
              <Link to={`/post/update/${post._id}`} className="ml-auto mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
              </Link>
              <div className="cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                  onClick={() => onDelete(post._id)}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <hr className="border" />
          </div>
        ))
      ) : (
        <p>aucune Post</p>
      )}
    </div>
  );
};

export default PostList;
