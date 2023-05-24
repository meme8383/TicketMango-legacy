import React, { createContext, useReducer } from 'react';
import Event from '../types/Event';

interface State {
  events: Event[];
}

interface Action {
  type: string;
  payload?: Event | Event[];
}

interface EventContextValue extends State {
  dispatch: React.Dispatch<Action>;
}

// Initialize context as undefined before dispatch creation
export const EventsContext = createContext<EventContextValue | undefined>(
  undefined,
);

// Reducer function for event list actions
export const eventsReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_EVENTS':
      return {
        events: action.payload as Event[],
      };
    case 'CREATE_EVENT':
      return {
        events: [action.payload as Event, ...state.events],
      };
    case 'DELETE_EVENT':
      return {
        events: state.events.filter(
          (w) => w._id !== (action.payload as Event)._id,
        ),
      };
    default:
      return state;
  }
};

// Create provider and dispatch function
export function EventsContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(eventsReducer, {
    events: [] as Event[],
  }); // Initial state

  return (
    <EventsContext.Provider value={{ ...state, dispatch } as EventContextValue}>
      {children}
    </EventsContext.Provider>
  );
}
