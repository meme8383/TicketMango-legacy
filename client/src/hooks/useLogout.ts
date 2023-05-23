import { useAuthContext } from './useAuthContext';
import { useEventsContext } from './useEventsContext';

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: dispatchEvents } = useEventsContext();

  const logout = () => {
    // Remove user from storage
    localStorage.removeItem('user');

    // Update user and event contexts
    dispatch({ type: 'LOGOUT' });
    dispatchEvents({ type: 'SET_EVENTS', payload: [] });
  };

  return { logout };
};
