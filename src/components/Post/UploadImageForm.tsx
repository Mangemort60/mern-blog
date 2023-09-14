import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';

interface DataUpload {}

const UploadImageForm = () => {
  const onUpload = (data: { file: FileList }) => {
    if (!data.file || data.file.length === 0) {
      console.log('Aucun fichier sélectionné.');
      return;
    }

    const formData = new FormData();
    formData.append('file', data.file[0]);

    axios
      .post<DataUpload>('http://127.0.0.1:3000/api/post/upload', data.file[0])
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  const schema = z.object({
    file: z.any(),
  });

  const { handleSubmit, register } = useForm({ resolver: zodResolver(schema) });

  type FormData = z.infer<typeof schema>;

  return (
    <form onSubmit={handleSubmit(onUpload)}>
      <input
        type="file"
        formEncType="multipart/form-data"
        {...register('file', { required: true })}
      />
      <button
        data-modal-target="popup-modal"
        data-modal-toggle="popup-modal"
        className="block text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="submit"
      >
        Uploader
      </button>
    </form>
  );
};

export default UploadImageForm;
