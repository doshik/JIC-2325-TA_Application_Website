import * as React from "react";
import EditApplicationForm from "./EditApplicationForm.js";
import { useLocation } from "react-router-dom";


const EditApplicationView = () => {
    const location = useLocation();
    const application = location.state.application;

    return (
        <div>
            <h5 className="px-3">Complete the {application?.course?.courseId} Application</h5>
            <EditApplicationForm application={application} />
        </div>
    );
};

export default EditApplicationView;
