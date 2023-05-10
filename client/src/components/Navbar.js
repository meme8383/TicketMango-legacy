import { Container, Navbar as BootBar, Nav, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()

  const handleClick = () => {
    logout()
  }

  return (
    <BootBar bg="light" expand="md" className="mb-3">
      <Container>
        <LinkContainer to="/">
          <BootBar.Brand>Ticketer</BootBar.Brand>
        </LinkContainer>
        <BootBar.Toggle aria-controls="basic-navbar-nav" />
        <BootBar.Collapse className="justify-content-end">
          <Nav>
            {user && (
              <>
                <BootBar.Text className="mx-3">{user.email}</BootBar.Text>
                <Button onClick={handleClick}>Log out</Button>
              </>
            )}
            {!user && (
              <>
                <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/signup">
                  <Nav.Link>Register</Nav.Link>
                </LinkContainer>
              </>
            )}
          </Nav>
        </BootBar.Collapse>
      </Container>
    </BootBar>
  )
}

export default Navbar