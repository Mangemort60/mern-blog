import { useState, useEffect } from 'react';
import axios from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCookies } from 'react-cookie';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useParams } from 'react-router-dom';
import { PostTypes } from '../../App';

interface ApiGetPostResponse {
  post: PostTypes;
}

const PostEditor = () => {
  const [cookies] = useCookies(['token', 'userId']);
  const [editorValue, setEditorValue] = useState('');

  const { id } = useParams();
  const [post, setPost] = useState<PostTypes>();

  const schema = z.object({
    title: z.string().min(10).max(100),
    intro: z.string().min(10).max(500),
    body: z.string().min(10).max(10000),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    register('body', { required: true });
  }, [register]);

  useEffect(() => {
    axios
      .get<ApiGetPostResponse>(`http://127.0.0.1:3000/api/post/get/${id}`)
      .then((response) => {
        setPost(response.data.post);
        setValue('title', response.data.post.title);
        setValue('intro', response.data.post.intro);
        setValue('body', response.data.post.body);
        setEditorValue(response.data.post.body);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id, setValue]);

  type FormData = z.infer<typeof schema>;

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    try {
      const postData = { ...data };
      const postResponse = await axios.put(
        `http://127.0.0.1:3000/api/post/update/${id}`,
        { ...postData, body: editorValue },
        {
          headers: {
            Authorization: cookies.token as string,
          },
        }
      );

      console.log(postResponse.data);
    } catch (error) {
      console.log('Erreur lors de la mise à jour du post:', error);
    }
  };

  const onEditorStateChange = (content: string) => {
    setValue('body', content);
    setEditorValue(content);
  };

  useEffect(() => {
    if (post) {
      setEditorValue(post.body);
    }
  }, [post]);

  return (
    <div className="flex flex-col gap-2 items-center font-nunito md:w-3/6 m-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 md:w-full mx-2"
      >
        <input
          id="title"
          type="text"
          placeholder="Titre"
          className="w-full border-none shadow-sm"
          {...register('title', { required: true })}
        />
        <p className="text-red-600 text-xs">{errors.title?.message}</p>
        <textarea
          id="intro"
          placeholder="Introduction"
          className="w-full  border-none shadow-sm min-h-[400px]"
          {...register('intro', { required: true })}
        ></textarea>
        <p className="text-red-600 text-xs">{errors.intro?.message}</p>
        <div className="h-[800px] ">
          <ReactQuill
            theme="snow"
            value={editorValue}
            onChange={onEditorStateChange}
            className="h-[750px] "
          />
        </div>
        <button
          type="submit"
          className="bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 mt-2 rounded-sm focus:outline-none focus:shadow-outline"
        >
          Poster
        </button>
      </form>
    </div>
  );
};

export default PostEditor;
