import * as React from "react";
import ApplicationForm from "./ApplicationForm.js";
import { useLocation } from "react-router-dom";

const SubmitApplicationView = () => {
    const location = useLocation();
    const course = location.state.course;

    return (
        <div>
            <h5 className="px-3">Complete the {course?.courseId} Application</h5>
            <ApplicationForm course={course} />
        </div>
    );
};

export default SubmitApplicationView;
