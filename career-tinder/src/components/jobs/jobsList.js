import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { MDBAnimation } from "mdbreact";
import "../profile/profile.css";
import * as ROUTES from "../../constants/routes";
import JobDetails from "./JobDetails";

class JobsList extends Component {
  render() {
    const { jobs } = this.props;

    return (
      <div>
        <br></br>
        <div className="container"  rel="stylesheet" href="animate.min.css">
         
          
              <div className="row">
                <div className="col-12">
                  <h3 className="fas fa-list-alt mt-2" style={{paddingLeft:"5px"}}> Jobs List</h3>
                  
                  <NavLink 
                    type="button" 
                    
                    className=" btn-sm nav-link float-right navlink_button animated infinite pulse delay-1s" 
                   
                    to={ROUTES.CREATE_JOB_AD}
                  >
                    <b>Create Job Ad</b>
                  </NavLink>
                
                </div>
              </div>
            </div>
            <div className="card-body" align="center">
              <MDBAnimation type="zoomIn">
                <div className="row">
                  {jobs &&
                    jobs.map(job => {
                      return <JobDetails job={job} key={job.id} />;
                    })}
                </div>
              </MDBAnimation>
           
          </div>
        </div>
     
    );
  }
}

export default JobsList;
