import React from "react";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import Router from "./routes/Router";
import store from "./redux/store";
import setAuthToken from "./utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { setCurrentUser, logoutUser } from "./redux/actions/authActions";

const App = () => {
  // window.addEventListener("storage", function (event) {
  //   if (event.key === "logout-event") {
  //     window.location.href = "./home";
  //     localStorage.clear();
  //   }
  // });

  // // Check for token to keep user logged in
  // if (localStorage.jwtToken) {
  //   const token = localStorage.jwtToken;
  //   setAuthToken(token);
  //   const decoded = jwt_decode(token);

  //   const currentTime = Date.now() / 1000; // to get in milliseconds
  //   if (decoded.exp < currentTime) {
  //     store.dispatch(logoutUser());
  //     window.location.href = "./login";
  //   } else {
  //     store.dispatch(setCurrentUser(decoded));
  //   }
  // }

  return (
    <Provider store={store}>
      <RouterProvider router={Router} />
    </Provider>
  );
};

export default App;
