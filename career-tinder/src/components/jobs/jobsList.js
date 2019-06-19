import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import { Container,MDBAnimation } from "mdbreact";
import "../profile/profile.css"
import * as ROUTES from "../../constants/routes";
import JobDetails from "./JobDetails"


class JobsList extends Component {
  render() {

    const { jobs } = this.props;

    return (
      <div>
        <div className="container" >        
          <div className="card border-info card-container" >
            <div className="card-header">
              <div className="row">
                <div className="col-12">
                  <h5 className="fas fa-list-alt mt-2"> Jobs List</h5>
                  <NavLink type='button' className="btn btn-primary btn-sm nav-link float-right" to={ROUTES.CREATE_JOB_AD}>
                    <b>Create Job Ad</b>
                  </NavLink>
                </div>
              </div>
            </div>
            <div className="card-body" align="center">
              <MDBAnimation type="zoomIn">
                <div className='row'>
                  { jobs && jobs.map(job => {
                    return (
                      <JobDetails job={job} key={job.id} />
                    )
                  })} 
                </div>
              </MDBAnimation>      
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default JobsList;
