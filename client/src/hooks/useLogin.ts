import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

export const useLogin = () => {
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { dispatch } = useAuthContext();

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError('');

    // Make login request
    const response = await fetch('/api/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();

    // Handle errors
    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      // Save the user to local storage
      localStorage.setItem('user', JSON.stringify(json));

      // Update the auth context
      dispatch({ type: 'LOGIN', payload: json });

      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};
