import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import $ from "jquery/src/jquery";
import { signOut } from "../../store/actions/authActions";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import * as ROUTES from "../../constants/routes";
import Nav from './nav';

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
      <li className="nav-item" onClick={props.closeMenu}>
        <NavLink className="nav-link" to={ROUTES.NOTIFICATIONS}>
          <i className="fas fa-bell-slash" /> Notifications
        </NavLink>
      </li>
    </ul>
  );
};

const mapStateToProps = state => {
  const auth = state.firebase.auth;
  const users = state.firestore.data.users;
  const user = users ? users[auth.uid] : null;
  return {
    user: user,
    auth: auth
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
  ),
  firestoreConnect([
    {
      collection: "users"
    }
  ])
)(SignedInLinks);
