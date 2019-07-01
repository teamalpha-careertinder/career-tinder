import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "../profile/profile.css";
import * as ROUTES from "../../constants/routes";
import JobDetails from "./JobDetails";
import { Animated } from "react-animated-css";

class JobsList extends Component {
  render() {
    const { jobs } = this.props;
    
    return (
      <div className="page-wrapper">
        <div className="job-ads-header row mt-2">
          <div className="col-12">
            <h6 className="jobs-heading float-left"><i className="fas fa-list"></i> Jobs List</h6>
            <Animated animationIn="pulse" isVisible={true}>
              <NavLink
                className="btn btn-info btn-sm nav-link float-right"
                to={ROUTES.CREATE_JOB_AD}
              >
                <i className="fas fa-plus"></i> Create Job Ad
              </NavLink>
            </Animated>
          </div>
        </div>
        <div className="row">
          {jobs &&
            jobs.map(job => {
              return <JobDetails job={job} key={job.id} />;
            })}
        </div>
        <div className="job-ad-create-floater">
          <Animated animationIn="pulse infinite" isVisible={true}>
            <NavLink
              className="btn btn-warning btn-circle"
              to={ROUTES.CREATE_JOB_AD}
            >
              <i className="fas fa-plus"></i>
            </NavLink>
          </Animated>
        </div>
      </div>
    );
  }
}

export default JobsList;
