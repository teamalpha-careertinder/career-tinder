import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../../store/actions/authActions";

const SignedInLinks = (props) => {
  return (
    <ul className="navbar-nav float-left">
      
      <li className="nav-item">
        <NavLink className="nav-link" to="/profile/create">
          <i className="fas fa-edit" /> Edit Profile
        </NavLink>
      </li>
      <li className="nav-item">
        <a className="nav-link" onClick={props.signOut}>
          {" "}
          <i className="fas fa-sign-out-alt" />
          Log Out
        </a>
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
