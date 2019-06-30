import React from "react";
import { MDBInput, MDBBtn } from "mdbreact";
import DatePicker from "react-datepicker";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import { Alert } from "reactstrap";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import {
  jobAdActions,
  jobUpdateActions
} from "../../store/actions/jobAdActions";
import cities from "../../constants/city";
import * as ROUTES from "../../constants/routes";
import { Redirect } from "react-router-dom";

const skills = [
  { value: "php", label: "PHP" },
  { value: "asp.net", label: "ASP.Net" },
  { value: "java", label: "Java" },
  { value: "pyhton", label: "Python" },
  { value: "react", label: "React" },
  { value: "angular", label: "Angular" }
];

class CreateJobAds extends React.Component {
  handleSkillsChange = neededskills => {
    this.setState({ neededskills });
  };
  handleLocationChange = location => {
    this.setState({ location });
  };
  getPickerValue = value => {
    console.log(value);
  };

  constructor(props) {
    super(props);
    this.state = {
      jobtitle: "",
      neededskills: "",
      applypartime: false,
      applyfulltime: false,
      minsalary: "",
      maxsalary: "",
      jobdescription: "",
      education: "",
      expectedstartdate: "",
      expirationdate: "",
      visible: false,
      location: ''
    };
    this.onShowAlert = this.onShowAlert.bind(this);
    if (this.props.location.job) {
      var modifiableJobAd = this.props.location.job;
      if (modifiableJobAd.id) this.state.id = modifiableJobAd.id;
      if (modifiableJobAd.jobtitle)
        this.state.jobtitle = modifiableJobAd.jobtitle;
      if (modifiableJobAd.neededskills)
        this.state.neededskills = modifiableJobAd.neededskills;
      if (modifiableJobAd.applypartime)
        this.state.applypartime = modifiableJobAd.applypartime;
      if (modifiableJobAd.applyfulltime)
        this.state.applyfulltime = modifiableJobAd.applyfulltime;
      if (modifiableJobAd.minsalary)
        this.state.minsalary = modifiableJobAd.minsalary;
      if (modifiableJobAd.maxsalary)
        this.state.maxsalary = modifiableJobAd.maxsalary;
      if (modifiableJobAd.jobdescription)
        this.state.jobdescription = modifiableJobAd.jobdescription;
      if (modifiableJobAd.education)
        this.state.education = modifiableJobAd.education;
      if (modifiableJobAd.expectedstartdate)
        this.state.expectedstartdate = modifiableJobAd.expectedstartdate.toDate();
      if (modifiableJobAd.expirationdate)
        this.state.expirationdate = modifiableJobAd.expirationdate.toDate();
      if (modifiableJobAd.location)
        this.state.location = modifiableJobAd.location;
    }
  }

