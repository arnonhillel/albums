import React from "react";
import { Container, Navbar } from "react-bootstrap";

const Header: React.FC = () => {
  return (
    <Navbar bg="info" variant="dark">
      <Container>
        <Navbar.Brand>
          <h1>My Albums</h1>
        </Navbar.Brand>
        <Navbar.Brand>
          <a
            style={{ color: "black" }}
            href="https://www.linkedin.com/in/arnon-hillel-96478910a/"
          >
            <h4>Arnon Hillel</h4>
          </a>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Header;
