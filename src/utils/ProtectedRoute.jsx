import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ element }) {
  const { isAuth } = useAuth();

  return isAuth ? element : <Navigate to='/login' replace />;
}
export default ProtectedRoute;
