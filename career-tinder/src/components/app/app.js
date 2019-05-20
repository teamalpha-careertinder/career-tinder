import React, { Component } from "react";
import { Route, HashRouter } from "react-router-dom";
import "./app.css";

import CoreLayout from "../layouts";
import Login from "../authentication/login";
import RegistrationEmployer from "../authentication/registrationEmployer";
import RegistrationJobSeeker from "../authentication/registrationJobSeeker";
import CreateProfile from "../profile/create";
import FeedBoard from "../feedboard/feedboard";
import GuestHome from "../layouts/home";

class App extends Component {
  render() {
    return (
      <div id="classicformpage">
        <HashRouter>
          <div className="container-fluid">
            <CoreLayout />
            <div className="content-wrapper">
              <Route exact path="/" component={GuestHome} />
              <Route path="/login" component={Login} />
              <Route
                path="/registration/jobseeker"
                component={RegistrationJobSeeker}
              />
              <Route
                path="/registration/employer"
                component={RegistrationEmployer}
              />
              <Route path="/profile/create" component={CreateProfile} />
              <Route path="/feed" component={FeedBoard} />
            </div>
          </div>
        </HashRouter>
      </div>
    );
  }
}

export default App;
