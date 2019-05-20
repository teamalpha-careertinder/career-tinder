import React from "react";
import { BrowserRouter as Router, NavLink, Link } from "react-router-dom";
import ReactDOM from "react-dom";
import {
  MDBMask,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBBtn,
  MDBView,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBInput
} from "mdbreact";
import "./login.css";

import { MDBAnimation } from "mdbreact";
import { signIn } from "../../store/actions/authActions";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

class ForgotPassword extends React.Component {


  render() {

    return (
      <div id="classicformpage">


        <div className="container">
          <div className="card-body text-info">

            <div className="card border-info mb-3">

              <div class="card-header">
                <br></br>
                <h1 className="h1 text-center mb-4">Career Tinder</h1>
              </div>

              <br></br>
              <br></br>
              <div className="card-body text-info">

                <MDBContainer>
                  <MDBRow>
                    <MDBCol md="6">


                      <form>
                        <div class="card-header">
                          <br></br>
                          <h6 className="h5 text-center mb-4"> Reset your password </h6>
                        </div>
                        <br></br>
                        <br></br>
                        <h6 className="mb-2 black-text" align="center">

                          Enter the e-mail address associated with your Career Tinder account and we'll send you instructions on how to reset your password.</h6>
                          <br></br>
                          <br></br>
                        <MDBCardBody className="z-depth-2 gradient-text" md="3" xl="3">
                          <div className="gradient-text">

                            <form onSubmit={this.handleSubmit}>
                              <MDBInput
                                label="Your email"
                                icon="envelope"
                                className="black-text"
                                type="email"
                                id="email"
                                onChange={this.handleChange}
                              />

                              <div className="text-center mt-4 black-text">
                                <MDBBtn color="indigo" type="submit">
                                  Send
                                </MDBBtn>
                              </div>
                              </form>
                          </div>
                          
                          

                        </MDBCardBody>
                      </form>

                    </MDBCol>
                  </MDBRow>



                </MDBContainer>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}


export default ForgotPassword;
