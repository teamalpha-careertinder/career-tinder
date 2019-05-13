import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import {
MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBMask, MDBRow,
MDBCol, MDBIcon,
MDBBtn, MDBView, MDBContainer, MDBCard, MDBCardBody, MDBInput, MDBFormInline
} from "mdbreact";
import "./Signin.css";
import App from "./../App";
import { MDBAnimation } from "mdbreact";

class SignInForm extends React.Component {

  SignupClicked   ()
  {
    ReactDOM.render( <App /> , document.getElementById('root'));
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
                
              </div>
              <MDBCol md="6" xl="5" className="mb-4">
              <MDBAnimation type="slideInRight">
                
              
                <MDBCard id="classic-card">
                  <MDBCardBody className="z-depth-2 white-text">
                    <h3 className="text-center">
                      <MDBIcon icon="user" /> Existing User
                    </h3>
                    <hr className="hr-light" />
                    
                    <MDBInput label="Your email" icon="envelope" className="white-text" />
                    <MDBInput label="Your password" icon="lock" type="password" className="white-text" />
                     <div className="text-center mt-4 black-text">
                      <MDBBtn color="indigo">Sign In</MDBBtn>
                      <hr className="hr-light" />
                      <div className="text-center d-flex justify-content-center white-label">
                         
                        <a href="#!" className="white-text">
                         Don't have an account ? <MDBIcon onClick={this.SignupClicked}icon="user-plus" className="red-text"/> 
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

export default SignInForm;