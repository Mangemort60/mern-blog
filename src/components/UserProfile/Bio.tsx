import { useForm } from 'react-hook-form';
import { useContext, useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { UserContext } from '../../contexts/UserContext';
import { useCookies } from 'react-cookie';
import { User } from '../../contexts/UserContext';
import config from '../../config/config';

interface MyCookie {
  token: string;
  userId: string;
}

interface updateBioResponse {
  updatedUser: User;
}

interface getUserResponse {
  user: User;
}

const Bio = () => {
  const { user, setUser } = useContext(UserContext);
  const [cookies] = useCookies(['token', 'userId']);
  const [editIsDisplayed, setEditIsDisplayed] = useState(false);

  console.log(user.email);

  const onSubmit = async (data: FormData) => {
    console.log('form submitted');

    console.log(data.bio);
    try {
      const bioText = data.bio;
      const updateBioResponse = await axios.put<updateBioResponse>(
        `${config.apiUrl}/api/user/update/${user._id}`,
        { bio: bioText },
        {
          headers: {
            Authorization: (cookies as MyCookie).token,
          },
        }
      );
      console.log('mise à jour de la bio', updateBioResponse.data.updatedUser);
      const getUserResponse = await axios.get<getUserResponse>(
        `${config.apiUrl}/api/user/${user._id}`,
        {
          headers: {
            Authorization: (cookies as MyCookie).token,
          },
        }
      );

      console.log('getUserResponse user : ', getUserResponse.data.user);
      setUser({ ...user, bio: getUserResponse.data.user.bio });

      console.log(errors);
    } catch (error) {
      console.log(error);
    }
  };

  const schema = z.object({
    bio: z
      .string()
      .max(500, { message: 'la bio ne doit pas dépasser 500 caractères' }),
  });

  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6 ml-auto text-gray-400"
        cursor="pointer"
        onClick={() => setEditIsDisplayed(!editIsDisplayed)}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
        />
      </svg>
      <div className="flex flex-col  mb-6 shadow-sm min-h-[200px]">
        {user.bio ? (
          <p className="text-xl italic text-gray-500 p-4 font-nunito">
            {user.bio}
          </p>
        ) : (
          <p className="m-auto text-gray-400 p-4">Parlez nous de vous</p>
        )}

        {editIsDisplayed && (
          <form
            className="flex flex-col mt-2 p-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <textarea
              id="bio"
              rows={4}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-sm border-none  border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Ecrivez votre bio ici..."
              {...register('bio', { required: false })}
              defaultValue={user.bio}
            ></textarea>
            <button
              type="submit"
              className="border p-2 ml-auto m-2 bg-slate-400 text-white rounded-sm"
            >
              Enregistrer
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Bio;
