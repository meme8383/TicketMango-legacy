import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { dispatch } = useAuthContext();

  const signup = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  ) => {
    setIsLoading(true);
    setError('');

    // Make signup request to API
    const response = await fetch('/api/user/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, firstName, lastName }),
    });
    const json = await response.json();

    // Handle errors
    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      // Login as user
      // Save the user to local storage
      localStorage.setItem('user', JSON.stringify(json));

      // Update the auth context
      dispatch({ type: 'LOGIN', payload: json });

      setIsLoading(false);
    }
  };

  return { signup, isLoading, error };
};
