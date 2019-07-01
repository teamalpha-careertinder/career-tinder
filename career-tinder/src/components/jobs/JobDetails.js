import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "../profile/profile.css";
import { jobDeleteActions } from "../../store/actions/jobAdActions";
import swal from "sweetalert";
import { connect } from "react-redux";
import * as ROUTES from "../../constants/routes";

class JobDetails extends Component {
  handleDeleteAction = jobId => {
    swal({
      text: "Are you sure you want to delete ?",
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then(willDelete => {
      if (willDelete && jobId !== null) {
        this.props.jobDeleteActions(jobId);
        swal("Job Ad Deleted Successfully!", {
          icon: "success"
        });
      }
    });
  };

  render() {
    const { job } = this.props;
    return (
      <div className="col-sm-6">
        <div className="card border mb-3" style={{ maxwidth: "18rem" }}>
          <h5 className="card-header" style={{backgroundColor:'#14789d'}}>{job.jobtitle}</h5>
          <div className="card-body text-dark">
            <h5 className="card-title">{job.employername}</h5>
            <br />
            <div className="card-text">
              <div className="btn-group flex-wrap">
                <NavLink
                  type="button"
                  id="btnMatch"
                  
                  className="btn thumbs_button mr-3 btn-sm "
                  to={{
                    pathname: ROUTES.EMPLOYER_MATCHES + "/" + job.id,
                    job: job
                  }}
                >
                  <i
                    className="far fa-thumbs-up"
                    style={{ fontSize: "18px", color: "white" }}
                  />
                </NavLink>
                <NavLink
                  type="button"
                  className="btn edit_button mr-3 btn-sm"
                  to={{
                    pathname: "/create-job-ad",
                    job: job
                  }}
                >
                  <div>
                    <i
                      className="fas fa-edit"
                      style={{ fontSize: "18px", color: "white" }}
                    />
                  </div>
                </NavLink>
              
                <button
                  type="button"
                  id="btnDelete"
                  className="btn delete_button mr-3 btn-sm"
                  onClick={e => this.handleDeleteAction(job.id)}
                >
                  <i
                    className="fas fa-trash-alt"
                    style={{ fontSize: "18px", color: "white" }}
                  />
                </button>

                <NavLink
                  type="button"
                  className="btn group_button mr-3 btn-sm"
                  to={{
                    pathname:
                      ROUTES.JOB_SEEKERS_LIST_FOR_EMPLOYER + "/" + job.id,
                    job: job
                  }}
                >
                  <i
                    className="fas fa-users"
                    style={{ fontSize: "18px", color: "white" }}
                  />
                </NavLink>
              </div>
            </div>
          </div>
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

const mapDispatchToProps = dispatch => {
  return {
    jobDeleteActions: jobAd => dispatch(jobDeleteActions(jobAd))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JobDetails);
