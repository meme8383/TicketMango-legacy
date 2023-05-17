import React from 'react';
import { useEffect, useState } from 'react';
import { useLogin } from '../hooks/useLogin';
import {
  Container,
  Form,
  Button,
  Alert,
  Row,
  Col,
  Spinner,
} from 'react-bootstrap';

const Login = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [show, setShow] = useState(true);
  const { login, error, isLoading } = useLogin();
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    setEmailError('');
    setPasswordError('');

    if (!email || !password) {
      if (!email) {
        setEmailError('Please enter your email');
      }
      if (!password) {
        setPasswordError('Please enter your password');
      }
    }

    await login(email, password);
    setShow(true);
  };

  useEffect(() => {
    switch (error) {
      case null:
      case '':
        setErrorMessage('');
        break;
      case 'EMAIL_NOTFOUND':
        setErrorMessage(
          'Email not found. Please register or use a different email.',
        );
        setEmailError('Email not found.');
        break;
      case 'INCORRECT_PASSWORD':
        setErrorMessage('Incorrect password. Please try again.');
        setPasswordError('Incorrect password.');
        break;
      case 'EMPTY_FIELD':
        setErrorMessage('Please fill out all fields.');
        break;
      default:
        setErrorMessage('Something went wrong. Please try again.');
    }
  }, [error]);

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={{ span: 5 }}>
          <Form onSubmit={handleSubmit} noValidate>
            <h3>Log In</h3>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email address:</Form.Label>
              <Form.Control
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="example@email.com"
                required
                isInvalid={!!emailError}
              />
              <Form.Control.Feedback type="invalid">
                {emailError}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder="Password"
                required
                isInvalid={!!passwordError}
              />
              <Form.Control.Feedback type="invalid">
                {passwordError}
              </Form.Control.Feedback>
            </Form.Group>

            <Button
              className="mb-3"
              variant="primary"
              type="submit"
              disabled={!!isLoading}
            >
              Log in
            </Button>
            {!!isLoading && <Spinner />}
            {errorMessage && show && (
              <Alert
                variant="danger"
                onClose={() => setShow(false)}
                dismissible
              >
                <p>{errorMessage}</p>
              </Alert>
            )}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
