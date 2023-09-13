import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { User, UserContext } from '../contexts/UserContext';
import { useContext } from 'react';

interface ResponseData {
  token: string;
  user: User;
}

const Login = () => {
  const [cookies, setCookie, removeCookie] = useCookies<string>([]);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const onSubmit = (data: FormData) => {
    axios
      .post<ResponseData>('http://127.0.0.1:3000/api/user/login', data)
      .then((response) => {
        console.log('connexion réussie', response.data);
        setCookie('token', response.data.token);
        setCookie('userId', response.data.user._id);
        setUser(response.data.user);
        navigate('/');
      })
      .catch((err) => console.log('Erreur lors de la connexion', err));
  };

  const schema = z.object({
    email: z
      .string()
      .min(2, { message: "L'email doit contenir au minimum 2 caractères" })
      .max(30, {
        message: 'Lemail doit contenir au maximum 15 caractères',
      }),
    password: z
      .string()
      .min(5, {
        message: 'Le mot de passe doit contenir au minimum 2 caractères',
      })
      .max(15, {
        message: 'Le mot de passe doit contenir au maximum 15 caractères',
      }),
  });

  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  return (
    <div className="w-full max-w-xs m-auto mt-16 ">
      <form
        className="bg-white shadow-md rounded-sm px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow-none border-0 border-b-[1px] w-full py-2 px-3 text-gray-600 mb-3 leading-tigh"
            id="email"
            type="text"
            placeholder="email"
            {...register('email', { required: true })}
          />
          {errors.email && <span>This field is required</span>}
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow-none border-0 border-b-[1px] w-full py-2 px-3 text-gray-600 mb-3 leading-tigh"
            id="password"
            type="password"
            placeholder="******************"
            {...register('password', { required: true })}
          />
          {errors.password && <span>This field is required</span>}
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded-sm focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
