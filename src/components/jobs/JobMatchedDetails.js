import React, { Component } from "react";
import "../profile/profile.css";
import "../app/app.css";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import * as ROUTES from "../../constants/routes";
import { Redirect } from "react-router-dom";
import ReactMoment from "react-moment";

class JobMatchedDetails extends React.Component
{
   
    render() {
      const { auth, jobAdList, jobAdId } = this.props;
      if (!auth.uid && !auth.emailVerified)
      return <Redirect to={ROUTES.LOG_IN} />;
      if (jobAdList) {
        const jobAd = jobAdList[jobAdId]; // jobAd is an array of 1. We need to take the first object
       // console.log("jobSeeker ",jobSeeker);
      
        return ( <div className="container page-wrapper">
        <div className="card-container ">
          <h4 className="mt-4 text-center font-weight-bold mb-4"><i className="far fa-address-card" /> Job Details </h4>
          <div className="card justify-content-center">
            <div class="card-header text-center text-white bg-info"><b>
              {jobAd.jobtitle ? jobAd.jobtitle : ""}</b>
            </div>
            <div class="card-body ">
                 <div className="col-12">
                <div className="form-group ">
              <lable className="form-label no-space-break inline-label">Job Type: </lable>
                {jobAd.applyfulltime ? "Fulltime" : "" }
                {jobAd.applyfulltime && jobAd.applypartime ? " - " : "" }
                {jobAd.applypartime ? "Partime" : "" }
              <br></br>
              <lable className="form-label no-space-break inline-label">Needed Skills: </lable>
              {jobAd.neededskills && jobAd.neededskills.length > 0 ? (
                jobAd.neededskills.map(skill => {
                    return (
                        <span
                          key={jobAd.id + "_" + skill.value}
                          className="badge badge-warning mr-2"
                        >
                          {skill.label}
                        </span>
                      );
                    })
                    ) : (
                      <i className="fas fa-ban text-muted" />
                    )}
              <br></br>
              <lable className="form-label no-space-break inline-label">Job Locations: </lable>
                {jobAd.location && jobAd.location.length > 0 ? (
                  jobAd.location.map((loc, index) => {
                    return (
                        loc.label + ((index + 1) == jobAd.location.length ? "" : " - ")
                      );
                    })
                ) : (
                  <i className="fas fa-ban text-muted" />
                )}

              <br></br>
              <lable className="form-label no-space-break inline-label">Education: </lable> 
                {jobAd.education && jobAd.education.label ? jobAd.education.label : (<i className="fas fa-ban text-muted" />) }
              <br></br>
              <lable className="form-label no-space-break inline-label">Required Languages: </lable>
                {jobAd.languages &&
                  jobAd.languages.length > 0 ? (
                    jobAd.languages.map(lang => {
                          return (
                            <span
                              key={lang.value}
                              className="badge badge-warning mr-2"
                            >
                              {lang.label}
                            </span>
                          );
                        })
                      ) : (
                        <i className="fas fa-ban text-muted" />
                    )}
              <br></br>
              <lable className="form-label no-space-break inline-label">Expected Minimum Salary (Yearly): </lable>
                {jobAd.minsalary ? jobAd.minsalary : (<i className="fas fa-ban text-muted" />) }
              <br></br>
              <lable className="form-label no-space-break inline-label">Expected Maximum Salary(Yearly): </lable>
                {jobAd.maxsalary ? jobAd.maxsalary : (<i className="fas fa-ban text-muted" />) }
              <br></br>
              <lable className="form-label no-space-break inline-label">Description: </lable>
                {jobAd.jobdescription ? jobAd.jobdescription : ""}
              <br></br> 
              {jobAd.benefits &&
                jobAd.benefits.length > 0 ? (
                      <>
                        <div class="card " style={{ flexDirection: 'column' , display: 'inline-flex'}}>
                          <div class="card-body ">
                            <div className="card-title font-weight-bold  text-center text-white" style={{backgroundColor: '#ff2d55'}}><b> Benefits</b></div>
                            {jobAd.benefits.map((ben, index) => {
                              return (
                                <div>{(index+1) + "." + ben.benefitOffer}</div>
                              )})}
                          </div>
                        </div>
                        <br></br> 
                      </>
                        )
                  : ( <><lable className="form-label no-space-break inline-label">Benefits: </lable>
                          <i className="fas fa-ban text-muted" />
                      </>
                    )
              }
              <br></br> 
              <lable className="form-label no-space-break inline-label">Expected Start Date: </lable>
                {jobAd.expectedstartdate &&
                  jobAd.expectedstartdate.toDate().toLocaleString() ? (
                      <ReactMoment format="MMM DD, YYYY">
                        {jobAd.expectedstartdate.toDate().toLocaleString()}
                      </ReactMoment>
                    ) : (
                      <i className="fas fa-ban text-muted" />
                    )}  
              <br></br>
              <lable className="form-label no-space-break inline-label">Expiration Date:</lable>
                {jobAd.expirationdate &&
                  jobAd.expirationdate.toDate().toLocaleString() ? (
                      <ReactMoment format="MMM DD, YYYY">
                        {jobAd.expirationdate.toDate().toLocaleString()}
                      </ReactMoment>
                    ) : (
                      <i className="fas fa-ban text-muted" />
                    )}  
              <br></br>
              
              </div>
            </div>   
          </div>
          </div>
          </div>
          </div>
        );
      }
      else {
        return (
          <div className="container">
            <h4 className="mt-4 text-center font-weight-bold mb-4">
              <i className="far fa-address-card" /> Job Details 
            </h4>
          </div>
        );
      }
  }
}

const mapStateToProps = state => {
  const urlSplit = window.location.href.split("/");
  const jobAdId = urlSplit[urlSplit.length - 1];
  //console.log("state ",state);
  return {
    uid: state.firebase.auth.uid,
    auth: state.firebase.auth,
    authError: state.auth.authError,
    jobAdId: jobAdId,
    jobAdList: state.firestore.data.jobposting
  };
};

const mapDispatchToPropsJobseeker = dispatch => {
  return {};
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToPropsJobseeker
  ),
  firestoreConnect(props => {
    return [
      {
        collection: "jobposting",
        doc: props.jobAdId 
      }
    ];
  })
)(JobMatchedDetails);