import React from "react";
import { NavLink } from "react-router-dom";
import { MDBBtn, MDBCardBody, MDBCardFooter, MDBInput } from "mdbreact";
import * as ROUTES from "../../constants/routes";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { signUpAsEmployer } from "../../store/actions/authActions";

class RegistrationEmployer extends React.Component {
  state = {
    email: "",
    password: "",
    confirm_password: "",
    companyname: ""
  };

  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.signUpAsEmployer(this.state);
  };

  render() {
    const { auth, authError } = this.props;
    const { password, confirm_password } = this.state;
    const isInvalid =
      password !== confirm_password ||
      password === "" ||
      confirm_password === "";
    if (auth.uid && !auth.emailVerified)
      return <Redirect to={ROUTES.EMAIL_VERIFICATION} />;
    return (
      <div className="container">
        <div className="card border-info card-container">
          <div className="card-header">
            <i className="fas fa-user-tie" /> Sign Up as an Employer
          </div>
          <MDBCardBody className="z-depth-2 gradient-text text-info">
            <div className="row">
              <div className="col-md-6 col-sm-12">
                <form onSubmit={this.handleSubmit}>
                  <MDBInput
                    value={this.state.companyname}
                    name="companyname"
                    id="companyname"
                    icon="pencil-alt"
                    label="Company Name"
                    type="text"
                    className="form-control"
                    onChange={this.changeHandler}
                    required
                  />

                  <MDBInput
                    value={this.state.email}
                    name="email"
                    label="Your email"
                    icon="envelope"
                    type="email"
                    id="email"
                    className="form-control"
                    onChange={this.changeHandler}
                    required
                    autoComplete="false"
                  />

                  <MDBInput
                    value={this.state.password}
                    name="password"
                    label="Your password"
                    icon="lock"
                    type="password"
                    id="password"
                    className="form-control"
                    onChange={this.changeHandler}
                    required
                    //onChange={this.handleChange}
                  />
                  <MDBInput
                    value={this.state.confirmpassword}
                    name="confirmpassword"
                    id="confirm_password"
                    label="Confirm Password"
                    icon="lock"
                    type="password"
                    autoComplete="new-password"
                    className="form-control"
                    onChange={this.changeHandler}
                    required
                    //onChange={this.handleChange}
                  />

                  <div className="text-center mt-4 black-text">
                    <MDBBtn color="indigo" type="submit" enabled={isInvalid}>
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
                      to={ROUTES.REGISTRATION_JOB_SEEKER}
                    >
                      <i className="fas fa-user-plus" /> Oops! I'm a Job Seeker!
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </MDBCardBody>
          <MDBCardFooter>
            <h6 className="mb-2" align="center">
              Welcome to Career Tinder website. This website is desgined for the
              companies which are looking to hire new employees, as well as
              people how are looking for job. To use the offered services of the
              web, please login with your account or if you don't have an
              account yet, please click the signup button to register
            </h6>
          </MDBCardFooter>
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
    signUpAsEmployer: creds => dispatch(signUpAsEmployer(creds))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegistrationEmployer);
