import { useState } from 'react'
import { useLogin } from '../hooks/useLogin'
import { Container, Form, Button, Alert, Row, Col } from 'react-bootstrap'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [show, setShow] = useState(true)
  const { login, error, isLoading } = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (e.currentTarget.checkValidity() === false) {
      e.stopPropagation()
    }

    await login(email, password, rememberMe)
    setShow(true)
  }

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={{ span: 5 }}>
          <Form
            onSubmit={handleSubmit}
            noValidate>
            <h3>Log In</h3>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email address:</Form.Label>
              <Form.Control
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="example@email.com"
                required
                isInvalid={error === "Incorrect email"}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder="Password"
                required
                isInvalid={error === "Incorrect password"}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="rememberMe">
              <Form.Check
                type="checkbox"
                label="Remember me"
                value={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
            </Form.Group>

            <Button className="mb-3" variant="primary" type="submit"
                    disabled={isLoading}>
              Log in
            </Button>
            {(error && show) &&
              <Alert variant="danger" onClose={() => setShow(false)}
                     dismissible>
                <p>{error}</p>
              </Alert>}
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default Login