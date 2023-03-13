import * as React from "react";
import CustomForm from "./CustomForm.js";

const CustomApplicationFormView = () => {
  return (
    <div
    
      className="mt-1"
      style={{ paddingLeft: "14px", overflow: "auto" }}
    >
      <h5>Create a Custom Application</h5>
      <CustomForm />
    </div>
  );
};

export default CustomApplicationFormView;
