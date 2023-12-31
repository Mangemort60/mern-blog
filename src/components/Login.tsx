import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { User, UserContext } from '../contexts/UserContext';
import { useContext, useState } from 'react';
import config from '../config/config';

interface ResponseData {
  token: string;
  user: User;
}

interface LoginProps {
  setConfirmationPostMessage: (message: string) => void;
}

const Login = ({ setConfirmationPostMessage }: LoginProps) => {
  const [, setCookie] = useCookies<string>([]);
  const { setUser } = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const navigate = useNavigate();

  const onSubmit = (data: FormData) => {
    axios
      .post<ResponseData>(`${config.apiUrl}/api/user/login`, data)
      .then((response) => {
        setCookie('token', response.data.token);
        setCookie('userId', response.data.user._id);
        setUser(response.data.user);
        setTimeout(() => {
          setConfirmationPostMessage('');
        }, 10000);
        setConfirmationPostMessage(`Bienvenue ${response.data.user.pseudo} !`);
        navigate('/');
      })
      .catch((err) => {
        if (
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          (err.response && err.response.status === 401) ||
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          err.response.status === 400
        ) {
          setErrorMessage('Email ou mot de passe incorrect');
        }
        console.log(err);
      });
  };

  const schema = z.object({
    email: z.string().email('Veuillez entrer un email valide').max(30, {
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
      {errorMessage && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold mr-2">Oups !</strong>
          <span className="block sm:inline">{errorMessage}</span>
        </div>
      )}
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
          {errors.email && (
            <span className="text-sm text-red-600">{errors.email.message}</span>
          )}
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
          {errors.password && (
            <span className="text-sm text-red-600">
              {errors.password.message}
            </span>
          )}
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded-sm focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
          <Link to={'/register'} type="button" className="font-semibold">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
