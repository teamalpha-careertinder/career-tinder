import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import { MDBMask, MDBRow, MDBView, MDBContainer } from "mdbreact";
import { Link } from "react-router-dom";

class Feedboard extends Component {
  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to="/login" />;

    return (
      <div className="container text-center d-flex justify-content-center black-label">
           
            <MDBContainer>
              <MDBRow>
                <div className="black-text text-center text-md-left col-md-6 mt-xl-5 mb-5">
                <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            
                  <h1 className="h1-responsive font-weight-bold">
                    Career Tinder{" "}
                  </h1>
                  <hr className="hr-dark" />
                  <h6 className="mb-4">
                    Welcome to your career-tinder profile. Please
                    <Link to="/profile/create"> edit your profile </Link>
                    to have your profile complete. Your job feed is coming soon.
                  </h6>
                </div>
              </MDBRow>
            </MDBContainer>
         
        
      </div>
    );
  }
}

const mapStateToProps = state => {
  // console.log(state);
  return {
    auth: state.firebase.auth
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect()
)(Feedboard);
