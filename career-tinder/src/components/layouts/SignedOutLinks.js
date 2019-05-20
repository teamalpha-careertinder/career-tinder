import React from "react";
import { NavLink } from "react-router-dom";

const SignedOutLinks = () => {
  return (
    <ul className="navbar-nav">
      <li className="nav-item">
        <NavLink exact className="nav-link" to="/">
          <i className="fas fa-user-plus" /> Register
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/login">
          <i className="fas fa-sign-in-alt" /> Login
        </NavLink>
      </li>
    </ul>
  );
};

export default SignedOutLinks;
