import React from "react";
import * as ROUTES from "../../constants/routes";
import { connect } from "react-redux";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import CreateJobAds from "./createJobAds";
import JobAds from "./jobAds";

class Jobs extends React.Component {
  render() {
    const { auth } = this.props;
    const { user } = this.props;
    if (!auth.uid && !auth.emailVerified)
      return <Redirect to={ROUTES.LOG_IN} />;
    return (
      <div className="container">
        {user && user.userType === "jobseeker" ? <JobAds /> : <CreateJobAds />}
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

export default compose(connect(mapStateToProps))(Jobs);
