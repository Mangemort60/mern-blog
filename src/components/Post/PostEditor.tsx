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
import { useNavigate } from 'react-router-dom';

interface UploadData {
  imageUrl: string;
}

interface MyCookie {
  token: string;
  userId: string;
}

interface PostEditorProps {
  setConfirmationPostMessage: (message: string) => void;
}

const PostEditor = ({ setConfirmationPostMessage }: PostEditorProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [value, setValueState] = useState('');
  const [cookies] = useCookies(['token', 'userId']);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

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
    setIsSubmitting(true);
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
      setTimeout(() => {
        setConfirmationPostMessage('');
      }, 10000);
      setIsSubmitting(false);
      setConfirmationPostMessage('Votre post a bien été enregistré');
      navigate('/');
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
    <div className="flex flex-col gap-2 items-center font-nunito md:w-3/6 mx-auto mt-4">
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
          {isSubmitting ? (
            <div role="status ">
              <svg
                aria-hidden="true"
                className="w-8 h-8 m-auto text-gray-200 animate-spin dark:text-gray-600 fill-black"
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
  );
};

export default PostEditor;
