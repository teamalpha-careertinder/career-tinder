import React from 'react';
import DatePicker from "react-datepicker";
import Select from 'react-select';
import { MDBInput, MDBBtn, ModalFooter } from "mdbreact";
import './profile.css';
import { connect } from "react-redux";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import { Alert, Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { editJobSeekerProfile } from '../../store/actions/profileAction';
import * as ROUTES from '../../constants/routes';
import { firestoreConnect } from "react-redux-firebase";
import { Checkbox, Radio } from 'pretty-checkbox-react';
import CreatableSelect from 'react-select/creatable';

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

//Entity to store JobSeekerProfile in DB
const jobSeekerProfileEntity = {
  jobSeekerName: null,  //should be replaced by firstName
  jobSeekerPhone: null,  
  jobSeekerAddress: null,
  applyingFullTime: false,
  applyingPartTime: false, 
  euCitizen: false,
  minSalary: null,
  maxSalary: null,
  languages: null,
    //  label: field of languages
    //  value: field of languages
  skills: null,
    //  label: field of skills
    //  value: field of skills
  DOBDate: null,
  //usertype: null, //inhereted from user
  workExperiences: null
    //  companyName: field of workExperiences
    //  jobDescription: field of workExperiences
    //  jobTitle: field of workExperiences
    //  jobType: field of workExperiences
    //  startJobDate: field of workExperiences
    //  endJobDate: field of workExperiences */
}

class EditJobSeekerProfile extends React.Component {

  handleSkillsChange = skills => {
    if(skills){
      skills.forEach(skill => {
        if(skill['__isNew__']){
          delete skill['__isNew__']
        }
      });
    }
    this.setState({ skills });
  };

  handleLanguagesChange = (selectedLanguages) => {
    this.setState({ selectedLanguages: selectedLanguages });
    console.log(`Option selected:`, selectedLanguages);
  }

  constructor(props) {
    super(props);

    var jobSeekerProfileProps = this.props.jobseeker;
    var jobSeekerName = jobSeekerProfileProps && jobSeekerProfileProps.jobSeekerName;
    var jobSeekerPhone = jobSeekerProfileProps && jobSeekerProfileProps.jobSeekerPhone;
    var jobSeekerAddress = jobSeekerProfileProps && jobSeekerProfileProps.jobSeekerAddress;
    var applyingFullTime = jobSeekerProfileProps && jobSeekerProfileProps.applyingFullTime;
    var applyingPartTime = jobSeekerProfileProps && jobSeekerProfileProps.applyingPartTime;
    var euCitizen = jobSeekerProfileProps && jobSeekerProfileProps.euCitizen;
    var minSalary = jobSeekerProfileProps && jobSeekerProfileProps.minSalary;
    var maxSalary = jobSeekerProfileProps && jobSeekerProfileProps.maxSalary;
    var DOBDate = jobSeekerProfileProps && jobSeekerProfileProps.DOBDate;
    var skills = jobSeekerProfileProps && jobSeekerProfileProps.skills;
    var languages = jobSeekerProfileProps && jobSeekerProfileProps.languages;
    var workExperiences = (jobSeekerProfileProps && jobSeekerProfileProps.workExperiences !== null) ? jobSeekerProfileProps.workExperiences : [];

    workExperiences.map((item, value) => {
      item.id = Math.random().toString(36).slice(2);
    });

    this.state = {
      jobSeekerName: jobSeekerName, 
      jobSeekerPhone: jobSeekerPhone,
      jobSeekerAddress: jobSeekerAddress,
      applyingFullTime: applyingFullTime,
      applyingPartTime: applyingPartTime,
      euCitizen: euCitizen,
      minSalary: minSalary,
      maxSalary: maxSalary,
      selectedLanguages: languages,
      skills: skills,
      startDOBDate: DOBDate && DOBDate.toDate(),

      weId: '',
      weCreate: true,
      companyName: '',
      jobTitle: '',
      jobDescription: '',
      startFromDate: '',
      workedTo: '',
      visible: false,
      modal: false,
      weRemoveModal: false,
      workExperience: '',
      workExperiences: workExperiences
    };
    this.handleDOBDateChange = this.handleDOBDateChange.bind(this);
    this.handleFromDateChange = this.handleFromDateChange.bind(this);
    this.handleToDateChange = this.handleToDateChange.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggleWERemove = this.toggleWERemove.bind(this);
    this.handleWEDelete = this.handleWEDelete.bind(this);
    this.onShowAlert = this.onShowAlert.bind(this);
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
    if(this.state.workedTo < date) {
      this.setState({
        workedTo: date
      });
    }
  }

  handleToDateChange(date) {
    this.setState({
      workedTo: date
    });
    if(this.state.startFromDate > date) {
      this.setState({
        startFromDate: date
      });
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
    switch (e.target.id) {
      case "jobSeekerName":
        var element = e.target;
        if (element.validity.patternMismatch) {
          element.setCustomValidity("Name should not contain number and special characters");
          element.reportValidity();
        } else {
          element.setCustomValidity("");
        }
        break;
      default:
        break;
    }
  };

  handleSelectChange = function (e) {
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
      applyingFullTime: !prevState.applyingFullTime,
    }));
  }

  handleChangePT = () => {
    this.setState(prevState => ({
      applyingPartTime: !prevState.applyingPartTime,
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
      //take the information from state that should be stored in DB (state contains more data than needed):
      var jobSeekerProfile = jobSeekerProfileEntity;
      if (this.state.jobSeekerName) {jobSeekerProfile.jobSeekerName    =  this.state.jobSeekerName; }
      if (this.state.jobSeekerPhone) {jobSeekerProfile.jobSeekerPhone  =  this.state.jobSeekerPhone;  }
        else { delete jobSeekerProfile.jobSeekerPhone }
      if (this.state.jobSeekerAddress) { jobSeekerProfile.jobSeekerAddress = this.state.jobSeekerAddress;}
      if (this.state.applyingFullTime) { jobSeekerProfile.applyingFullTime = true }
        else { jobSeekerProfile.applyingFullTime = false }
      if (this.state.applyingPartTime) { jobSeekerProfile.applyingPartTime = true }
      else { jobSeekerProfile.applyingPartTime = false }
      if (this.state.euCitizen) { jobSeekerProfile.euCitizen  = true }
        else { jobSeekerProfile.euCitizen  = false}   
      if (this.state.minSalary) {jobSeekerProfile.minSalary = this.state.minSalary;}
      if (this.state.maxSalary) {jobSeekerProfile.maxSalary = this.state.maxSalary;}
      if (this.state.selectedLanguages) {jobSeekerProfile.languages = this.state.selectedLanguages;}
      if (this.state.skills) { jobSeekerProfile.skills = this.state.skills}
      if (this.state.startDOBDate) {jobSeekerProfile.DOBDate  =  this.state.startDOBDate;}
      if (this.state.workExperiences.length > 0) {
        var tmpWExps = [];
        for (var i = 0, l = this.state.workExperiences.length; i < l; i++) {
          var tmpExp = { 
            companyName: null,
            jobDescription: null,
            jobTitle: null,
            jobType: null,
            startJobDate: null,
            endJobDate: null
          }
          if (this.state.workExperiences[i].companyName) {tmpExp.companyName = this.state.workExperiences[i].companyName}
          if (this.state.workExperiences[i].jobDescription) {tmpExp.jobDescription = this.state.workExperiences[i].jobDescription}
          if (this.state.workExperiences[i].jobTitle) {tmpExp.jobTitle = this.state.workExperiences[i].jobTitle}
          if (this.state.workExperiences[i].jobType) {tmpExp.jobType = this.state.workExperiences[i].jobType}
          if (this.state.workExperiences[i].startJobDate) {tmpExp.startJobDate = new Date(this.state.workExperiences[i].startJobDate)}
          if (this.state.workExperiences[i].endJobDate) {tmpExp.endJobDate = new Date(this.state.workExperiences[i].endJobDate)}
          
          if (i===0) {tmpWExps[0] = tmpExp; }
            else {tmpWExps =  [...tmpWExps,tmpExp]; }

        }
        if (tmpWExps.length>0) {jobSeekerProfile.workExperiences = tmpWExps}

      } else {jobSeekerProfile.workExperiences = null}
      
      this.props.editJobSeekerProfile(jobSeekerProfile); 
      this.onShowAlert();
    }

  handleWExperienceSubmit = (e) => {
    this.toggle();
    e.preventDefault();
    if(e.target.we_id.value === '') {
      const newWExperience = {
        id: Math.random().toString(36).slice(2),
        companyName: e.target.company_name.value,
        jobTitle: e.target.job_title.value,
        startJobDate: e.target.working_from.value,
        endJobDate: e.target.worked_to.value,
        jobDescription: e.target.job_description.value,
        jobType: e.target.job_type.value,
      };
      newWExperience.companyName !== '' && this.setState({
        workExperiences: [...this.state.workExperiences, newWExperience]
      });
    } else {
      let updatedWorkExperiences = [...this.state.workExperiences];
      let experience = updatedWorkExperiences.find((exp) => exp.id === e.target.we_id.value);
      experience.companyName = e.target.company_name.value;
      experience.jobTitle = e.target.job_title.value;
      experience.startJobDate = e.target.working_from.value;
      experience.endJobDate = e.target.worked_to.value;
      experience.jobDescription = e.target.job_description.value;
      experience.jobType = e.target.job_type.value;
      experience.companyName !== '' && this.setState({
        workExperiences: updatedWorkExperiences
      });
    }
  }

  handleWEDelete() {
    let experience = this.state.workExperience;
    const newWorkExperiences = this.state.workExperiences.filter(workExperience => {
      return workExperience !== experience;
    });

    this.setState(prevState => ({
      workExperiences: [...newWorkExperiences],
      weRemoveModal: !prevState.weRemoveModal
    }));
  }

  onShowAlert = () => {
    this.setState({ visible: true }, () => {
      window.setTimeout(() => {
        this.setState({ visible: false })
      }, 3000)
    });
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal,
      weCreate: true,
      weId: ''
    }));
  }

  toggleWERemove(e, experience) {
    this.setState(prevState => ({
      weRemoveModal: !prevState.weRemoveModal,
      workExperience: experience
    }));
  }

  toggleModalWithData(e, exp, id) {
    if(typeof exp.startJobDate !== 'string') {
      var tsStartJobDate = new Date(exp.startJobDate.seconds * 1000);
      tsStartJobDate = (tsStartJobDate.getMonth() + 1) + '/' + tsStartJobDate.getDate() + '/' + tsStartJobDate.getFullYear();
    } else {
      var tsStartJobDate = exp.startJobDate;
    }
    if(typeof exp.endJobDate !== 'string') {
      var tsEndJobDate = new Date(exp.endJobDate.seconds * 1000);
      tsEndJobDate = (tsEndJobDate.getMonth() + 1) + '/' + tsEndJobDate.getDate() + '/' + tsEndJobDate.getFullYear();
    } else {
      var tsEndJobDate = exp.endJobDate;
    }
    if(e.target.id !== id){
      this.setState(prevState => ({
        modal: true,
        weCreate: false,
        weId: exp.id,
        companyName: exp.companyName,
        jobDescription: exp.jobDescription,
        jobTitle: exp.jobTitle,
        startFromDate: new Date(tsStartJobDate),
        workedTo: new Date(tsEndJobDate),
        prevWorkJobType: exp.jobType
      }));
    }
  }

  render() {
    const { auth, response, message } = this.props;
    if (!auth.uid && !auth.emailVerified) return <Redirect to={ROUTES.LOG_IN} />;
    return (
      <div className="job-seeker-profile">
        <Alert color={response} isOpen={this.state.visible}><i className={response === 'success' ? "fas fa-check" : "fas fa-times"}></i> {message}</Alert>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}><i className="fas fa-info-circle text-warning"></i> {this.state.weCreate ? 'Add' : 'Edit'} work experience</ModalHeader>
          <ModalBody>
            <form className="work-experience-form text-info" onSubmit={this.handleWExperienceSubmit}>
              <div className="row">
                <div className="col-sm-12">
                  <div className="form-group">
                    <input id="we_id" type="hidden" name="we_id" value={this.state.weId} />
                    <div className="row">
                      <div className="col-md-6 col-sm-12">
                        <MDBInput id="companyName" label="Company name" type="text" icon="pencil-alt" name="company_name" 
                          onChange={this.handleChange} required value={this.state.companyName} />
                      </div>
                      <div className="col-md-6 col-sm-12">
                        <MDBInput id="jobTitle" label="Job title" type="text" icon="pencil-alt" name="job_title" 
                          onChange={this.handleChange} required value={this.state.jobTitle} />
                      </div>
                      <div className="col-md-6 col-sm-12">
                        <div className="form-group datepicker">
                          <label>From:</label>
                          <div className="md-form">
                            <i className="fas fa-calendar-alt prefix"></i>
                            <DatePicker selected={this.state.startFromDate} onChange={this.handleFromDateChange} className="form-control"
                              peekNextMonth showMonthDropdown showYearDropdown dropdownMode="select" name="working_from" maxDate={new Date()} required />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-sm-12">
                        <div className="form-group datepicker">
                          <label>To:</label>
                          <div className="md-form">
                            <i className="fas fa-calendar-alt prefix"></i>
                            <DatePicker selected={this.state.workedTo} onChange={this.handleToDateChange} className="form-control"
                              peekNextMonth showMonthDropdown showYearDropdown dropdownMode="select" name="worked_to" maxDate={new Date()} />
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-12">
                        <MDBInput id="jobDescription" label="Job description" type="text" icon="pencil-alt" 
                        name="job_description" onChange={this.handleChange} value={this.state.jobDescription} />
                      </div>
                      <div className="col-sm-12 mb-1">
                        <div className="form-inline">
                          <div className="form-group">
                            <label htmlFor="job_type" style={{'justifyContent':'left'}} className="mr-2">Job type while working there:</label>
                            <Radio name="job_type" shape="round" color="primary" animation="smooth"
                             value="Full-time" checked={this.state.prevWorkJobType === 'Full-time'}
                             onChange={this.handleOptionChange}>
                              Full-time
                            </Radio>
                            <Radio name="job_type" shape="round" color="primary" animation="smooth"
                             value="Part-time" checked={this.state.prevWorkJobType === 'Part-time'}
                             onChange={this.handleOptionChange}>
                              Part-time
                            </Radio>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-12">
                  <Button color="success" type="submit"><i className={this.state.weCreate ? "fas fa-plus": "fas fa-edit"}></i> {this.state.weCreate ? 'Add' : 'Update'}</Button>{' '}
                  <Button color="danger" onClick={this.toggle}>Cancel</Button>
                </div>
              </div>
            </form>
          </ModalBody>
        </Modal>
        <Modal isOpen={this.state.weRemoveModal} toggle={(e) => this.toggleWERemove(e, '')} className={this.props.className}>
          <ModalHeader toggle={(e) => this.toggleWERemove(e, '')}><i className="fas fa-info-circle text-warning"></i> Remove Work Experience</ModalHeader>
          <ModalBody>
            <div className="row">
              <div className="col-12">
                Do you really want to remove this work experience from your job seeker profile?
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={this.handleWEDelete}><i className="fas fa-trash-alt"></i> Remove</Button>{' '}
            <Button color="primary" onClick={(e) => this.toggleWERemove(e, '')}>Cancel</Button>
          </ModalFooter>
        </Modal>
        <div className="profile-form-wrapper">
          <div className="card border-info card-container">
            <div className="card-header bg-info">
              <i className="fas fa-users"></i> Update your Job Seeker profile
              </div>
            <div className="card-body text-info">
              <div className="tab-content" id="pills-tabContent">
                <div className="tab-pane fade show active" id="pills-job-seeker" role="tabpanel" aria-labelledby="pills-job-seeker-tab">
                  <form className="profile-form" onSubmit={this.handleSubmit}>
                    <div className="row">
                      <div className="col-md-6 col-sm-12">
                        <div className="form-group">
                          
                          <MDBInput id="jobSeekerName" value={this.state.jobSeekerName || ''} label="Name"  type="text" icon="pencil-alt" 
                          onChange={this.handleChange} maxLength="40" pattern="^[A-Za-z.\s_-]+$" required />
                        </div>
                      </div>
                      <div className="col-md-6 col-sm-12">
                        <div className="form-group">
                          <MDBInput id="jobSeekerPhone" value={this.state.jobSeekerPhone || ''}  label="Phone" icon="mobile-alt" type="number" onChange={this.handleChange} />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-12">
                        <div className="form-group">
                          <MDBInput id="jobSeekerAddress" value={this.state.jobSeekerAddress || ''} label="Address" icon="address-card" type="textarea" rows="1" onChange={this.handleChange} />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4 col-sm-12">
                        <div className="form-group datepicker">
                          <label>Date of birth:</label>
                          <div className="md-form">
                            <i className="fas fa-calendar-alt prefix"></i>
                            <DatePicker selected={this.state.startDOBDate || '' } id="dateOfBirth" onChange={this.handleDOBDateChange} className="form-control"
                              peekNextMonth showMonthDropdown showYearDropdown dropdownMode="select" maxDate={new Date()} autoComplete="off"  />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 col-sm-12">
                        <div className="form-group">
                          <label>Skills</label>
                          <CreatableSelect
                            id="employeeSkills"
                            value={this.state.skills}
                            isMulti
                            onChange={this.handleSkillsChange}
                            options={skills}
                          />
                        </div>
                      </div>
                      <div className="col-md-4 col-sm-12">
                        <div className="form-group">
                          <label>Languages</label>
                          <Select
                            id="employeeLanguage"
                            value={this.state.selectedLanguages}
                            onChange={this.handleLanguagesChange}
                            options={languages}
                            isMulti={true}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12">                        
                        <div className="form-group">
                          <label style={{'width':'auto'}}>Work Experiences:</label>
                          <Button color="danger" className="btn-circle" onClick={this.toggle}><i className="fas fa-plus"></i></Button>
                        </div>
                        <div className="row" id="work_experiences">
                          {
                            this.state.workExperiences.map((workExperience, i) => {
                              return (
                                <div key={`work-experience-${i}`} className="col-lg-3 col-md-4 col-12">
                                  <div className="work-experiences-tag badge badge-info mb-2">
                                    <span>{workExperience.companyName}</span>
                                    <i id={"remove_we_"+i} className="fas fa-trash-alt ml-3 float-right" onClick={(e) => this.toggleWERemove(e, workExperience)}></i>
                                    <i id={"edit_we_"+i} onClick={(e) => this.toggleModalWithData(e, workExperience, "remove_we_"+i)} className="fas fa-edit ml-3 float-right"></i>
                                  </div>            
                                </div>                 
                              )
                            })
                          }
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 col-sm-12">
                        <div className="row">
                          <div className="col-12">
                            <div className="form-group mt-2">
                              <label htmlFor="euCitizen">EU Citizen:</label>
                              <Checkbox icon={<i className="fas fa-check-double" />} animation="jelly"
                                shape="curve" color="primary-o" id="employeeCitizenship" 
                                checked={this.state.euCitizen ? true : false} onChange={this.handleChangeEU}>
                                    Are you an EU Citizen?
                              </Checkbox>
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="form-group">
                              <MDBInput id="minSalary" value={this.state.minSalary || ''} label="Minimum expected salary" type="number" icon="euro-sign" 
                              onChange={this.handleChange} />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-sm-12">
                        <div className="form-group">
                          <label>Employment type for this position:</label>
                          <Checkbox icon={<i className="fas fa-check-double" />} animation="jelly"
                            shape="curve" color="primary-o" id="employmentTypeFull" 
                            checked={this.state.applyingFullTime ? true : false} onChange={this.handleChangeFT}>
                                Full-time
                          </Checkbox>
                          <Checkbox icon={<i className="fas fa-check-double" />} animation="jelly"
                            shape="curve" color="primary-o" id="employmentTypePart" 
                            checked={this.state.applyingPartTime ? true : false} onChange={this.handleChangePT}>
                                Part-time
                          </Checkbox>
                        </div>                          
                      </div>                      
                    </div>                    
                    <div className="row">
                      <div className="col-sm-12">
                        <MDBBtn color="success" className="float-right" type="submit">
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
  const jobseekers = state.firestore.data.jobseeker;
  const auth = state.firebase.auth;
  const jobseeker = jobseekers ? jobseekers[auth.uid] : null;
  return {
    auth: auth,
    jobseeker :jobseeker,
    response: state.profile.response,
    message: state.profile.message
  };
};

const mapDispatchToPropsJobseeker = dispatch => {
  
  return {
    editJobSeekerProfile: (profile) => dispatch(editJobSeekerProfile(profile))
  }
};


export default
  compose(
    connect(mapStateToProps, mapDispatchToPropsJobseeker),
    firestoreConnect([
      {
        collection: "jobseeker"
      }
    ])   
  )(EditJobSeekerProfile);
