import * as React from 'react'
import { BrowserRouter, Route, Switch } from "react-router-dom";

const AuthContext = React.createContext();

function AppProviders({children}) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  )
}

function AuthProvider(props) {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  const auth = { 
    isAuthenticated: isAuthenticated
  };

  const onLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const register = () => {} // register the user
  const logout = () => {} // clear the token in localStorage and the user data

  const ambientProperties = { auth, onLoginSuccess, logout, register };

  return (
    <AuthContext.Provider value={ambientProperties} {...props} />
  )
}

export const useAuth = () => React.useContext(AuthContext);
export default AppProviders