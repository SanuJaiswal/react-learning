import { useRouteError } from "react-router-dom";
import logo from "../utils/logo.jpg";

const Error = () => {
  const err = useRouteError();
  return (
    <div className="err-container">
      <img
        className="logo"
        title="Hungry Hunters"
        src={logo}
        alt="Hungry Hunters"
      />
      <div className="err-details">
        <h4>
          {err.status}.<span>That's an error.</span>
        </h4>
        <p className="error-message">
          {"The requested URL " +
            err.error?.message?.split(/"/)[1] +
            " was not found on this server. Please recheck."}
        </p>
      </div>
    </div>
  );
};

export default Error;
