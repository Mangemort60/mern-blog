import React, { useContext, useState } from 'react';
// import { useParams } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import defaultHeadshot from '../../assets/defaultHeadshot.webp';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import Bio from './Bio';

interface MyCookie {
  token: string;
  userId: string;
}

interface UploadData {
  imageUrl: string;
}

const UserProfile = () => {
  // const { id } = useParams();
  const { user } = useContext(UserContext);
  const [file, setFile] = useState<File | null>(null);
  const [cookies] = useCookies(['token', 'userId']);

  // Fonction pour gérer le changement de fichier, recupère le fichier selectionnée, et setFile.
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    setFile(selectedFile);
  };

  const onSubmit = async () => {
    if (!file) {
      return console.log('no file found');
    }
    const imageFormData = new FormData();
    imageFormData.append('img', file);

    try {
      // upload de l'image
      const imageResponse = await axios.post<UploadData>(
        `http://127.0.0.1:3000/api/user/upload/${user._id}`,
        imageFormData,
        {
          headers: {
            Authorization: (cookies as MyCookie).token,
          },
        }
      );

      console.log(imageResponse);
    } catch (error) {
      console.log(`Erreur lors de l'upload de l'image`, error);
    }
  };
  return (
    <>
      <div className="grid grid-cols-5 grid-rows-5 gap-8 w-1/2 mt-8 m-auto">
        <div className="col-span-5 lg:col-span-1">
          <div className="relative w-28 h-28 m-auto rounded-full overflow-hidden">
            <img
              src={user.headshot || defaultHeadshot}
              className="w-full h-full object-cover"
              alt="User Headshot"
            />
          </div>
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-2"
            htmlFor="small_size"
          >
            Ajouter une photo
          </label>
          <input
            className="block w-full mb-2 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            id="upload"
            type="file"
            onChange={handleFileChange}
          ></input>
          <button className="border p-2" onClick={onSubmit}>
            uploader
          </button>
        </div>
        <div className="col-span-5 lg:col-span-4">
          <Bio />
        </div>
        <div className="col-span-5 lg:col-span-1 lg:row-span-4 lg:row-start-2"></div>
        {user.posts && (
          <div className="col-span-5 lg:col-span-4 lg:row-start-2">fav</div>
        )}
      </div>
    </>
  );
};

export default UserProfile;
