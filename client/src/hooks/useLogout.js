import { useAuthContext } from './useAuthContext';
import { useEventsContext } from './useEventsContext';

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: dispatchEvents } = useEventsContext();

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user');

    // dispatch logout action
    dispatch({ type: 'LOGOUT' });
    dispatchEvents({ type: 'SET_EVENTS', payload: null });
  };

  return { logout };
};
