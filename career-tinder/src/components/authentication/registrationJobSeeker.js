import React from "react";
import { NavLink } from "react-router-dom";
import { MDBBtn, MDBCardBody, MDBCardFooter, MDBInput } from "mdbreact";
import * as ROUTES from "../../constants/routes";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { signUpAsJobSeeker } from "../../store/actions/authActions";
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

class RegistrationJobSeeker extends React.Component {
  state = {
    name: "",
    email: "",
    password: "",
    confirm_password: ""
  };

  

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  

  render() {
    const { auth, authError } = this.props;
    const { password, confirm_password } = this.state;
    const isInvalid =
      password !== confirm_password ||
      password === "" ||
      confirm_password === "";

    if (auth.uid && !auth.emailVerified)
      return <Redirect to={ROUTES.EMAIL_VERIFICATION} />;
    return (
      <div className="container">
        <div className="card border-info card-container">
          <div className="card-header">
            <i className="fas fa-users" /> Sign Up as a Job Seeker
          </div>
          <MDBCardBody className="z-depth-2 gradient-text text-info">
            <div className="row">
              <div className="col-md-6 col-sm-12">

              <Formik
                initialValues={{
                    name: '',
                    email: '',
                    password: '',
                    confirmpassword: ''
                }}

                validationSchema={Yup.object().shape({
                    name: Yup.string()
                        .required('Name is required'),
                    email: Yup.string()
                        .email('Email is invalid')
                        .required('Email is required'),
                    password: Yup.string()
                        .min(8, 'Password must be at least 8 characters')
                        .required('Password is required'),
                    confirmpassword:  Yup.string()
                        .oneOf([Yup.ref('password'), null], 'Passwords must match')
                        .required('Confirm Password is required')
                })}

                onSubmit={fields => {
                    alert('SUCCESS!! :-)\n\n' + JSON.stringify(fields, null, 4))
                }}

                render={({ errors, status, touched }) => (
                <Form>

                  <div>
                    <div className="md-form">
                    <i className="fa fa-pencil-alt prefix"></i>
                    <Field
                    //value={this.state.name}
                      name="name"
                      id="name"
                      type="text"
                      className={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')}
                      //onChange={this.handleChange}
                      />
                      <label class="" htmlfor="name">Your Name</label>
                      <ErrorMessage name="name" component="div" className="invalid-feedback" />
                    </div>
                  </div>

                  <div>
                  <MDBInput
                    //value={this.state.email}
                         name="email"
                         label="Your email"
                         icon="envelope"
                         type="email"
                         id="email"
                         className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')}
                         autoComplete="false"
                         //onChange={this.handleChange}
                  />
                  <ErrorMessage name="email" component="div" className="invalid-feedback" />
                  </div>

                  <div>
                  <Field
                     //value={this.state.password}
                     name="password"
                     label="Your password"
                     icon="lock"
                     type="password"
                     id="password"
                     className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')}
                     //onChange={this.handleChange}
                  />
                  <ErrorMessage name="password" component="div" className="invalid-feedback" />
                  </div>

                  <Field
                   //value={this.state.confirmpassword}
                   name="confirmpassword"
                   id="confirm_password"
                   label="Confirm Password"
                   icon="lock"
                   type="password"
                   autoComplete="new-password"
                   className={'form-control' + (errors.confirmpassword && touched.confirmpassword ? ' is-invalid' : '')}
                   //onChange={this.handleChange}
                  />
                  <ErrorMessage name="confirmpassword" component="div" className="invalid-feedback" />
                  <div className="text-center mt-4 black-text">
                    <button color="primary" type="submit" enabled={isInvalid}>
                      Sign Up
                    </button>
                    <div className="center red-text">
                      {authError ? <p>{authError}</p> : null}
                    </div>
                  </div>
                </Form>

                )}
            />
                <div className="text-center mt-4">
                  <hr className="hr-dark" />
                  <div className="text-center d-flex justify-content-center white-label">
                    <NavLink
                      className="red-text"
                      to={ROUTES.REGISTRATION_EMPLOYER}
                    >
                      <i className="fas fa-user-plus" /> Oops! I'm an Employer!
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </MDBCardBody>
          <MDBCardFooter>
            <h6 className="mb-2" align="center">
              Welcome to Career Tinder website. This website is desgined for the
              companies which are looking to hire new employees, as well as
              people how are looking for job. To use the offered services of the
              web, please login with your account or if you don't have an
              account yet, please click the signup button to register
            </h6>
          </MDBCardFooter>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signUpAsJobSeeker: creds => dispatch(signUpAsJobSeeker(creds))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegistrationJobSeeker);
