import { useSelector } from "react-redux";
import { Navigate, Route, useLocation } from "react-router-dom";

const Private = ({ Component, roles }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  // TODO: replace isAuthenticated with checking logged in endpoint, or helper function
  const userHasRequiredRole =
    user && roles && roles.includes(user.accountType) ? true : false;

  if (!isAuthenticated) {
    console.log("Private: user is not authenticated");
    return <Navigate to="/login" />;
  }
  console.log(roles, user.accountType);
  if (isAuthenticated && !userHasRequiredRole) {
    console.log(
      "Private: user is authenticated but does not have required role"
    );

    if (user.accountType === "student") {
      return <Navigate to="/studentdashboard" />;
    } else if (user.accountType === "professor") {
      return <Navigate to="/professordashboard" />;
    } else {
      return <Navigate to="/login" />;
    }
  }

  return <Component />;
};

export default Private;
