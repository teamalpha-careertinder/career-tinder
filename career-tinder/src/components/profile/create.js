import React from 'react';
import DatePicker from "react-datepicker";
import Select from 'react-select';
import { MDBInput, MDBIcon, MDBBtn } from "mdbreact";
import './profile.css';
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";


const skills = [
  { value: 'php', label: 'PHP' },
  { value: 'asp.net', label: 'ASP.Net' },
  { value: 'java', label: 'Java' }
];

const languages = [
  { value: 'english', label: 'English' },
  { value: 'deutsche', label: 'Deutsche' },
  { value: 'italian', label: 'Italian' }
];


class CreateProfile extends React.Component {
    state = {
      selectedSkills: null,
      selectedLanguages: null,
    }
    handleSkillsChange = (selectedSkills) => {
      this.setState({ selectedSkills });
      console.log(`Option selected:`, selectedSkills);
    }
    handleLanguagesChange = (selectedLanguages) => {
      this.setState({ selectedLanguages });
      console.log(`Option selected:`, selectedLanguages);
    }

    constructor(props) {
      super(props);
      this.state = {
        startDOBDate: new Date(),
        startFromDate: new Date(),
        startToDate: new Date()
      };
      this.handleDOBDateChange = this.handleDOBDateChange.bind(this);
      this.handleFromDateChange = this.handleFromDateChange.bind(this);
      this.handleToDateChange = this.handleToDateChange.bind(this);
    }
  
    handleDOBDateChange(date) {
      this.setState({
        startDOBDate: date
      });
    }

    handleFromDateChange(date) {
      this.setState({
        startFromDate: date
      });
    }

    handleToDateChange(date) {
      this.setState({
        startToDate: date
      });
    }

