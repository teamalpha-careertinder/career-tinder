import React, { Component } from 'react';
import ReactDOM from "react-dom";
import logo from '../../assets/images/logo.png';

import CoreLayout from '../layouts';
import HomeLayout from '../layouts/home';
import CreateProfileLayout from '../profile/create';
import LoginLayout from '../authentication/login';

const Home = (props) => (
    <div className="container-fluid">
        <CoreLayout />
        <HomeLayout />
    </div>
);

const CreateProfile = (props) => (
    <div className="container-fluid">
      <CoreLayout />
      <div className="container">
        <CreateProfileLayout />
      </div>
    </div>
);

const Login = (props) => (
    <div className="container-fluid">
      <CoreLayout />
      <LoginLayout />
    </div>
);

class Nav extends React.Component {
    Home() {
        ReactDOM.render(<Home />, document.getElementById('root'));
    }

    CreateProfile() {
        ReactDOM.render(<CreateProfile />, document.getElementById('root'));
    }

    Login() {
        ReactDOM.render(<Login />, document.getElementById('root'));
    }
    render() {
      return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#"><img src={logo} alt={"logo"} /></a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                    <li className="nav-item active" onClick={this.Home}>
                        <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item" onClick={this.CreateProfile}>
                        <a className="nav-link" href="#">Create Profile</a>
                    </li>
                    <li className="nav-item" onClick={this.Login}>
                        <a className="nav-link" href="#">Login</a>
                    </li>
                </ul>
            </div>
        </nav>
      );
    }
  }
  
  export default Nav;