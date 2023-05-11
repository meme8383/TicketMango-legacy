import { useState } from "react"
import { useEventsContext } from "../hooks/useEventsContext"
import { useAuthContext } from '../hooks/useAuthContext'

const EventForm = () => {
  const { dispatch } = useEventsContext()
  const { user } = useAuthContext()

  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')
  const [maxParticipants, setMaxParticipants] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      setError('You must be logged in')
      return
    }

    const event = {title, date, location, description, maxParticipants}

    const response = await fetch('/api/events', {
      method: 'POST',
      body: JSON.stringify(event),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setTitle('')
      setDate('')
      setLocation('')
      setDescription('')
      setMaxParticipants('')
      setError(null)
      setEmptyFields([])
      dispatch({type: 'CREATE_EVENT', payload: json})
    }
  }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>New Event</h3>

      <label>Event Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes('title') ? 'error' : ''}
      />

      <label>Date:</label>
      <input
        type="date"
        onChange={(e) => setDate(e.target.value)}
        value={date}
        className={emptyFields.includes('date') ? 'error' : ''}
      />

      <label>Description:</label>
      <input
        type="text"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        className={emptyFields.includes('description') ? 'error' : ''}
      />

      <label>Location:</label>
      <input
        type="text"
        onChange={(e) => setLocation(e.target.value)}
        value={location}
        className={emptyFields.includes('location') ? 'error' : ''}
      />

      <label>Max Participants:</label>
      <input
        type="number"
        onChange={(e) => setMaxParticipants(e.target.value)}
        value={maxParticipants}
        className={emptyFields.includes('maxParticipants') ? 'error' : ''}
      />

      <button>Add Event</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default EventForm