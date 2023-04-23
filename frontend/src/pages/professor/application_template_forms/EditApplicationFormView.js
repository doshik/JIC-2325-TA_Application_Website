import * as React from "react";
import CustomForm from "./CustomForm.js";

import { useLocation } from "react-router-dom";

const EditApplicationFormView = () => {
  const location = useLocation();
  const template = location.state.template;

  return (
    <div>
      <h5 className="px-3">Edit an existing application</h5>
      <CustomForm template={template} />
    </div>
  );
};

export default EditApplicationFormView;
