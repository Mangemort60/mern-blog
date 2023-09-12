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
  console.log(comments);

  useEffect(() => {
    axios
      .get<GetCommentByPostResponse>(
        `http://127.0.0.1:3000/api/comment/post/${id}`
      )
      .then((response) => {
        setComment(response.data.postComments);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="flex flex-col gap-6 antialiased mx-auto mt-6 max-w-screen-sm">
      <h3 className="mb-4 text-lg font-semibold text-gray-900">Comments</h3>
      <PostComment />
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div className="space-y-4" key={comment.id}>
            <div className="flex">
              <div className="flex-shrink-0 mr-3">
                <img
                  className="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10"
                  src={comment.author.headshot}
                  alt=""
                />
              </div>
              <div className="flex-1 border rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
                <strong>{comment.author.pseudo}</strong>{' '}
                <span className="text-xs text-gray-400">
                  {moment(comment.date).fromNow()}
                </span>
                <p className="text-sm">{comment.body}</p>
                <h4 className="my-5 uppercase tracking-wide text-gray-400 font-bold text-xs">
                  Replies
                </h4>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>Il n'y a pas de commentaire pour l'instant</p>
      )}
    </div>
  );
};

export default Comment;
