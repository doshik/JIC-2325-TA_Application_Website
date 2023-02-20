import { useSelector } from 'react-redux';
import { Navigate, Route, useLocation } from 'react-router-dom';

const Private = ({Component, roles}) => {
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const userHasRequiredRole = user && roles && roles.includes(user.accountType) ? true : false;
  
  if (!isAuthenticated) {
    console.log("Private: user is not authenticated");
    return <Navigate to="/login"  />;
  } 
  console.log(roles, user.accountType)
  if (isAuthenticated && !userHasRequiredRole) {
    console.log("Private: user is authenticated but does not have required role");
    return <Navigate to="/login" />; // access denied page
  }
  
  return <Component/>;
};

export default Private;