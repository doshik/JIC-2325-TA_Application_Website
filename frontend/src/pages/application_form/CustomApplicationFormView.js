import * as React from "react";
import CustomForm from "./CustomForm.js"

const CustomApplicationFormView = () => {
  return (
    <div className="text-center" style={{ marginTop: "2rem", paddingBottom: '5rem', overflow: 'auto' }}>
      <h1>Create a Custom Application</h1> 
      <CustomForm />
    </div>
  );
};

export default CustomApplicationFormView;