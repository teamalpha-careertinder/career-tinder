import React from 'react';
import DatePicker from "react-datepicker";
import Select from 'react-select';
import { MDBInput, MDBIcon, MDBBtn } from "mdbreact";
import './profile.css';
import { connect } from "react-redux";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import { Alert } from 'reactstrap';
import EmailVerification from "../authentication/emailVerification";
import { editJobSeekerProfile } from '../../store/actions/profileAction';

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


class EditJobSeekerProfile extends React.Component {
    
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
        startDOBDate: '',
        startFromDate: '',
        startToDate: '',
        visible: false
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

    handleChange = (e) => {
      this.setState({
        [e.target.id]: e.target.value
      })
    }

    handleSelectChange = function(e) {
      var options = e.target.options;
      var value = [];
      for (var i = 0, l = options.length; i < l; i++) {
        if (options[i].selected) {
          value.push(options[i].value);
        }
      }
      this.props.someCallback(value);
    }

    handleChangeFT = () => {
      this.setState(prevState => ({
        applyingFullTime: !prevState.applyingFor_FullTime,
      }));
    }

    handleChangePT = () => {
      this.setState(prevState => ({
        applyingPartTime: !prevState.applyingFor_PartTime,
      }));
    }

    handleChangeEU = () => {
      this.setState(prevState => ({
        euCitizen: !prevState.euCitizen,
      }));
    }

    handleOptionChange = (changeEvent) => {
      this.setState({
        prevWorkJobType: changeEvent.target.value
      });
    }

    handleSubmit = (e) => {
      e.preventDefault();
      this.props.editJobSeekerProfile(this.state); 
    }

    onShowAlert = ()=>{
      this.setState({visible:true},()=>{
        window.setTimeout(()=>{
          this.setState({visible:false})
        },2000)
      });
    }

    render() {
      const { selectedSkills } = this.state;
      const { selectedLanguages } = this.state;
      const { auth } = this.props;
       
          

      if (!auth.uid) return <Redirect to="/login" />;
      return (
        <div className="job-seeker-profile">
          <Alert color="success" isOpen={this.state.visible}><i class="fas fa-check"></i> Profile updated!</Alert>
          <div className="profile-form-wrapper">        
            <div className="card border-info card-container">
              <div className="card-header">
                <i className="fas fa-users"></i> Update your Job Seeker profile
              </div>
              <div className="card-body text-info">
                <div className="tab-content" id="pills-tabContent">
                  <div className="tab-pane fade show active" id="pills-job-seeker" role="tabpanel" aria-labelledby="pills-job-seeker-tab">
                    <form className="profile-form" onSubmit={this.handleSubmit}>                    
                      <div className="row">
                        <div className="col-md-6 col-sm-12">
                          <div className="form-group">
                            <MDBInput id="jobSeekerName" label="Name" type="text" icon="pencil-alt" onChange={this.handleChange} />
                          </div>
                        </div>                      
                        <div className="col-md-6 col-sm-12">
                          <div className="form-group">
                            <MDBInput id="jobSeekerPhone" label="Phone" icon="mobile-alt" type="text" onChange={this.handleChange} />
                          </div>
                        </div>
                      </div>
                      <div className="row">            
                        <div className="col-sm-12">
                          <div className="form-group">
                            <MDBInput id="jobSeekeraddress" label="Address" icon="address-card" type="textarea" rows="1" onChange={this.handleChange} />
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
                            <label htmlFor="euCitizen">EU Citizen:</label>
                            <div className="form-check">
                              <input className="form-check-input" type="checkbox" checked={this.state.euCitizen} onChange={this.handleChangeEU} />
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
                              <input className="form-check-input" type="checkbox" checked={this.state.applyingFullTime} onChange={this.handleChangeFT} />
                              <label className="form-check-label" htmlFor="job_type_ft">
                                Full-time
                              </label>
                            </div>
                            <div className="form-check">
                              <input className="form-check-input" type="checkbox" checked={this.state.applyingPartTime} onChange={this.handleChangePT} />
                              <label className="form-check-label" htmlFor="job_type_pt">
                                Part-time
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-12">
                          <div className="form-group">
                            <MDBInput id="salaryRange" label="Salary range" icon="euro-sign" type="text" onChange={this.handleChange} />
                          </div>
                        </div>  
                      </div>   
                      <div className="row">
                        <div className="col-sm-12">
                          <div className="form-group">
                            <label htmlFor="work_experience">Work Experience:</label>
                            <div className="row">
                              <div className="col-md-6 col-sm-12">
                                <MDBInput id="companyName" label="Company name" type="text" icon="pencil-alt" onChange={this.handleChange} />
                              </div>
                              <div className="col-md-6 col-sm-12">
                                <MDBInput id="jobTitle" label="Job title" type="text" icon="pencil-alt" onChange={this.handleChange} />
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
                                <MDBInput id="jobDescription" label="Job description" type="text" icon="pencil-alt" onChange={this.handleChange} />
                              </div>
                              <div className="col-sm-12 mb-1">
                                <div className="form-inline">
                                  <div className="form-group">
                                    <label htmlFor="job_type"className="mr-2">Job type while working there:</label>
                                    <div className="form-check form-check-inline">
                                      <input className="form-check-input" type="radio" value="Full-time" checked={this.state.prevWorkJobType === 'Full-time'}  onChange={this.handleOptionChange} />
                                      <label className="form-check-label" htmlFor="job_type_ft">
                                        Full-time
                                      </label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                      <input className="form-check-input" type="radio" value="Part-time" checked={this.state.prevWorkJobType === 'Part-time'}  onChange={this.handleOptionChange} />
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
                      </div>    
                      <div className="row">
                        <div className="col-sm-12">
                          <MDBBtn color="primary" className="float-right" type="submit" onClick={()=>{this.onShowAlert()}}>
                            <i className="fas fa-save"></i> Save Profile
                          </MDBBtn>
                        </div>
                      </div>      
                    </form>  
                  </div>
                </div>  
              </div>
            </div>                  
          </div>  
        </div>          
      );
    }
  }


const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};

const mapDispatchToPropsJobseeker = dispatch => {
  // console.log(state);
  return {
    editJobSeekerProfile: (profile) => dispatch(editJobSeekerProfile(profile))
  }
};


export default 
  compose(EmailVerification,
    connect(mapStateToProps, mapDispatchToPropsJobseeker)
  )(EditJobSeekerProfile);
