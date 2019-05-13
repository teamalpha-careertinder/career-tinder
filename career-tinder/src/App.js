<<<<<<< HEAD
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { MDBAnimation } from "mdbreact";
import { Redirect } from 'react-router';

import {
MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBMask, MDBRow,
MDBCol, MDBIcon,
MDBBtn, MDBView, MDBContainer, MDBCard, MDBCardBody, MDBInput, MDBFormInline
} from "mdbreact";
import "./App.css";
import SignInForm from "./Components/Signin";
import JobseekerFormPage from "./Components/Jobseeker_signup";
import EmployerFormPage from "./Components/Employer_signup"



var logo = require('./icons/logo.png');
const style = {
  image: {
    border: '1px solid #ccc',
    background: '#fefefe',
  },
};
class App extends React.Component {
  

  SigninClicked   ()
  {
    ReactDOM.render( <SignInForm /> , document.getElementById('root'));
  }

  Jobseeker ()
  {
    ReactDOM.render( <JobseekerFormPage /> , document.getElementById('root'));
  }
  Employer()
  {
    ReactDOM.render( <EmployerFormPage /> , document.getElementById('root'));
  }

  

  state = {
    collapseID: ""
  };

  J

  

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
      <Router>
        <div>
          <MDBNavbar dark expand="md" fixed="top">
            <MDBContainer>
              
              <MDBNavbarToggler onClick={this.toggleCollapse("navbarCollapse")} />
              <MDBCollapse id="navbarCollapse" isOpen={this.state.collapseID} navbar>
                <MDBNavbarNav left>
                  <MDBNavItem >
                    <MDBNavLink to="#!">Home</MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem>
                    <MDBNavLink to="#!">About</MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem>
                    <MDBNavLink to="#!">Contact Us</MDBNavLink>
                  </MDBNavItem>
                </MDBNavbarNav>
                <MDBNavbarNav right>
                  <MDBNavItem>
                    <MDBFormInline waves>

                    </MDBFormInline>
                  </MDBNavItem>
                </MDBNavbarNav>
              </MDBCollapse>
            </MDBContainer>
          </MDBNavbar>
          {this.state.collapseID && overlay}
        </div>
      </Router>

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
              <MDBAnimation  type="zoomInUp">

              
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
=======
import React, { Component } from 'react';
import { Router, browserHistory, Route, Link } from 'react-router';
import logo from './logo.svg';
import './App.css';


const Page = ({ title }) => (
  <div className="App">
    <div className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h2>{title}</h2>
    </div>
    <p className="App-intro">
      This is the {title} page.
    </p>
    <p>
      <Link to="/">Home</Link>
    </p>
    <p>
      <Link to="/about">About</Link>
    </p>
    <p>
      <Link to="/settings">Settings</Link>
    </p>
  </div>
);

const Home = (props) => (
  <Page title="Home"/>
);

const About = (props) => (
  <Page title="About"/>
);

const Settings = (props) => (
  <Page title="Settings"/>
);

/*class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}*/

class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={Home}/>
        <Route path="/about" component={About}/>
        <Route path="/settings" component={Settings}/>
      </Router>
>>>>>>> 68534c00b28c4fceb3d908268fcc5847d04fb129
    );
  }
}

<<<<<<< HEAD

export default App;
=======
export default App;

>>>>>>> 68534c00b28c4fceb3d908268fcc5847d04fb129
