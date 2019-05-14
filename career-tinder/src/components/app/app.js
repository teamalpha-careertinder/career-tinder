import React, { Component } from 'react';
import { Router, browserHistory, Route } from 'react-router';
import './app.css';
import ReactDOM from "react-dom";
import { BrowserRouter as Router2 } from "react-router-dom";
import { MDBAnimation } from "mdbreact";
import { Redirect } from 'react-router';
import {
  MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBMask, MDBRow,
  MDBCol, MDBIcon,
  MDBBtn, MDBView, MDBContainer, MDBCard, MDBCardBody, MDBInput, MDBFormInline
} from "mdbreact";

import CoreLayout from '../layouts';
import LoginLayout from '../authentication/login';
import EmployerFormPage from '../authentication/Registration_Employer';
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

  SigninClicked() {
    ReactDOM.render(<Login />, document.getElementById('root'));
  }

  Jobseeker() {
    ReactDOM.render(<Registration />, document.getElementById('root'));
  }
  Employer() {
    ReactDOM.render(<EmployerFormPage />, document.getElementById('root'));
  }



  state = {
    collapseID: ""
  };





  toggleCollapse = collapseID => () =>
    this.setState(prevState => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : ""
    }));

  render() {
    const overlay = (
      <div id="sidenav-overlay" style={{ backgroundColor: "transparent" }} onClick={this.toggleCollapse("navbarCollapse")} />
    );
    return (
      <div id="classicformpage">



        <Router history={browserHistory}>
          <Route path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/registration" component={Registration} />
          <Route path="/profile/create" component={CreateProfile} />
        </Router>

        <Router2>
          <div>

            {this.state.collapseID && overlay}
          </div>
        </Router2>



        <MDBView>
          <MDBMask className="d-flex justify-content-center align-items-center gradient">
            <MDBContainer>
              <MDBRow>

                <div className="white-text text-center text-md-left col-md-6 mt-xl-5 mb-5">
                  <div>
                    <MDBAnimation type="slideInLeft">
                      <h1 className="h1-responsive font-weight-bold">
                        Career Tinder{" "}
                      </h1>
                      <hr className="hr-light" />
                      <h6 className="mb-4">
                        Welcome to Career Tinder website.
                        This website is desgined for the companies which are looking
                        to hire new employees, as well as people how are looking for job.
                        To use the offered services of the web, please login with your account
                        or if you don't have an account yet, please click the signup button to register
                </h6>


                    </MDBAnimation>
                  </div>

                </div>

                <MDBCol md="6" xl="5" className="mb-4">
                  <MDBAnimation type="zoomInUp">


                    <MDBCard id="classic-card">
                      <MDBCardBody className="z-depth-2 white-text">
                        <h5 className="text-center">
                          Hey there!
                           Are you a Job Seeker or an Employer?
                    </h5>
                        <hr className="hr-light" />

                        <div className="text-center mt-4 black-text" onClick={this.Jobseeker}>
                          <MDBBtn gradient="purple"><b>I'M A JOB SEEKER</b></MDBBtn>
                        </div>

                        <div className="text-center mt-4 black-text" onClick={this.Employer}>
                          <MDBBtn gradient="blue"><b>I'M AN EMPLOYER</b></MDBBtn>
                        </div>

                        <div className="text-center mt-4 black-text">

                          <hr className="hr-light" />
                          <div className="text-center d-flex justify-content-center white-label">

                            <a href="#!" className="white-text" >
                              Already have an account? <p><a href="#" class="text-danger" onClick={this.SigninClicked}>Login Here</a> </p>
                            </a>


                          </div>
                        </div>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBAnimation>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </MDBMask>
        </MDBView>




      </div>
    );
  }
}

export default App;

