import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";

const isActive = (history, path) => {
  if (history.location.pathname === path) return { color: "#000" };
  else return { color: "#fff" };
};

const menu = ({ history }) => {
  return (
    <div>
      <ul className="nav nav-tabs bg-primary">
        <li className="nav-item active">
          <Link className="nav-link" to="/" style={isActive(history, "/")}>
            Home
          </Link>
        </li>
        {!isAuthenticated() &&
          <Fragment>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/signup"
                style={isActive(history, "/signup")}
              >
                SignUp
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/signin"
                style={isActive(history, "/signin")}
              >
                SignIn
              </Link>
            </li>
          </Fragment>}
        {isAuthenticated() &&
          <Fragment>
            <li className="nav-item">
              <span
                className="nav-link"
                style={{ cursor: "pointer", color: "#fff" }}
                onClick={() => signout(() => history.push("/signin"))}
              >
                Signout
              </span>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to={`/profile/${isAuthenticated().user._id}`}
              >
                {`${isAuthenticated().user.name}'s Profile`}
              </Link>
            </li>
          </Fragment>}
      </ul>
    </div>
  );
};
export default withRouter(menu);
