import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import config from '../config/config';

const Register = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  console.log(errorMessage);

  const onSubmit = (data: FormData) => {
    axios
      .post(`${config.apiUrl}/api/user`, data)
      .then((response) => {
        console.log('compte crée avec succès', response.data);
        navigate('/login');
      })
      .catch((err) => {
        if (
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          err.response &&
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          err.response.status === 409
        ) {
          setErrorMessage(`l'email ou le pseudo existent déjà`);
        }
        console.log(err);
      });
  };

  const schema = z.object({
    email: z
      .string()
      .min(2, { message: "L'email doit contenir au minimum 2 caractères" })
      .max(30, {
        message: 'Lemail doit contenir au maximum 15 caractères',
      }),
    pseudo: z
      .string()
      .min(3, { message: 'Le pseudo doit contenir au minimum 2 caractères' })
      .max(30, {
        message: 'Le pseudo doit contenir au maximum 15 caractères',
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
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="pseudo"
          >
            pseudo
          </label>
          <input
            className="shadow-none border-0 border-b-[1px] w-full py-2 px-3 text-gray-600 mb-3 leading-tigh"
            id="pseudo"
            type="text"
            placeholder="pseudo"
            {...register('pseudo', { required: true })}
          />
          {errors.email && (
            <span className="text-sm text-red-600">This field is required</span>
          )}
        </div>

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
            <span className="text-sm text-red-600">This field is required</span>
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
            <span className="text-sm text-red-600">This field is required</span>
          )}
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded-sm focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
