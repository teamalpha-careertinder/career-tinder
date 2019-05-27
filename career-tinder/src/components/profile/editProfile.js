import React from 'react';
import './profile.css';
import * as ROUTES from '../../constants/routes';
import { connect } from "react-redux";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import EditEmployerProfile from './editEmployerProfile';
import EditJobSeekerProfile from './editJobSeekerProfile';

class EditProfile extends React.Component {    
  render() {        
    const { auth } = this.props;
    const { user } = this.props;
    if (!auth.uid && !auth.emailVerified) return <Redirect to={ROUTES.LOG_IN}/>;
    return (
      <div className="container">
        {user && user.userType === "jobseeker" ? (
            <EditJobSeekerProfile />
          ) : (
            <EditEmployerProfile />          
        )}
      </div>          
    );
  }
}


const mapStateToProps = state => {
  const auth = state.firebase.auth;
  const users = state.firestore.data.users;
  const user = users ? users[auth.uid] : null;
  return {
    user: user,
    auth: auth
  };
};


export default compose(connect(mapStateToProps))(EditProfile);