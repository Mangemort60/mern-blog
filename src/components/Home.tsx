import FeaturedPost from './FeaturedPost';
import PostPreview from './PostPreview';

const Home = () => {
  return (
    <div className="m-auto md:w-4/6 font-thin">
      <div className="md:grid m-4 grid-cols-3 grid-rows-2 gap-6 md:h-[700px] ">
        <div className="flex flex-col justify-end col-span-2 row-span-2 md:bg-[url('https://picsum.photos/id/320/920/1080')] md:bg-no-repeat md:bg-cover md:text-white">
          <FeaturedPost />
        </div>
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
