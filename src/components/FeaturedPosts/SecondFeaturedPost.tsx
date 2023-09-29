/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { PostContext } from '../../contexts/PostContext';
import defaultHeadshot from '../../assets/defaultHeadshot.webp';

const SecondFeaturedPost = () => {
  const { posts } = useContext(PostContext);
  console.log(posts[1].img);

  return (
    <div className="md:h-[300px] mt-4 md:m-0">
      <Link
        to={`/post/${posts[1]._id}`}
        className="flex flex-col justify-between"
      >
        <img
          src={posts[1].img}
          alt=""
          className="md:h-[250px] h-[600px] object-cover"
        />
        <h1
          className="text-1xl mt-2 truncate md:w-[220px]"
          title={posts[1].title}
        >
          {posts[1].title}
        </h1>
      </Link>
      <div className="flex mt-4 items-center ">
        {/* <svg
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
          {posts[1]?.comment?.length}
        </span>
        <div className="ml-auto flex items-center">
          <p className="mr-2">By</p>
          <img
            className="w-8 h-8 rounded-full ml-auto mr-2 mb-1"
            src={posts[1].author.headshot || defaultHeadshot}
            alt="user photo"
            title={posts[1].author.pseudo}
          />
        </div>
      </div>
    </div>
  );
};

export default SecondFeaturedPost;
