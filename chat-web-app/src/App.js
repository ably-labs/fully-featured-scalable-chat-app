import Button from "./components/Button";
import headerImage from "./logo.png";
import "./App.css";

const App = () => {
  const loginUser = () => {
    console.log("login clicked");
  };
  const signUpUser = () => {
    console.log("sign up clicked");
  };

  return (
    <div className="container">
      <header className="header">
        <img src={headerImage} className="header-image" alt="logo" />
      </header>
      <div className="auth-btns">
        <Button text={"Create an account"} onClick={signUpUser} />
        <div className="separator">or</div>
        <Button text={"Sign in"} onClick={loginUser} />
      </div>
    </div>
  );
};

export default App;
