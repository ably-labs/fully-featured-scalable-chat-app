import React, { createContext, useContext, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

//create auth context with the context object structure
export const authContext = createContext({
  userAuthStatus: {
    isAuthenticated: false,
    username: ""
  },
  updateUserAuthStatus: () => {},
  logoutHandler: () => {}
});

const initialUserAuthStatus = {
  name: "LA LA LA",
  isLoggedIn: false
};

const logoutHandler = () => {
  console.log("logout handler");
};

//provide auth context with initial values
export const AuthContextProvider = ({ children }) => {
  const [userAuthStatus, setUserAuthStatus] = useState(initialUserAuthStatus);
  const updateUserAuthStatus = (somedata) => {
    console.log("updateuser auth handler");
    console.log(somedata);
    setUserAuthStatus({
      name: "LA LA LA",
      isLoggedIn: false
    });
  };
  return <authContext.Provider value={{ userAuthStatus, updateUserAuthStatus, logoutHandler }}>{children}</authContext.Provider>;
};

//consume auth context with latest values
export const useAuthContext = () => {
  const { userAuthStatus, updateUserAuthStatus, logoutHandler } = useContext(authContext);

  return { userAuthStatus, updateUserAuthStatus, logoutHandler };
};
