import React from 'react'
import { Container } from 'react-bootstrap'
import EventForm from '../components/EventForm'

const NewEvent = () => {
  return (
    <div className="newEvent">
      <Container>
        <EventForm />
      </Container>
</div>
)

}

export default NewEvent