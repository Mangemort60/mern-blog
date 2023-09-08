import { PostTypes } from '../App';
import FeaturedPost from './FeaturedPost';
import PostPreview from './PostPreview';

interface HomePostProps {
  posts: PostTypes[] | undefined;
}

const Home = ({ posts }: HomePostProps) => {
  return (
    <div className="mx-auto mt-16 md:w-[768px] font-thin">
      <div className="md:grid m-4 grid-cols-3 grid-rows-2 gap-6 md:h-[700px] ">
        <FeaturedPost posts={posts} />
        <div className="col-start-3">
          <PostPreview />
        </div>
        <div className="col-start-3 row-start-2 ">
          <PostPreview />
        </div>
      </div>
    </div>
  );
};

export default Home;
