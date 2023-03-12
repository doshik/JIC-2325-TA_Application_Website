import * as React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Nav } from "react-bootstrap";
import "./TopNavBar.css";

function TopNavBar() {
  const location = useLocation();

  return (
    <Nav className="topNavBar col-md-9 col-lg-10">
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
    </Nav>
  );
}
export default TopNavBar;
