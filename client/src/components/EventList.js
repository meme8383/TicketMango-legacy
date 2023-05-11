import { useEffect } from 'react'
import { useEventsContext } from '../hooks/useEventsContext'
import { useAuthContext } from '../hooks/useAuthContext'

// components
import EventDetails from './EventDetails'
import { Container } from 'react-bootstrap'

const EventList = () => {
  const { events, dispatch } = useEventsContext()
  const { user } = useAuthContext()

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch('/api/events', {
        headers: { 'Authorization': `Bearer ${user.token}` },
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({ type: 'SET_EVENTS', payload: json })
      }
    }

    if (user) {
      fetchEvents()
    }
  }, [dispatch, user])

  return (
    <div className="events">
      <Container>
      <h3>My events</h3>
      {events && events.map((event) => (
        <EventDetails key={event._id} event={event} />
      ))}
      {events &&
        <p>It's quiet here. <a href="/events/new">Create a new event?</a></p>}
      </Container>
    </div>
  )
}

export default EventList