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
import "./login.css";
import { MDBAnimation } from "mdbreact";
import { signIn } from "../../store/actions/authActions";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

class Login extends React.Component {
  state = {
    email: "",
    password: ""
  };
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.signIn(this.state);
  };

  render() {
    const { authError, auth } = this.props;
    if (auth.uid) return <Redirect to="/feed" />;
    return (
      <div id="classicformpage">
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
                    Welcome to Career Tinder website. This website is desgined
                    for the companies which are looking to hire new employees,
                    as well as people how are looking for job. To use the
                    offered services of the web, please login with your account
                    or if you don't have an account yet, please click the signup
                    button to register
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
                        <form onSubmit={this.handleSubmit}>
                          <MDBInput
                            label="Your email"
                            icon="envelope"
                            className="white-text"
                            type="email"
                            id="email"
                            onChange={this.handleChange}
                          />
                          <MDBInput
                            label="Your password"
                            icon="lock"
                            className="white-text"
                            type="password"
                            id="password"
                            onChange={this.handleChange}
                          />
                          <div className="text-center mt-4 black-text">
                            <MDBBtn color="indigo" type="submit">
                              Sign In
                            </MDBBtn>
                            <div className="center red-text">
                              {authError ? <p>{authError}</p> : null}
                            </div>
                          </div>
                        </form>
                        <div className="text-center mt-4 black-text">
                          <div className="text-center d-flex justify-content-center white-label">
                            <div className="white-text">
                              <hr className="hr-light" />
                              Don't have an account ?{" "}
                              <NavLink
                                exact
                                className="nav-link red-text"
                                to="/"
                              >
                                <i className="fas fa-user-plus" /> Register
                              </NavLink>
                            </div>
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

const mapStateToProps = state => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signIn: creds => dispatch(signIn(creds))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
