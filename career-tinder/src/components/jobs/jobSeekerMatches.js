import React, { Component } from "react";
import * as ROUTES from "../../constants/routes";
import { connect } from "react-redux";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import "./jobs.css";
import { firestoreConnect } from "react-redux-firebase";
import _ from "lodash";

class JobSeekerMatches extends Component {
  render() {
    const { auth, userJobPosting } = this.props;

    if (!auth.uid && !auth.emailVerified)
      return <Redirect to={ROUTES.LOG_IN} />;
    return (
      <div className="container">
        <div className="row job-ads-wrapper mb-3">
          {userJobPosting &&
            userJobPosting.map(item => {
              return (
                <div
                  id={item.id}
                  key={item.id}
                  className="col-md-6 col-12 job-ad-wrapper"
                >
                  {" "}
                  {/*this is temporal: id must contain de id of document JobPosting from DB*/}
                  <div className="card job-ad text-body shadow rounded">
                    <div className="card-header">
                      <div className="row">
                        <div className="col-9">
                          <i className="fas fa-thumbtack" /> {item.jobtitle}
                        </div>
                        <div className="col-3">
                          <i className="fas fa-heart wishlist-selector float-right d-none" />
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-12">
                          <b className="mr-2">
                            <i className="fas fa-check-double" /> Skills:
                          </b>
                          {item.neededskills &&
                            item.neededskills.map(child => {
                              return (
                                <span
                                  key={child.value}
                                  className="badge badge-danger mr-2"
                                >
                                  {child.label}
                                </span>
                              );
                            })}
                        </div>
                        <div className="col-12">
                          <b>
                            <i className="fas fa-certificate" /> Type:
                          </b>{" "}
                          {(item.applyfulltime && item.applyfulltime
                            ? "Full Time"
                            : "Part Time") ||
                            (item.applypartime && item.applypartime
                              ? "Part Time"
                              : "Full Time")}
                        </div>
                        <div className="col-12">
                          <b>
                            <i className="fas fa-euro-sign" /> Salary:
                          </b>{" "}
                          {item.minsalary} - {item.maxsalary}
                        </div>
                        <div className="col-12">
                          <b>
                            <i className="fas fa-building" /> Company:
                          </b>{" "}
                          {item.employername}
                        </div>
                        <div className="col-12">
                          <b>
                            <i className="fas fa-calendar-alt" /> Start
                          </b>{" "}
                          {item.expectedstartdate &&
                            item.expectedstartdate.toDate().toLocaleString()}
                        </div>
                        <div className="col-12">
                          <b>
                            <i className="fas fa-calendar-alt" /> Due Date:
                          </b>{" "}
                          {item.expirationdate &&
                            item.expirationdate.toDate().toLocaleString()}
                        </div>
                        <div className="col-12">
                          <b>
                            <i className="fas fa-graduation-cap" /> Education:
                          </b>{" "}
                          {item.education}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const auth = state.firebase.auth;
  const jobposting = state.firestore.ordered.jobposting;
  const matches = state.firestore.ordered.match;
  const userJobPosting = _.differenceWith(jobposting, matches, function(
    jobpost,
    match
  ) {
    return jobpost.id !== match.jobAdId;
  });

  return {
    userJobPosting: userJobPosting,
    uid: auth.uid,
    auth: auth
  };
};

const mapDispatchToPropsJobseeker = dispatch => {
  // console.log(state);
  return {};
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToPropsJobseeker
  ),
  firestoreConnect(props => {
    return [
      {
        collection: "match",
        where: [["jobSeekerID", "==", props.uid || null]]
      },
      {
        collection: "jobposting",
        orderBy: ["createdAt", "desc"]
      }
    ];
  })
)(JobSeekerMatches);
