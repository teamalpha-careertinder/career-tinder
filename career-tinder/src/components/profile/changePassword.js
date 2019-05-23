import React from "react";
import { MDBInput, MDBIcon, MDBBtn } from "mdbreact";
import "./profile.css";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { passwordChange } from "../../store/actions/profileAction";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import EmailVerification from "../authentication/emailVerification";

const INITIAL_STATE = {
  passwordOne: "",
  passwordTwo: "",
  error: null
};

class ChangePassword extends React.Component {
  state = { ...INITIAL_STATE };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log(`OnSubmit1: `, this.state, this.props);

    this.props.passwordChange(this.state.passwordOne);
    this.setState({
      passwordOne: "",
      passwordTwo: ""
    });
  };

  render() {
    const { passwordOne, passwordTwo } = this.state;
    const isInvalid = passwordOne !== passwordTwo || passwordOne === "";
    const { auth, user, authStatus, authMsg } = this.props;

    if (!auth.uid) return <Redirect to="/login" />;
    return (
      <div className="container">
        <div className="profile-form-wrapper">
          <div className="card border-info mb-3">
            <div className="card-header">
              <MDBIcon icon="user" className="mr-1" /> Change your password
            </div>
            <div className="card-body text-info">
              <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                <li className="nav-item">
                  {user && user.userType === "jobseeker" ? (
                    <a
                      className="nav-link active"
                      id="pills-job-seeker-tab"
                      data-toggle="pill"
                      href="#pills-job-seeker"
                      role="tab"
                      aria-controls="pills-job-seeker"
                      aria-selected="true"
                    >
                      <MDBIcon icon="users" className="mr-1" /> Job Seeker
                    </a>
                  ) : (
                    <a
                      className="nav-link active"
                      id="pills-company-tab"
                      data-toggle="pill"
                      href="#pills-company"
                      role="tab"
                      aria-controls="pills-company"
                      aria-selected="false"
                    >
                      <MDBIcon icon="user-tie" className="mr-1" /> Employer
                    </a>
                  )}
                </li>
              </ul>
              <div className="tab-content" id="pills-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="pills-job-seeker"
                  role="tabpanel"
                  aria-labelledby="pills-job-seeker-tab"
                >
                  <form onSubmit={this.handleSubmit} className="profile-form">
                    <div className="row">
                      <div className="col-md-6 col-sm-12">
                        <div className="form-group">
                          <MDBInput
                            name="passwordOne"
                            value={passwordOne}
                            onChange={this.handleChange}
                            label="Enter new Password"
                            type="password"
                            icon="pencil-alt"
                          />
                        </div>
                      </div>
                      <div className="col-md-6 col-sm-12">
                        <div className="form-group">
                          <MDBInput
                            name="passwordTwo"
                            value={passwordTwo}
                            onChange={this.handleChange}
                            label="Re-enter new Password"
                            type="password"
                            icon="pencil-alt"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-12">
                        <MDBBtn
                          outline
                          color="info"
                          className="float-right"
                          href="/#/profile/create"
                        >
                          Back to profile
                        </MDBBtn>
                        <MDBBtn
                          outline
                          color="info"
                          className="float-right"
                          type="submit"
                          disabled={isInvalid}
                        >
                          {
                            //<i className="fas fa-save"></i>
                          }{" "}
                          Change Password
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
                  </form>
                </div>
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
  const auth = state.firebase.auth;
  const users = state.firestore.data.users;
  const user = users ? users[auth.uid] : null;
  return {
    auth: auth,
    authStatus: state.profile.authStatus,
    authMsg: state.profile.authMsg,
    user: user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    passwordChange: newPassword => dispatch(passwordChange(newPassword))
  };
};

export default compose(
  EmailVerification,
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([
    {
      collection: "users"
    }
  ])
)(ChangePassword);
