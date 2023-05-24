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

    // Handle errors
    setIsLoading(false);
    if (response.ok) {
      const json = await response.json();

      // Login as user
      // Save the user to local storage
      localStorage.setItem('user', JSON.stringify(json));

      // Update the auth context
      dispatch({ type: 'LOGIN', payload: json });
    } else {
      try {
        const json = await response.json();
        setError(json.message);
      } catch (e) {
        setError('Something went wrong');
      }
    }
  };

  return { signup, isLoading, error };
};
