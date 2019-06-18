import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../../store/actions/authActions";
import { compose } from "redux";
import * as ROUTES from "../../constants/routes";

// const closeCollapsibleMenu = () => {
//   $('.hamburger-button__button').click();
// }

const SignedInLinks = props => {
  return (
    <ul className="navbar-nav ct-nav-collapsible">
      <li className="nav-item" onClick={props.closeMenu}>
        <NavLink className="nav-link" to={ROUTES.FEED}>
          <i className="fas fa-rss" /> Feed
        </NavLink>
      </li>
      <li className="nav-item" onClick={props.closeMenu}>
        <NavLink className="nav-link" to={ROUTES.JOBS}>
          <i className="fas fa-user-md" /> Jobs
        </NavLink>
      </li>
      {props.profile === "jobseeker" ? (
        <li className="nav-item" onClick={props.closeMenu}>
          <NavLink className="nav-link" to={ROUTES.JOB_SEEKER_MATCHES}>
            <i className="fas fa-handshake" /> Matches
          </NavLink>
        </li>
      ) : (
        ""
      )}
      <li className="nav-item" onClick={props.closeMenu}>
        <NavLink className="nav-link" to={ROUTES.NOTIFICATIONS}>
          <i className="fas fa-bell-slash" /> Notifications
        </NavLink>
      </li>
    </ul>
  );
};

const mapStateToProps = state => {
  return {
    user: state.firebase.profile,
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(signOut())
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(SignedInLinks);
