import { useEffect } from 'react'
import { useEventsContext } from '../hooks/useEventsContext'
import { useAuthContext } from '../hooks/useAuthContext'

// components
import EventDetails from '../components/EventDetails'
import EventForm from '../components/EventForm'

const Home = () => {
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
    <div className="home">
      <div className="events">
        {events && events.map((event) => (
          <EventDetails key={event._id} event={event} />
        ))}
      </div>
      <EventForm />
    </div>
  )
}

export default Home