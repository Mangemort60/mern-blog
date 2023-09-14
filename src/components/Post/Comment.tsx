import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Author } from './Post';
import moment from 'moment';
import PostComment from './PostComment';

interface Comments {
  id: string;
  body: string;
  author: Author;
  date: Date;
}

interface GetCommentByPostResponse {
  postComments: Comments[];
}

const Comment = () => {
  const { id } = useParams();
  const [comments, setComment] = useState<Comments[]>([]);

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
  }, []);

  return (
    <div className="flex flex-col gap-6  mx-auto mt-6 max-w-md">
      <h3 className=" text-lg font-semibold text-gray-900">Comments</h3>
      <PostComment />
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div className="flex" key={comment.id}>
            <div className="flex-shrink-0 mr-3">
              <img
                className="mt-2 rounded-full w-8 h-8 "
                src={comment.author.headshot}
                alt=""
              />
            </div>
            <div className="flex flex-col border rounded-md w-full">
              <p>
                {comment.author.pseudo}{' '}
                <span className="text-xs text-gray-400">
                  {moment(comment.date).fromNow()}
                </span>
              </p>{' '}
              <p className="text-sm">{comment.body}</p>
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
