import { useState } from "react";
import logo from "../utils/logo.jpg";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [logInText, setLogInText] = useState("Log In");

  const handleLoginClick = () => {
    if (isLoggedIn) {
      const confirmation = confirm(
        "You are being logged out. Will miss you 🥺"
      );
      if (confirmation) {
        setLogInText("Log In");
      }
    } else {
      setLogInText("Log Out");
    }
    setIsLoggedIn(!isLoggedIn);
  };
  return (
    <div className="header">
      <div className="logo-container">
        <img
          className="logo"
          title="Hungry Hunters"
          src={logo}
          alt="Hungry Hunters"
          onClick={() => window.location.reload()}
        />
      </div>
      <div className="nav-container">
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
          <li>Cart</li>
          <li className="login" onClick={handleLoginClick}>
            {logInText}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
