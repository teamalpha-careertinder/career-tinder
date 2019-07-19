import React, { Component } from "react";
import "../profile/profile.css";
import "../app/app.css";


class JobMatchedDetails extends React.Component
{
   
    render() {
        return ( <div className="container page-wrapper">
        <div className="card-container ">
          <h4 className="mt-4 text-center font-weight-bold mb-4"><i className="far fa-address-card" /> Job Details </h4>
          <div className="card justify-content-center">
            <div class="card-header text-center text-white bg-info"><b>Job Title</b>
            </div>
            <div class="card-body ">
                
                 <div className="col-lg-4 col-12">
                <div className="form-group ">
             
              
              <lable className="form-label no-space-break inline-label">Employment Type:</lable>
              <br></br>
              <lable className="form-label no-space-break inline-label">Needed Skills:</lable>
              <br></br>
              <lable className="form-label no-space-break inline-label">Job Location:</lable>
              <br></br>
              <lable className="form-label no-space-break inline-label">Education:</lable>
              <br></br>
              <lable className="form-label no-space-break inline-label">Required Languages:</lable>
              <br></br>
              <lable className="form-label no-space-break inline-label">Expected Minimum Salary(Yearly):</lable>
              <br></br>
              <lable className="form-label no-space-break inline-label">Expected Maximum Salary(Yearly):</lable>
              <br></br>
              <lable className="form-label no-space-break inline-label">Description:</lable>
              <br></br> <br></br>
              <div class="card " style={{ flexDirection: 'column' , display: 'inline-flex'}}>
                <div class="card-body ">
              <div className="card-title font-weight-bold  text-center text-white" style={{backgroundColor: '#ff2d55'}}><b> Benefits</b></div>
              
              <lable className="form-label no-space-break inline-label">Offer details:</lable>
              </div>
              </div>
              <br></br>          <br></br>
              <lable className="form-label no-space-break inline-label">Expected Start Date:</lable>
              <br></br>
              <lable className="form-label no-space-break inline-label">Expiration Date:</lable>
              <br></br>
              
              </div>
            </div>   
          </div>
          </div>
          </div>
          </div>
    );

    }
}
export default JobMatchedDetails;