import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCookies } from 'react-cookie';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useParams } from 'react-router-dom';
import { PostTypes } from '../../App';

interface UploadData {
  imageUrl: string;
}

export interface MyCookie {
  token: string;
  userId: string;
}

interface ApiGetPostResponse {
  post: PostTypes;
}

const PostEditor = () => {
  const [file, setFile] = useState<File | null>(null);
  const [cookies] = useCookies(['token']);
  console.log(cookies.token);

  const [editorValue, setEditorValue] = useState('');
  const { id } = useParams();
  const [post, setPost] = useState<PostTypes>();

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

  // recupère le contenu du post et met les valeurs dans les champs appropriés
  useEffect(() => {
    axios
      .get<ApiGetPostResponse>(`http://127.0.0.1:3000/api/post/get/${id}`)
      .then((response) => {
        setPost(response.data.post);
        setValue('title', response.data.post.title);
        setValue('intro', response.data.post.intro);
        setEditorValue(response.data.post.body);
        if (!response.data.post.body) {
          setEditorValue(response.data.post.body);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id, setValue]);

  const onSubmit = async (data: FormData) => {
    console.log('on Submit submitted');

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
            Authorization: (cookies as MyCookie).token,
          },
        }
      );

      // publier le post
      const imageUrl = imageResponse.data.imageUrl;
      const postData = { ...data };

      const postResponse = await axios.put(
        ` http://127.0.0.1:3000/api/post/update/${id}`,
        { ...postData, img: imageUrl, body: editorValue },
        {
          headers: {
            Authorization: (cookies as MyCookie).token,
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
    setValue('body', content); // Vous pouvez ajouter cette ligne
    setEditorValue(content);
  };

  useEffect(() => {
    if (post) {
      setEditorValue(post.body);
    }
  }, [post]);

  return (
    <div>
      <input type="file" onChange={handleFileChange} defaultValue={post?.img} />

      <form onSubmit={handleSubmit(onSubmit)}>
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
        <ReactQuill
          theme="snow"
          value={editorValue}
          onChange={onEditorStateChange}
        />

        <button type="submit">Poster</button>
      </form>
    </div>
  );
};

export default PostEditor;
