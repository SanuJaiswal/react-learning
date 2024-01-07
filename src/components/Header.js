import { useState } from "react";
import logo from "../utils/logo.jpg";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

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

  const onlineStatus = useOnlineStatus();
  return (
    <div className="flex justify-between">
      <div className="pl-10 pt-4">
        <Link to="/">
          <img
            className="w-20 cursor-pointer"
            title="Hungry Hunters"
            src={logo}
            alt="Hungry Hunters"
          />
        </Link>
      </div>
      <div className="nav-container">
        <ul className="flex">
          <li className="pr-20 pt-8 cursor-pointer">
            Online Status: {onlineStatus ? "🟢" : "🔴"}
          </li>
          <li className="pr-20 pt-8 cursor-pointer hover:text-eca854">
            <Link to="/home">Home</Link>
          </li>
          <li className="pr-20 pt-8 cursor-pointer hover:text-eca854">
            <Link to="/about">About</Link>
          </li>
          <li className="pr-20 pt-8 cursor-pointer hover:text-eca854">
            <Link to="/contact">Contact</Link>
          </li>
          <li className="pr-20 pt-8 cursor-pointer hover:text-eca854">Cart</li>
          <li
            className="pr-20 pt-8 cursor-pointer hover:text-eca854"
            onClick={handleLoginClick}
          >
            {logInText}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
