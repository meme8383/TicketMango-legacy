import React, { createContext, useReducer, useEffect, ReactNode } from 'react';

interface User {
  email: string;
  token: string;
}

interface Action {
  type: string;
  payload?: User | null;
}

interface State {
  user: User | undefined | null;
  loading: boolean;
}

interface AuthContextValue extends State {
  dispatch: React.Dispatch<Action>;
}

// Initialize context as undefined before dispatch creation
export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined,
);

// Reducer handling user actions
export const authReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload, loading: false };
    case 'LOGOUT':
      return { user: null, loading: false };
    case 'CONTINUE':
      return { user: null, loading: false };
    default:
      return state;
  }
};

// Create provider and dispatch function
export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    loading: true,
  }); // Initial state

  useEffect(() => {
    // Get user from local storage
    const user = localStorage.getItem('user');

    if (user) {
      dispatch({ type: 'LOGIN', payload: JSON.parse(user) });
    } else {
      // Set loading to false if no user is found
      dispatch({ type: 'CONTINUE' });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch } as AuthContextValue}>
      {children}
    </AuthContext.Provider>
  );
}
