import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import EmailVerification from "../authentication/emailVerification";

class Feedboard extends Component {
  render() {
    const { auth, user } = this.props;
    if (!auth.uid) return <Redirect to="/login" />;

    return (
      <div className="container text-center d-flex justify-content-center black-label">
        <div className="fb-wrapper black-text text-center text-md-left">
          <h1 className="h1-responsive font-weight-bold">Career Tinder </h1>
          <hr className="hr-light" />
          <h6 className="mb-4">
            Welcome to your career-tinder profile. Please
            {user && user.userType === "jobseeker" ? (
              <Link to="/profile/create"> edit your profile </Link>
            ) : (
              <Link to="/profile/create-employer"> edit your profile </Link>
            )}
            to have your profile complete. Your job feed is coming soon.
          </h6>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const auth = state.firebase.auth;
  const users = state.firestore.data.users;
  const user = users ? users[auth.uid] : null;
  return {
    user: user,
    auth: auth
  };
};

export default compose(
  EmailVerification,
  connect(mapStateToProps),
  firestoreConnect([
    {
      collection: "users"
    }
  ])
)(Feedboard);
