import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';
import PostComment from './PostComment';
import { useCookies } from 'react-cookie';
import { User } from '../../contexts/UserContext';
import { confirmAlert } from 'react-confirm-alert';

export interface Comments {
  _id: string;
  body: string;
  author: User;
  date: Date;
}

interface GetCommentByPostResponse {
  postComments: Comments[];
}

const Comment = () => {
  const { id } = useParams();
  const [comments, setComment] = useState<Comments[]>([]);
  const [cookies] = useCookies(['userId', 'token']);

  useEffect(() => {
    axios
      .get<GetCommentByPostResponse>(
        `http://127.0.0.1:3000/api/comment/post/${id}`
      )
      .then((response) => {
        setComment(response.data.postComments);
      })
      .catch((error) => console.log(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    console.log('Comments state has changed:', comments);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onDelete = (id: string) => {
    confirmAlert({
      title: 'Confirmation de suppression',
      message: 'Êtes-vous sûr(e) de vouloir supprimer ce commentaire?',
      buttons: [
        {
          label: 'oui',
          onClick: async () => {
            try {
              const response = await axios.delete(
                `http://127.0.0.1:3000/api/comment/delete/${id}`,
                {
                  headers: {
                    Authorization: cookies.token as string,
                  },
                }
              );
              console.log('Delete response:', response);
              const updatedComment = comments?.filter((comment) => {
                console.log(comment._id);
                console.log(id);
                return comment._id !== id;
              });
              console.log('Updated comments:', updatedComment);

              if (updatedComment) {
                setComment(updatedComment);
                // setRefreshComments((prevKey) => prevKey + 1);
              }
              console.log(response.data);
            } catch (error) {
              console.log(error);
            }
          },
        },
        {
          label: 'non',
        },
      ],
    });
  };

  return (
    <div className="flex flex-col gap-6  mx-auto mt-8  w-full">
      <h3 className=" text-2xl font-semibold text-gray-900">Commentaires</h3>
      {cookies.userId && cookies.token ? (
        <PostComment setComment={setComment} />
      ) : (
        <p>
          <Link to="/login">
            <span className="text-blue-700 font-semibold underline">
              Connectez vous
            </span>
          </Link>{' '}
          pour poster un commentaire
        </p>
      )}
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div className="flex" key={comment._id}>
            <div className="flex-shrink-0 mr-3">
              <img
                className="mt-2 rounded-full w-8 h-8 "
                src={comment.author.headshot}
                alt=""
              />
            </div>
            <div className="flex flex-col border rounded-sm w-full px-4 py-2">
              <p className="mb-4">
                {comment.author.pseudo}{' '}
                <span className="text-xs text-gray-400">
                  {moment(comment.date).fromNow()}
                </span>
              </p>{' '}
              <p className="text-sm">{comment.body}</p>
              {cookies.userId === comment.author._id && (
                <button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 ml-auto"
                    onClick={() => onDelete(comment._id)}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
        ))
      ) : (
        <p>Aucun commentaire</p>
      )}
    </div>
  );
};

export default Comment;
