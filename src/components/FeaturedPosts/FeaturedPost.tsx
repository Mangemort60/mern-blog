import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { PostContext } from '../../contexts/PostContext';
import defaultHeadshot from '../../assets/defaultHeadshot.webp';

const FeaturedPost = () => {
  const { posts } = useContext(PostContext);
  console.log(posts[0].img);

  return (
    <Link
      to={`/post/${posts[0]._id}`}
      className="flex flex-col md:h-auto h-[600px] justify-end col-span-2 row-span-2 text-white"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5)),url("${posts[0].img}")`,
        backgroundSize: 'cover',
      }}
    >
      <Link to={`/post/${posts[0]._id}`} className="flex flex-col">
        <h1 className="text-2xl font-normal pl-2 " title={posts[0].title}>
          {posts[0].title}
        </h1>
        <p className="my-4 pl-2">{posts[0].intro}</p>
      </Link>
      <div className="flex pl-2 items-center">
        {/* <svg
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
          {posts[0]?.comment?.length}
        </span>
        <Link to={'/user-profile'} className="ml-auto flex items-center">
          <p className="mr-2">By </p>
          <img
            className="w-8 h-8 rounded-full ml-auto mr-2 mb-1"
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            src={posts[0].author.headshot || defaultHeadshot}
            alt="user photo"
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            title={posts[0].author.pseudo}
          />
        </Link>
      </div>
    </Link>
  );
};

export default FeaturedPost;
