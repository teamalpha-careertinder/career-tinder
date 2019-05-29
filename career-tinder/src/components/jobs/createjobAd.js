import React from "react";
import { MDBInput, MDBBtn } from "mdbreact";
import DatePicker from "react-datepicker";
import Select from 'react-select';
import { MDBCardBody } from "mdbreact";
import { Alert } from "reactstrap";


const skills = [
  { value: 'php', label: 'PHP' },
  { value: 'asp.net', label: 'ASP.Net' },
  { value: 'java', label: 'Java' }
];

class CreateJobAd extends React.Component {
  
  handleSkillsChange = (selectedSkills) => {
    this.setState({ selectedSkills });
    console.log(`Option selected:`, selectedSkills);
  }

  constructor(props) {
    super(props);
    this.state = {
        jobtitle: "",
        neededskills: "",
        typeofjob: "",
        salaryrange: "",
        jobdescription: "",
        education: "",
        expectedstartdate: "",
        expirationdate: ""
      };

      this.handleFromDateChange = this.handleFromDateChange.bind(this);
      this.handleToDateChange = this.handleToDateChange.bind(this);
    }

    getPickerValue = (value) => {
      console.log(value);
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

    handleOptionChange = (changeEvent) => {
      this.setState({
        prevWorkJobType: changeEvent.target.value
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

      submitHandler = event => {
        event.preventDefault();
        event.target.className += " was-validated";
      };

      changeHandler = event => {
        this.setState({ [event.target.name]: event.target.value });
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

      const { selectedSkills } = this.state;
  
    return (

      <div className="create-job-ad">
      <Alert color="success" 
      isOpen={this.state.visible}>
        <i class="fas fa-check"></i> Job Successfully posted!</Alert>

<div class="container "></div>
<div class="row justify-content-md-center">
<div className="profile-form-wrapper">        
        <div className="card border-info card-container">
          <div className="card-header">
            <i className="fas fa-users"></i>&nbsp; Create Job Ad
          </div>
          <MDBCardBody >
          <div className="card-body text-info">
            <div className="tab-content" id="pills-tabContent">
              <div className="tab-pane fade show active" 
              id="div className= col-md-6 col-sm-12" 
              role="tabpanel" 
              aria-labelledby="pills-create-job-ad-tab">
                <form className="profile-form" onSubmit={this.handleSubmit}>                    
                  
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
                                    onChange={this.changeHandler}
                                    required
                                   // onChange={this.handleChange}
                                    />
                      </div>
                    </div>  
                    </div>  
                    <div className="row">
                    <div className="col-sm-12">
                      <div className="form-group">
                       <label>Needed Skills</label>
                        <Select
                          value={selectedSkills}
                          onChange={this.handleSkillsChange}
                          options={skills}
                          isMulti={true}
                        />
                      </div>
                    </div>
              
                  <div className="col-sm-10 mb-1">                      
                  <div className="form-group">
                        <label htmlFor="job_type">Employment type for this position:</label>
                        <div className="form-check">
                          <input className="form-check-input checkbox" type="checkbox" checked={this.state.applyingFullTime} onChange={this.handleChangeFT} />
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
                    </div>

                    <div className="row">            
                    <div className="col-sm-6">
                      <div className="form-group">
                        <MDBInput 
                         id="education"
                         label="Education" 
                         icon="address-card"
                         type="text" 
                         rows="1" 
                         className="form-control"
                         onChange={this.changeHandler}
                        required
                        // onChange={this.handleChange}
                                   />
                      </div>
                    </div>
                
                    <div className="col-sm-6">
                      <div className="form-group">
                      <MDBInput id="salaryRange"
                         label="Salary range"
                          icon="euro-sign" 
                          type="text" 
                          onChange={this.handleChange} />
                      </div>
                    </div> 
                    </div>  
 

                    <div className="row">
                    <div className="col-sm-12">
                      <div className="form-group">
                        <MDBInput id="Jobdiscription"
                         label="Job Discription"
                         type="textarea"
                         rows="3"
                         icon="comment-alt"
                          className="form-control"
                          onChange={this.changeHandler}
                          required
                         // onChange={this.handleChange}
                          />
                      </div>
                    </div>  
                    </div>  
                    <div className="col-sm-6">
                                        <div className="form-group datepicker">
                                            <label>Expected Start Date:</label>
                                            <div className="md-form">
                                                <i className="fas fa-calendar-alt prefix"></i>
                                                    <DatePicker selected={this.state.startFromDate} onChange={this.handleFromDateChange} className="form-control" 
                                                        peekNextMonth showMonthDropdown showYearDropdown dropdownMode="select" name="working_from" />
                                            </div>
                                        </div>
                                    </div>

                     <div className="col-sm-6">
                                        <div className="form-group datepicker">
                                            <label>Expiration Date:</label>
                                            <div className="md-form">
                                                <i className="fas fa-calendar-alt prefix"></i>
                                                    <DatePicker selected={this.state.startFromDate} onChange={this.handleFromDateChange} className="form-control" 
                                                        peekNextMonth showMonthDropdown showYearDropdown dropdownMode="select" name="working_from" />
                                            </div>
                                        </div>
                                    </div>

                  <div className="row">
                    <div className="col-sm-9">
                      <MDBBtn color="primary" 
                      className="float-right" 
                      type="submit" onClick={()=>{this.onShowAlert()}}>
                        <i className="fas fa-save"></i> Add This Job Opportunity
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


export default CreateJobAd;


