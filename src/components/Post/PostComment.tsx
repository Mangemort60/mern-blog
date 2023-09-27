import axios from 'axios';
import { useParams } from 'react-router-dom';
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCookies } from 'react-cookie';
import { UserContext } from '../../contexts/UserContext';
import React, { useContext, useState } from 'react';
import { Comments } from './Comment';
import defaultHeadshot from '../../assets/defaultHeadshot.webp';

interface ApiPostResponse {
  createdComment: Comments;
}

interface PostCommentProps {
  setComment: React.Dispatch<React.SetStateAction<Comments[]>>;
}

const PostComment = ({ setComment }: PostCommentProps) => {
  const { id } = useParams();
  const [token] = useCookies(['token']);
  const { user } = useContext(UserContext);
  const [isloading, setIsLoading] = useState(false);
  const [isPosted, setIsPosted] = useState(false);

  const onPosting = (data: FormData) => {
    setIsLoading(true);
    const newComment = {
      body: data.comment,
      post: id,
    };

    axios
      .post<ApiPostResponse>('http://127.0.0.1:3000/api/comment', newComment, {
        headers: {
          Authorization: token.token as string,
        },
      })
      .then((response) => {
        const createdComment = response.data.createdComment;
        setComment((prevComment) => [...prevComment, createdComment]);
        setIsPosted(true);
        console.log(createdComment.author.headshot);

        setTimeout(() => {
          setIsPosted(false);
        }, 10000);
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
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
      {isPosted && (
        <div
          className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-green-400"
          role="alert"
        >
          <span className="font-medium">Merci !</span> Votre commentaire a bien
          été posté !
        </div>
      )}
      <div className="flex">
        <div className="flex-shrink-0 mr-3">
          <img
            className="mt-2 rounded-full w-8 h-8 "
            src={user.headshot ?? defaultHeadshot}
            alt=""
          />
        </div>
        <div className="flex flex-col p-2 w-full mx-auto border rounded-sm">
          <form
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onSubmit={handleSubmit(onPosting)}
            className="flex flex-col gap-2"
          >
            <p className="font-semibold">{user.pseudo}</p>
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
              {isloading ? (
                <div role="status" className="flex justify-center">
                  <svg
                    aria-hidden="true"
                    className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                'Poster'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostComment;
