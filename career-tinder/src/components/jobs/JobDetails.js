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
        <div className="col-sm-6">
          <div className="card border mb-3" style={{ maxwidth: '18rem' }}>
            <h5 className="card-header">{job.jobtitle}</h5>
            <div className="card-body text-dark">
              <h5 className="card-title">{job.employername}</h5>
              <br></br>
              <div className="card-text">
                <div className="btn-group flex-wrap">
  
                  <button type="button" id="btnMatch" className="btn btn-outline-success mr-3 btn-sm" >
                  <i class="far fa-thumbs-up" style={{fontSize: '18px',color: 'green' }} ></i>
                  </button>
                  <NavLink type='button' className="btn btn-outline-dark mr-3 btn-sm" to={{
                        pathname: '/create-job-ad',
                        job: job
                        
                      }}>
                        <div>
                        <i class="fas fa-edit" style={{fontSize: '18px',color: '#36B5E5' }}></i>
                        </div>
                  
                  </NavLink>
                  <button type="button" id="btnDelete" data-jobid={job.id} className="btn btn-outline-danger mr-3 btn-sm" onClick={this.handleDeleteAction}>
                  <i class="fas fa-trash-alt" style={{fontSize: '18px',color: 'red' }} ></i>
                  </button>
                  
                  <button type="button" id="btnjobseekerlist"  className="btn btn-outline-blue mr-3 btn-sm" >
                  <i class="fas fa-users" style={{fontSize: '18px',color: 'blue' }} ></i>
                  </button>
                  
                </div>
  
  
              </div>
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