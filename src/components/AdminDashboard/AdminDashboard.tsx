import { useState } from 'react';
import PostList from './PostList';
import UserList from './UserList';
import { PostTypes } from '../../App';

export interface AdminDashBoardPostProps {
  posts: PostTypes[] | undefined;
}

const AdminDashboard = () => {
  const [currentComponent, setCurrentComponent] = useState('Posts');
  const [activeTab, setActiveTab] = useState(1);

  const showComponent = () => {
    switch (currentComponent) {
      case 'User':
        return <UserList />;
      case 'Posts':
        return <PostList />;
      default:
        return <div>Choisissez une option</div>;
    }
  };

  return (
    <div className="font-nunito mt-4">
      <div
        className="flex justify-center
      "
      >
        <div
          className={`${
            activeTab === 1 ? 'border-b-2 border-b-black ' : ''
          }inline-block p-4 cursor-pointer`}
          onClick={() => {
            setCurrentComponent('Posts');
            setActiveTab(1);
          }}
        >
          ARTICLES
        </div>

        <div
          className={`${
            activeTab === 2 ? 'border-b-2 border-b-black ' : ''
          }inline-block p-4 cursor-pointer`}
          onClick={() => {
            setCurrentComponent('User');
            setActiveTab(2);
          }}
        >
          UTILISATEUR
        </div>
      </div>
      <div className="">{showComponent()}</div>
    </div>
  );
};

export default AdminDashboard;
