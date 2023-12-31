import Comment from './Comment';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import moment from 'moment';
import HTMLReactParser from 'html-react-parser';
import defaultHeadshot from '../../assets/defaultHeadshot.webp';
import config from '../../config/config';

interface ApiResponse {
  post: PostData;
}

export interface Author {
  _id: string;
  email: string;
  password: string;
  pseudo: string;
  isAuthor: boolean;
  isAdmin: boolean;
  headshot: string;
}

interface PostData {
  title: string;
  intro: string;
  author: Author;
  body: string;
  comment: string[];
  img: string;
  date: Date;
}

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState<PostData>();

  useEffect(() => {
    axios
      .get<ApiResponse>(`${config.apiUrl}/api/post/get/${id}`)
      .then((response) => {
        const data = response.data.post;
        setPost(data);
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col items-start m-2 font-unito mt-8 md:w-1/2 md:m-auto md:mt-16">
      <img
        src={post?.img}
        alt={post?.img}
        className="h-[600px] w-full object-cover"
      />
      <h1 className="text-2xl my-8 font-semibold">{post?.title}</h1>
      <div className="flex w-full text-gray-400">
        <div className="flex">
          <p className="text-sm">By {post?.author.pseudo}</p>
          <Link to={`/user-profile/${post?.author._id}`}>
            <img
              className="w-6 h-6 rounded-full ml-2  mb-1 "
              src={post?.author.headshot ?? defaultHeadshot}
              alt="user photo"
            />
          </Link>
        </div>
        <p className="ml-auto text-sm">
          {post?.date
            ? moment(post.date).format('DD MMMM YYYY')
            : 'Date inconnue'}
        </p>
      </div>
      <p className="my-8">{post?.intro}</p>
      <p>&emsp; {HTMLReactParser(`${post?.body}`)}</p>
      <div className="flex flex-row w-full justify-end mt-4">
        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.0}
          stroke="currentColor"
          className="w-6 h-6 mr-auto"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
          />
        </svg> */}

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.0}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"
          />
        </svg>
        <span className="inline-block align-bottom text-xs mr-3 pt-2">
          {post?.comment?.length}
        </span>
        {/* <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.0}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
        </button>
        <span className="inline-block align-bottom text-xs mr-3 pt-2">99</span> */}
      </div>

      <Comment />
    </div>
  );
};

export default Post;
