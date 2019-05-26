import React from "react";
import { NavLink } from "react-router-dom";
import * as ROUTES from '../../constants/routes';

const SignedOutLinks = () => {
  return (
    <ul className="navbar-nav ct-nav-collapsible">
      <li className="nav-item">
        <NavLink exact className="nav-link" to={ROUTES.LANDING}>
          <i className="fas fa-user-plus" /> Register
        </NavLink>
      </li>
    </ul>
  );
};

export default SignedOutLinks;
