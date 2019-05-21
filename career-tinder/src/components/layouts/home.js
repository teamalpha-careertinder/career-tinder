import React from "react";
import { NavLink } from "react-router-dom";
import { MDBCardBody, MDBBtn, MDBCardFooter
} from "mdbreact";
import { MDBAnimation } from "mdbreact";

class Home extends React.Component {
  render() {
    return (
        <div className="container">
          <div className="w-responsive text-center mx-auto p-3 mt-2">
            <div className="card-body text-info">
              <div className="card border-info mb-3">
                <MDBAnimation type="zoomInUp">
                  <div className="card-header">
                    <h6 className="text-center">Hey there! Are you a Job Seeker or an Employer?</h6>
                  </div>
                  <MDBCardBody className="z-depth-3 gradient-text" md="3" xl="3">
                    <div className="text-center mt-4 black-text">
                      <NavLink to="/registration/jobseeker">
                        <MDBBtn outline color="secondary">
                          <i className="fas fa-user-plus" />{" "}
                          <b>I'M A JOB SEEKER</b>
                        </MDBBtn>
                      </NavLink>
                    </div>
                    <div className="text-center mt-4 black-text">
                      <NavLink to="/registration/employer">
                        <MDBBtn outline color="info">
                          <i className="fas fa-user-plus" />{" "}
                          <b>I'M AN EMPLOYER</b>
                        </MDBBtn>
                      </NavLink>
                    </div>
                    <div className="text-center mt-4 black-text">
                      <hr className="hr-dark" />
                      <div className="text-center d-flex justify-content-center black-label">
                        <div className="black-text">
                          Already have an account? <br />
                          <NavLink className="red-text" to="/login">
                            <i className="fas fa-sign-in-alt" /> Log in
                          </NavLink>
                        </div>
                      </div>
                    </div>
                  </MDBCardBody>
                </MDBAnimation>
              </div>
              <MDBCardFooter >
                <h6 className="mb-2" align="center">
                  Welcome to Career Tinder website. This website is
                  desgined for the companies which are looking to hire new
                  employees, as well as people how are looking for job. To
                  use the offered services of the web, please login with
                  your account or if you don't have an account yet, please
                  click the signup button to register
                </h6>
              </MDBCardFooter>
            </div>
          </div>
        </div>
    );
  }
}

export default Home;