import { useParams } from 'react-router-dom';

const UserProfile = () => {
  const { id } = useParams();
  return <div>Bonjour {id}, tu trouveras bientôt ton profil içi!</div>;
};

export default UserProfile;
