import React from "react";
import * as ROUTES from '../../constants/routes';
import { NavLink } from "react-router-dom";
import { MDBBtn, MDBCardBody, MDBCardFooter, MDBInput } from "mdbreact";

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
    if (auth.uid) return <Redirect to={ROUTES.FEED} />
    return (
      <div className="container">
        <div className="card border-info card-container">
          <div className="card-header">
            <i className="fas fa-user-tie"></i> Sign Up as an Employer
          </div>
          <MDBCardBody className="z-depth-2 gradient-text text-info">
            <div className="row">
              <div className="col-md-6 col-sm-12">
                <form onSubmit={this.handleSubmit}>
                  <MDBInput
                    id="companyname"
                    icon="pencil-alt"
                    label="Company Name"
                    onChange={this.handleChange}
                  />
                  <MDBInput
                    id="email"
                    label="Email"
                    icon="envelope"
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
                    <MDBBtn color="primary" type="submit">Sign Up</MDBBtn>
                    <div className="center red-text">
                      {authError ? <p>{authError}</p> : null}
                    </div>
                  </div>
                </form>
                <div className="text-center mt-4">
                  <hr className="hr-dark" />
                  <div className="text-center d-flex justify-content-center white-label">
                    <NavLink className="red-text" to={ROUTES.REGISTRATION_JOB_SEEKER} >
                      <i className="fas fa-user-plus" /> Oops! I'm a Job Seeker!
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </MDBCardBody>
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