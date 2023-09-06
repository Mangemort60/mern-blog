import FeaturedPost from './FeaturedPost';
import PostPreview from './PostPreview';

const Home = () => {
  return (
    <>
      <h1 className="text-center text-3xl">Les derniers articles</h1>
      <FeaturedPost />
      <PostPreview />
    </>
  );
};

export default Home;
