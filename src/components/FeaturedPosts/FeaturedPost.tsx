import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { PostContext } from '../../contexts/PostContext';
import defaultHeadshot from '../../assets/defaultHeadshot.webp';

const FeaturedPost = () => {
  const { posts } = useContext(PostContext);
  return (
    <Link
      to={`/post/${posts[posts.length - 1]._id}`}
      className="flex flex-col md:h-auto h-[600px] justify-end col-span-2 row-span-2 text-white"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5)),url("${
          posts[posts.length - 1].img
        }")`,
        backgroundSize: 'cover',
      }}
    >
      <Link
        to={`/post/${posts[posts.length - 1]._id}`}
        className="flex flex-col"
      >
        <h1
          className="text-2xl font-normal pl-2 "
          title={posts[posts.length - 1].title}
        >
          {posts[posts.length - 1].title}
        </h1>
        <p className="my-4 pl-2">{posts[posts.length - 1].intro}</p>
      </Link>
      <div className="flex pl-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="#fdcb31"
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
        <Link to={'/user-profile'} className="ml-auto flex items-center">
          <p className="mr-2">By </p>
          <img
            className="w-8 h-8 rounded-full ml-auto mr-2 mb-1"
            src={posts[posts.length - 1].author.headshot || defaultHeadshot}
            alt="user photo"
            title={posts[posts.length - 1].author.pseudo}
          />
        </Link>
      </div>
    </Link>
  );
};

export default FeaturedPost;
