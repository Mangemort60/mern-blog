import axios from 'axios';
import { useEffect, useState } from 'react';
import { User } from '../../contexts/UserContext';
import { Link } from 'react-router-dom';
import defaultHeadshot from '../../assets/defaultHeadshot.webp';
import { useCookies } from 'react-cookie';

const UserList = () => {
  const [users, setUsers] = useState<User[] | null>(null);
  const [isAuthor, setIsAuthor] = useState(false);
  const [cookies] = useCookies(['token', 'userId']);
  console.log(isAuthor);

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

  const onAuthorChange = (id: string, currentIsAuthor: boolean) => {
    console.log('current is author : ', currentIsAuthor);

    axios
      .put(
        `http://127.0.0.1:3000/api/user/update/${id}`,
        { isAuthor: !currentIsAuthor },
        {
          headers: {
            Authorization: cookies.token as string,
          },
        }
      )
      .then((response) => {
        setIsAuthor(!isAuthor);
        setUsers((prevUsers) => {
          if (prevUsers === null) {
            return null;
          }

          return prevUsers.map((user) => {
            if (user._id === id) {
              return { ...user, isAuthor: !currentIsAuthor };
            }
            return user;
          });
        });
        console.log(response);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="mt-6">
      {(users?.length ?? 0) > 0 ? (
        users?.map((user) => (
          <div className="p-4" key={user._id}>
            <div className="sm:m-auto flex justify-between items-center sm:w-4/6 h-23">
              <Link
                to={`/user-profile/${user.pseudo}`}
                className="mr-auto flex items-center"
              >
                <img
                  className="w-8 h-8 rounded-full  mr-2 mb-1"
                  src={user.headshot || defaultHeadshot}
                  alt="user photo"
                />
                <span>{user.pseudo}</span>
              </Link>
              <span className="mr-4 text-gray-400">{user.email}</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={user.isAuthor}
                  onChange={() => {
                    onAuthorChange(user._id, user.isAuthor);
                  }}
                  value=""
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Auteur
                </span>
              </label>
            </div>
            <hr className="border w-4/6 m-auto  " />
          </div>
        ))
      ) : (
        <p>aucune user</p>
      )}
    </div>
  );
};

export default UserList;
