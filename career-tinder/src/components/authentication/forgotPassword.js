import React from "react";
import { MDBBtn, MDBInput } from "mdbreact";
import "./login.css";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { passwordForget } from "../../store/actions/authActions";
import * as ROUTES from '../../constants/routes';

const INITIAL_STATE = {
  email: "",
  error: null,
  authMsg: null
};

class ForgotPassword extends React.Component {
  state = { ...INITIAL_STATE };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    //   console.log(`OnSubmit_PW_Forget: `,  this.state, this.props);

    const { email } = this.state;

    this.props.passwordForget(email);
  };

  render() {
    const { email } = this.state;
    const isInvalid = email === "";
    const { auth, authStatus, authMsg } = this.props;

    if (!auth.uid) return <Redirect to={ROUTES.LOG_IN} />;
    return (
      <div className="container">
        <div className="card-body text-info">
          <div className="card border-info mb-3">
            <div className="card-header">Reset your password</div>
            <div className="card-body text-info">
              <div className="gradient-text">
                <h6 className="mb-2 black-text" align="center">
                  Enter the e-mail address associated with your Career Tinder
                  account and we'll send you instructions on how to reset your
                  password.
                </h6>
                <form onSubmit={this.handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 col-sm-12">
                      <MDBInput
                        name="email"
                        value={this.state.email}
                        label="Your email"
                        icon="envelope"
                        className="black-text"
                        type="email"
                        id="email"
                        onChange={this.handleChange}
                      />

                      <div className="text-center mt-4 black-text">
                        <MDBBtn
                          color="indigo"
                          type="submit"
                          disabled={isInvalid}
                        >
                          Send
                        </MDBBtn>
                        <MDBBtn color="indigo" href="/#/login">
                          Back to Login
                        </MDBBtn>
                        {authStatus === "OK" ? (
                          <div className="center green-text">
                            {authMsg ? <p>{authMsg}</p> : null}
                          </div>
                        ) : (
                          <div className="center red-text">
                            {authMsg ? <p>{authMsg}</p> : null}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  // console.log(state);
  return {
    auth: state.firebase.auth,
    authStatus: state.auth.authStatus,
    authMsg: state.auth.authMsg
  };
};

const mapDispatchToProps = dispatch => {
  return {
    passwordForget: email => dispatch(passwordForget(email))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPassword);
