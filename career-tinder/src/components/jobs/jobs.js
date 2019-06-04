import React from "react";
import * as ROUTES from "../../constants/routes";
import { connect } from "react-redux";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import JobsList from ".//jobsList"
import JobAds from "./jobAds";
import { firestoreConnect } from 'react-redux-firebase'

class Jobs extends React.Component {
  render() {
    const { auth, user, jobAds } = this.props;
    var filteredJobAds = jobAds && jobAds.filter(jobpost => jobpost.employerid == auth.uid)
    if (!auth.uid && !auth.emailVerified)
      return <Redirect to={ROUTES.LOG_IN} />;
    return (
      <div className="container">
        {user && user.userType === "jobseeker" ? <JobAds /> : <JobsList jobs={filteredJobAds} />}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const auth = state.firebase.auth;
  const users = state.firestore.data.users;
  const user = users ? users[auth.uid] : null;
  const jobAds = state.firestore.ordered.jobposting//filter(jobpost => jobpost.employerid == auth.uid)
  return {
    user: user,
    auth: auth,
    jobAds: jobAds
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    {collection: 'jobposting'}
  ])
)(Jobs);
