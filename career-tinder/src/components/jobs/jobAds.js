import React, { Component } from "react";
import * as ROUTES from "../../constants/routes";
import $ from "jquery/src/jquery";
import { Button } from "reactstrap";
import { connect } from "react-redux";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import "./jobs.css";
import { saveUserChoice } from '../../store/actions/jobAddActions';

const jobSeekerChoiceEntity = {
  jobAdID: null,
  jobSeekerID: null,
  like_dislike: Boolean,
}

class JobAds extends Component {

  //function to save on DB the relation between job add and user's like or dislike:
  processLikeDisLike(userAction, jobAdID, jobSeekerID) {
    //userAction: true ->User likes company // false->user dislikes company
    var jobSeekerChoice = jobSeekerChoiceEntity;
    jobSeekerChoice.jobAdID = jobAdID;
    jobSeekerChoice.jobSeekerID = jobSeekerID;
    jobSeekerChoice.like_dislike = userAction;
    //console.log(`processLike: `, jobSeekerChoice, jobSeekerID);
    this.props.saveUserChoice(jobSeekerChoice);
  };

  slideAdUp = e => {

    var id = $(e.target)[0].closest(".job-ad-wrapper").id;
    //call the managment of (Dis)Likes to be store on DB:
    this.processLikeDisLike(true,id, this.props.auth.uid);

    $("#" + id)
      .animate({ right: "2000px" }, "slow")
      .slideUp(500);
  };

  slideAdDown = e => {

    var id = $(e.target)[0].closest(".job-ad-wrapper").id;
    //call the managment of (Dis)Likes to be store on DB:
    this.processLikeDisLike(false,id, this.props.auth.uid);

    $("#" + id)
      .animate({ left: "2000px" }, "slow")
      .slideUp(500);
  };

  render() {
    const { auth } = this.props;
    if (!auth.uid && !auth.emailVerified)
      return <Redirect to={ROUTES.LOG_IN} />;
    return (
      <div className="container">
        <div className="row job-ads-wrapper mb-3">
          <div id="R4qTKiDrh4af3oKsJ0iR" className="col-md-6 col-12 job-ad-wrapper"> {/*this is temporal: id must contain de id of document JobPosting from DB*/}
            <div className="card job-ad text-body shadow rounded">
              <div className="card-header">
                <div className="row">
                  <div className="col-9">
                    <i className="fas fa-thumbtack" aria-hidden="true"></i> Software Developer
                  </div>
                  <div className="col-3">
                    <i className="fas fa-heart wishlist-selector float-right d-none" />
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-12">
                    <b>
                      <i className="fas fa-certificate" /> Type:
                    </b>{" "}
                    Full-time
                  </div>
                  <div className="col-12">
                    <b>
                      <i className="fas fa-euro-sign" /> Salary:
                    </b>{" "}
                    40000-50000
                  </div>
                  <div className="col-12">
                    <b>
                      <i className="fas fa-building" /> Company:
                    </b>{" "}
                    SAP
                  </div>
                  <div className="col-12">
                    <b>
                      <i className="fas fa-calendar-alt" /> Start:
                    </b>{" "}
                    01.10.2019
                  </div>
                  <div className="col-12">
                    <b>
                      <i className="fas fa-graduation-cap" /> Education:
                    </b>{" "}
                    B. Sc. Computer Science and Engineering
                  </div>
                  <div className="col-12">
                    <b className="mr-2">
                      <i className="fas fa-check-double" /> Skills:
                    </b>
                    <span className="badge badge-danger mr-2">Java</span>
                    <span className="badge badge-danger mr-2">SQL</span>
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
          <div id="aC3zImvOJbdvTHzUC7QB" className="col-md-6 col-12 job-ad-wrapper"> {/*this is temporal: id must contain de id of document JobPosting from DB*/}
            <div className="card job-ad text-body shadow rounded">
              <div className="card-header">
                <div className="row">
                  <div className="col-9">
                  <i className="fas fa-thumbtack" aria-hidden="true"></i> Software Developer
                  </div>
                  <div className="col-3">
                    <i className="fas fa-heart wishlist-selector float-right d-none" />
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-12">
                    <b>
                      <i className="fas fa-certificate" /> Type:
                    </b>{" "}
                    Full-time
                  </div>
                  <div className="col-12">
                    <b>
                      <i className="fas fa-euro-sign" /> Salary:
                    </b>{" "}
                    40000-50000
                  </div>
                  <div className="col-12">
                    <b>
                      <i className="fas fa-building" /> Company:
                    </b>{" "}
                    SAP
                  </div>
                  <div className="col-12">
                    <b>
                      <i className="fas fa-calendar-alt" /> Start:
                    </b>{" "}
                    01.10.2019
                  </div>
                  <div className="col-12">
                    <b>
                      <i className="fas fa-graduation-cap" /> Education:
                    </b>{" "}
                    B. Sc. Computer Science and Engineering
                  </div>
                  <div className="col-12">
                    <b className="mr-2">
                      <i className="fas fa-check-double" /> Skills:
                    </b>
                    <span className="badge badge-danger mr-2">Java</span>
                    <span className="badge badge-danger mr-2">SQL</span>
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
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const auth = state.firebase.auth;
  return {
    auth: auth
  };
};

const mapDispatchToPropsJobseeker = dispatch => {
  // console.log(state);
  return {
    saveUserChoice: (jobSeekerChoice) => dispatch(saveUserChoice(jobSeekerChoice))
  }
};

export default compose(connect(mapStateToProps,mapDispatchToPropsJobseeker))(JobAds);
