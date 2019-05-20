import React from "react";
import { NavLink } from "react-router-dom";
import {

  MDBRow,
  MDBCol,

  MDBBtn,

  MDBContainer,

  MDBCardBody,
  MDBCardFooter,
  MDBInput
} from "mdbreact";


import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { signUpAsJobSeeker } from "../../store/actions/authActions";

class RegistrationJobSeeker extends React.Component {
  state = {
    email: "",
    password: "",
    firstName: "",
    lastName: ""
  };
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.signUpAsJobSeeker(this.state);
  };

  render() {
    const { auth, authError } = this.props;
    if (auth.uid) return <Redirect to="/feed" />
    return (
      <div id="classicformpage">
        <div className="container">
          <div className="card-body text-info">
            <div className="card border-info mb-3">

              <div class="card-header">
                <br></br>
                <h1 className="h3 text-center mb-4">Sign up right now!</h1>
              </div>
              <br></br>
              <br></br>
              <div className="card-body text-info">

                <MDBContainer>
                  <MDBRow>
                    <MDBCol md="6">
                      <div class="card-header">
                        <h3 className="text-center">
                          <br></br>
                          <h6 className="h5 text-center mb-4" icon="user">Job Seeker</h6>
                        </h3>
                      </div>
                      <MDBCardBody className="z-depth-2 gradient-text" md="3" xl="3">

                        <form onSubmit={this.handleSubmit}>

                          <MDBInput
                            id="firstName"
                            label="First Name"
                            icon="pencil-alt"
                            className="black-text"

                            class="form-control"

                            onChange={this.handleChange}
                          />
                          <MDBInput
                            id="lastName"
                            label="Last Name"
                            className="black-text"
                            icon="pencil-alt"
                            class="form-control"
                            onChange={this.handleChange}
                          />



                          <MDBInput
                            id="email"
                            label="Email"
                            icon="envelope"
                            type="email"
                            className="black-text"
                            autoComplete="false"
                            onChange={this.handleChange}
                          />
                          <MDBInput
                            id="password"
                            label="Password"
                            icon="lock"
                            type="password"
                            className="black-text"
                            autocomplete="new-password"
                            onChange={this.handleChange}
                          />
                          <MDBInput
                            id="confirm_password"
                            label="Confirm Password"
                            icon="lock"
                            type="password"
                            className="black-text"
                            autocomplete="new-password"
                            onChange={this.handleChange}
                          />

                          <div className="text-center mt-4 black-text">
                            <MDBBtn color="indigo" type="submit">
                              Sign Up
                          </MDBBtn>
                            <div className="center red-text">
                              {authError ? <p>{authError}</p> : null}
                            </div>
                          </div>
                        </form>
                        <div className="text-center mt-4">
                          <hr className="hr-dark" />
                          <div className="text-center d-flex justify-content-center white-label">
                            <NavLink
                              className="red-text"
                              to="/registration/employer"
                            >
                              <i className="fas fa-user-plus" /> Oops! I'm an
                              Employer!
                          </NavLink>
                          </div>
                        </div>
                      </MDBCardBody>

                    </MDBCol>
                  </MDBRow>
                </MDBContainer>

              </div>
              <br></br>
              <br></br>
              <MDBCardFooter >


                <h6 className="mb-2" align="center">
                  Welcome to Career Tinder website. This website is
                  desgined for the companies which are looking to hire new
                  employees, as well as people how are looking for job. To
                  use the offered services of the web, please login with
                  your account or if you don't have an account yet, please
                  click the signup button to register
                    </h6>
              </MDBCardFooter>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signUpAsJobSeeker: creds => dispatch(signUpAsJobSeeker(creds))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegistrationJobSeeker);
