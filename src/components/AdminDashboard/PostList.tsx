import { AdminDashBoardPostProps } from './AdminDashboard';

const PostList = ({ posts }: AdminDashBoardPostProps) => {
  return (
    <div>
      {(posts?.length ?? 0) > 0 ? (
        posts?.map((post) => (
          <div
            className="sm:m-auto m-6 border shadow-sm flex justify-between sm:w-4/6 "
            key={post._id}
          >
            <h3>{post.title}</h3>
            <span>Auteur</span>
            <div className="">
              <button>editer</button>
              <button>supprimer</button>
            </div>
          </div>
        ))
      ) : (
        <p>aucune Post</p>
      )}
    </div>
  );
};

export default PostList;
