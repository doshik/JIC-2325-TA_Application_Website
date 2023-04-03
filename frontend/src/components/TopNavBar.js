import * as React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./TopNavBar.css";

function TopNavBar() {
  const location = useLocation();
  const role = useSelector((state) => state.auth.user.accountType);

  return (
    <Nav className="topNavBar col-md-9 col-lg-10">
      {role !== "student" && role !== "professor" && (
        <>
          <Nav.Item>
            <Nav.Link
              className="topNavLink"
              href="/login"
              active={location.pathname === "/login"}
            >
              Welcome
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              className="topNavLink"
              href="/FAQs"
              active={location.pathname === "/FAQs"}
            >
              FAQs
            </Nav.Link>
          </Nav.Item>
        </>
      )}
      {role === "student" && (
        <>
          <Nav.Item>
            <Nav.Link
              className="topNavLink"
              href="/home"
              active={location.pathname === "/home"}
            >
              Home
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              className="topNavLink"
              href="/dashboard"
              active={location.pathname === "/dashboard"}
            >
              Dashboard
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              className="topNavLink"
              href="/apply"
              active={location.pathname === "/apply"}
            >
              Open Applications
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              className="topNavLink"
              href="/interviews"
              active={location.pathname === "/interviews"}
            >
              Interview Scheduling
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              className="topNavLink"
              href="/FAQs"
              active={location.pathname === "/FAQs"}
            >
              FAQs
            </Nav.Link>
          </Nav.Item>
        </>
      )}
      {role === "professor" && (
        <>
          <Nav.Item>
            <Nav.Link
              className="topNavLink"
              href="/home"
              active={location.pathname === "/home"}
            >
              Home
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              className="topNavLink"
              href="/dashboard"
              active={location.pathname === "/dashboard"}
            >
              Dashboard
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              className="topNavLink"
              href="/templates"
              active={location.pathname === "/templates"}
            >
              Application Templates
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              className="topNavLink"
              href="/interviewscheduling"
              active={location.pathname === "/interviewscheduling"}
            >
              Interview Scheduling
            </Nav.Link>
          </Nav.Item>
        </>
      )}
    </Nav>
  );
}
export default TopNavBar;
