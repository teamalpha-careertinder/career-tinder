import React from "react";
import { MDBCollapse, MDBHamburgerToggler } from 'mdbreact';
import logo from "../../assets/images/logo.png";
import * as ROUTES from '../../constants/routes';
import { connect } from "react-redux";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import { Link } from "react-router-dom";
import { signOut } from "../../store/actions/authActions";

class Nav extends React.Component {
  state = {
    collapse1: false,
    collapseID: ''
  }
  
  toggleCollapse = collapseID => () => {
    this.setState(prevState => ({ collapseID: (prevState.collapseID !== collapseID ? collapseID : '') }));
  }
  
  toggleSingleCollapse = collapseId => {
    this.setState({
      ...this.state,
      [collapseId]: !this.state[collapseId]
    });
  }
  
  render() {
    const { auth, profile } = this.props;
    // console.log(auth);
    const links = auth.uid ? (
      <SignedInLinks profile={profile} />
    ) : (
      <SignedOutLinks />
    );
    return (
      <div className="navbar-wrapper">
        <nav id="ct_navbar" className="navbar fixed-top navbar-expand-md navbar-dark">
          <Link to={ROUTES.FEED} className="navbar-brand d-none d-md-block">
            <img src={logo} alt={"logo"} />
          </Link>
          <MDBCollapse isOpen={this.state.collapse1} navbar className="w-100 order-4 order-md-0 collapsenav">
            {links}
          </MDBCollapse> 
          <div className="w-100 d-flex flex-nowrap">
            <div className="w-100 d-md-none">
              <MDBHamburgerToggler color="#d3531a" className="d-block d-md-none" id="hamburger1" onClick={()=> this.toggleSingleCollapse('collapse1')} />
              <Link to={ROUTES.FEED} className="navbar-brand">
                <img src={logo} alt={"logo"} />
              </Link>
            </div>
            <div className="d-flex w-100 justify-content-end order-3">
              <ul className="navbar-nav mr-2">
                <li className="nav-item">
                {!auth.uid ?  
                  <Link className="nav-link" to={ROUTES.LOG_IN}>
                    <i className="fas fa-sign-in-alt" />
                  </Link>
                  :
                  <Link className="nav-link" to="#" onClick={this.props.signOut}>
                    {" "}
                    <i className="fas fa-sign-out-alt" />
                  </Link>
                }
                </li>
              </ul>              
            </div>
          </div>
        </nav>
      </div>
    );
  };
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
