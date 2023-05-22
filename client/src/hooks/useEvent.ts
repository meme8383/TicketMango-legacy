import { useState } from 'react';
import { useEventsContext } from './useEventsContext';
import { useAuthContext } from './useAuthContext';

export const useEvent = () => {
  const { dispatch } = useEventsContext();
  const { user } = useAuthContext();

  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [eventID, setEventID] = useState<number>();

  const create = async (
    title: string,
    date: Date,
    location: string,
    description: string,
    maxParticipants: number,
  ) => {
    setIsLoading(true);
    setError('');

    if (!user) {
      setError('You must be logged in to create an event.');
      return;
    }

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
      setError('');
      setEventID(json._id);
      dispatch({ type: 'CREATE_EVENT', payload: json });
    }

    setIsLoading(false);
  };

  return { create, isLoading, error, eventID };
};
