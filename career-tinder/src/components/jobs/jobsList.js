import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import { MDBAnimation } from "mdbreact";
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

              <div class="row">
                <div class="col-sm">
                  <h5 style={{ paddingTop: '9px' }} className="fas fa-list-alt">  Jobs List
     </h5>
                  <NavLink type='button' style={{ float: 'right' }} class="btn btn-primary btn-sm" className="nav-link" to={ROUTES.CREATE_JOB_AD}>
                    <b>Create Job Ad</b>
                  </NavLink>


                </div>



              </div>


            </div>

            <div class="card-body" align="center">


              <MDBAnimation type="zoomIn">

                { jobs && jobs.map(job => {
                  return (
                    <JobDetails job={job} key={job.id} />
                  )
                })} 
              </MDBAnimation>

            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default JobsList;
