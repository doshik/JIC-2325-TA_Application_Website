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


  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={Router} />
      </PersistGate>
    </Provider>
  );
};

export default App;
