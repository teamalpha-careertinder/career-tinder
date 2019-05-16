import React from "react";

const SignedOutLinks = () => {
  return (
    <div className="collapse navbar-collapse" id="navbarNavDropdown">
      <ul className="navbar-nav float-left">
        <li className="nav-item">
          <a className="nav-link" href="/">
            <i class="fas fa-user-plus" /> Register
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/profile/create">
            <i className="fas fa-plus" /> Create Profile
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/login">
            <i className="fas fa-sign-in-alt" /> Login
          </a>
        </li>
      </ul>
    </div>
  );
};

export default SignedOutLinks;
