import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useCookies } from 'react-cookie';

interface UploadData {
  imageUrl: string;
}

const UploadImageForm = ({ updateImageUrl }) => {
  const [cookie] = useCookies(['token']);

  const onUpload = (data: { file: FileList }) => {
    const formData = new FormData();
    formData.append('img', data.file[0]);

    axios
      .post<UploadData>('http://127.0.0.1:3000/api/post/upload', formData, {
        headers: {
          Authorization: cookie.token as string,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        const imgUrl = response.data.imageUrl;
        console.log(imgUrl);
        console.log(response);
        updateImageUrl(imgUrl);
      })
      .catch((error) => console.log(error));
  };

  const { handleSubmit, register } = useForm<{ file: FileList }>();

  return (
    <form
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={handleSubmit(onUpload)}
      encType="multipart/form-data"
      method="post"
    >
      <input
        type="file"
        formEncType="multipart/form-data"
        {...register('file', { required: true })}
      />
      <button
        className="block text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="submit"
      >
        Uploader
      </button>
    </form>
  );
};

export default UploadImageForm;
