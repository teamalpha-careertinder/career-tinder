import React, { Component } from 'react';
import { Router, browserHistory, Route } from 'react-router';
import './app.css';
import CoreLayout from '../layouts';
import LoginLayout from '../authentication/login';
import RegistrationLayout from '../authentication/registration';
import CreateProfileLayout from '../profile/create';

const Home = (props) => (
  <div className="container-fluid">
    <CoreLayout />
  </div>  
);

const Login = (props) => (
  <div className="container-fluid">
    <CoreLayout />
    <div className="container">
      <LoginLayout />
    </div>
  </div>  
);

const Registration = (props) => (
  <div className="container-fluid">
    <CoreLayout />
    <div className="container">
      <RegistrationLayout />
    </div>
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

class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={Home}/>
        <Route path="/login" component={Login}/>
        <Route path="/registration" component={Registration}/>
        <Route path="/profile/create" component={CreateProfile}/>
      </Router>
    );
  }
}

export default App;

