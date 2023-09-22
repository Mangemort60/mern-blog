import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

const UserProfile = () => {
  const { user } = useContext(UserContext);
  return <div>Bonjour {user.pseudo}, tu trouveras bientôt ton profil içi!</div>;
};

export default UserProfile;
