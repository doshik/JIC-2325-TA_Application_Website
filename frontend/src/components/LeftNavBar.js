import * as React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Nav } from "react-bootstrap";
import "./LeftNavBar.css"


function LeftNavBar() {
    const location = useLocation();

    return (
        <Nav className="leftNavBar d-none d-md-block col-md-3 col-lg-2">
            <Nav.Item>
                <Nav.Link className="leftNavLink" href="/login" active={location.pathname === '/login'}>
                    Welcome
                </Nav.Link>
            </Nav.Item>     
            <Nav.Item>
                <Nav.Link className="leftNavLink" href="/FAQs" active={location.pathname === '/FAQs'}>
                    FAQs
                </Nav.Link>
            </Nav.Item>         
        </Nav>
    );
}

export default LeftNavBar;