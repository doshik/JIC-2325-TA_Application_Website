import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, useLocation, useNavigate } from "react-router-dom";
import { isLoggedIn } from "../api/users";

const Private = ({ Component, roles }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  console.log("isAuthenticated", isAuthenticated);
  // TODO: replace isAuthenticated with checking logged in endpoint, or helper function

  const userHasRequiredRole =
    user && roles && roles.includes(user.accountType) ? true : false;

  if (!isAuthenticated) {
    console.log("Private: user is not authenticated");
    navigate("/login");
  }
  console.log(roles, user.accountType);
  if (isAuthenticated && !userHasRequiredRole) {
    console.log(
      "Private: user is authenticated but does not have required role"
    );

    if (user.accountType === "student") {
      navigate("/user/studentdashboard");
    } else if ((user.accountType === "professor" || user.accountType === "TA")) {
      navigate("/user/professordashboard");
    } else {
      navigate("/login");
    }
  }

  return <Component />;
};

export default Private;
