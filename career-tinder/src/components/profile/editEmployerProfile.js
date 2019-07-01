import React from "react";
import { MDBInput, MDBBtn } from "mdbreact";
import "./profile.css";
import { connect } from "react-redux";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import { Alert } from "reactstrap";
import { editEmployerProfile } from "../../store/actions/profileAction";
import * as ROUTES from "../../constants/routes";
import { firestoreConnect } from "react-redux-firebase";

//Entity to store employerProfile in DB
const employerProfileEntity = {
  employerName: null,
  industryName: null,
  employerAddress: null,
  employerDescription: null,
  contactName: null,
  contactEmail: null,
  contactPhone: null
};

class EditEmployerProfile extends React.Component {
  constructor(props) {
    super(props);

    var employerProfileProps = this.props.employer;
    var employerName =
      employerProfileProps && employerProfileProps.employerName;
    var industryName =
      employerProfileProps && employerProfileProps.industryName;
    var employerAddress =
      employerProfileProps && employerProfileProps.employerAddress;
    var employerDescription =
      employerProfileProps && employerProfileProps.employerDescription;
    var contactName = employerProfileProps && employerProfileProps.contactName;
    var contactEmail =
      employerProfileProps && employerProfileProps.contactEmail;
    var contactPhone =
      employerProfileProps && employerProfileProps.contactPhone;
    this.state = {
      employerName: employerName,
      industryName: industryName,
      employerAddress: employerAddress,
      employerDescription: employerDescription,
      contactName: contactName,
      contactEmail: contactEmail,
      contactPhone: contactPhone,
      visible: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleEmployerSubmit = this.handleEmployerSubmit.bind(this);
    this.onShowAlert = this.onShowAlert.bind(this);
  }
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleEmployerSubmit = e => {
    e.preventDefault();
    var employerProfile = employerProfileEntity;
    if (this.state.employerName) {
      employerProfileEntity.employerName = this.state.employerName;
    }
    if (this.state.industryName) {
      employerProfileEntity.industryName = this.state.industryName;
    }
    if (this.state.employerAddress) {
      employerProfileEntity.employerAddress = this.state.employerAddress;
    }
    if (this.state.employerDescription) {
      employerProfileEntity.employerDescription = this.state.employerDescription;
    }
    if (this.state.contactName) {
      employerProfileEntity.contactName = this.state.contactName;
    }
    if (this.state.contactEmail) {
      employerProfileEntity.contactEmail = this.state.contactEmail;
    }
    if (this.state.contactPhone) {
      employerProfileEntity.contactPhone = this.state.contactPhone;
    }

    this.props.editEmployerProfile(employerProfile);
    this.onShowAlert();
  };

  onShowAlert = () => {
    this.setState({ visible: true }, () => {
      window.setTimeout(() => {
        this.setState({ visible: false });
      }, 3000);
    });
  };

  render() {
    const { auth, response, message } = this.props;
    if (!auth.uid && !auth.emailVerified)
      return <Redirect to={ROUTES.LOG_IN} />;
    return (
      <div className="employer-profile">
        <Alert color={response} isOpen={this.state.visible}><i className={response === 'success' ? "fas fa-check" : "fas fa-times"}></i> {message}</Alert>
        <div className="profile-form-wrapper">
          <h3 className="text-center font-weight-bold mt-4">
            <i className="far fa-edit"></i><br/>
            Edit your Employer profile
          </h3>
          <div className="row justify-content-center">
            <div className="col-lg-10 col-12">
              <form
                className="profile-form mt-4"
                onSubmit={this.handleEmployerSubmit}
              >
                <div className="row">
                  <div className="col-md-6 col-12">
                    <div className="form-group">
                      <label className="form-label" htmlFor="employerName"><i className="fas fa-file-signature"></i> Company name</label>
                      <input type="text" id="employerName" name="employerName" value={this.state.employerName || ''} className="form-control form-control-lg" onChange={this.handleChange} 
                        placeholder="Career Tinder" required />
                    </div>
                  </div>
                  <div className="col-md-6 col-12">
                    <div className="form-group">
                      <label className="form-label" htmlFor="industryName"><i className="fas fa-industry"></i> Industry</label>
                      <input type="text" id="industryName" name="industryName" value={this.state.industryName || ''} className="form-control form-control-lg" onChange={this.handleChange} 
                        placeholder="IT" required />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <div className="form-group">
                      <label className="form-label" htmlFor="employerAddress"><i className="fas fa-map-marker-alt"></i> Address</label>
                      <textarea id="employerAddress" name="employerAddress" value={this.state.employerAddress || ''} className="form-control form-control-lg" onChange={this.handleChange} 
                        required></textarea>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <label className="form-label" htmlFor="employerDescription"><i className="fas fa-sticky-note"></i> Description</label>
                      <textarea id="employerDescription" name="employerDescription" value={this.state.employerDescription || ''} className="form-control form-control-lg" onChange={this.handleChange}></textarea>
                    </div>
                  </div>
                </div>
                <div className="row text-center mt-4 mb-4">
                  <div className="col-5">
                    <hr/>
                  </div>
                  <div className="col-2">
                    <i class="fas fa-tty"></i>
                  </div>
                  <div className="col-5">
                    <hr/>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-4 col-12">
                    <div className="form-group">
                      <label className="form-label" htmlFor="contactName"><i className="fas fa-user-check"></i> Contact person</label>
                      <input type="text" id="contactName" name="contactName" value={this.state.contactName || ''} className="form-control form-control-lg" onChange={this.handleChange} 
                        placeholder="Jane Doe" required />
                    </div>
                  </div>
                  <div className="col-lg-4 col-12">
                    <div className="form-group">
                      <label className="form-label" htmlFor="contactEmail"><i className="fas fa-envelope"></i> Contact email</label>
                      <input type="email" id="contactEmail" name="contactEmail" value={this.state.contactEmail || ''} className="form-control form-control-lg" onChange={this.handleChange} 
                        placeholder="contact@career-tinder.com" required />
                    </div>
                  </div>
                  <div className="col-lg-4 col-12">
                    <div className="form-group">
                      <label className="form-label" htmlFor="contactPhone"><i className="fas fa-mobile-alt"></i> Contact number</label>
                      <input type="text" id="contactPhone" name="contactPhone" value={this.state.contactPhone || ''} className="form-control form-control-lg" onChange={this.handleChange} 
                        placeholder="01XXXXXXXXX" required />
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
  const employers = state.firestore.data.employer;
  const auth = state.firebase.auth;
  const employer = employers ? employers[auth.uid] : null;
  return {
    auth: auth,
    employer: employer,
    response: state.profile.response,
    message: state.profile.message
  };
};

const mapDispatchToPropsEmployer = dispatch => {
  // console.log(state);
  return {
    editEmployerProfile: profile => dispatch(editEmployerProfile(profile))
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToPropsEmployer
  ),
  firestoreConnect([
    {
      collection: "employer"
    }
  ])
)(EditEmployerProfile);
