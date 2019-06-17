import React from "react";
import { MDBCollapse, MDBHamburgerToggler } from "mdbreact";
import $ from "jquery/src/jquery";
import logo from "../../assets/images/logo.png";
import * as ROUTES from "../../constants/routes";
import { connect } from "react-redux";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import { Link } from "react-router-dom";
import { signOut } from "../../store/actions/authActions";
import UserMenu from "./userMenu";

class Nav extends React.Component {
  constructor(props) {
    super(props);
  };

  state = {
    collapse1: false,
    collapseID: ""
  };

  toggleCollapse = collapseID => () => {
    this.setState(prevState => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : ""
    }));
  };

  toggleSingleCollapse = collapseId => {
    this.setState({
      ...this.state,
      [collapseId]: !this.state[collapseId]
    });
  };

  closeCollapsibleMenu = (e) => {
    if(!e.target.classList.contains('dropdown-item') || $('.collapsenav').hasClass('show')) {
      $('.hamburger-button__button').click();
    }    
    if(e.target.classList.contains('sign-out-link')) {
      this.props.signOut();
    }
  }

  render() {
    const { auth, profile } = this.props;
    const links =
      auth.uid && auth.emailVerified ? (
        <SignedInLinks profile={profile} closeMenu={this.closeCollapsibleMenu} />
      ) : (
        <SignedOutLinks closeMenu={this.closeCollapsibleMenu} />
      );
    return (
      <div className="navbar-wrapper">
        <nav
          id="ct_navbar"
          className="navbar fixed-top navbar-expand-md navbar-dark"
        >
          {auth.uid && auth.emailVerified ? (
            <Link to={ROUTES.FEED} className="navbar-brand d-none d-md-block">
              <img src={logo} alt={"logo"} />
            </Link>
          ) : (
            <Link
              to={ROUTES.LANDING}
              className="navbar-brand d-none d-md-block"
            >
              <img src={logo} alt={"logo"} />
            </Link>
          )}
          <MDBCollapse
            isOpen={this.state.collapse1}
            navbar
            className="w-100 order-4 order-md-0 collapsenav"
          >
            {links}
          </MDBCollapse>
          <div className="w-100 d-flex flex-nowrap">
            <div className="w-100 d-md-none">
              <MDBHamburgerToggler
                color="#d3531a"
                className="d-block d-md-none"
                id="hamburger1"
                onClick={() => this.toggleSingleCollapse("collapse1")}
              />
              <Link to={ROUTES.FEED} className="navbar-brand">
                <img src={logo} alt={"logo"} />
              </Link>
            </div>
            <div className="d-flex w-100 justify-content-end order-3">
              <ul className="navbar-nav mr-2">
                <li className="nav-item">
                  {auth.uid && auth.emailVerified ? (
                    <UserMenu closeMenu={this.closeCollapsibleMenu} />
                  ) : (
                    <Link className="nav-link" to={ROUTES.LOG_IN} onClick={this.closeCollapsibleMenu}>
                      <i className="fas fa-sign-in-alt" />
                    </Link>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(signOut())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Nav);