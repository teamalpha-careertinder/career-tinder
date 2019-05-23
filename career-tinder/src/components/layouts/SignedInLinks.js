import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../../store/actions/authActions";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

const SignedInLinks = props => {
  const { user } = props;
  console.log(props);
  return (
    <ul className="navbar-nav ct-nav-collapsible">
      <li className="nav-item">
        {user && user.userType === "jobseeker" ? (
          <NavLink className="nav-link" to="/profile/create">
            <i className="fas fa-user" /> Profile
          </NavLink>
        ) : (
          <NavLink className="nav-link" to="/profile/create-employer">
            <i className="fas fa-user" /> Profile
          </NavLink>
        )}
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/feed">
          <i className="fas fa-rss" /> Feed
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
