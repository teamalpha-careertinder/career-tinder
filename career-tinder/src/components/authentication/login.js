import React from "react";
import { BrowserRouter as Router, NavLink,Link } from "react-router-dom";
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
import ForgotPassword from "./forgotPassword"
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
  forgot_Password() {
    ReactDOM.render(<ForgotPassword />, document.getElementById('root'));
  }

  render() {
    const { authError, auth } = this.props;
    if (auth.uid) return <Redirect to="/feed" />;
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
                          <h6 className="h5 text-center mb-4" icon="user">Existing User</h6>
                        </div>
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
                              <MDBInput
                                label="Your password"
                                icon="lock"
                                className="black-text"
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

                              <Link onClick={this.forgot_Password}
                            exact
                            className="text-center d-flex justify-content-center black-text"
                            to="./forgotPassword"
                          >
                            <br>
                            </br>
                            Forgot password ?
                              </Link>
                            </form>

                          </div>
                          <div className="text-center mt-4 black-text">
                            <div className="text-center d-flex justify-content-center white-label">
                              <div className="black-text">
                                <hr className="hr-dark" />
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
                      </form>

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
