import { useCookies } from 'react-cookie';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedUserRoute = () => {
  const [cookies] = useCookies(['userId', 'token']);

  if (!cookies.token && !cookies.userId) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};
export default ProtectedUserRoute;
