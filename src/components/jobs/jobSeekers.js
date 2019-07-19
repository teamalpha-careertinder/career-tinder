import React, { Component } from "react";
import $ from "jquery/src/jquery";
import { firestoreConnect } from "react-redux-firebase";
import "../profile/profile.css";
import * as ROUTES from "../../constants/routes";
import { connect } from "react-redux";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import { Button } from "reactstrap";
import "../app/app.css";
import {
  getjobseekers,
  saveEmployerChoice
} from "../../store/actions/jobAdActions";
import _ from "lodash";
import addScoreToJobSeeker from "./jobSeekerRelevancyFactorCalculator";
import moment from "moment";

class JobSeekers extends Component {
  constructor(props) {
    super(props);
    this.props.getjobseekers(this.props.jobAdId);
  }
  processLikeDisLike(userAction, jobSeekerId) {
    const employerChoiceEntity = {
      employerId: null,
      jobAdId: null,
      jobSeekerId: null,
      isLiked: Boolean
    };
    var employerChoice = employerChoiceEntity;
    employerChoice.employerId = this.props.auth.uid;
    employerChoice.jobAdId = this.props.jobAdId;
    employerChoice.jobSeekerId = jobSeekerId;
    employerChoice.isLiked = userAction;
    this.props.saveEmployerChoice(employerChoice);
  }

  slideSeekerUp = e => {
    var id = $(e.target)[0].closest(".job-seeker-wrapper").id;
    $("#" + id)
      .animate({ right: "2000px" }, "slow")
      .slideUp(500);
    //call the managment of (Dis)Likes to be store on DB:
    setTimeout(
      function() {
        //Start the timer
        this.processLikeDisLike(true, id);
      }.bind(this),
      1000
    );
  };

  slideSeekerDown = e => {
    var id = $(e.target)[0].closest(".job-seeker-wrapper").id;
    $("#" + id)
      .animate({ left: "2000px" }, "slow")
      .slideUp(500);
    //call the managment of (Dis)Likes to be store on DB:
    setTimeout(
      function() {
        //Start the timer
        this.processLikeDisLike(false, id);
      }.bind(this),
      1000
    );
  };

