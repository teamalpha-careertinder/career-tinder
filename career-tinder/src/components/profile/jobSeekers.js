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
import { saveEmployerChoice } from "../../store/actions/jobAdActions";
import _ from "lodash";

class JobSeekers extends Component {
  HandleSaveEmployerChoice = e => {
    var jobId = e.target.getAttribute("data-jobid");
    this.props.jobSeekersActions(jobId);
  };
  constructor(props) {
    super(props);
    if (this.props.location.job) {
      this.state = {
        jobAdId: this.props.location.job.id,
        userId: this.props.auth.uid
      };
    }
  }
  processLikeDisLike(userAction, jobSeekerId) {
    const employerChoiceEntity = {
      employerId: null,
      jobAdId: null,
      jobSeekerId: null,
      isLiked: Boolean
    };
    var employerChoice = employerChoiceEntity;
    employerChoice.employerId = this.state.userId;
    employerChoice.jobAdId = this.state.jobAdId;
    employerChoice.jobSeekerId = jobSeekerId;
    employerChoice.isLiked = userAction;
    this.props.saveEmployerChoice(employerChoice);
  }

  slideSeekerUp = e => {
    var jobSeekerId = $(e.target)[0].closest(".job-ad-wrapper").id;
    //call the managment of (Dis)Likes to be store on DB:
    this.processLikeDisLike(true, jobSeekerId);

    $("#" + jobSeekerId)
      .animate({ right: "2000px" }, "slow")
      .slideUp(500);
  };

  slideSeekerDown = e => {
    var jobSeekerId = $(e.target)[0].closest(".job-ad-wrapper").id;
    //call the managment of (Dis)Likes to be store on DB:
    this.processLikeDisLike(false, jobSeekerId);

    $("#" + jobSeekerId)
      .animate({ left: "2000px" }, "slow")
      .slideUp(500);
  };

  render() {
    const { auth, jobSeekersList } = this.props;
    if (!auth.uid && !auth.emailVerified)
      return <Redirect to={ROUTES.LOG_IN} />;
    return (
      <div>
        {/* <input type="hidden" id="hdnJobAdId" value={state.jobAdId}></input> */}
        <div className="container">
          <div className="card border-info card-container">
            <div className="card-header">
              <div className="row">
                <div className="col-sm">
                  <h5 style={{ paddingTop: "9px" }} className="fas fa-list-alt">
                    {" "}
                    Job Seekers
                  </h5>
                </div>
              </div>
            </div>

            <div className="card-body" align="center">
              {jobSeekersList &&
                jobSeekersList.map(jobSeeker => {
                  return (
                    <div
                      id={jobSeeker.id}
                      key={jobSeeker.id}
                      className="col-md-6 col-12 job-ad-wrapper"
                    >
                      <div className="card job-ad text-body shadow rounded">
                        <div className="card-header">
                          <div className="row">
                            <div className="col-9">
                              {/* <i className="fas fa-thumbtack" /> {item.jobtitle} */}
                              {jobSeeker.key}
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
                              {jobSeeker.skills &&
                              jobSeeker.skills.length > 0 ? (
                                jobSeeker.skills.map(skill => {
                                  return (
                                    <span
                                      key={jobSeeker.id + "_" + skill.value}
                                      className="badge badge-danger mr-2"
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
                                jobSeeker.education
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
                                      className="badge badge-danger mr-2"
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
                                      className="badge badge-danger mr-2"
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
                            <div className="col-12">
                              <div className="row">
                                <div className="col-6">
                                  <Button
                                    outline
                                    color="success"
                                    className="w-100"
                                    onClick={this.slideSeekerUp}
                                  >
                                    <i className="fas fa-thumbs-up" />
                                  </Button>{" "}
                                </div>
                                <div className="col-6">
                                  <Button
                                    outline
                                    color="danger"
                                    className="w-100"
                                    onClick={this.slideSeekerDown}
                                  >
                                    <i className="fas fa-thumbs-down" />
                                  </Button>{" "}
                                </div>
                              </div>
                            </div>
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
  const jobSeekersList = state.firestore.ordered.jobseeker;
  const employerChoices = state.firestore.ordered.employerChoice;
  const EmployerjobSeekersList = _.differenceWith(jobSeekersList, employerChoices, function(
    jobseeker,
    employerChoice
  ) {
    const urlSplit = window.location.href.split("/");
    const jobAdId = urlSplit[urlSplit.length-1];
    return (jobseeker.id === employerChoice.jobSeekerId
      && jobAdId === employerChoice.jobAdId);
  });
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError,
    jobSeekersList: EmployerjobSeekersList
  };
};
const mapDispatchToProps = dispatch => {
  return {
    saveEmployerChoice: employerChoice =>
      dispatch(saveEmployerChoice(employerChoice))
  };
};
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
  ,
  firestoreConnect(props => {
    return [
      {
        collection: "jobseeker"
      },
      {
        collection: "employerChoice",
        where: [["employerId", "==", props.auth.uid || null]]
      }
    ];
  })
)(JobSeekers);
