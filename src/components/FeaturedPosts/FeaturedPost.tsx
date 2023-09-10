import { Link } from 'react-router-dom';
import { PostTypes } from '../../App';
import { useParams } from 'react-router-dom';

interface FeaturedPostProps {
  posts: PostTypes[] | undefined;
}

const FeaturedPost = ({ posts }: FeaturedPostProps) => {
  // const [postId, setPostId] = useParams();

  if (posts && posts.length > 0) {
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
              src=""
              alt="user photo"
            />
          </Link>
        </div>
      </Link>
    );
  } else {
    return (
      <div
        role="status"
        className="flex justify-center items-center h-full col-span-2 row-span-2"
      >
        <svg
          aria-hidden="true"
          className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }
};

export default FeaturedPost;
