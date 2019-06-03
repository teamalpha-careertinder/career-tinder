import React, { Component } from 'react';
import { connect } from "react-redux";
import { NavLink ,Route} from "react-router-dom";
import { compose } from "redux";
import { MDBModal, MDBModalBody, MDBAnimation, MDBModalHeader, MDBModalFooter, MDBContainer, MDBRow, MDBCol, MDBCardBody, MDBCardHeader, MDBCardFooter, MDBCard, MDBBtnGroup, MDBBtn } from "mdbreact";
import CreateJobAds from "./createJobAds"
import "../profile/profile.css"
import * as ROUTES from "../../constants/routes";


class JobsList extends React.Component {
  render() {
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
                <Jobs />
              </MDBAnimation>




            </div>



          </div>
        </div>

      </div>
    )
  }

}


class Jobs extends React.Component {
  render() {
    return (




      <div class="row">
        <div class="col-sm-6">
          <div class="card border-success mb-3" style={{ maxwidth: '18rem' }}>
            <h5 class="card-header">Senior Software Developer</h5>
            <div class="card-body text-dark">
              <h5 class="card-title">Microsoft</h5>
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



        <div class="col-sm-6">
          <div class="card border-success mb-3" style={{ maxwidth: '18rem' }}>
            <h5 class="card-header">Junior Software Developer</h5>
            <div class="card-body text-dark">
              <h5 class="card-title">Google</h5>
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
      </div>

    )
  }

}




export default JobsList;
