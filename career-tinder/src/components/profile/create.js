import React, { Component } from 'react';

class CreateProfile extends Component {
    render() {
      return (
        <div className="profile-form-wrapper">        
          <div className="card border-info mb-3">
            <div className="card-header">Create new profile</div>
            <div className="card-body text-info">
              <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                <li className="nav-item">
                  <a className="nav-link active" id="pills-job-seeker-tab" data-toggle="pill" href="#pills-job-seeker" role="tab" aria-controls="pills-job-seeker" aria-selected="true">Job Seeker</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" id="pills-company-tab" data-toggle="pill" href="#pills-company" role="tab" aria-controls="pills-company" aria-selected="false">Company</a>
                </li>
              </ul>
              <div className="tab-content" id="pills-tabContent">
                <div className="tab-pane fade show active" id="pills-job-seeker" role="tabpanel" aria-labelledby="pills-job-seeker-tab">
                  <form className="profile-form">
                    <div className="form-row">
                      <div className="col-md-4 col-sm-12">
                        <div className="form-group">
                          <label for="name">Name:</label>
                          <input type="text" className="form-control" id="name" placeholder="John Doe" />
                        </div>
                      </div>
                      <div className="col-md-4 col-sm-12">
                        <div className="form-group">
                          <label for="dob">Date of Birth:</label>
                          <input type="text" className="form-control" id="dob" placeholder="dd.mm.yyyy" />
                        </div>
                      </div>
                      <div className="col-md-4 col-sm-12">
                        <div className="form-group">
                          <label for="phone">Phone:</label>
                          <input type="text" className="form-control" id="phone" placeholder="01234567890" />
                        </div>
                      </div>
                    </div>
                    <div className="form-row">            
                      <div className="col-sm-12">
                        <div className="form-group">
                          <label for="address">Address:</label>
                          <textarea className="form-control" id="address" rows="2"></textarea>
                        </div>
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="col-md-6 col-sm-12">
                        <div className="form-group">
                          <label for="skills">Skills:</label>
                          <input type="text" className="form-control" id="skills" placeholder="Skills" />
                        </div>
                      </div>
                      <div className="col-md-6 col-sm-12">
                        <div className="form-group">
                          <label for="eu_citizen">EU Citizen:</label>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="eu_citizen" />
                            <label className="form-check-label" for="defaultCheck1">
                              Are you an EU Citizen?
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>   
                    <div className="form-row">
                      <div className="col-md-6 col-sm-12">
                        <div className="form-group">
                          <label for="work_experience">Work Experience:</label>
                          {/* Add Required Fields */}
                        </div>
                      </div>
                      <div className="col-md-6 col-sm-12">
                        <div className="form-group">
                          <label for="degree">Degree:</label>
                          {/* Add Required Fields */}
                        </div>
                      </div>
                    </div>    
                    <div className="form-row">
                      <div className="col-sm-12">
                        <button type="button" className="btn btn-outline-info float-right">Create Job Seeker</button>
                      </div>
                    </div>      
                  </form>  
                </div>
                <div className="tab-pane fade" id="pills-company" role="tabpanel" aria-labelledby="pills-company-tab">
                  <form className="profile-form">
                      <div className="form-row">
                        <div className="col-md-6 col-sm-12">
                          <div className="form-group">
                            <label for="company_name">Company Name:</label>
                            <input type="text" className="form-control" id="company_name" placeholder="John Doe" />
                          </div>
                        </div>
                        <div className="col-md-6 col-sm-12">
                          <div className="form-group">
                            <label for="industry">Industry:</label>
                            <input type="text" className="form-control" id="industry" placeholder="dd.mm.yyyy" />
                          </div>
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="col-md-4 col-sm-12">
                          <div className="form-group">
                            <label for="contact_name">Contact Name:</label>
                            <input type="text" className="form-control" id="contact_name" placeholder="Jane Doe" />
                          </div>
                        </div>
                        <div className="col-md-4 col-sm-12">
                          <div className="form-group">
                            <label for="contact_email">Email:</label>
                            <input type="email" className="form-control" id="contact_email" placeholder="john.doe@email.com" />
                          </div>
                        </div>
                        <div className="col-md-4 col-sm-12">
                          <div className="form-group">
                            <label for="contact_phone">Phone:</label>
                            <input type="text" className="form-control" id="contact_phone" placeholder="01234567890" />
                          </div>
                        </div>
                      </div>
                      <div className="form-row">            
                        <div className="col-md-6 col-sm-12">
                          <div className="form-group">
                            <label for="company_address">Address:</label>
                            <textarea className="form-control" id="company_address" rows="2"></textarea>
                          </div>
                        </div>
                        <div className="col-md-6 col-sm-12">
                          <div className="form-group">
                            <label for="company_description">Description:</label>
                            <textarea className="form-control" id="company_description" rows="2"></textarea>
                          </div>
                        </div>
                      </div>      
                      <div className="form-row">
                        <div className="col-sm-12">
                          <button type="button" className="btn btn-outline-info float-right">Create Company</button>
                        </div>
                      </div>        
                    </form>  
                </div>
              </div>  
            </div>
          </div>                  
        </div>            
      );
    }
  }
  
  export default CreateProfile;