import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCookies } from 'react-cookie';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import fullToolbarOptions from '../../helpers/reactQuillconfig';
import config from '../../config/config';

interface UploadData {
  imageUrl: string;
}

interface MyCookie {
  token: string;
  userId: string;
}

const PostEditor = () => {
  const [file, setFile] = useState<File | null>(null);
  const [value, setValueState] = useState('');
  const [cookies] = useCookies(['token', 'userId']);

  const schema = z.object({
    title: z
      .string()
      .min(10, { message: 'le titre doit comporter au minimum 10 caractères' })
      .max(100, { message: 'le titre doit comporter au maximum 60 caractère' }),
    intro: z
      .string()
      .min(10, { message: "l'intro doit comporter au minimum 10 caractères" })
      .max(500, { message: "l'intro doit comporter au maximum 400 caractère" }),
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

  // Fonction pour gérer le changement de fichier, recupère le fichier selectionnée, et setFile.
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    setFile(selectedFile);
  };

  type FormData = z.infer<typeof schema>;

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    if (!file) {
      return;
    }
    // Créer un FormData pour l'image, on crée le champ img et on ajoute le fichier
    const imageFormData = new FormData();
    imageFormData.append('img', file);

    try {
      // upload de l'image
      const imageResponse = await axios.post<UploadData>(
        `${config.apiUrl}/api/post/upload`,
        imageFormData,
        {
          headers: {
            Authorization: (cookies as MyCookie).token,
          },
        }
      );

      // publier le post
      const imageUrl = imageResponse.data.imageUrl;
      const postData = { ...data };
      const postResponse = await axios.post(
        `${config.apiUrl}/api/post`,
        { ...postData, img: imageUrl, author: (cookies as MyCookie).userId },
        {
          headers: {
            Authorization: cookies.token as string,
          },
        }
      );

      console.log(postResponse.data);
    } catch (error) {
      console.log('Erreur lors de la création du post:', error);
    }
  };

  // on recupère le contenu de l'editeur, on le met dans le champ body defini par setValue qui vient de useForm
  const onEditorStateChange = (content: string) => {
    console.log('Contenu de l’éditeur modifié:', content);
    setValue('body', content);
    setValueState(content);
  };

  return (
    <div className="flex flex-col gap-2 items-center font-nunito md:w-3/6 m-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 md:w-full"
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
          className="w-full  border-none shadow-sm min-h-[400px]"
          placeholder="Introduction"
          {...register('intro', { required: true })}
        ></textarea>
        <p className="text-red-600 text-xs">{errors.intro?.message}</p>

        <div className="h-[800px] ">
          <ReactQuill
            theme="snow"
            value={value}
            onChange={onEditorStateChange}
            className="h-[750px] "
            modules={fullToolbarOptions}
          />
        </div>

        <div className="flex flex-col text-xs mt-12">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="file_input"
          >
            Uploader une image
          </label>
          <input
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            id="upload"
            type="file"
            onChange={handleFileChange}
          />
        </div>

        <button
          type="submit"
          className="bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 mt-2 rounded-sm focus:outline-none focus:shadow-outline "
        >
          Poster
        </button>
      </form>
    </div>
  );
};

export default PostEditor;
