import { useState } from 'react';
import { useEventsContext } from './useEventsContext';
import { useAuthContext } from './useAuthContext';

export const useEvent = () => {
  const { dispatch } = useEventsContext();
  const { user } = useAuthContext();

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [eventID, setEventID] = useState(null);

  const create = async (
    title,
    date,
    location,
    description,
    maxParticipants,
  ) => {
    setIsLoading(true);
    setError(null);

    const event = { title, date, location, description, maxParticipants };

    const response = await fetch('/api/events', {
      method: 'POST',
      body: JSON.stringify(event),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setError(null);
      setEventID(json._id);
      dispatch({ type: 'CREATE_EVENT', payload: json });
    }

    setIsLoading(false);
  };

  return { create, isLoading, error, eventID };
};
