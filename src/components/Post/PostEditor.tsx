import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCookies } from 'react-cookie';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

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
  const [token] = useCookies<MyCookie>(['token']);
  const [userId] = useCookies<MyCookie>(['userId']);

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
  } = useForm({
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

  const onSubmit = async (data: FormData) => {
    if (!file) {
      console.log('No file to upload');
      return;
    }
    // Créer un FormData pour l'image, on crée le champ img et on ajoute le fichier
    const imageFormData = new FormData();
    imageFormData.append('img', file);

    try {
      // upload de l'image
      const imageResponse = await axios.post<UploadData>(
        'http://127.0.0.1:3000/api/post/upload',
        imageFormData,
        {
          headers: {
            Authorization: token.token as string,
          },
        }
      );

      // publier le post
      const imageUrl = imageResponse.data.imageUrl;
      const postData = { ...data };

      const postResponse = await axios.post(
        'http://127.0.0.1:3000/api/post',
        { ...postData, img: imageUrl, author: userId.userId },
        {
          headers: {
            Authorization: token.token as string,
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
    setValue('body', content);
    setValueState(content);
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          id="title"
          type="text"
          placeholder="Titre"
          {...register('title', { required: true })}
        />
        <p>{errors.title?.message as string}</p>
        <textarea
          id="intro"
          placeholder="Introduction"
          {...register('intro', { required: true })}
        ></textarea>
        <p>{errors.intro?.message as string}</p>
        <ReactQuill theme="snow" value={value} onChange={onEditorStateChange} />

        <button type="submit">Poster</button>
      </form>
    </div>
  );
};

export default PostEditor;
