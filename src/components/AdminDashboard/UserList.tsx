import axios from 'axios';
import { useEffect, useState } from 'react';
import { User } from '../../contexts/UserContext';
import { Link } from 'react-router-dom';

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
    <div>
      {(users?.length ?? 0) > 0 ? (
        users?.map((user) => (
          <div
            className="sm:m-auto sm:mt-6 m-6 border shadow-sm flex justify-between sm:w-4/6 "
            key={user._id}
          >
            <span>{user.pseudo}</span>
            <Link to={'/user-profile'} className="ml-auto flex items-center">
              <p className="mr-2">By </p>
              <img
                className="w-8 h-8 rounded-full ml-auto mr-2 mb-1"
                src={user.headshot}
                alt="user photo"
              />
            </Link>
          </div>
        ))
      ) : (
        <p>aucune user</p>
      )}
    </div>
  );
};

export default UserList;
