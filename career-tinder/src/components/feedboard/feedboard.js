import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import * as ROUTES from '../../constants/routes';

class Feedboard extends Component {
  render() {
    const { auth } = this.props;
    if (!auth.uid && !auth.emailVerified) return <Redirect to={ROUTES.LOG_IN}/>;
    return (
      <div className="container text-center d-flex justify-content-center black-label">
        <div className="fb-wrapper black-text text-center text-md-left">
          <h1 className="h1-responsive font-weight-bold">Career Tinder </h1>
          <hr className="hr-light" />
          <h6 className="mb-4 black-text">
            Welcome to your Career-Tinder profile. Please <Link to="/profile/update" > update your profile </Link>
            to have your profile complete. Your job feed is coming soon.
          </h6>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};

export default compose(
  connect(mapStateToProps)
)(Feedboard);
