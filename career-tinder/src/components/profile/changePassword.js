import React from "react";
import * as ROUTES from '../../constants/routes';
import { MDBInput, MDBIcon, MDBBtn } from "mdbreact";
import "./profile.css";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import { passwordChange } from "../../store/actions/profileAction";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

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
    const { auth, authStatus, authMsg } = this.props;

    if (!auth.uid && !auth.emailVerified) return <Redirect to={ROUTES.LOG_IN}/>;
    return (
      <div className="container">
        <div className="profile-form-wrapper">
          <div className="card border-info mb-3">
            <div className="card-header">
              <MDBIcon icon="user" className="mr-1" /> Change your password
            </div>
            <div className="card-body text-info">
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
                      <Link className="btn btn-primary float-right" to={ROUTES.UPDATE_PROFILE}>
                        <i className="fas fa-user" /> Profile
                      </Link>
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
