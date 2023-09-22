import { useCookies } from 'react-cookie';
import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedAdminRouteProp {
  user: boolean;
}

const ProtectedAdminRoute = ({ user }: ProtectedAdminRouteProp) => {
  const [cookies] = useCookies(['userId', 'token']);
  console.log(user);
  if (!user && !cookies.token) {
    console.log(user);
    return <Navigate to="/" replace />;
  }
  console.log(user);
  return <Outlet />;
};
export default ProtectedAdminRoute;
