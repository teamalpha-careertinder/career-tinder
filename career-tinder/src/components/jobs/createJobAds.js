import React from "react";
import DatePicker from "react-datepicker";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import { Alert, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import {
  jobAdActions,
  jobUpdateActions
} from "../../store/actions/jobAdActions";
import cities from "../../constants/city";
import * as ROUTES from "../../constants/routes";
import { Redirect } from "react-router-dom";
import { Checkbox, Radio } from "pretty-checkbox-react";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import $ from "jquery/src/jquery";

class CreateJobAds extends React.Component {
  handleSkillsChange = neededskills => {
    this.setState({ neededskills });
  };
  handleLocationChange = location => {
    this.setState({ location });
  };
  getPickerValue = value => {
    // console.log(value);
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
      location: '',
      bonus: '',
      bonuses: [],
      bonusId: '',
      bonusCreate: true,
      bonusModal: false,
      bonusRemoveModal: false,
      bonusOffer: ''
    };
    this.onShowAlert = this.onShowAlert.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggleBonusRemove = this.toggleBonusRemove.bind(this);
    this.handleBonusDelete = this.handleBonusDelete.bind(this);
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
      if (modifiableJobAd.bonuses) {
        console.log(modifiableJobAd.bonuses);
        modifiableJobAd.bonuses.map((item, value) => {
          item.id = Math.random().toString(36).slice(2);
        });
        this.state.bonuses = modifiableJobAd.bonuses;
      }        
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

  handleChangeFT = () => {
    this.setState(prevState => ({
      applyfulltime: !prevState.applyfulltime
    }));
  };

  handleChangePT = () => {
    this.setState(prevState => ({
      applypartime: !prevState.applypartime
    }));
  };

  handleSubmit = event => {
    event.preventDefault();
    event.target.className += " was-validated";
    var successMessage = "Job Ad Successfully Created";
    if (this.state.id) {
      this.props.jobUpdateActions(this.state);
      successMessage = "Job Ad Successfully Updated";
    } else {
      this.props.jobAdActions(this.state);
    }
    Swal.fire({
      type: "success",
      title: successMessage,
      showConfirmButton: false,
      timer: 1500
    });

    setTimeout(() => {
      this.props.history.push("/jobs");
    }, 2000);
  };

  handleBonusSubmit = (e) => {
    this.toggle();
    e.preventDefault();
    if(e.target.bonusId.value === '') {
      const newBonus = {
        id: Math.random().toString(36).slice(2),
        bonusOffer: e.target.bonusOffer.value,
      };
      newBonus.bonusOffer !== '' && this.setState({
        bonuses: [...this.state.bonuses, newBonus]
      });
    } else {
      let updatedBonuses = [...this.state.bonuses];
      let bonus = updatedBonuses.find((b) => b.id === e.target.bonusId.value);
      bonus.bonusOffer = e.target.bonusOffer.value;
      bonus.bonusOffer !== '' && this.setState({
        bonuses: updatedBonuses
      });
    }
  }

  handleBonusDelete() {
    let bonus = this.state.bonus;
    const newBonuses = this.state.bonuses.filter(bonusOffer => {
      return bonusOffer !== bonus;
    });
 
    this.setState(prevState => ({
      bonuses: [...newBonuses],
      bonusRemoveModal: !prevState.bonusRemoveModal
    }));
  }



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
      bonusModal: !prevState.bonusModal
    }));
  }

  toggleBonusRemove(e, offer) {
    this.setState(prevState => ({
      bonusRemoveModal: !prevState.bonusRemoveModal,
      bonus: offer
    }));
  }

  toggleModalWithData(e, bonus, id) {
    if(e.target.id !== id){
      this.setState(prevState => ({
        bonusModal: true,
        bonusCreate: false,
        bonusId: bonus.id,
        bonusOffer: bonus.bonusOffer,
      }));
    }
  }

  render() {
    //isOpen={this.state.visible}
    const { auth, response, message, educationList, locationList, skillsList } = this.props;
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
        <Modal isOpen={this.state.bonusModal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}><i className="fas fa-info-circle text-warning"></i> {this.state.bonusCreate ? 'Add' : 'Edit'} bonus offer</ModalHeader>
          <ModalBody>
            <form className="bonus-offer-form text-info" onSubmit={this.handleBonusSubmit}>
              <div className="row">
                <div className="col-12">
                  <input id="bonusId" type="hidden" name="bonusId" value={this.state.bonusId} />
                  <div className="row">
                    <div className="col-12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="bonusOffer"><i className="far fa-address-card"></i> Offer details</label>
                        <textarea type="text" id="bonusOffer" name="bonusOffer" value={this.state.bonusOffer} className="form-control form-control-lg" onChange={this.handleChange} 
                          rows="1" required />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <hr className="mt-4 mb-4" />
                  <Button color="success" type="submit"><i className={this.state.bonusCreate ? "fas fa-plus": "fas fa-edit"}></i> {this.state.bonusCreate ? 'Add' : 'Update'}</Button>{' '}
                  <Button color="danger" onClick={this.toggle}>Cancel</Button>
                </div>
              </div>
            </form>
          </ModalBody>
        </Modal>

        <Modal isOpen={this.state.bonusRemoveModal} toggle={(e) => this.toggleBonusRemove(e, '')} className={this.props.className}>
          <ModalHeader toggle={(e) => this.toggleBonusRemove(e, '')}><i className="fas fa-info-circle text-warning"></i> Remove Bonus</ModalHeader>
          <ModalBody>
            <div className="row">
              <div className="col-12">
                Do you really want to remove this bonus from your job ad?
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={this.handleBonusDelete}><i className="fas fa-trash-alt"></i> Remove</Button>{' '}
            <Button color="primary" onClick={(e) => this.toggleBonusRemove(e, '')}>Cancel</Button>
          </ModalFooter>
        </Modal>

        <div className="container page-wrapper">
          <h3 className="text-center font-weight-bold mt-4">
            <i className="fas fa-plus-square" />
            <br />
            {this.state.jobtitle !== "" ? "Edit Job Ad" : "Create Job Ad"}
          </h3>
          <div className="row justify-content-center">
            <div className="col-lg-8 col-12">
              <form
                className="empr-form mt-4 mb-4"
                onSubmit={this.handleSubmit}
              >
                <div className="form-group">
                  <label className="form-label" htmlFor="jobtitle"><i className="fas fa-file-signature"></i> Job Title</label>
                  <input type="text" id="jobtitle" name="job_title" value={this.state.jobtitle} className="form-control" onChange={this.handleChange} 
                    placeholder="Job Title" required />
                </div>   

                <div className="row">
                  <div className="col-10">
                    <div className="form-group">
                      <label className="form-label w-100">
                        <i className="fas fa-map-marked-alt"></i> Employment type
                      </label>
                      <Checkbox icon={<i className="fas fa-check-double" />} animation="jelly"
                        shape="curve" color="primary-o" id="applyfulltime" name="applyfulltime"
                        checked={this.state.applyfulltime ? true : false} onChange={this.handleChangeFT}>
                            Full-time
                      </Checkbox>
                      <Checkbox icon={<i className="fas fa-check-double" />} animation="jelly"
                        shape="curve" color="primary-o" id="applypartime" name="applypartime"
                        checked={this.state.applypartime ? true : false} onChange={this.handleChangePT}>
                            Part-time
                      </Checkbox>
                    </div>
                  </div>
                </div>                      
                          
                <div className="row">
                  <div className="col-md-6 col-12">
                    <div className="form-group">
                      <label className="form-label">
                        <i className="fas fa-code" /> Needed Skills
                      </label>
                      <Select
                        value={this.state.neededskills}
                        onChange={this.handleSkillsChange}
                        options={skillsList}
                        isMulti={true}
                      />
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-12">
                    <div className="form-group">
                      <label
                        className="form-label"
                        htmlFor="joblocation"
                        name="joblocation"
                      >
                        <i className="fas fa-map-marker-alt" /> Job Location
                      </label>
                      <Select
                        value={this.state.location}
                        onChange={this.handleLocationChange}
                        options={locationList}
                        isMulti={true}
                      />
                    </div>
                  </div>
                </div>                
                          
                <div className="form-group">
                  <label className="form-label">
                    <i className="fas fa-address-card" /> Education
                  </label>
                  <select
                    className="form-control"
                    value={this.state.education}
                    id="education"
                    label="Education"
                    type="text"
                    rows="1"
                    onChange={this.handleChange}
                    required
                  >
                    <option>Select</option>
                    {educationList && educationList.length > 0 ? (
                              educationList.map(item => {
                                return (
                                  <option value={item.value}>
                                    {item.label}
                                  </option>
                                );
                              })
                            ) : (
                              <option>No education data found!</option>
                            )}
                  </select>
                </div>

                <div className="row">
                  <div className="col-md-6 col-12">
                    <div className="form-group">     
                      <label className="form-label"><i className='fa fa-euro-sign'/> Expected Minimum Salary(Yearly)</label>
                      <input className="form-control" placeholder="40000"  id="minsalary"  type="number" value={this.state.minsalary} onChange={this.handleChange}></input>
                    </div>  
                  </div>
                  <div className="col-md-6 col-12">
                    <div className="form-group">     
                      <label className="form-label"><i className='fa fa-euro-sign'/> Expected Maximum Salary(Yearly)</label>
                      <input className="form-control" placeholder="60000"  id="maxsalary"  type="number" value={this.state.maxsalary} onChange={this.handleChange}></input>
                    </div> 
                  </div>  
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="jobdescription">
                    <i className="fas fa-sticky-note" /> Description
                  </label>
                  <textarea
                    id="jobdescription"
                    name="job_discription"
                    value={this.state.jobdescription}
                    className="form-control"
                    onChange={this.handleChange}
                    required
                  />
                </div>

                <div className="row mb-4">
                  <div className="col-12">
                    <div className="form-group">
                      <label className="form-label w-auto mr-2"><i className="fab fa-angellist"></i> Bonuses</label>
                      <button type="button" className="btn btn-danger btn-circle" onClick={this.toggle}><i className="fas fa-plus"></i></button>
                    </div>
                    <div className="row" id="bonuses">
                      {
                        this.state.bonuses.map((bonus, i) => {
                          return (
                            <div key={`bonus-${i}`} className="col-lg-3 col-md-4 col-12">
                              <div className="bonus-offers-tag badge badge-info mb-2">
                                <div className="row">
                                  <div className="col-8 text-left">
                                    <span>{bonus.bonusOffer}</span>
                                  </div>
                                  <div className="col-4">
                                    <i id={"remove_bonus_"+i} className="fas fa-trash-alt ml-3 float-right" onClick={(e) => this.toggleBonusRemove(e, bonus)}></i>
                                    <i id={"edit_bonus_"+i} onClick={(e) => this.toggleModalWithData(e, bonus, "remove_bonus_"+i)} className="fas fa-edit ml-3 float-right"></i>
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
                    <div className="form-group datepicker">
                      <label className="form-label w-100">
                        <i className="fas fa-calendar-alt prefix" /> Expected
                        Start Date
                      </label>
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
                  <div className="col-md-6 col-12">
                    <div className="form-group datepicker">
                      <label className="form-label w-100">
                        <i className="fas fa-calendar-alt prefix" /> Expiration
                        Date
                      </label>
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

                <button type="submit" className="btn btn-info w-100 mt-4">
                  <i className="fas fa-save" /> Save
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
  var returnObject = {
    auth: state.firebase.auth,
    response: state.profile.response,
    message: state.profile.message
  };

  const skillsData = state.firestore.data.Skill;
  const educationData = state.firestore.data.education;
  const locationData = state.firestore.data.city;
  if (skillsData && educationData) {
    var result = new Array();
    $.each(skillsData, function(index, item) {
      result.push({
        value: index,
        label: item.name
      });
    });
    returnObject.skillsList = result;
    console.log(result);

    result = new Array();
    $.each(educationData, function(index, item) {
      result.push({
        value: index,
        label: item.name
      });
    });
    returnObject.educationList = result;

    result = new Array();
    $.each(locationData, function(index, item) {
      result.push({
        value: index,
        label: item.name
      });
    });
    returnObject.locationList = result;
    console.log(result);
  }
  return returnObject;
};

const mapDispatchToProps = dispatch => {
  return {
    jobAdActions: jobAd => dispatch(jobAdActions(jobAd)),
    jobUpdateActions: jobAd => dispatch(jobUpdateActions(jobAd))
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([
    {
      collection: "education"
    },
    {
      collection: "Skill"
    },
    {
      collection: "city"
    }
  ])
)(CreateJobAds);
