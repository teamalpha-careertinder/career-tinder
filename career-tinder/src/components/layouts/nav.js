import React from 'react';
import {  NavLink } from "react-router-dom";
import logo from '../../assets/images/logo.png';

class Nav extends React.Component {
    state = {
        isOpen: false
    };
      
    toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }

    render() {
      return (
        <div className="navbar-wrapper">
            <nav className="navbar fixed-top navbar-expand-lg navbar-dark">
                <a className="navbar-brand" href="#!"><img src={logo} alt={"logo"} /></a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav float-left">
                        <li className="nav-item">
                            <NavLink exact className="nav-link" to="/"><i className="fas fa-user-plus"></i> Register</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/login"><i className="fas fa-sign-in-alt"></i> Login</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/profile/create"><i className="fas fa-plus"></i> Create Profile</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
        
      );
    }
  }
  
  export default Nav;