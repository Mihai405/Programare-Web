import React, { useContext } from 'react';
import { useLocalStorage } from '../shared/useLocalStorage';

const AuthContext = React.createContext();

export function AuthContextProvider({ children }) {
  const [contextValue, setContextValue , onLogout]=useLocalStorage('authContext',{
    token:null,
    user:null,
  })

  function onLogin(token,user){

    const newValue={
      token,
      user,
    };

    setContextValue(newValue);
  }

  const value = { ...contextValue, onLogin , onLogout};

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(
      'Please use the Auth Context inside the AuthContextProvider!'
    );
  }
  return context;
}