  handleDateChange = (name, value) => {
    this.setState({
      [name]: value
    });
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleChangeJobType = e => {
    this.setState({
      [e.target.name]: e.target.checked
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    event.target.className += " was-validated";
    if (this.state.id) {
      this.props.jobUpdateActions(this.state);
    } else {
      this.props.jobAdActions(this.state);
    }
    Swal.fire({
      type: "success",
      title: "Job Ad Successfully Created",
      showConfirmButton: false,
      timer: 1500
    });

    setTimeout(() => {
      this.props.history.push("/jobs");
    }, 2000);
  };

  state = {
    visible: false
  };

  onShowAlert = () => {
    this.setState({ visible: true }, () => {
      window.setTimeout(() => {
        this.setState({ visible: false });
      }, 3000);
    });
  };

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  render() {
    //isOpen={this.state.visible}
    const { auth, response, message } = this.props;
    if (!auth.uid && !auth.emailVerified)
      return <Redirect to={ROUTES.LOG_IN} />;
    return (
      <div className="create-job-ad">
        <Alert color={response} isOpen={this.state.visible}>
          <i
            className={response === "success" ? "fas fa-check" : "fas fa-times"}
          />{" "}
          {message}
        </Alert>

      <div className="container page-wrapper">        
        <h3 className="text-center font-weight-bold mt-4">
          <i className="fas fa-users"></i><br/>
          Create Job Ad
        </h3>
      
        <div className="row">
          <div className="col-md-6 col-12">
            <form className="empr-form mt-4 mb-4" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="jobtitle"><i className="fas fa-file-signature"></i> Job Title</label>
                <input type="text" id="jobtitle" name="job_title" value={this.state.jobtitle} className="form-control form-control-lg" onChange={this.handleChange} 
                  placeholder="Job Title" required />
              </div>

                          
                        
                        <div className="row">
                          <div className="col-md-6 col-sm-12">
                            <div className="form-group">
                              <label className="form-label" htmlFor="email">Needed Skills</label>

                              <Select
                                value={this.state.neededskills}
                                onChange={this.handleSkillsChange}
                                options={skills}
                                isMulti={true}
                              />
                            </div>
                          </div>

                          <div className="col-md-6 col-sm-12">
                            <div className="form-group">
                              <label className="form-label" htmlFor="joblocation" name="joblocation"><i className="fas fa-map-marker-alt"></i>Job Location</label>

                              <Select
                                value={this.state.location}
                                onChange={this.handleLocationChange}
                                options={cities}
                                isMulti={true}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-sm-10 mb-1">
                            <div className="form-group">
                              <label className="form-label"  htmlFor="email">
                                Employment type
                              </label>
                              <div className="form-check">
                                <input
                                  className="form-check-input checkbox"
                                  type="checkbox"
                                  checked={this.state.applyfulltime}
                                  onChange={this.handleChangeJobType}
                                  name="applyfulltime"
                                />
                                <label 
                                  className="form-check-label"
                                  htmlFor="job_type_ft"
                                >
                                  Full-time
                                </label>
                              </div>

                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  checked={this.state.applypartime}
                                  onChange={this.handleChangeJobType}
                                  name="applypartime"
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="job_type_pt"
                                >
                                  Part-time
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>

                        <label className="form-label" htmlFor="email"><i className="fas fa-address-card"></i> Education</label>
                        <div >
                          <select
                            className="form-control browser-default custom-select"
                            value={this.state.education}
                            id="education"
                            label="Education"
                            
                            type="text"
                            rows="1"
                            onChange={this.handleChange}
                            required
                          >
                            <option >Select</option>
                            <option value="0">Ph.D</option>
                            <option value="1">M.Sc</option>
                            <option value="2">B.Sc </option>
                            <option value="3">High School Diploma</option>
                            <option value="4">Other</option>
                          </select>
                        </div>

                     

                          <div className="row" style={{paddingLeft:'17px'}}>
                          <div className="col-sm-6">
                         
                            <br></br>

                            <div className="row" style={{paddingBottom: '10px'}}>     
                             <i class='fa fa-euro-sign'/> 
                            </div>
                            
                         
                            <div className="row">    
                            <input   style={{width: '15rem'}} class="form-control form-control-static " placeholder=" Expected Minimum Salary"  id="minsalary"  type="number" value={this.state.minsalary} onChange={this.handleChange}></input>
                            </div>
                             
                           
                          </div>
                          <div className="col-sm-6">
                         
                         <br></br>

                         <div className="row" style={{paddingBottom: '10px'}}>     
                             <i class='fa fa-euro-sign'/> 
                            </div>
                            
                         
                            <div className="row">    
                            <input  style={{width: '15rem'}} class="form-control form-control-static " placeholder=" Expected Maximum Salary"  id="minsalary"  type="number" value={this.state.maxsalary} onChange={this.handleChange}></input>
                            </div>
                             
                       </div>
                          
                        
                     
                        </div>

                        <br></br>
                        <div className="form-group">
                        <label className="form-label" htmlFor="jobdescription"><i className="fas fa-sticky-note"></i> Description</label>
                <textarea  id="jobdescription" name="job_discription"  value={this.state.jobdescription} className="form-control form-control-lg"  onChange={this.handleChange} 
                 required />
              </div>


                        <div className="row">
                          <div className="col-sm-6">
                            <div className="form-group datepicker">
                              <label  className="form-label" >Expected Start Date:</label>
                              <div className="md-form">
                                <i className="fas fa-calendar-alt prefix"  style={{fontSize: '1.1rem'}}/>
                                <DatePicker
                                  selected={this.state.expectedstartdate}
                                  onChange={this.handleDateChange.bind(
                                    this.parentElement,
                                    "expectedstartdate"
                                  )}
                                  className="form-control"
                                  peekNextMonth
                                  showMonthDropdown
                                  showYearDropdown
                                  dropdownMode="select"
                                  name="expectedstartdate"
                                  minDate={new Date()}
                                  autoComplete="off"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="col-sm-6">
                            <div className="form-group datepicker">
                              <label className="form-label">Expiration Date:</label>
                              <div className="md-form">
                                <i className="fas fa-calendar-alt prefix" style={{fontSize: '1.1rem'}} />
                                <DatePicker
                                  selected={this.state.expirationdate}
                                  onChange={this.handleDateChange.bind(
                                    this.parentElement,
                                    "expirationdate"
                                  )}
                                  className="form-control"
                                  peekNextMonth
                                  showMonthDropdown
                                  showYearDropdown
                                  dropdownMode="select"
                                  name="expirationdate"
                                  minDate={new Date()}
                                  autoComplete="off"
                                />
                              </div>
                            </div>
                          </div>
                        </div>


                        <button type="submit" className="btn btn-lg btn-info w-100 mt-4">
                <i className="fas fa-user-plus"></i> Submit This Job Opportunity
                                </button> 


                        
                      </form>
                  
                
                
              </div>
            </div>
          </div>
        </div>
      
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    response: state.profile.response,
    message: state.profile.message
  };
};

const mapDispatchToProps = dispatch => {
  return {
    jobAdActions: jobAd => dispatch(jobAdActions(jobAd)),
    jobUpdateActions: jobAd => dispatch(jobUpdateActions(jobAd))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateJobAds);
