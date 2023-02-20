import React from "react";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import Router from "./routes/Router";
import store from "./redux/store/";

const App = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={Router} />
    </Provider>
  );
};

export default App;
