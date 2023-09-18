import { useState } from 'react';
import PostList from './PostList';
import UserList from './UserList';
import { PostTypes } from '../../App';

export interface AdminDashBoardPostProps {
  posts: PostTypes[] | undefined;
}

const AdminDashboard = ({ posts }: AdminDashBoardPostProps) => {
  const [currentComponent, setCurrentComponent] = useState('');

  const showComponent = () => {
    switch (currentComponent) {
      case 'User':
        return <UserList />;
      case 'Posts':
        return <PostList posts={posts} />;
      default:
        return <div>Choisissez une option</div>;
    }
  };

  return (
    <div>
      <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
        <li className="mr-2">
          <a
            href="#"
            aria-current="page"
            className="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-300"
            onClick={() => setCurrentComponent('Posts')}
          >
            Articles
          </a>
        </li>
        <li className="mr-2">
          <a
            href="#"
            className="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-300"
            onClick={() => setCurrentComponent('User')}
          >
            Utilisateurs
          </a>
        </li>
      </ul>

      <div>{showComponent()}</div>
    </div>
  );
};

export default AdminDashboard;
