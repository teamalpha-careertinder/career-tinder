import React, { Component } from "react";
import "../profile/profile.css";
import "../app/app.css";


class SeekerMatchedDetails extends React.Component
{
   
    render() {
        return (
           
            <div className="container ">
              <h4 className="mt-4 text-center font-weight-bold mb-4"><i className="far fa-address-card" /> Job Seeker Details </h4>
              
              <div className="card justify-content-center">
                <div class="card-header bg-info text-center text-white"><b>Job Seeker Name</b>
                </div>
                <div class="card-body ">
                    
                     <div className="col-lg-4 col-12">
                    <div className="form-group ">
                 
                  
                  <lable className="form-label no-space-break inline-label">Phone:</lable>
                  <br></br>
                  <lable className="form-label no-space-break inline-label">Address:</lable>
                  <br></br>
                  <lable className="form-label no-space-break inline-label">Date Of Birth:</lable>
                  <br></br>
                  <lable className="form-label no-space-break inline-label">Skills:</lable>
                  <br></br>
                  <lable className="form-label no-space-break inline-label">Education:</lable>
                  <br></br>
                  <lable className="form-label no-space-break inline-label">Languages:</lable>
                  <br></br>
                  <lable className="form-label no-space-break inline-label">City:</lable>
                  <br></br> <br></br>
                  <div class="card" style={{ flexDirection: 'column' , display: 'inline-flex'}}>
                    <div class="card-body">
                  <div className="card-title font-weight-bold  text-center text-white"
                  style={{backgroundColor: '#ff2d55'}}><b>Work Experience</b></div>
                  
                  <lable className="form-label no-space-break inline-label">Company Name:</lable>
                  <br></br>
                  <lable className="form-label no-space-break inline-label">Job Title:</lable>
                  <br></br>
                  <lable className="form-label no-space-break inline-label">From:</lable>
                  <br></br>
                  <lable className="form-label no-space-break inline-label">To:</lable>
                  <br></br>
                  <lable className="form-label no-space-break inline-label">Job Description:</lable>
                  <br></br>
                  <lable className="form-label no-space-break inline-label">Job Type While Working There:</lable>
                  </div>
                  </div>
                  <br></br>
                  <br></br>
                  <lable className="form-label no-space-break inline-label">EU Citizen:</lable>
                  <br></br>
                  <lable className="form-label no-space-break inline-label">Minimum expected salary(Euro):</lable>
                  <br></br>
                  <lable className="form-label no-space-break inline-label">Interested In:</lable>
                  </div>
                </div>   
              </div>
              
              </div>
              </div>
            
        );
    }
}
   
    export default SeekerMatchedDetails;
