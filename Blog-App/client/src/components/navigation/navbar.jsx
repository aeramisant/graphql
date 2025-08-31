/** biome-ignore-all lint/correctness/useUniqueElementIds: <explanation> */
import React, { useState } from 'react';
import { Navbar, Nav, Container, Form, Button } from 'react-bootstrap';
import { NavLink, useHistory } from 'react-router-dom';

export default function NavBar() {
  const [profileId, setProfileId] = useState('');
  const history = useHistory();

  const goToProfile = (e) => {
    e.preventDefault();
    if (!profileId.trim()) return;
    history.push(`/profile/${profileId.trim()}`);
    setProfileId('');
  };

  return (
    <Navbar
      bg="light"
      variant="light"
      expand="md"
      className="mb-3"
      sticky="top">
      <Container>
        <Navbar.Brand as={NavLink} to="/posts" exact>
          BlogApp
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/posts" exact>
              Posts
            </Nav.Link>
            <Nav.Link as={NavLink} to="/signup" exact>
              Sign up
            </Nav.Link>
            <Nav.Link as={NavLink} to="/signin" exact>
              Sign in
            </Nav.Link>
          </Nav>

          <Form className="d-flex" onSubmit={goToProfile}>
            <Form.Control
              size="sm"
              type="text"
              placeholder="Profile ID"
              value={profileId}
              onChange={(e) => setProfileId(e.target.value)}
              className="me-2"
            />
            <Button type="submit" size="sm" variant="primary">
              Go
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
