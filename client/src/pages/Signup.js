import React from 'react';
import { useEffect, useState } from 'react';
import { useSignup } from '../hooks/useSignup';
import {
  Container,
  Form,
  Button,
  Alert,
  Row,
  Col,
  Spinner,
} from 'react-bootstrap';
import validator from 'validator';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const [confirmError, setConfirmError] = useState('');

  const [strongPassword, setStrongPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const [emailValid, setEmailValid] = useState(false);
  const [emailError, setEmailError] = useState('');

  const [firstName, setFirstName] = useState('');
  const [firstNameValid, setFirstNameValid] = useState(false);
  const [firstNameError, setFirstNameError] = useState('');

  const [lastName, setLastName] = useState('');
  const [lastNameValid, setLastNameValid] = useState(false);
  const [lastNameError, setLastNameError] = useState('');

  const [show, setShow] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !emailValid ||
      !strongPassword ||
      !passwordsMatch ||
      !firstNameValid ||
      !lastNameValid
    ) {
      handleFirstName(firstName);
      handleLastName(lastName);
      handleEmail(email);
      handlePassword(password);
      handleConfirmPassword(confirmPassword);
      return;
    }

    await signup(email, password, firstName, lastName);
    setShow(true);
  };

  const handleFirstName = (name) => {
    if (name.length < 2) {
      setFirstNameError('Please enter your first name');
    } else {
      setFirstNameError('');
      setFirstNameValid(true);
    }
    setFirstName(name);
  };

  const handleLastName = (name) => {
    if (name.length < 2) {
      setLastNameError('Please enter your last name');
    } else {
      setLastNameError('');
      setLastNameValid(true);
    }
    setLastName(name);
  };

  const handleEmail = (email) => {
    if (!validator.isEmail(email)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
      setEmailValid(true);
    }
    setEmail(email);
  };

  const handlePassword = (pass) => {
    const lowerCase = /[a-z]/;
    const upperCase = /[A-Z]/;
    const number = /[0-9]/;

    if (pass.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
    } else if (!pass.match(lowerCase)) {
      setPasswordError('Password must contain at least one lowercase letter');
    } else if (!pass.match(upperCase)) {
      setPasswordError('Password must contain at least one uppercase letter');
    } else if (!pass.match(number)) {
      setPasswordError('Password must contain at least one number');
    } else {
      setPasswordError('');
      setStrongPassword(true);
    }

    setPassword(pass);
    if (confirmPassword || passwordsMatch) {
      if (confirmPassword !== pass) {
        setConfirmError('Passwords do not match');
        setPasswordsMatch(false);
      } else {
        setConfirmError('');
        setPasswordsMatch(true);
      }
    }
  };

  const handleConfirmPassword = (pass) => {
    if (pass !== password) {
      setConfirmError('Passwords do not match');
    } else {
      setConfirmError('');
      setPasswordsMatch(true);
    }

    setConfirmPassword(pass);
  };

  useEffect(() => {
    switch (error) {
      case null:
      case '':
        setErrorMessage('');
        break;
      case 'EMAIL_INUSE':
        setErrorMessage('Email already in use. Please login instead.');
        setEmailError('Email already in use');
        setEmailValid(false);
        break;
      case 'INVALID_EMAIL':
        setErrorMessage('Invalid email');
        setEmailError('Please enter a valid email address');
        setEmailValid(false);
        break;
      case 'WEAK_PASSWORD':
        setErrorMessage(
          'Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, and one number',
        );
        setPasswordError('Please enter a stronger password.');
        setStrongPassword(false);
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
            <h3>Sign Up</h3>

            {/*Add form groups for first and last name here*/}
            <Form.Group className="mb-3" controlId="firstName">
              <Form.Label>First Name:</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => handleFirstName(e.target.value)}
                value={firstName}
                placeholder="First Name"
                required
                isInvalid={!!firstNameError}
                isValid={firstNameValid}
              />
              <Form.Control.Feedback type="invalid">
                {firstNameError}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="lastName">
              <Form.Label>Last Name:</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => handleLastName(e.target.value)}
                value={lastName}
                placeholder="Last Name"
                required
                isInvalid={!!lastNameError}
                isValid={lastNameValid}
              />
              <Form.Control.Feedback type="invalid">
                {lastNameError}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email address:</Form.Label>
              <Form.Control
                type="email"
                onChange={(e) => handleEmail(e.target.value)}
                value={email}
                placeholder="example@email.com"
                required
                isInvalid={!!emailError}
                isValid={emailValid}
              />
              <Form.Control.Feedback type="invalid">
                {emailError}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                onChange={(e) => {
                  handlePassword(e.target.value);
                }}
                value={password}
                placeholder="Password"
                required
                isInvalid={!!passwordError}
                isValid={strongPassword}
              />
              <Form.Control.Feedback type="invalid">
                {passwordError}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="confirmPassword">
              <Form.Label>Confirm Password:</Form.Label>
              <Form.Control
                type="password"
                onChange={(e) => {
                  handleConfirmPassword(e.target.value);
                }}
                value={confirmPassword}
                placeholder="Password"
                required
                isInvalid={!!confirmError}
                isValid={passwordsMatch}
              />
              <Form.Control.Feedback type="invalid">
                {confirmError}
              </Form.Control.Feedback>
            </Form.Group>

            <Button
              className="mb-3"
              variant="primary"
              type="submit"
              disabled={!!isLoading}
            >
              Sign Up
            </Button>
            {!!isLoading && <Spinner />}

            {errorMessage && show && (
              <Alert
                variant="danger"
                onClose={() => setShow(false)}
                dismissible
              >
                {errorMessage}
              </Alert>
            )}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
