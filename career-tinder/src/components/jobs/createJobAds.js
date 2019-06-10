import React from "react";
import { MDBInput, MDBBtn } from "mdbreact";
import DatePicker from "react-datepicker";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import { MDBCardBody } from "mdbreact";
import { Alert } from "reactstrap";
import { connect } from "react-redux";
import { jobAdActions, jobUpdateActions } from "../../store/actions/jobAdActions"

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
  getPickerValue = (value) => {
    console.log(value);
  }

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
      expirationdate:  ""
    };
    if(this.props.location.job)
    {
      var modifiableJobAd = this.props.location.job;
      if(modifiableJobAd.id)this.state.id = modifiableJobAd.id;
      if(modifiableJobAd.jobtitle)this.state.jobtitle = modifiableJobAd.jobtitle; 
      if(modifiableJobAd.neededskills)this.state.neededskills = modifiableJobAd.neededskills;
      if(modifiableJobAd.applypartime)this.state.applypartime = modifiableJobAd.applypartime;
      if(modifiableJobAd.applyfulltime)this.state.applyfulltime = modifiableJobAd.applyfulltime;
      if(modifiableJobAd.minsalary)this.state.minsalary = modifiableJobAd.minsalary;
      if(modifiableJobAd.maxsalary)this.state.maxsalary = modifiableJobAd.maxsalary;
      if(modifiableJobAd.jobdescription)this.state.jobdescription = modifiableJobAd.jobdescription
      if(modifiableJobAd.education)this.state.education = modifiableJobAd.education
      if(modifiableJobAd.expectedstartdate)this.state.expectedstartdate = modifiableJobAd.expectedstartdate
      if(modifiableJobAd.expirationdate)this.state.expirationdate = modifiableJobAd.expirationdate
    }
  }

  handleDateChange = (name, value) => {
    this.setState({
      [name]: value
    });
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleChangeJobType = (e) => {
    this.setState({
      [e.target.name]: e.target.checked
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    event.target.className += " was-validated";
    if(this.state.jobAdId)
    {
      this.props.jobUpdateActions(this.state);
    }
    else
    {
      this.props.jobAdActions(this.state);
    }  
    this.props.history.push('/jobs')
  };

  state = {
    visible: false
  };


   
    
  
    
  

  

  onShowAlert = () => {
    this.setState({ visible: true }, () => {
      window.setTimeout(() => {
        this.setState({ visible: false });
      }, 2000);
    });
  };

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  render() {
    //isOpen={this.state.visible}
    return (
      <div className="create-job-ad">
        {/* <Alert color="success" id="success-alert-noman" isOpen={this.state.visible}>
          <i className="fas fa-check" /> Job Successfully posted!
        </Alert> */}

        <div className="container" />
        <div className="justify-content-md-center">
          <div className="profile-form-wrapper" class="col-md-7  my-auto" style={{height: 'auto', margin: '0 auto', align:'center'}}>
            <div className="card border-info card-container" >
              <div className="card-header">
                <i className="fas fa-users" /> Create Job Ad
              </div>
                <div className="card-body text-info">
                  <div className="tab-content" id="pills-tabContent">
                    <div
                      className="tab-pane fade show active"
                      id="div className= col-md-6 col-sm-12"
                      role="tabpanel"
                      aria-labelledby="pills-create-job-ad-tab"
                    >
                      <form
                        className="profile-form"
                        onSubmit={this.handleSubmit}
                      >
                        <div className="row">
                          <div className="col-sm-12">
                            <div className="form-group">
                              <MDBInput
                                id="jobtitle"
                                label="Job Title"
                                type="text"
                                icon="pencil-alt"
                                name="job_title"
                                className="form-control"
                                onChange={this.handleChange}
                                value={this.state.jobtitle}
                                required
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-sm-12">
                            <div className="form-group">
                              <label>Needed Skills</label>
                              <Select
                                onChange={this.handleSkillsChange}
                                options={skills}
                                isMulti={true}
                              />
                            </div>
                          </div>

                          <div className="col-sm-10 mb-1">
                            <div className="form-group">
                              <label htmlFor="job_type">
                                Employment type for this position:
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
                                  JobTypeTime
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


                        <div>
        <select className="browser-default custom-select"
        
        value={this.state.education}
                                id="education"
                                label="Education"
                                icon="address-card"
                                type="text"
                                rows="1"
                                className="form-control"
                                onChange={this.handleChange}
                                required
        >
          <option>Education</option>
          <option value="1">Ph.D</option>
          <option value="2">M.Sc</option>
          <option value="3">B.Sc </option>
          <option value="4">High School Diploma</option>
          <option value="3">Other</option>
        </select>
      </div>




                        <div className="row">
                          <div className="col-sm-12">
                            <div className="form-group">
                             {/*  <MDBInput 
                                value={this.state.education}
                                id="education"
                                label="Education"
                                icon="address-card"
                                type="text"
                                rows="1"
                                className="form-control"
                                onChange={this.handleChange}
                                required
                              /> */}
                              
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-sm-6">
                            <div className="form-group">
                              <MDBInput
                                value={this.state.minsalary}
                                id="minsalary"
                                label=" Expected Minimum Salary"
                                icon="euro-sign"
                                type="number"
                                onChange={this.handleChange}
                              />
                            </div>
                          </div>

                          <div className="col-sm-6">
                            <div className="form-group">
                              <MDBInput
                                value={this.state.maxsalary}
                                id="maxsalary"
                                label="Expected Maximum Salary"
                                icon="euro-sign"
                                type="number"
                                onChange={this.handleChange}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-sm-12">
                            <div className="form-group">
                              <MDBInput
                                value={this.state.jobdescription}
                                id="jobdescription"
                                label="Job Discription"
                                type="textarea"
                                rows="3"
                                icon="comment-alt"
                                className="form-control"
                                onChange={this.handleChange}
                                required
                              />
                            </div>
                          </div>
                        </div>
                        
                        
                        <div className="row">
                          <div className="col-sm-6">
                            <div className="form-group datepicker">
                              <label>Expected Start Date:</label>
                              <div className="md-form">
                                <i className="fas fa-calendar-alt prefix" />
                                <DatePicker 
                                selected={this.state.expectedstartdate}
                                  onChange={this.handleDateChange.bind(this.parentElement, "expectedstartdate")}
                                  className="form-control"
                                  peekNextMonth
                                  showMonthDropdown
                                  showYearDropdown
                                  dropdownMode="select"
                                  name="expectedstartdate"
                                  minDate={new Date()}
                                />
                              </div>
                            </div>
                          </div>

                         

                          <div className="col-sm-6">
                            <div className="form-group datepicker" >
                              <label>Expiration Date:</label>
                              <div className="md-form">
                                <i className="fas fa-calendar-alt prefix" />
                                <DatePicker 
                                  selected={this.state.expirationdate}
                                  onChange={this.handleDateChange.bind(this.parentElement, "expirationdate")}
                                  className="form-control"
                                  peekNextMonth
                                  showMonthDropdown
                                  showYearDropdown
                                  dropdownMode="select"
                                  name="expirationdate"
                                  minDate={new Date()}
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-sm-12">
                            <MDBBtn
                              color="primary"
                              className="float-right"
                              
                              type="submit"
                            >
                              <i className="fas fa-save" /> submit This Job
                              Opportunity
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
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    jobAdActions: jobAd => dispatch(jobAdActions(jobAd)),
    jobUpdateActions: jobAd => dispatch(jobUpdateActions(jobAd))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateJobAds) ;
