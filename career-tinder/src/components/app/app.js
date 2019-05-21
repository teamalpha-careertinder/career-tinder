import React, { Component } from "react";
import { Route, HashRouter } from "react-router-dom";
import "./app.css";

import CoreLayout from "../layouts";
import Login from "../authentication/login";
import RegistrationEmployer from "../authentication/registrationEmployer";
import RegistrationJobSeeker from "../authentication/registrationJobSeeker";
import CreateProfile from "../profile/create";
import EditProfile from "../profile/edit";
import FeedBoard from "../feedboard/feedboard";
import GuestHome from "../layouts/home";
import ForgotPassword from "../authentication/forgotPassword";

class App extends Component {
  render() {
    return (
      <div id="dom-wrapper" ref="domwrapper">
        <HashRouter>
          <div className="container-fluid">
            <CoreLayout />
            <div className="content-wrapper">
              <Route exact path="/" component={GuestHome} />
              <Route path="/login" component={Login} />
              <Route path="/registration/jobseeker" component={RegistrationJobSeeker} />
              <Route path="/registration/employer" component={RegistrationEmployer} />
              <Route path="/profile/create" component={CreateProfile} />
              <Route path="/profile/edit" component={EditProfile} />
              <Route path="/feed" component={FeedBoard} />
              <Route path="/forgot-password" component={ForgotPassword} />
            </div>
          </div>
        </HashRouter>
      </div>
    );
  }
}

export default App;
