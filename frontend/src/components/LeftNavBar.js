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
              href="/dashboard"
              active={location.pathname === "/dashboard"}
            >
              Dashboard
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              className="leftNavLink"
              href="/apply"
              active={location.pathname === "/apply"}
            >
              Open Applications
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              className="leftNavLink"
              href="/apply"
              active={location.pathname === "/apply"}
            >
              Interview Scheduling
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
              href="/dashboard"
              active={location.pathname === "/dashboard"}
            >
              Dashboard
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              className="leftNavLink"
              href="/templates"
              active={location.pathname === "/templates"}
            >
              Application Templates
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              className="leftNavLink"
              href="/templates"
              active={location.pathname === "/templates"}
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
