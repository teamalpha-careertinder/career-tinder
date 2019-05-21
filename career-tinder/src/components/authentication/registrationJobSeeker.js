import React from "react";
import { NavLink } from "react-router-dom";
import { MDBBtn, MDBCardBody, MDBCardFooter, MDBInput } from "mdbreact";


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
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-sm-12">
            <div className="card border-info mb-3 mt-4">
              <div className="card-header">
                <i className="fas fa-users"></i> Sign Up as a Job Seeker
              </div>
              <MDBCardBody className="z-depth-2 gradient-text text-info" md="3" xl="3">
                <form onSubmit={this.handleSubmit}>
                  <MDBInput
                    id="firstName"
                    label="First Name"
                    icon="pencil-alt"
                    onChange={this.handleChange}
                  />
                  <MDBInput
                    id="lastName"
                    label="Last Name"
                    className="black-text"
                    icon="pencil-alt"
                    onChange={this.handleChange}
                  />
                  <MDBInput
                    id="email"
                    label="Email"
                    icon="envelope"
                    type="email"
                    autoComplete="false"
                    onChange={this.handleChange}
                  />
                  <MDBInput
                    id="password"
                    label="Password"
                    icon="lock"
                    type="password"
                    autoComplete="new-password"
                    onChange={this.handleChange}
                  />
                  <MDBInput
                    id="confirm_password"
                    label="Confirm Password"
                    icon="lock"
                    type="password"
                    autoComplete="new-password"
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
                    <NavLink className="red-text" to="/registration/employer">
                      <i className="fas fa-user-plus" /> Oops! I'm an Employer!
                  </NavLink>
                  </div>
                </div>
              </MDBCardBody>
              </div>
            </div>
          </div>
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
