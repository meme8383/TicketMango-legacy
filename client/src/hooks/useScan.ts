import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

export const useScan = () => {
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [scannedID, setScannedID] = useState<string>();
  const { user, dispatch } = useAuthContext();

  const scan = async (eventID: string, ticketID: string) => {
    if (!user) return; // Return if no user is logged in
    setError('');
    setIsLoading(true);

    // Check if ticket has been scanned
    const ticketResponse = await fetch(
      `/api/events/${eventID}/tickets/${ticketID}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      },
    );

    if (ticketResponse.ok) {
      const ticket = await ticketResponse.json();
      if (ticket.scannedAt) {
        setError('Ticket has already been scanned');
        setIsLoading(false);
        return;
      }

      // Scan ticket
      const response = await fetch(
        `/api/events/${eventID}/tickets/${ticketID}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({
            ...ticket,
            scannedAt: new Date().toISOString(),
          }),
        },
      );

      if (response.ok) {
        setIsLoading(false);
        setScannedID(ticketID);
      } else if (response.status === 401) {
        // Expired token, logged-out user will be redirected to login page
        dispatch({ type: 'LOGOUT' });
      } else {
        setError('An unknown error occurred. Please try again later.');
      }
    } else if (ticketResponse.status === 401) {
      // Expired token, logged-out user will be redirected to login page
      dispatch({ type: 'LOGOUT' });
      return;
    } else if (ticketResponse.status === 404) {
      setError('Ticket not found');
      setIsLoading(false);
      return;
    } else {
      setError('An unknown error occurred. Please try again later.');
      setIsLoading(false);
      return;
    }
  };

  return { scan, isLoading, error, scannedID };
};