  render() {
    const { auth, jobSeekersList, jobAd } = this.props;
    if (!auth.uid && !auth.emailVerified)
      return <Redirect to={ROUTES.LOG_IN} />;
    ////////////////////////////////////////////////////////////////////////////////////
    //sorting
    if (jobSeekersList && jobSeekersList.length && jobAd) {
      addScoreToJobSeeker(jobAd, jobSeekersList);
      jobSeekersList.sort(function(a, b) {
        return b.relevancyScore - a.relevancyScore;
      });
    }
    ////////////////////////////////////////////////////////////////////////////////////
    return (
      <div>
        {/* <input type="hidden" id="hdnJobAdId" value={state.jobAdId}></input> */}
        <div className="container page-wrapper">
          <div className="card-container">
            <h4 className="mt-4 text-center font-weight-bold">
              <i className="fas fa-street-view" /> Recommendations for position "{jobAd && jobAd.jobtitle}"
            </h4>
            <div className="row mt-4" align="center">
              {jobSeekersList &&
                jobSeekersList.map(jobSeeker => {
                  return (
                    <div
                      id={jobSeeker.id}
                      key={jobSeeker.id}
                      className="col-lg-4 col-md-6 col-12 job-seeker-wrapper mt-2"
                    >
                      <div className="card job-ad text-body shadow rounded">
                        <div className="card-header bg-white text-info font-weight-bold">
                          <div className="row">
                            <div className="col-12 text-center">
                              {/* <i className="fas fa-thumbtack" /> {item.jobtitle} */}
                              <i className="fas fa-user-tag" />{" "}
                              {jobSeeker.jobSeekerName}
                            </div>
                            {/* <div className="col-3">
                              <i className="fas fa-heart wishlist-selector float-right d-none" />
                            </div> */}
                          </div>
                        </div>
                        <div className="card-body">
                          <div className="row">
                            <div className="col-12">
                              <b className="mr-2">
                                <i className="fas fa-check-double" /> Skills:
                              </b>
                              {jobSeeker.skills &&
                              jobSeeker.skills.length > 0 ? (
                                jobSeeker.skills.map(skill => {
                                  return (
                                    <span
                                      key={jobSeeker.id + "_" + skill.value}
                                      className="badge badge-warning mr-2"
                                    >
                                      {skill.label}
                                    </span>
                                  );
                                })
                              ) : (
                                <i className="fas fa-ban text-muted" />
                              )}
                            </div>
                            <div className="col-12">
                              <b>
                                <i className="fas fa-graduation-cap" />{" "}
                                Education:
                              </b>{" "}
                              {jobSeeker.education ? (
                                jobSeeker.education.label
                              ) : (
                                <i className="fas fa-ban text-muted" />
                              )}
                            </div>
                            <div className="col-12">
                              <b className="mr-2">
                                <i className="fas fa-check-double" /> Work
                                Experiences:
                              </b>
                              {jobSeeker.workExperiences &&
                              jobSeeker.workExperiences.length > 0 ? (
                                jobSeeker.workExperiences.map(exp => {
                                  return (
                                    <span
                                      key={exp.companyName + "_" + exp.jobTitle}
                                      className="badge badge-warning mr-2"
                                    >
                                      {exp.companyName}
                                    </span>
                                  );
                                })
                              ) : (
                                <i className="fas fa-ban text-muted" />
                              )}
                            </div>

                            <div className="col-12">
                              <b className="mr-2">
                                <i className="fas fa-language" /> Languages:
                              </b>
                              {jobSeeker.languages &&
                              jobSeeker.languages.length > 0 ? (
                                jobSeeker.languages.map(lang => {
                                  return (
                                    <span
                                      key={lang.value}
                                      className="badge badge-warning mr-2"
                                    >
                                      {lang.label}
                                    </span>
                                  );
                                })
                              ) : (
                                <i className="fas fa-ban text-muted" />
                              )}
                            </div>
                            <div className="col-12">
                              <b>
                                <i className="fas fa-certificate" /> Desired Job
                                Type:
                              </b>{" "}
                              {(jobSeeker.applyfulltime &&
                              jobSeeker.applyfulltime
                                ? "Full Time"
                                : "Part Time") ||
                                (jobSeeker.applypartime &&
                                jobSeeker.applypartime
                                  ? "Part Time"
                                  : "Full Time")}
                            </div>
                            <div className="col-12">
                              <b>
                                <i className="fas fa-euro-sign" /> Min Salary:
                              </b>{" "}
                              {jobSeeker.minSalary ? (
                                jobSeeker.minSalary
                              ) : (
                                <i className="fas fa-ban text-muted" />
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="w-100">
                          <div className="card-buttons">
                            <Button
                              color="info"
                              className="w-100 m-0"
                              onClick={this.slideSeekerUp}
                            >
                              <i className="fas fa-thumbs-up" />
                            </Button>{" "}
                          </div>
                          <div className="card-buttons">
                            <Button
                              color="danger"
                              className="w-100 m-0"
                              onClick={this.slideSeekerDown}
                            >
                              <i className="fas fa-thumbs-down" />
                            </Button>{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const urlSplit = window.location.href.split("/");
  const jobAdId = urlSplit[urlSplit.length - 1];
  const jobSeekersList = state.jobAd.data;
  const employerChoices = state.firestore.ordered.employerChoice;
  const EmployerjobSeekersList = _.differenceWith(
    jobSeekersList,
    employerChoices,
    function(jobseeker, employerChoice) {
      return (
        jobseeker.id === employerChoice.jobSeekerId &&
        jobAdId === employerChoice.jobAdId
      );
    }
  );
  //retrieving jobAd for sorting
  let jobAds = state.firestore.data.jobposting;
  let jobAd = jobAds && jobAdId ? jobAds[jobAdId] : null;

  return {
    auth: state.firebase.auth,
    authError: state.auth.authError,
    jobSeekersList: EmployerjobSeekersList,
    jobAdId: jobAdId,
    jobAd: jobAd
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getjobseekers: jobAdId => dispatch(getjobseekers(jobAdId)),
    saveEmployerChoice: employerChoice =>
      dispatch(saveEmployerChoice(employerChoice))
  };
};
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect(props => {
    return [
      {
        collection: "employerChoice",
        where: [["employerId", "==", props.auth.uid || null]]
      },
      {
        collection: "jobposting"
      }
    ];
  })
)(JobSeekers);
