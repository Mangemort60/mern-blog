import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import UploadImageForm from './UploadImageForm';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const PostEditor = () => {
  const [cookie] = useCookies(['token', 'userId']);
  const [imageUrl, setImgUrl] = useState<string | null>(null);
  const [value, setValueState] = useState('');

  const updateImageUrl = (imgUrl: string) => {
    setImgUrl(imgUrl);
  };

  const onSubmit = (data: FormData) => {
    console.log('form submited');

    const newPost = { ...data, value, imageUrl };
    console.log(newPost);

    axios
      .post(
        'http://127.0.0.1:3000/api/post',
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        { ...newPost, author: cookie.userId },
        {
          headers: {
            Authorization: cookie.token as string,
          },
        }
      )
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  const schema = z.object({
    title: z
      .string()
      .min(10, { message: 'le titre doit comporter au minimum 10 caractères' })
      .max(60, { message: 'le titre doit comporter au maximum 60 caractère' }),
    intro: z
      .string()
      .min(10, { message: "l'intro doit comporter au minimum 10 caractères" })
      .max(400, { message: "l'intro doit comporter au maximum 400 caractère" }),
    body: z.string().min(10).max(1000),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onEditorStateChange = (content: string) => {
    setValue('body', content);
    setValueState(content);
  };

  useEffect(() => {
    register('body', { required: true });
  }, [register]);
  type FormData = z.infer<typeof schema>;

  return (
    <div>
      <UploadImageForm updateImageUrl={updateImageUrl} />
      <form onClick={handleSubmit(onSubmit)}>
        <input
          id="title"
          type="text"
          placeholder="Titre"
          {...register('title', { required: true })}
        />
        <p>{errors.title?.message}</p>
        <textarea
          id="intro"
          placeholder="Introduction"
          {...register('intro', { required: true })}
        ></textarea>
        <p>{errors.intro?.message}</p>
        <ReactQuill theme="snow" value={value} onChange={onEditorStateChange} />
        <button type="submit">Poster</button>
      </form>
    </div>
  );
};

export default PostEditor;
