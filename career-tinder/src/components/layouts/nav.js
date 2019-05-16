import React from 'react';
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
                        <li className="nav-item" onClick={this.Home}>
                            <a className="nav-link" href="#!"><i className="fas fa-user-plus"></i> Register</a>
                        </li>
                        <li className="nav-item" onClick={this.CreateProfile}>
                            <a className="nav-link" href="#!"><i className="fas fa-plus"></i> Create Profile</a>
                        </li>
                        <li className="nav-item" onClick={this.Login}>
                            <a className="nav-link" href="#!"><i className="fas fa-sign-in-alt"></i> Login</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
        
      );
    }
  }
  
  export default Nav;