import React, { Component } from "react";
import { Route, HashRouter } from "react-router-dom";
import "./app.css";
import * as ROUTES from '../../constants/routes';
import CoreLayout from "../layouts";
import Login from "../authentication/login";
import RegistrationEmployer from "../authentication/registrationEmployer";
import RegistrationJobSeeker from "../authentication/registrationJobSeeker";
import UpdateProfile from "../profile/editProfile";
import FeedBoard from "../feedboard/feedboard";
import LandingPage from "../layouts/home";
import ForgotPassword from "../authentication/forgotPassword";
import ChangePassword from "../profile/changePassword";
import JobAds from "../jobs/jobAds";

class App extends Component {
  render() {
    return (
      <div id="dom-wrapper" ref="domwrapper">
        <HashRouter>
          <div className="container-fluid">
            <CoreLayout />
            <div className="content-wrapper">
              <Route exact path={ROUTES.LANDING} component={LandingPage} />
              <Route path={ROUTES.LOG_IN}  component={Login} />
              <Route path={ROUTES.REGISTRATION_JOB_SEEKER} component={RegistrationJobSeeker} />
              <Route path={ROUTES.REGISTRATION_EMPLOYER} component={RegistrationEmployer} />
              <Route path={ROUTES.UPDATE_PROFILE} component={UpdateProfile} />
              <Route exact path={ROUTES.CHANGE_PASSWORD} component={ChangePassword} />  
              <Route path={ROUTES.FEED} component={FeedBoard} />
              <Route path={ROUTES.FORGOT_PASSWORD} component={ForgotPassword} />
              <Route path={ROUTES.JOBS_LIST} component={JobAds} />
            </div>
          </div>
        </HashRouter>
      </div>
    );
  }
}

export default App;
