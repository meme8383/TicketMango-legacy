import { EventsContext } from '../context/EventContext';
import { useContext } from 'react';

export const useEventsContext = () => {
  const context = useContext(EventsContext);

  if (!context) {
    throw Error(
      'useEventsContext must be used inside an EventsContextProvider',
    );
  }

  return context;
};
