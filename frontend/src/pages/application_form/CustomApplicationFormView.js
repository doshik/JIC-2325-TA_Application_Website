import * as React from "react";
import CustomForm from "./CustomForm.js";

const CustomApplicationFormView = () => {
  return (
    <div
      className="text-center mt-5"
      style={{ paddingBottom: "50px", overflow: "auto" }}
    >
      <h1>Create a Custom Application</h1>
      <CustomForm />
    </div>
  );
};

export default CustomApplicationFormView;
