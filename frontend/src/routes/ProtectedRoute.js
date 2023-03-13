import * as React from "react";
import { useSelector } from "react-redux";
import { useNavigate, Outlet} from "react-router-dom";

const ProtectedRoute = ({ roles, children }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const userHasRequiredRole = isAuthenticated && roles.includes(user.accountType);
  React.useEffect(() => {
    if (!userHasRequiredRole) {
      navigate("/login");
    }
  }, [user, userHasRequiredRole, navigate]);

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
