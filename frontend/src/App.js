import React from "react";
import { ReactProvider, RouterProvider } from "react-router-dom";
import Router from "./routes/Router";

const App = () => {
  return (
    <div classname="App">
      <RouterProvider router={Router} />
    </div>
  );
};

export default App;
