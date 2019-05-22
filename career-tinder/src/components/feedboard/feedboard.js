import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

class Feedboard extends Component {
  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to="/login" />;

    return (
      <div className="container text-center d-flex justify-content-center black-label">   
        <div className="fb-wrapper black-text text-center text-md-left">            
          <h1 className="h1-responsive font-weight-bold mt-4">
            Career Tinder{" "}
          </h1>
          <hr className="hr-dark" />
          <h6 className="mb-4">
            Welcome to your career-tinder profile. Please
            <Link to="/profile/create"> edit your profile </Link>
            to have your profile complete. Your job feed is coming soon.
          </h6>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  // console.log(state);
  return {
    auth: state.firebase.auth
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect()
)(Feedboard);
