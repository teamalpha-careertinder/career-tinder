import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../../store/actions/authActions";

const SignedInLinks = (props) => {
  return (
    <ul className="navbar-nav ct-nav-collapsible">      
      <li className="nav-item">
        <NavLink className="nav-link" to="/profile/create">
          <i className="fas fa-user" /> Profile
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/feed">
          <i className="fas fa-rss"></i> Feed
        </NavLink>
      </li>
    </ul>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
}

export default connect(null, mapDispatchToProps)(SignedInLinks)
