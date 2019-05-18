import React from "react";
import { BrowserRouter as Router, NavLink } from "react-router-dom";
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
  MDBInput
} from "mdbreact";
import "./registrationEmployer.css";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { signUpAsEmployer } from "../../store/actions/authActions";

class RegistrationEmployer extends React.Component {
  state = {
    email: "",
    password: "",
    companyname: ""
  };
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.signUpAsEmployer(this.state);
  };

  render() {
    const { auth, authError } = this.props;
    if (auth.uid) return <Redirect to="/feed" />
    return (
      <div id="classicformpage">
        <MDBView>
          <MDBMask className="d-flex justify-content-center align-items-center gradient">
            <MDBContainer>
              <MDBRow>
                <div className="white-text text-center text-md-left col-md-6 mt-xl-5 mb-5">
                  <h1 className="h1-responsive font-weight-bold">
                    Sign up right now!{" "}
                  </h1>
                  <hr className="hr-light" />
                  <h6 className="mb-4">
                    Welcome to Career Tinder website. This website is desgined
                    for the companies which are looking to hire new employees,
                    as well as people how are looking for job. To use the
                    offered services of the web, please login with your account
                    or if you don't have an account yet, please click the signup
                    button to register
                  </h6>
                  <MDBBtn outline color="white">
                    Learn More
                  </MDBBtn>
                </div>
                <MDBCol md="6" xl="5" className="mb-4">
                  <MDBCard id="classic-card">
                    <MDBCardBody className="z-depth-2 white-text">
                      <h3 className="text-center">
                        <MDBIcon icon="user" /> Employer
                      </h3>
                      <hr className="hr-light" />
                      <form onSubmit={this.handleSubmit}>
                      <MDBInput
                       id="companyname"
                        label="Company Name"
                        className="white-text"
                        onChange={this.handleChange}
                      />
                      <MDBInput
                       id="email"
                        label="Email"
                        icon="envelope"
                        className="white-text"
                        autoComplete="false"
                        onChange={this.handleChange}
                      />
                      <MDBInput
                       id="password"
                        label="Password"
                        icon="lock"
                        type="password"
                        className="white-text"
                        autocomplete="new-password"
                        onChange={this.handleChange}
                      />

                      <div className="text-center mt-4 black-text">
                        <MDBBtn color="indigo" type="submit">Sign Up</MDBBtn>
                        <div className="center red-text">
                            {authError ? <p>{authError}</p> : null}
                          </div>
                        </div>
                      </form>

                      <div className="text-center mt-4">
                        <hr className="hr-light" />
                        <div className="text-center d-flex justify-content-center white-label">
                          <NavLink
                            className="red-text"
                            to="/registration/jobseeker"
                          >
                            <i className="fas fa-user-plus" /> Oops! I'm a Job
                            Seeker!
                          </NavLink>
                        </div>
                      </div>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </MDBMask>
        </MDBView>
      </div>
    )
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
    signUpAsEmployer: creds => dispatch(signUpAsEmployer(creds))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegistrationEmployer);