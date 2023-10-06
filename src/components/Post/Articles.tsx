import { Link } from 'react-router-dom';
import { PostContext } from '../../contexts/PostContext';
import PostList from '../AdminDashboard/PostList';
import { useContext } from 'react';
import moment from 'moment';

const Articles = () => {
  const { posts } = useContext(PostContext);
  return (
    <div className="mt-8">
      {(posts?.length ?? 0) > 0 ? (
        posts?.map((post) => (
          <div
            className="sm:m-auto p-4 shadow-sm-light flex flex-col justify-between sm:w-4/6 h-44"
            key={post._id}
          >
            <Link to={`/post/${post._id}`} className="">
              <h3 className="text-2xl">{post.title}</h3>
            </Link>
            <div className=" text-gray-400">
              <span>de {post.author?.pseudo}</span>
              <span className="ml-2">
                le{' '}
                {post?.date
                  ? moment(post.date).format('DD MMMM YYYY')
                  : 'Date inconnue'}
              </span>
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

export default Articles;
