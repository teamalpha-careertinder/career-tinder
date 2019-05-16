import React, { Component } from 'react';
import { Router, browserHistory, Route } from 'react-router';
import './app.css';

import CoreLayout from '../layouts';
import LoginLayout from '../authentication/login';
import RegistrationEmployerLayout from '../authentication/registrationEmployer';
import RegistrationJobSeekerLayout from '../authentication/registrationJobSeeker';
import CreateProfileLayout from '../profile/create';
import HomeLayout from '../layouts/home';

const Home = (props) => (
  <div className="container-fluid">
    <CoreLayout />
    <HomeLayout />
  </div>
);

const Login = (props) => (
  <div className="container-fluid">
    <CoreLayout />
    <LoginLayout />
  </div>
);

const RegistrationJobSeeker = (props) => (
  <div className="container-fluid">
    <CoreLayout />
    <RegistrationJobSeekerLayout />
  </div>
);

const RegistrationEmployer = (props) => (
  <div className="container-fluid">
    <CoreLayout />
    <RegistrationEmployerLayout />
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
      <div id="classicformpage">
        <Router history={browserHistory}>
          <Route path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/registration/jobseeker" component={RegistrationJobSeeker} />
          <Route path="/registration/employer" component={RegistrationEmployer} />
          <Route path="/profile/create" component={CreateProfile} />
        </Router>
      </div>
    );
  }
}

export default App;

