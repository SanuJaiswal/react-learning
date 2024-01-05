import { useState } from "react";
import logo from "../utils/logo.jpg";
import { Link } from "react-router-dom";

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
        <Link to="/">
          <img
            className="logo"
            title="Hungry Hunters"
            src={logo}
            alt="Hungry Hunters"
          />
        </Link>
      </div>
      <div className="nav-container">
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
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
