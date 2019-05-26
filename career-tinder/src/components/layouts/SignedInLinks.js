import React from "react";
import * as ROUTES from '../../constants/routes';
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../../store/actions/authActions";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

const SignedInLinks = props => {
  return (
    <ul className="navbar-nav ct-nav-collapsible">
      <li className="nav-item">
          <NavLink className="nav-link" to={ROUTES.UPDATE_PROFILE}>
            <i className="fas fa-user" /> Profile
          </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to={ROUTES.FEED}>
          <i className="fas fa-rss" /> Feed
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to={ROUTES.CHANGE_PASSWORD}>
          <i className="fas fa-unlock-alt" /> Change Password
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
