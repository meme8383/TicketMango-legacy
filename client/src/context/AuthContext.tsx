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

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined,
);

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

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    loading: true,
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (user) {
      dispatch({ type: 'LOGIN', payload: user });
    } else {
      dispatch({ type: 'CONTINUE' });
    }
  }, []);

  console.log('AuthContext state:', state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch } as AuthContextValue}>
      {children}
    </AuthContext.Provider>
  );
}
