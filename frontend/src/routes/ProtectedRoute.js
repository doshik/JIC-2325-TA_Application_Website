import * as React from "react";
import { useSelector } from "react-redux";
import { useNavigate, Route } from "react-router-dom";

const ProtectedRoute = ({ path, roles, children }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const userHasRequiredRole = user && roles && roles.includes(user.accountType);
  React.useEffect(() => {
    if (!user || !userHasRequiredRole) {
      navigate("/login");
    }
  }, [user, userHasRequiredRole, navigate]);

  return children;
};

export default ProtectedRoute;
