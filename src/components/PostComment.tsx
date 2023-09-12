import axios from 'axios';
import { useParams } from 'react-router-dom';
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCookies } from 'react-cookie';

const PostComment = () => {
  const { id } = useParams();
  const [token] = useCookies('token');

  const onPosting = (data: FormData) => {
    const newComment = {
      body: data.comment,
      post: id,
    };

    axios
      .post(
        'http://127.0.0.1:3000/api/comment',
        { newComment },
        {
          headers: {
            Authorization: token.token as string,
          },
        }
      )
      .then((response) => console.log(response, data))
      .catch((error) => console.log(error));
  };

  const schema = z.object({
    comment: z.string().min(5).max(1000),
  });

  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  return (
    <div className="space-y-4">
      <div className="flex">
        <div className="flex-shrink-0 mr-3">
          <img
            className="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10"
            src=""
            alt=""
          />
        </div>
        <div className="flex-1 flex flex-col border rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
          <p className="font-semibold">pseudo user</p>
          <form onSubmit={handleSubmit(onPosting)}>
            <textarea
              className="text-sm border-none shadow-sm my-2"
              id="comment"
              {...register('comment', { required: true })}
            >
              commentaire
            </textarea>
            <button
              className="bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded-sm w-1/2 mx-auto focus:outline-none focus:shadow-outline"
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
