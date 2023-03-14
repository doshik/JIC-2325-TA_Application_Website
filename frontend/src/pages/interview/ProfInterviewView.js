import * as React from "react";
import { Container } from "react-bootstrap";
import ApplicationTable from "./ApplicationTable";

const ProfInterviewView = () => {
  return (
    <div>
      <h2> All Existing Applications</h2>
      <ApplicationTable />
    </div>
  );
};

export default ProfInterviewView;
