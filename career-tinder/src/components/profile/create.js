import React, { Component } from "react";
import { MDBInput, MDBIcon, MDBBtn } from "mdbreact";

class CreateProfile extends Component {
  render() {
    return (
      <div className="container">
        <div className="profile-form-wrapper">
          <div className="card border-info mb-3">
            <div className="card-header">
              <MDBIcon icon="user" className="mr-1" /> Create new profile
            </div>
            <div className="card-body text-info">
              <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    id="pills-job-seeker-tab"
                    data-toggle="pill"
                    href="#pills-job-seeker"
                    role="tab"
                    aria-controls="pills-job-seeker"
                    aria-selected="true"
                  >
                    <MDBIcon icon="users" className="mr-1" /> Job Seeker
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    id="pills-company-tab"
                    data-toggle="pill"
                    href="#pills-company"
                    role="tab"
                    aria-controls="pills-company"
                    aria-selected="false"
                  >
                    <MDBIcon icon="user-tie" className="mr-1" /> Employer
                  </a>
                </li>
              </ul>
              <div className="tab-content" id="pills-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="pills-job-seeker"
                  role="tabpanel"
                  aria-labelledby="pills-job-seeker-tab"
                >
                  <form className="profile-form">
                    <div className="row">
                      <div className="col-md-4 col-sm-12">
                        <div className="form-group">
                          <MDBInput
                            label="Name"
                            outline
                            type="text"
                            icon="pencil-alt"
                          />
                        </div>
                      </div>
                      <div className="col-md-4 col-sm-12">
                        <div className="form-group">
                          <MDBInput
                            label="Date of Birth"
                            outline
                            type="text"
                            icon="calendar-alt"
                          />
                        </div>
                      </div>
                      <div className="col-md-4 col-sm-12">
                        <div className="form-group">
                          <MDBInput
                            label="Phone"
                            outline
                            icon="mobile-alt"
                            type="text"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-12">
                        <div className="form-group">
                          <MDBInput
                            label="Address"
                            outline
                            icon="address-card"
                            type="textarea"
                            rows="1"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 col-sm-12">
                        <div className="form-group">
                          <MDBInput
                            label="Skills"
                            outline
                            icon="walking"
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="col-md-6 col-sm-12">
                        <div className="form-group">
                          <label for="eu_citizen">EU Citizen:</label>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              id="eu_citizen"
                            />
                            <label
                              className="form-check-label"
                              for="defaultCheck1"
                            >
                              Are you an EU Citizen?
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
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
                    <div className="row">
                      <div className="col-sm-12">
                        <MDBBtn outline color="info" className="float-right">
                          <MDBIcon icon="plus" className="mr-1" /> Create Job
                          Seeker
                        </MDBBtn>
                      </div>
                    </div>
                  </form>
                </div>
                <div
                  className="tab-pane fade"
                  id="pills-company"
                  role="tabpanel"
                  aria-labelledby="pills-company-tab"
                >
                  <form className="profile-form">
                    <div className="row">
                      <div className="col-md-6 col-sm-12">
                        <div className="form-group">
                          <MDBInput
                            label="Employer Name"
                            outline
                            icon="pencil-alt"
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="col-md-6 col-sm-12">
                        <div className="form-group">
                          <MDBInput
                            label="Industry"
                            type="text"
                            outline
                            icon="industry"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4 col-sm-12">
                        <div className="form-group">
                          <MDBInput
                            label="Contact Name"
                            type="text"
                            outline
                            icon="pencil-alt"
                          />
                        </div>
                      </div>
                      <div className="col-md-4 col-sm-12">
                        <div className="form-group">
                          <MDBInput
                            label="Contact Email"
                            type="email"
                            outline
                            icon="envelope"
                          />
                        </div>
                      </div>
                      <div className="col-md-4 col-sm-12">
                        <div className="form-group">
                          <MDBInput
                            label="Contact Phone"
                            type="text"
                            outline
                            icon="mobile-alt"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 col-sm-12">
                        <div className="form-group">
                          <MDBInput
                            label="Employer Address"
                            type="textarea"
                            rows="1"
                            outline
                            icon="address-card"
                          />
                        </div>
                      </div>
                      <div className="col-md-6 col-sm-12">
                        <div className="form-group">
                          <MDBInput
                            label="Employer Description"
                            type="textarea"
                            rows="1"
                            outline
                            icon="comment-alt"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-12">
                        <MDBBtn outline color="info" className="float-right">
                          <MDBIcon icon="plus" className="mr-1" /> Create
                          Employer
                        </MDBBtn>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>{" "}
      </div>
    );
  }
}

export default CreateProfile;
