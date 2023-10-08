import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function Protected({ currentUser, children }) {
  if (!currentUser) {
    return <Navigate to='/' replace />;
  }
  return children;
}
Protected.propTypes = {
  currentUser: PropTypes.object,
  children: PropTypes.object,
};

export default Protected;
