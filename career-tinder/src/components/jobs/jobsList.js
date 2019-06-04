import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import { MDBAnimation } from "mdbreact";
import "../profile/profile.css"
import * as ROUTES from "../../constants/routes";


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


const JobDetails = ({job}) => {

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
              <button type="button" id="btnModify" class="btn btn-outline-dark mr-3 btn-sm">Modify</button>
              <button type="button" id="btnDelete" class="btn btn-outline-danger mr-3 btn-sm">Delete</button>
            </div>


          </p>
        </div>
      </div>
    </div>
  ) 
}

export default JobsList;
