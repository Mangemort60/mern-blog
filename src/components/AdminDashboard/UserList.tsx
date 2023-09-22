import axios from 'axios';
import { useEffect, useState } from 'react';
import { User } from '../../contexts/UserContext';
import { Link } from 'react-router-dom';
import defaultHeadshot from '../../assets/defaultHeadshot.webp';

const UserList = () => {
  const [users, setUsers] = useState<User[] | null>(null);

  interface ApiResponse {
    users: User[];
  }

  useEffect(() => {
    axios
      .get<ApiResponse>('http://127.0.0.1:3000/api/users')
      .then((response) => {
        setUsers(response.data.users);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="mt-6">
      {(users?.length ?? 0) > 0 ? (
        users?.map((user) => (
          <div className="p-4" key={user._id}>
            <div className="sm:m-auto flex justify-between items-center sm:w-4/6 h-23">
              <span>{user.pseudo}</span>
              <Link to={'/user-profile'} className="ml-auto flex items-center">
                <img
                  className="w-8 h-8 rounded-full ml-auto mr-2 mb-1"
                  src={user.headshot || defaultHeadshot}
                  alt="user photo"
                />
              </Link>
              <hr />
            </div>
            <hr className="border" />
          </div>
        ))
      ) : (
        <p>aucune user</p>
      )}
    </div>
  );
};

export default UserList;
