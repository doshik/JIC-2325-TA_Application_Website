import { useSelector } from "react-redux";
import StudentDashboardView from "./StudentDashboardView";
import ProfessorDashboardView from "./ProfessorDashboardView";

// Example of a connected component
const DashboardView = () => {
  const auth = useSelector((state) => state.auth);

  return (
    <>
      {auth.user.accountType === "student" && <StudentDashboardView />}
      {(auth.user.accountType === "professor" || auth.user.accountType === "TA") && <ProfessorDashboardView />}
    </>
  );
};

export default DashboardView;
