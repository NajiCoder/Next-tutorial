"use client";

import Link from "next/link";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const pathName = usePathname(); // this will return the current path name

  return (
    <Navbar bg="dark" variant="dark" sticky="top" expand="sm" collapseOnSelect>
      <Container>
        <Navbar.Brand as={Link} href="/">
          {/* ad the built next link to bootstrap */}
          NextJs 13 image gallery
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav>
            <Nav.Link as={Link} href="/static" active={pathName === "/static"}>
              Static
            </Nav.Link>
            <Nav.Link
              as={Link}
              href="/dynamic"
              active={pathName === "/dynamic"}
            >
              Dynamic
            </Nav.Link>
            <Nav.Link as={Link} href="/isr" active={pathName === "/isr"}>
              ISR
            </Nav.Link>
            <NavDropdown title="Topics" id="topics-dropdown">
              <NavDropdown.Item as={Link} href="/topics/fittness">
                Health
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} href="/topics/coding">
                Coding
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
