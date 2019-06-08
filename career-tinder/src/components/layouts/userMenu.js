import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../../store/actions/authActions";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import * as ROUTES from "../../constants/routes";
import './layouts.css';

const UserMenu = props => {
  return (
    <div className="btn-group">
        <span className="fas fa-user-cog dropdown-toggle user-settings" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></span>
        <div className="dropdown-menu dropdown-menu-right user-settings-dropdown">
            <NavLink className="dropdown-item" to={ROUTES.UPDATE_PROFILE} onClick={props.closeMenu}>
                <i className="fas fa-user" /> Profile
            </NavLink>
            <NavLink className="dropdown-item" to={ROUTES.CHANGE_PASSWORD} onClick={props.closeMenu}>
                <i className="fas fa-unlock-alt" /> Change Password
            </NavLink>
            <NavLink className="dropdown-item sign-out-link" to="#" onClick={props.closeMenu}>
                {" "}
                <i className="fas fa-sign-out-alt" /> Sign Out
            </NavLink>
        </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(signOut())
  };
};

export default compose(
  connect(
    null,
    mapDispatchToProps
  )
)(UserMenu);
