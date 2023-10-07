import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import defaultHeadshot from '../../assets/defaultHeadshot.webp';
import { User } from '../../contexts/UserContext';

interface ApiResponse {
  user: User;
}

const PublicUserProfile = () => {
  const { userProfileId } = useParams();
  const [user, setUser] = useState<User>();
  console.log(user?._id);
  console.log('UseParams', userProfileId);

  useEffect(() => {
    axios
      .get<ApiResponse>(`http://127.0.0.1:3000/api/user/${userProfileId}`)
      .then((response) => {
        const data = response.data.user;
        console.log(data);

        setUser(data);
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="grid grid-cols-5 grid-rows-5 gap-8 md:w-1/2 mt-8 md:m-auto md:mt-8 font-nunito">
        <div className="col-span-5 lg:col-span-1">
          <div className="relative w-28 h-28 m-auto rounded-full overflow-hidden">
            <img
              src={user?.headshot ?? defaultHeadshot}
              className="w-full h-full object-cover"
              alt="User Headshot"
            />
          </div>
        </div>
        {user?.bio && (
          <div className="col-span-5 lg:col-span-4">{user?.bio}</div>
        )}
        <div className="col-span-5 lg:col-span-4"> </div>
        <div className="col-span-5 lg:col-span-1 lg:row-span-4 lg:row-start-2 flex flex-col items-center lg:items-start">
          <p>{user?.pseudo}</p>
          <p className="text-gray-500 text-sm mt-2">
            {user?.isAuthor ? 'Auteur' : 'Membre'}
          </p>
          <p className="text-gray-500 text-sm">
            {user?.isAdmin && 'Administrateur'}
          </p>
        </div>
        {user?.posts && (
          <div className="col-span-5 lg:col-span-4 lg:row-start-2">fav</div>
        )}
      </div>
    </>
  );
};

export default PublicUserProfile;
