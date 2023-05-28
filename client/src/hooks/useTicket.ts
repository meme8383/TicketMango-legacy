import { useState } from 'react';

export const useTicket = () => {
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [ticketID, setTicketID] = useState<string>();

  const create = async (id: string, info: JSON) => {
    setIsLoading(true);
    setError('');

    // Make login request
    const response = await fetch(`/api/events/${id}/tickets/new`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ info }),
    });

    // Handle errors
    setIsLoading(false);
    if (response.ok) {
      const json = await response.json();
      setTicketID(json._id);
    } else {
      try {
        const json = await response.json();
        setError(json.error);
      } catch (e) {
        setError('Something went wrong');
      }
    }
  };

  return { create, isLoading, error, ticketID };
};
