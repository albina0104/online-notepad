import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuthContext } from '../context/AuthContext';

function ProtectedRoute({ children }) {
  const { currentUser, userLoading } = useAuthContext();

  if (userLoading) {
    return null;
  }
  if (!currentUser) {
    return <Navigate to='/' replace />;
  }
  return children;
}
ProtectedRoute.propTypes = {
  currentUser: PropTypes.object,
  userLoading: PropTypes.bool,
  children: PropTypes.object,
};

export default ProtectedRoute;
