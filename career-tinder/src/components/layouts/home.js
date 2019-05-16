import React from "react";
import { NavLink } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import {
  MDBMask,
  MDBRow,
  MDBCol,
  MDBView,
  MDBContainer,
  MDBCard,
  MDBCardBody
} from "mdbreact";
import { MDBAnimation } from "mdbreact";

class Home extends React.Component {
  state = {
    collapseID: ""
  };

  toggleCollapse = collapseID => () =>
    this.setState(prevState => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : ""
    }));

  render() {
    const overlay = (
      <div
        id="sidenav-overlay"
        style={{ backgroundColor: "transparent" }}
        onClick={this.toggleCollapse("navbarCollapse")}
      />
    );
    return (
      <div id="classicformpage">
        <Router>
          <div>{this.state.collapseID && overlay}</div>
        </Router>

        <MDBView>
          <MDBMask className="d-flex justify-content-center align-items-center gradient">
            <MDBContainer>
              <MDBRow>
                <div className="white-text text-center text-md-left col-md-6 mt-xl-5 mb-5">
                  <div>
                    <MDBAnimation type="slideInLeft">
                      <h1 className="h1-responsive font-weight-bold">
                        Career Tinder{" "}
                      </h1>
                      <hr className="hr-light" />
                      <h6 className="mb-4">
                        Welcome to Career Tinder website. This website is
                        desgined for the companies which are looking to hire new
                        employees, as well as people how are looking for job. To
                        use the offered services of the web, please login with
                        your account or if you don't have an account yet, please
                        click the signup button to register
                      </h6>
                    </MDBAnimation>
                  </div>
                </div>
                <MDBCol md="6" xl="5" className="mb-4">
                  <MDBAnimation type="zoomInUp">
                    <MDBCard id="classic-card">
                      <MDBCardBody className="z-depth-2 white-text">
                        <h5 className="text-center">
                          Hey there! Are you a Job Seeker or an Employer?
                        </h5>
                        <hr className="hr-light" />
                        <div className="text-center mt-4 black-text">
                          <NavLink
                            className="btn purple-gradient Ripple-parent"
                            to="/registration/jobseeker"
                          >
                            <i className="fas fa-user-plus" />{" "}
                            <b>I'M A JOB SEEKER</b>
                          </NavLink>
                        </div>
                        <div className="text-center mt-4 black-text">
                          <NavLink
                            className="btn blue-gradient Ripple-parent"
                            to="/registration/employer"
                          >
                            <i className="fas fa-user-plus" />{" "}
                            <b>I'M AN EMPLOYER</b>
                          </NavLink>
                        </div>
                        <div className="text-center mt-4 black-text">
                          <hr className="hr-light" />
                          <div className="text-center d-flex justify-content-center white-label">
                            <div className="white-text">
                              Already have an account? <br />
                              <NavLink className="red-text" to="/login">
                                <i className="fas fa-sign-in-alt" /> Login
                              </NavLink>
                            </div>
                          </div>
                        </div>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBAnimation>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </MDBMask>
        </MDBView>
      </div>
    );
  }
}

export default Home;
