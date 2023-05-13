import { useEffect, useState } from 'react'
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from 'react-bootstrap'
import { useEvent } from '../hooks/useEvent'
import { Navigate } from 'react-router-dom'

const EventForm = () => {
  const { create, isLoading, error, eventID } = useEvent()

  const [title, setTitle] = useState('')
  const [titleError, setTitleError] = useState('')

  const [date, setDate] = useState('')
  const [dateError, setDateError] = useState('')

  const [location, setLocation] = useState('')
  const [locationError, setLocationError] = useState('')

  const [description, setDescription] = useState('')
  const [descriptionError, setDescriptionError] = useState('')

  const [maxParticipants, setMaxParticipants] = useState('')
  const [maxParticipantsError, setMaxParticipantsError] = useState('')

  const [show, setShow] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    setTitleError('')
    setDateError('')
    setLocationError('')
    setDescriptionError('')
    setMaxParticipantsError('')

    if (!title || !date) {
      setErrorMessage('Please fill out all required fields.')
      setShow(true)
      if (!title) {
        setTitleError('Please enter a title')
      }
      if (!date) {
        setDateError('Please enter a date')
      }
      setShow(true)
      return
    }

    await create(title, date, location, description, maxParticipants)
    setShow(true)
  }

  useEffect(() => {
    switch (error) {
      case null:
      case '':
        setErrorMessage('')
        break;
      default:
        setErrorMessage('Something went wrong. Please try again.')
    }
  }, [error])

  return (
    <Container>
      {eventID ? <Navigate to={`/events/${eventID}`} /> :
      <Row className="justify-content-md-center">
        <Col md={{ span: 5 }}>
          <Form onSubmit={handleSubmit} noValidate>
            <h3>New Event</h3>
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Event Title:</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                required
                isInvalid={!!titleError}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="date">
              <Form.Label>Date:</Form.Label>
              <Form.Control
                required
                type="date"
                onChange={(e) => setDate(e.target.value)}
                value={date}
                isInvalid={!!dateError}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Description:</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                isInvalid={!!descriptionError}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="location">
              <Form.Label>Location:</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setLocation(e.target.value)}
                value={location}
                isInvalid={!!locationError}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="maxParticipants">
              <Form.Label>Max Participants:</Form.Label>
              <Form.Control
                type="number"
                onChange={(e) => setMaxParticipants(e.target.value)}
                value={maxParticipants}
                isInvalid={!!maxParticipantsError}
              />
            </Form.Group>

            <Button className="mb-3" variant="primary" type="submit"
                    disabled={!!isLoading}>
              Add Event
            </Button>
            {!!isLoading && <Spinner />}
            {(errorMessage && show) &&
              <Alert variant="danger" onClose={() => setShow(false)}
                     dismissible>
                <p>{errorMessage}</p>
              </Alert>}
          </Form>
        </Col>
      </Row>}
    </Container>
  )
}

export default EventForm