import React, { Component } from "react";
import * as ROUTES from "../../constants/routes";
import $ from "jquery/src/jquery";
import { Button } from "reactstrap";
import { connect } from "react-redux";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import "./jobs.css";
import { saveUserChoice } from "../../store/actions/jobAdActions";
import { firestoreConnect } from "react-redux-firebase";
import _ from "lodash";
import addScoreToJobPost from "./relevancyFactorCalculator"
import moment from "moment"

const jobSeekerChoiceEntity = {
  jobAdId: null,
  jobSeekerId: null,
  isLiked: Boolean
};

class JobAds extends Component {
  constructor(props) {
    super(props);

    this.state = {
      badges: ["primary", "warning", "info", "danger", "success"]
    };
  }

  //function to save on DB the relation between job add and user's like or dislike:
  processLikeDisLike(userAction, jobAdId, jobSeekerId) {
    //userAction: true ->User likes company // false->user dislikes company
    var jobSeekerChoice = jobSeekerChoiceEntity;
    jobSeekerChoice.jobAdId = jobAdId;
    jobSeekerChoice.jobSeekerId = jobSeekerId;
    jobSeekerChoice.isLiked = userAction;
    this.props.saveUserChoice(jobSeekerChoice);
  }

  slideAdUp = e => {
    var id = $(e.target)[0].closest(".job-ad-wrapper").id;
    $("#" + id)
      .animate({ right: "2000px" }, "slow")
      .slideUp(500);
    //call the managment of (Dis)Likes to be store on DB:
    setTimeout(
      function() {
        //Start the timer
        this.processLikeDisLike(true, id, this.props.auth.uid);
      }.bind(this),
      1000
    );
  };

  slideAdDown = e => {
    var id = $(e.target)[0].closest(".job-ad-wrapper").id;
    $("#" + id)
      .animate({ left: "2000px" }, "slow")
      .slideUp(500);
    //call the managment of (Dis)Likes to be store on DB:
    setTimeout(
      function() {
        //Start the timer
        this.processLikeDisLike(false, id, this.props.auth.uid);
      }.bind(this),
      1000
    );
  };

  

  render() {
    const { auth, userJobPosting, jobseeker } = this.props;

    if(userJobPosting && userJobPosting.length && jobseeker)
    {
      addScoreToJobPost(jobseeker, userJobPosting)
      userJobPosting.sort(function(a, b) {
        return b.relevancyScore - a.relevancyScore || moment(b.createdAt) - moment(a.createdAt);
      });
    }
    console.log("after sorting--------total item: "+userJobPosting.length)
    // console.log(userJobPosting)

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
                            item.neededskills.map((child, i) => {
                              i = i % 5;
                              return (
                                <span
                                  key={child.value}
                                  className={
                                    "badge badge-" +
                                    this.state.badges[i] +
                                    " mr-2"
                                  }
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
                        <hr />
                        <div className="col-12">
                          <div className="row">
                            <div className="col-6">
                              <Button
                                outline
                                color="success"
                                className="w-100"
                                onClick={this.slideAdUp}
                              >
                                <i className="fas fa-thumbs-up" />
                              </Button>{" "}
                            </div>
                            <div className="col-6">
                              <Button
                                outline
                                color="danger"
                                className="w-100"
                                onClick={this.slideAdDown}
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
    );
  }
}

const mapStateToProps = state => {
  const auth = state.firebase.auth;
  const jobposting = state.firestore.ordered.jobposting;
  const jobseekerChoice = state.firestore.ordered.jobSeekerChoice;//console.log(auth)
  let userid = auth.uid;
  let jobseekers = state.firestore.data.jobseeker;
  let jobseeker = jobseekers && userid ? jobseekers[userid] : null;
  const userJobPosting = _.differenceWith(jobposting, jobseekerChoice, function(
    jobpost,
    jobseekerchoice
  ) {
    return jobpost.id === jobseekerchoice.jobAdId;
  });

  return {
    userJobPosting: userJobPosting,
    uid: auth.uid,
    auth: auth,
    jobseeker: jobseeker
  };
};

const mapDispatchToPropsJobseeker = dispatch => {
  return {
    saveUserChoice: jobSeekerChoice => dispatch(saveUserChoice(jobSeekerChoice))
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToPropsJobseeker
  ),
  firestoreConnect(props => {
    return [
      {
        collection: "jobSeekerChoice",
        where: [["jobSeekerId", "==", props.uid || null]]
      },
      {
        collection: "jobposting",
        orderBy: ["createdAt", "desc"]
      }
    ];
  })
)(JobAds);
