import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./app.css";
import Navbar from "../layouts/Navbar";
import Login from "../authentication/login";
import RegistrationEmployer from "../authentication/registrationEmployer";
import RegistrationJobSeeker from "../authentication/registrationJobSeeker";
import CreateProfile from "../profile/create";
import Home from "../layouts/home";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
        </div>
        <Switch>
          <Route exact path="/" component={Home} />
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
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
