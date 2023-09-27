/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { PostContext } from '../../contexts/PostContext';
import defaultHeadshot from '../../assets/defaultHeadshot.webp';
const ThirdFeaturedPost = () => {
  const { posts } = useContext(PostContext);

  return (
    <div className="md:h-auto h-[600px] mt-4 md:m-0 ">
      <Link
        to={`/post/${posts[2]._id}`}
        className="flex flex-col justify-between"
      >
        <img
          src={posts[2].img}
          alt=""
          className="md:h-[250px] h-[600px] object-cover "
        />
        <h1
          className="text-1xl mt-2 truncate md:w-[220px]"
          title={posts[2].title}
        >
          {posts[2].title}
        </h1>
      </Link>
      <div className="flex mt-4 ">
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
            d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
          />
        </svg>
        <div className="ml-auto flex items-center">
          <p className="mr-2">By</p>
          <img
            className="w-8 h-8 rounded-full ml-auto mr-2 mb-1"
            src={posts[2].author.headshot || defaultHeadshot}
            alt="user photo"
            title={posts[2].author.pseudo}
          />
        </div>
      </div>
    </div>
  );
};

export default ThirdFeaturedPost;
