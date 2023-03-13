import * as React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./LeftNavBar.css";

function LeftNavBar() {
  const location = useLocation();
  const role = useSelector((state) => state.auth.user.accountType);

  return (
    <Nav className="leftNavBar d-none d-md-block col-md-3 col-lg-2">
      {role !== 'student' && role !== 'professor' && (
        <div>
          <Nav.Item>
            <Nav.Link
              className="leftNavLink"
              href="/login"
              active={location.pathname === "/login"}
            >
              Welcome
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              className="leftNavLink"
              href="/FAQs"
              active={location.pathname === "/FAQs"}
            >
              FAQs
            </Nav.Link>
          </Nav.Item>
        </div>
      )}
      {role === 'student' && (
        <div>
          <Nav.Item>
            <Nav.Link
              className="leftNavLink"
              href="/home"
              active={location.pathname === "/home"}
            >
              Home
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              className="leftNavLink"
              href="/student/dashboard"
              active={location.pathname === "/student/dashboard"}
            >
              Dashboard
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              className="leftNavLink"
              href="/student/apply"
              active={location.pathname === "/student/apply"}
            >
              Open Applications
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              className="leftNavLink"
              href="/student/apply"
              active={location.pathname === "/student/apply"}
            >
              Interview Scheduling
            </Nav.Link>
          </Nav.Item>
        </div>
      )}
      {role === 'professor' && (
        <div>
          <Nav.Item>
            <Nav.Link
              className="leftNavLink"
              href="/home"
              active={location.pathname === "/home"}
            >
              Home
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              className="leftNavLink"
              href="/prof/dashboard"
              active={location.pathname === "/prof/dashboard"}
            >
              Dashboard
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              className="leftNavLink"
              href="/prof/templates"
              active={location.pathname === "/prof/templates"}
            >
              Application Templates
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              className="leftNavLink"
              href="/prof/templates"
              active={location.pathname === "/prof/templates"}
            >
              Interview Scheduling
            </Nav.Link>
          </Nav.Item>
        </div>
      )}
    </Nav>
  );
}

export default LeftNavBar;
