import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import "../profile/profile.css"
import { jobDeleteActions } from "../../store/actions/jobAdActions"
import { connect } from "react-redux";

class JobDetails extends Component{

    handleDeleteAction = e => {
      var jobId = e.target.getAttribute('data-jobid')
      this.props.jobDeleteActions(jobId);
    }
  
    render(){
      const {job} = this.props;
      return (
        <div class="col-sm-6">
          <div class="card border-success mb-3" style={{ maxwidth: '18rem' }}>
            <h5 class="card-header">{job.jobtitle}</h5>
            <div class="card-body text-dark">
              <h5 class="card-title">{job.employername}</h5>
              <br></br>
              <p class="card-text">
                <div class="btn-group flex-wrap">
  
                  <button type="button" id="btnMatch" class="btn btn-outline-success mr-3 btn-sm" >Match</button>
                  <NavLink type='button' class="btn btn-outline-dark mr-3 btn-sm" to={{
                        pathname: '/create-job-ad',
                        jobAd: {
                          id: job.id
                        }
                      }}>
                    <b>MODIFY</b>
                  </NavLink>
                  <button type="button" id="btnDelete" data-jobid={job.id} class="btn btn-outline-danger mr-3 btn-sm" onClick={this.handleDeleteAction}>Delete</button>
                  
                </div>
  
  
              </p>
            </div>
          </div>
        </div>
      ) 
    }
  }
  
  const mapStateToProps = (state) => {
    return {
      auth: state.firebase.auth
    }
  }

  const mapDispatchToProps = dispatch => {
    return {
      jobDeleteActions: jobAd => dispatch(jobDeleteActions(jobAd))
    };
  };

  export default connect(mapStateToProps, mapDispatchToProps)(JobDetails)