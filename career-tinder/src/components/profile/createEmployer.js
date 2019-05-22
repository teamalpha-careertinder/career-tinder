import React from 'react';
import { MDBInput, MDBIcon, MDBBtn } from "mdbreact";
import './profile.css';
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";

import { createEmployerProfile } from '../../store/actions/profileAction';

class CreateEmployerProfile extends React.Component {

    handleChange = (e) => {
      this.setState({
        [e.target.id]: e.target.value
      })
    }

    handleEmployerSubmit = (e) => {
      e.preventDefault();
      this.props.createEmployerProfile(this.state);
      this.props.history.push('/feed');
    }

    render() {
      const { auth, user } = this.props;     
      if (!auth.uid) return <Redirect to="/login" />;
      return (
        <div className="container">
          <div className="profile-form-wrapper">        
            <div className="card border-info card-container">
              <div className="card-header">
                <i className="fas fa-user-tie"></i> Update your Employer profile
              </div>
              <div className="card-body text-info">                
                <div className="tab-content" id="pills-tabContent">
                  <div className="tab-pane fade show active" id="pills-company" role="tabpanel" aria-labelledby="pills-company-tab">
                    <form className="profile-form" onSubmit={this.handleEmployerSubmit}>
                        <div className="row">
                          <div className="col-md-6 col-sm-12">
                            <div className="form-group">
                              <MDBInput id= "employerName" label="Employer Name" icon="pencil-alt" type="text" onChange={this.handleChange} />
                            </div>
                          </div>
                          <div className="col-md-6 col-sm-12">
                            <div className="form-group">
                              <MDBInput id= "industryName" label="Industry" type="text" icon="industry" onChange={this.handleChange} />
                            </div>
                          </div>
                        </div>
                        <div className="row">            
                          <div className="col-md-6 col-sm-12">
                            <div className="form-group">
                              <MDBInput id="employerAddress" label="Employer Address" type="textarea" rows="1" icon="address-card" onChange={this.handleChange} />
                            </div>
                          </div>
                          <div className="col-md-6 col-sm-12">
                            <div className="form-group">
                              <MDBInput id="employerDescription" label="Employer Description" type="textarea" rows="1" icon="comment-alt" onChange={this.handleChange} />
                            </div>
                          </div>
                        </div>   
                        <div className="row">
                          <div className="col-md-4 col-sm-12">
                            <div className="form-group">
                              <MDBInput id="contactName" label="Contact Name" type="text" icon="pencil-alt" onChange={this.handleChange} />
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-12">
                            <div className="form-group">
                              <MDBInput id="contactEmail" label="Contact Email" type="email" icon="envelope" onChange={this.handleChange} />
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-12">
                            <div className="form-group">
                              <MDBInput id="contactPhone" label="Contact Phone" type="text" icon="mobile-alt" onChange={this.handleChange} />
                            </div>
                          </div>
                        </div>                         
                        <div className="row">
                          <div className="col-sm-12">
                            <MDBBtn color="primary" className="float-right" type="submit">
                              <i className="fas fa-save"></i> Save Employer Profile
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


const mapStateToProps = (state) => {
  const auth = state.firebase.auth;
  const users = state.firestore.data.users;
  const user= users ? users[auth.uid] : null;
  return {
    user: user,
    auth: auth
  }
};

const mapDispatchToPropsEmployer = dispatch => {
  // console.log(state);
  return {
    createEmployerProfile: (profile) => dispatch(createEmployerProfile(profile))
  }
};

export default 
  compose(
    connect(mapStateToProps,mapDispatchToPropsEmployer),
    firestoreConnect([{
      collection: 'users'
    }])
  )(CreateEmployerProfile);
