import axios from 'axios';
import { useParams } from 'react-router-dom';
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCookies } from 'react-cookie';
import { UserContext } from '../../contexts/UserContext';
import { useContext } from 'react';

const PostComment = () => {
  const { id } = useParams();
  const [token] = useCookies(['token']);
  const { user } = useContext(UserContext);

  const onPosting = (data: FormData) => {
    const newComment = {
      body: data.comment,
      post: id,
    };
    console.log(id);

    axios
      .post('http://127.0.0.1:3000/api/comment', newComment, {
        headers: {
          Authorization: token.token as string,
        },
      })
      .then((response) => console.log(response, data))
      .catch((error) => console.log(error));
  };

  const schema = z.object({
    comment: z
      .string()
      .min(3, {
        message: 'Le commentaire doit contenir au minimum 5 caractères',
      })
      .max(1000, {
        message: 'le commentaire doit contenir au maximum 1000 caractères',
      })
      .optional(),
  });

  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  return (
    <div className="flex flex-col gap-6">
      {errors.comment && (
        <div
          className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 "
          role="alert"
        >
          <p>{errors.comment.message}</p>
        </div>
      )}
      <div className="flex">
        <div className="flex-shrink-0 mr-3">
          <img
            className="mt-2 rounded-full w-8 h-8 "
            src={user.headshot}
            alt=""
          />
        </div>
        <div className="flex flex-col p-2 w-full mx-auto border rounded-md">
          <form
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onSubmit={handleSubmit(onPosting)}
            className="flex flex-col gap-2"
          >
            <p className="font-semibold">pseudo user</p>
            <textarea
              rows={4}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Ecrivez un commentaire ici..."
              id="comment"
              {...register('comment', { required: true })}
            ></textarea>

            <button
              className="mt-2 bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded-sm w-2/6 mx-auto focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Poster
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostComment;
