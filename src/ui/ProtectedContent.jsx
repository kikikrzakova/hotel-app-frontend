import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

export default function ProtectedContent({children, isAuthenticated}) {
  if (isAuthenticated) {
    return children;
  } else {
    return <Navigate to='/login' />;
  }
}

ProtectedContent.propTypes = {
  children: PropTypes.node,
  isAuthenticated: PropTypes.bool,
}