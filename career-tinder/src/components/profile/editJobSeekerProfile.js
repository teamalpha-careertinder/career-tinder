import React from 'react';
import DatePicker from "react-datepicker";
import Select from 'react-select';
import { ModalFooter } from "mdbreact";
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
import cities from '../../constants/city'

 
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

  handleCityChange = (city) => {
    this.setState({ city: city });
    console.log(`Option selected:`, city);
  }

 
  handleLanguagesChange = languages => {
    if(languages){
      languages.forEach(languages => {
        if(languages['__isNew__']){
          delete languages['__isNew__']
        }
      });
    }
    this.setState({ languages });
  };
 
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
    var city = jobSeekerProfileProps && jobSeekerProfileProps.city;

 
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
      languages: languages,
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
      workExperiences: workExperiences,
      city: city ? city : ''
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
      if (this.state.languages) {jobSeekerProfile.languages = this.state.languages;}
      if (this.state.skills) { jobSeekerProfile.skills = this.state.skills}
      if (this.state.startDOBDate) {jobSeekerProfile.DOBDate  =  this.state.startDOBDate;}
      if (this.state.city) {jobSeekerProfile.city  =  this.state.city;}
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
                <div className="col-12">
                  <input id="we_id" type="hidden" name="we_id" value={this.state.weId} />
                  <div className="row">
                    <div className="col-md-6 col-12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="companyName"><i className="fas fa-file-signature"></i> Company name</label>
                        <input type="text" id="companyName" name="company_name" value={this.state.companyName} className="form-control form-control-lg" onChange={this.handleChange} 
                          placeholder="Career Tinder" required />
                      </div>
                    </div>
                    <div className="col-md-6 col-12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="jobTitle"><i className="fas fa-chalkboard-teacher"></i> Job title</label>
                        <input type="text" id="jobTitle" name="job_title" value={this.state.jobTitle} className="form-control form-control-lg" onChange={this.handleChange} 
                          placeholder="Software Engineer" required />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 col-12">
                      <div className="form-group datepicker">
                        <label className="form-label" htmlFor="jobTitle"><i className="fas fa-calendar-alt prefix"></i> From</label>
                        <DatePicker selected={this.state.startFromDate} onChange={this.handleFromDateChange} className="form-control form-control-lg"
                          peekNextMonth showMonthDropdown showYearDropdown dropdownMode="select" name="working_from" maxDate={new Date()} required />                        
                      </div>
                    </div>
                    <div className="col-md-6 col-12">
                      <div className="form-group datepicker">
                        <label className="form-label" htmlFor="jobTitle"><i className="fas fa-calendar-alt prefix"></i> To</label>
                        <DatePicker selected={this.state.workedTo} onChange={this.handleToDateChange} className="form-control form-control-lg"
                          peekNextMonth showMonthDropdown showYearDropdown dropdownMode="select" name="worked_to" maxDate={new Date()} />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="jobDescription"><i class="far fa-address-card"></i> Job description</label>
                        <textarea type="text" id="jobDescription" name="job_description" value={this.state.jobDescription} className="form-control form-control-lg" onChange={this.handleChange} 
                          rows="1" required />
                      </div>
                    </div>
                    <div className="col-12 mb-1">
                      <div className="form-inline">
                        <div className="form-group">
                          <label htmlFor="job_type" style={{'justifyContent':'left'}} className="mr-2"><i className="fas fa-map-marked-alt mr-2"></i> Job type while working there:</label>
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
                <div className="col-12">
                  <hr className="mt-4 mb-4" />
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
          <h3 className="text-center font-weight-bold mt-4">
            <i className="far fa-edit"></i><br/>
            Edit your Job Seeker profile
          </h3>
          <div className="row justify-content-center">
            <div className="col-12 col-lg-10">
              <form className="profile-form mb-4 mt-4" onSubmit={this.handleSubmit}>
                <div className="row">
                  <div className="col-md-6 col-12">
                    <div className="form-group">
                      <label className="form-label" htmlFor="jobSeekerName"><i className="fas fa-file-signature"></i> Name</label>
                      <input type="text" id="jobSeekerName" name="jobSeekerName" value={this.state.jobSeekerName || ''} className="form-control form-control-lg" onChange={this.handleChange} 
                        placeholder="John Doe" maxLength="40" pattern="^[A-Za-z.\s_-]+$" required />
                    </div>
                  </div>
                  <div className="col-md-6 col-12">
                    <div className="form-group">
                      <label className="form-label" htmlFor="jobSeekerPhone"><i className="fas fa-mobile-alt"></i> Phone</label>
                      <input type="text" id="jobSeekerPhone" name="jobSeekerPhone" value={this.state.jobSeekerPhone || ''} className="form-control form-control-lg" onChange={this.handleChange} 
                        placeholder="01234567899" required />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <div className="form-group">
                      <label className="form-label" htmlFor="jobSeekerAddress"><i className="far fa-address-card"></i> Address</label>
                      <textarea type="text" id="jobSeekerAddress" name="jobSeekerAddress" value={this.state.jobSeekerAddress || ''} className="form-control form-control-lg" onChange={this.handleChange} 
                        rows="1" required></textarea>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 col-12">
                    <div className="form-group datepicker">
                      <label className="form-label" htmlFor="dateOfBirth"><i className="far fa-calendar-alt"></i> Date of birth</label>
                      <DatePicker selected={this.state.startDOBDate || '' } id="dateOfBirth" onChange={this.handleDOBDateChange} className="form-control w-100"
                          peekNextMonth showMonthDropdown showYearDropdown dropdownMode="select" maxDate={new Date()} autoComplete="off" />
                    </div>
                  </div>
                  <div className="col-md-6 col-12">
                    <div className="form-group">
                      <label><i className="fas fa-code"></i> Skills</label>
                      <CreatableSelect
                        id="employeeSkills"
                        value={this.state.skills}
                        isMulti
                        onChange={this.handleSkillsChange}
                        options={skills}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 col-12">
                    <div className="form-group">
                      <label><i className="fas fa-sign-language"></i> Languages</label>
                      <CreatableSelect
                        id="employeeLanguage"
                        value={this.state.languages}
                        isMulti
                        onChange={this.handleLanguagesChange}
                        options={languages}
                      />
                    </div>
                  </div>
                  <div className="col-md-6 col-12">
                    <div className="form-group">
                      <label><i className="fas fa-map-marker-alt"></i> City</label>
                      <Select
                        id="employeeCity"
                        value={this.state.city}
                        onChange={this.handleCityChange}
                        options={cities}
                        isMulti={false}
                      />
                    </div>
                  </div>
                </div>             
                <div className="row">
                  <div className="col-12">                        
                    <div className="form-group">
                      <label className="work-experience-label"><i className="far fa-building"></i> Work Experiences</label>
                      <button type="button" className="btn btn-danger btn-circle" onClick={this.toggle}><i className="fas fa-plus"></i></button>
                    </div>
                    <div className="row" id="work_experiences">
                      {
                        this.state.workExperiences.map((workExperience, i) => {
                          return (
                            <div key={`work-experience-${i}`} className="col-lg-3 col-md-4 col-12">
                              <div className="work-experiences-tag badge badge-info mb-2">
                                <div className="row">
                                  <div className="col-8 text-left">
                                    <span>{workExperience.companyName}</span>
                                  </div>
                                  <div className="col-4">
                                    <i id={"remove_we_"+i} className="fas fa-trash-alt ml-3 float-right" onClick={(e) => this.toggleWERemove(e, workExperience)}></i>
                                    <i id={"edit_we_"+i} onClick={(e) => this.toggleModalWithData(e, workExperience, "remove_we_"+i)} className="fas fa-edit ml-3 float-right"></i>
                                  </div>
                                </div>  
                              </div>            
                            </div>                
                          )
                        })
                      }
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 col-12">
                    <div className="form-group mt-2">
                      <label htmlFor="euCitizen"><i class="fas fa-globe-europe"></i> EU Citizen</label>
                      <Checkbox icon={<i className="fas fa-check-double" />} animation="jelly"
                        shape="curve" color="primary-o" id="employeeCitizenship"
                        checked={this.state.euCitizen ? true : false} onChange={this.handleChangeEU}>
                            Are you an EU Citizen?
                      </Checkbox>
                    </div>
                  </div>
                  <div className="col-md-6 col-12">
                    <div className="form-group">
                      <label className="form-label" htmlFor="minSalary"><i className="fas fa-euro-sign"></i> Minimum expected salary(Euro)</label>
                      <input type="text" id="minSalary" name="minSalary" value={this.state.minSalary || ''} className="form-control form-control-lg" onChange={this.handleChange} 
                        placeholder="40000" required />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <label><i className="fas fa-map-marked-alt"></i> Interested in</label>
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
                  <div className="col-12">
                    <button type="submit" className="btn btn-lg btn-info w-100 mt-4">
                      <i className="fas fa-save"></i> Save
                    </button> 
                  </div>
                </div>
              </form>
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