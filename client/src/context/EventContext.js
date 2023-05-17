import React from 'react';
import { createContext, useReducer } from 'react';

export const EventsContext = createContext();

export const eventsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_EVENTS':
      return {
        events: action.payload,
      };
    case 'CREATE_EVENT':
      return {
        events: [action.payload, ...state.events],
      };
    case 'DELETE_EVENT':
      return {
        events: state.events.filter((w) => w._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const EventsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(eventsReducer, {
    events: [],
  });

  return (
    <EventsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </EventsContext.Provider>
  );
};