    render() {
      const { selectedSkills } = this.state;
      const { selectedLanguages } = this.state;
      const { auth, user } = this.props;
       
          

      if (!auth.uid) return <Redirect to="/login" />;
      return (
        <div className="container">
          <div className="profile-form-wrapper">        
            <div className="card border-info mb-3">
              <div className="card-header">
                <MDBIcon icon="user" className="mr-1" /> Edit your profile
              </div>
              <div className="card-body text-info">
                <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                  <li className="nav-item">
                  {user && user.userType === "jobseeker" ?  
                    <a className="nav-link active" id="pills-job-seeker-tab" data-toggle="pill"  href="#pills-job-seeker" role="tab" aria-controls="pills-job-seeker" aria-selected="true">
                      <MDBIcon icon="users" className="mr-1" /> Job Seeker
                    </a>      
                   : 
                   <a className="nav-link active" id="pills-company-tab" data-toggle="pill" href="#pills-company" role="tab" aria-controls="pills-company" aria-selected="true">
                      <MDBIcon icon="user-tie" className="mr-1" /> Employer
                   </a>
                  }
                  </li>
                  
                </ul>
                <div className="tab-content" id="pills-tabContent">
                  {user && user.userType === "jobseeker" ?  
                  <div className="tab-pane fade show active" id="pills-job-seeker" role="tabpanel" aria-labelledby="pills-job-seeker-tab">
                    <form className="profile-form">
                      <div className="row">
                        <div className="col-md-6 col-sm-12">
                          <div className="form-group">
                            <div class="md-form">
                            
                            <MDBInput label="Name" type="text" icon="pencil-alt">
                            ::before 
                            </MDBInput> 
                          </div>
                          </div>
                        </div>                      
                        <div className="col-md-6 col-sm-12">
                          <div className="form-group">
                            <MDBInput label="Phone" icon="mobile-alt" type="text" />
                          </div>
                        </div>
                      </div>
                      <div className="row">            
                        <div className="col-sm-12">
                          <div className="form-group">
                            <MDBInput label="Address" icon="address-card" type="textarea" rows="1" />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-4 col-sm-12">
                          <div className="form-group datepicker">
                            <label>Date of birth:</label>
                            <div className="md-form">
                              <i className="fas fa-calendar-alt prefix"></i>
                              <DatePicker selected={this.state.startDOBDate} onChange={this.handleDOBDateChange} className="form-control" 
                                peekNextMonth showMonthDropdown showYearDropdown dropdownMode="select" />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4 col-sm-12">
                          <div className="form-group">
                            <label>Skills</label>
                            <Select
                              value={selectedSkills}
                              onChange={this.handleSkillsChange}
                              options={skills}
                              isMulti={true}
                            />
                          </div>
                        </div>
                        <div className="col-md-4 col-sm-12">
                          <div className="form-group">
                            <label>Languages</label>
                            <Select
                              value={selectedLanguages}
                              onChange={this.handleLanguagesChange}
                              options={languages}
                              isMulti={true}
                            />
                          </div>
                        </div>
                      </div>                           
                      <div className="row">                      
                        <div className="col-md-6 col-sm-12">
                          <div className="form-group">
                            <label htmlFor="eu_citizen">EU Citizen:</label>
                            <div className="form-check">
                              <input className="form-check-input" type="checkbox" value="" id="eu_citizen" />
                              <label className="form-check-label" htmlFor="eu_citizen">
                                Are you an EU Citizen?
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 col-sm-12">
                          <div className="form-group">
                            <label htmlFor="job_type">Employment type for this position:</label>
                            <div className="form-check">
                              <input className="form-check-input" type="checkbox" name="job_type" value="" id="job_type_ft" />
                              <label className="form-check-label" htmlFor="job_type_ft">
                                Full-time
                              </label>
                            </div>
                            <div className="form-check">
                              <input className="form-check-input" type="checkbox" name="job_type" value="" id="job_type_pt" />
                              <label className="form-check-label" htmlFor="job_type_pt">
                                Part-time
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>   
                      <div className="row">
                        <div className="col-sm-12">
                          <div className="form-group">
                            <label htmlFor="work_experience">Work Experience:</label>
                            <div className="row">
                              <div className="col-md-6 col-sm-12">
                                <MDBInput label="Company name" type="text" icon="pencil-alt" />
                              </div>
                              <div className="col-md-6 col-sm-12">
                                <MDBInput label="Job title" type="text" icon="pencil-alt" />
                              </div>
                              <div className="col-md-6 col-sm-12">
                                <div className="form-group datepicker">
                                  <label>From:</label>
                                  <div className="md-form">
                                    <i className="fas fa-calendar-alt prefix"></i>
                                    <DatePicker selected={this.state.startFromDate} onChange={this.handleFromDateChange} className="form-control" 
                                      peekNextMonth showMonthDropdown showYearDropdown dropdownMode="select" />
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-6 col-sm-12">
                                <div className="form-group datepicker">
                                  <label>To:</label>
                                  <div className="md-form">
                                    <i className="fas fa-calendar-alt prefix"></i>
                                    <DatePicker selected={this.state.startToDate} onChange={this.handleToDateChange} className="form-control" 
                                      peekNextMonth showMonthDropdown showYearDropdown dropdownMode="select" />
                                  </div>
                                </div>
                              </div>
                              <div className="col-sm-12">
                                <MDBInput label="Job description" type="text" icon="pencil-alt" />
                              </div>
                              <div className="col-sm-12 mb-1">
                                <div className="form-inline">
                                  <div className="form-group">
                                    <label htmlFor="job_type"className="mr-2">Job type while working there:</label>
                                    <div className="form-check form-check-inline">
                                      <input className="form-check-input" type="radio" name="we_job_type" value="" id="job_type_ft" />
                                      <label className="form-check-label" htmlFor="job_type_ft">
                                        Full-time
                                      </label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                      <input className="form-check-input" type="radio" name="we_job_type" value="" id="job_type_pt" />
                                      <label className="form-check-label" htmlFor="job_type_pt">
                                        Part-time
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-sm-12">
                                <MDBBtn color="success" className="btn-sm">
                                  <MDBIcon icon="plus" className="mr-1" /> Add work experience
                                </MDBBtn>
                              </div>
                            </div>
                          </div>
                        </div>   
                        <div className="col-sm-12">
                          <div className="form-group">
                            <MDBInput label="Salary range" icon="euro-sign" type="text" />
                          </div>
                        </div>                   
                      </div>    
                      <div className="row">
                        <div className="col-sm-12">
                          <MDBBtn outline color="info" className="float-right">
                            <i className="fas fa-save"></i> Save Job Seeker Profile
                          </MDBBtn>
                        </div>
                      </div>      
                    </form>  
                  </div>
                    : 
                  <div className="tab-pane fade show active" id="pills-company" role="tabpanel" aria-labelledby="pills-company-tab">
                    <form className="profile-form">
                        <div className="row">
                          <div className="col-md-6 col-sm-12">
                            <div className="form-group">
                              <MDBInput label="Employer Name" icon="pencil-alt" type="text" />
                            </div>
                          </div>
                          <div className="col-md-6 col-sm-12">
                            <div className="form-group">
                              <MDBInput label="Industry" type="text" icon="industry" />
                            </div>
                          </div>
                        </div>
                        <div className="row">            
                          <div className="col-md-6 col-sm-12">
                            <div className="form-group">
                              <MDBInput label="Employer Address" type="textarea" rows="1" icon="address-card" />
                            </div>
                          </div>
                          <div className="col-md-6 col-sm-12">
                            <div className="form-group">
                              <MDBInput label="Employer Description" type="textarea" rows="1" icon="comment-alt" />
                            </div>
                          </div>
                        </div>   
                        <div className="row">
                          <div className="col-md-4 col-sm-12">
                            <div className="form-group">
                              <MDBInput label="Contact Name" type="text" icon="pencil-alt" />
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-12">
                            <div className="form-group">
                              <MDBInput label="Contact Email" type="email" icon="envelope" />
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-12">
                            <div className="form-group">
                              <MDBInput label="Contact Phone" type="text" icon="mobile-alt" />
                            </div>
                          </div>
                        </div>                         
                        <div className="row">
                          <div className="col-sm-12">
                            <MDBBtn outline color="info" className="float-right">
                              <i className="fas fa-save"></i> Save Employer Profile
                            </MDBBtn>
                          </div>
                        </div>        
                      </form>  
                  </div>
                  }
                </div>  
              </div>
            </div>                  
          </div>  
        </div>          
      );
    }
  }


const mapStateToProps = (state) => {
  const auth = state.firebase.auth;
  const users = state.firestore.data.users;
  const user= users ? users[auth.uid] : null;
  return {
    user: user,
    auth: auth
  }
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{
    collection: 'users'
  }])
)(CreateProfile);

