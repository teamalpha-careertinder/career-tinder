import React from "react";
import { MDBInput, MDBBtn } from "mdbreact";
import DatePicker from "react-datepicker";
import Select from "react-select";
import { MDBCardBody } from "mdbreact";
import { Alert } from "reactstrap";
import { connect } from "react-redux";
import { jobAdActions } from "../../store/actions/jobAdActions"

const skills = [
  { value: "php", label: "PHP" },
  { value: "asp.net", label: "ASP.Net" },
  { value: "java", label: "Java" }
];

class CreateJobAds extends React.Component {
  handleSkillsChange = neededskills => {
    this.setState({ neededskills });
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
      expirationdate: ""
    };
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
    console.log(this.state)
    this.props.jobAdActions(this.state);
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
    const { neededskills } = this.state.neededskills;

    return (
      <div className="create-job-ad">
        <Alert color="success" isOpen={this.state.visible}>
          <i className="fas fa-check" /> Job Successfully posted!
        </Alert>

        <div className="container " />
        <div className="row justify-content-md-center">
          <div className="profile-form-wrapper">
            <div className="card border-info card-container">
              <div className="card-header">
                <i className="fas fa-users" />
                Create Job Ad
              </div>
              <MDBCardBody>
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
                                //required
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-sm-12">
                            <div className="form-group">
                              <label>Needed Skills</label>
                              <Select
                                value={neededskills}
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

                        <div className="row">
                          <div className="col-sm-12">
                            <div className="form-group">
                              <MDBInput
                                id="education"
                                label="Education"
                                icon="address-card"
                                type="text"
                                rows="1"
                                className="form-control"
                                onChange={this.handleChange}
                                //required
                              />
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-sm-6">
                            <div className="form-group">
                              <MDBInput
                                id="minsalary"
                                label="Minimum Salary"
                                icon="euro-sign"
                                type="number"
                                onChange={this.handleChange}
                              />
                            </div>
                          </div>

                          <div className="col-sm-6">
                            <div className="form-group">
                              <MDBInput
                                id="maxsalary"
                                label="Maximum Salary"
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
                                id="jobdescription"
                                label="Job Discription"
                                type="textarea"
                                rows="3"
                                icon="comment-alt"
                                className="form-control"
                                onChange={this.handleChange}
                                //required
                              />
                            </div>
                          </div>
                        </div>
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
                          <div className="form-group datepicker">
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

                        <div className="row">
                          <div className="col-sm-9">
                            <MDBBtn
                              color="primary"
                              className="float-right"
                              type="submit"
                            >
                              <i className="fas fa-save" /> Add This Job
                              Opportunity
                            </MDBBtn>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </MDBCardBody>
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
    jobAdActions: jobAd => dispatch(jobAdActions(jobAd))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateJobAds) ;
