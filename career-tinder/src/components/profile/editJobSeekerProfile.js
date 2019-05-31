import React from 'react';
import DatePicker from "react-datepicker";
import Select from 'react-select';
import { MDBInput, MDBBtn } from "mdbreact";
import './profile.css';
import { connect } from "react-redux";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import { Alert, Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { editJobSeekerProfile } from '../../store/actions/profileAction';
import * as ROUTES from '../../constants/routes';

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
      visible: false,
      modal: false,
      workExperiences: []
    };
    this.handleDOBDateChange = this.handleDOBDateChange.bind(this);
    this.handleFromDateChange = this.handleFromDateChange.bind(this);
    this.handleToDateChange = this.handleToDateChange.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleWEDelete = this.handleWEDelete.bind(this);
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

  handleWExperienceSubmit = (e) => {
    e.preventDefault();
    const { workExperiences } = this.state;
    const newWExperience = {
      companyName: e.target.company_name.value,
      jobTitle: e.target.job_title.value,
      workingFrom: e.target.working_from.value,
      workedTo: e.target.worked_to.value,
      jobDescription: e.target.job_description.value,
      jobType: e.target.job_type.value,
    };
    newWExperience.companyName !== '' && this.setState({
      workExperiences: [...this.state.workExperiences, newWExperience]
    });
  }

  handleWEDelete(experience) {
    const newWorkExperiences = this.state.workExperiences.filter(workExperience => {
      return workExperience !== experience;
    });

    this.setState({
      workExperiences: [...newWorkExperiences]
    });
  }

  onShowAlert = () => {
    this.setState({ visible: true }, () => {
      window.setTimeout(() => {
        this.setState({ visible: false })
      }, 2000)
    });
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  render() {
    const { selectedSkills } = this.state;
    const { selectedLanguages } = this.state;
    const { auth } = this.props;

    if (!auth.uid && !auth.emailVerified) return <Redirect to={ROUTES.LOG_IN} />;
    return (
      <div className="job-seeker-profile">
        <Alert color="success" isOpen={this.state.visible}><i class="fas fa-check"></i> Profile updated!</Alert>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Your Work Experience</ModalHeader>
          <ModalBody>
            <form className="work-experience-form text-info" onSubmit={this.handleWExperienceSubmit}>
              <div className="row">
                <div className="col-sm-12">
                  <div className="form-group">
                    <label htmlFor="work_experience">Work Experience:</label>
                    <div className="row">
                      <div className="col-md-6 col-sm-12">
                        <MDBInput id="companyName" label="Company name" type="text" icon="pencil-alt" name="company_name" onChange={this.handleChange} />
                      </div>
                      <div className="col-md-6 col-sm-12">
                        <MDBInput id="jobTitle" label="Job title" type="text" icon="pencil-alt" name="job_title" onChange={this.handleChange} />
                      </div>
                      <div className="col-md-6 col-sm-12">
                        <div className="form-group datepicker">
                          <label>From:</label>
                          <div className="md-form">
                            <i className="fas fa-calendar-alt prefix"></i>
                            <DatePicker selected={this.state.startFromDate} onChange={this.handleFromDateChange} className="form-control"
                              peekNextMonth showMonthDropdown showYearDropdown dropdownMode="select" name="working_from" />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-sm-12">
                        <div className="form-group datepicker">
                          <label>To:</label>
                          <div className="md-form">
                            <i className="fas fa-calendar-alt prefix"></i>
                            <DatePicker selected={this.state.startToDate} onChange={this.handleToDateChange} className="form-control"
                              peekNextMonth showMonthDropdown showYearDropdown dropdownMode="select" name="worked_to" />
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-12">
                        <MDBInput id="jobDescription" label="Job description" type="text" icon="pencil-alt" name="job_description" onChange={this.handleChange} />
                      </div>
                      <div className="col-sm-12 mb-1">
                        <div className="form-inline">
                          <div className="form-group">
                            <label htmlFor="job_type" className="mr-2">Job type while working there:</label>
                            <div className="form-check form-check-inline">
                              <input className="form-check-input" type="radio" value="Full-time" checked={this.state.prevWorkJobType === 'Full-time'}
                                onChange={this.handleOptionChange} name="job_type" />
                              <label className="form-check-label" htmlFor="job_type_ft">
                                Full-time
                                                    </label>
                            </div>
                            <div className="form-check form-check-inline">
                              <input className="form-check-input" type="radio" value="Part-time" checked={this.state.prevWorkJobType === 'Part-time'}
                                onChange={this.handleOptionChange} name="job_type" />
                              <label className="form-check-label" htmlFor="job_type_pt">
                                Part-time
                                                    </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-12">
                  <Button color="primary" type="submit" onClick={this.toggle}><i className="fas fa-plus"></i> Add</Button>{' '}
                  <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                </div>
              </div>
            </form>
          </ModalBody>
        </Modal>
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
                      <div className="col-sm-12">
                        <div id="work_experiences">
                          {
                            this.state.workExperiences.map((workExperience, i) => {
                              return (
                                <span key={`work-experience-${i}`} className="work-experiences-tag badge badge-dark ml-1">
                                  {workExperience.companyName}
                                  <i className="fas fa-times ml-3" onClick={(e) => this.handleWEDelete(workExperience)}></i>
                                </span>
                              )
                            })
                          }
                        </div>
                      </div>
                      <div className="col-sm-12">
                        <Button color="danger" onClick={this.toggle}>Add Working Experiences</Button>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-12">
                        <MDBBtn color="indigo" className="float-right" type="submit" onClick={() => { this.onShowAlert() }}>
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
  compose(
    connect(mapStateToProps, mapDispatchToPropsJobseeker)
  )(EditJobSeekerProfile);
