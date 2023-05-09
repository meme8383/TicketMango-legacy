import { useEventsContext } from '../hooks/useEventsContext'
import { useAuthContext } from '../hooks/useAuthContext'

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const EventDetails = ({ event }) => {
  const { dispatch } = useEventsContext()
  const { user } = useAuthContext()

  const handleClick = async () => {
    if (!user) {
      return
    }

    const response = await fetch('/api/events/' + event._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_EVENT', payload: json})
    }
  }

  return (
    <div className="event-details">
      <h4>{event.title}</h4>
      <p><strong>Desc: </strong>{event.description}</p>
      <p><strong>Date: </strong>{event.date}</p>
      <p><strong>Location: </strong>{event.location}</p>
      <p><strong>Max Participants: </strong>{event.maxParticipants}</p>
      <p>{formatDistanceToNow(new Date(event.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  )
}

export default EventDetails