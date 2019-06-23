import React from "react";
import { NavLink, Link } from "react-router-dom";
import { MDBBtn, MDBCardFooter, MDBInput } from "mdbreact";
import "./login.css";
import { MDBAnimation } from "mdbreact";
import * as ROUTES from "../../constants/routes";
import { signIn } from "../../store/actions/authActions";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import $ from "jquery/src/jquery";

const INITIAL_STATE = {
  email: "",
  password: ""
};

class Login extends React.Component {   
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    if($('.collapsenav').hasClass('show')) {
      $('.hamburger-button__button').click();
    }
    this.props.signIn(this.state);
  };

  render() {
    const { authError, auth } = this.props;
    if (auth.uid && auth.emailVerified) return <Redirect to={ROUTES.JOBS} />;
    return (
      <div className="container">
        <div className="card border-indigo">
          <div className="card-header white-text">
            <i className="fas fa-sign-in-alt" /> Sign In
          </div>
          <div className="card-body text-info">
            <div className="gradient-text">
              <div className="row">
                <div className="col-md-6 col-sm-12" style={{color:'#19233C'}}>
                  <form onSubmit={this.handleSubmit}>
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
                    />

                    <div className="text-center mt-4 black-text">
                      <MDBBtn color="unique" rounded size="sm" type="submit" className="mr-auto">
                        Sign In
                      </MDBBtn>
                      <div className="center red-text">
                        {authError ? <p>{authError}</p> : null}
                      </div>
                    </div>
                    <Link
                      className="text-center d-flex justify-content-center black-text"
                      to={ROUTES.FORGOT_PASSWORD}
                    >
                      <br>
                      </br>
                      Forgot your Password?
                    </Link>
                  </form>
                </div>
              </div>
            </div>
            <div className="text-center black-text">
              <div className="text-center d-flex justify-content-center white-label">
                <div className="black-text">
                  <hr className="hr-dark" />
                  Don't Have an Account ?{" "}
                  <NavLink className="nav-link text" style={{color:'#880E4F'}} to={ROUTES.LANDING}>
                  <MDBAnimation type="pulse" infinite><b> Register Here</b>
                  </MDBAnimation>
                  </NavLink>
                  
                </div>
              </div>
            </div>
          </div>
          <MDBCardFooter>
          <h6 className="mb-2" align="center" color= "black">
            Welcome to the Career Tinder Website. This website is desgined for the
            companies which are looking to hire new employees, as well as people
            who are looking for job. To use the offered services of the web,
            please login with your account or if you don't have an account yet,
            please click the signup button to register.
          </h6>
          </MDBCardFooter>
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
