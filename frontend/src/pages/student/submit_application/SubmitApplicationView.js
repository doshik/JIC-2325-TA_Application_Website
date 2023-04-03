import * as React from "react";
import ApplicationForm from "./ApplicationForm.js";
import { useLoaderData } from "react-router-dom";

const SubmitApplicationView = () => {
    const courseId = useLoaderData();

    return (
        <div>
            <h5 className="px-3">Complete the {courseId} Application</h5>
            <ApplicationForm />
        </div>
    );
};

export default SubmitApplicationView;
