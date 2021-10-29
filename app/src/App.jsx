import React from "react";
import { useAuth } from "./AppProviders";
import { useAuthContext } from "./contexts/authContext";
import AuthenticatedApp from "./components/AuthenticatedApp";
import UnauthenticatedApp from "./components/UnauthenticatedApp";
import "./App.css";

const App = () => {
  const { userAuthStatus } = useAuthContext();
  console.log(userAuthStatus);
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <AuthenticatedApp /> : <UnauthenticatedApp />;
};

export default App;

// import React from "react";
// import { useAuth } from "./AppProviders";
// import { useAuthContext } from "./contexts/authContext";
// import AuthenticatedApp from "./components/AuthenticatedApp";
// import UnauthenticatedApp from "./components/UnauthenticatedApp";
// import "./App.css";

// const App = () => {
//   const { userAuthStatus, loginHandler } = useAuthContext();
//   console.log(userAuthStatus, loginHandler);
//   const { isAuthenticated } = useAuth();
//   return <button onClick={loginHandler}>LOGIN ME</button>;
// };

// export default App;
// {
//   {
//   }
// }
