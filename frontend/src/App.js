import React from "react";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import Router from "./routes/Router";
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import setAuthToken from "./utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { setCurrentUser, logoutUser } from "./redux/actions/authActions";

const App = () => {

// Check for JWT cookie to keep user logged in
const tokenRegex = /(?:(?:^|.*;\s*)jwt\s*\=\s*([^;]*).*$)|^.*$/;
const token = document.cookie.replace(tokenRegex, "$1");
if (token) {
  setAuthToken(token);
  const decoded = jwt_decode(token);

  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "./login";
  } else {
    store.dispatch(setCurrentUser(decoded));
  }
} else  {
  store.dispatch(setCurrentUser({}));
}



  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={Router} />
      </PersistGate>
    </Provider>
  );
};

export default App;
