import React from "react";
import { connect } from "react-redux";
import { verifyEmail } from "../../store/actions/authActions";
import { compose } from "recompose";
import { MDBRow, MDBBtn } from "mdbreact";
import { Redirect } from "react-router-dom";

const EmailVerification = Component => {
  class EmailVerification extends React.Component {
    onSendEmailVerification = () => {
      this.props.verifyEmail();
    };

    render() {
      const { auth, emailIsSent, emailVerified } = this.props;

      if (!auth.uid) return <Redirect to="/login" />;
      return auth && !emailVerified ? (
        <div className="container text-center d-flex justify-content-center black-label">
          <MDBRow>
            <div className="black-text text-center text-md-left col-md-6 mt-xl-5 mb-5">
              <h1 className="h1-responsive font-weight-bold mt-4">
                Career Tinder{" "}
              </h1>
              <hr className="hr-dark" />
              {emailIsSent ? (
                <h6 className="mb-4">
                  E-Mail confirmation sent: Check you E-Mails (Spam folder
                  included) for a confirmation E-Mail. Refresh this page once
                  you confirmed your E-Mail.
                </h6>
              ) : (
                <h6 className="mb-4">
                  Verify your E-Mail: Check you E-Mails (Spam folder included)
                  for a confirmation E-Mail or send another confirmation E-Mail.
                </h6>
              )}
              <MDBBtn
                color="indigo"
                onClick={this.onSendEmailVerification}
                disabled={emailIsSent}
              >
                {" "}
                Send confirmation E-Mail
              </MDBBtn>
            </div>
          </MDBRow>
        </div>
      ) : (
        <Component {...this.props} />
      );
    }
  }

  const mapStateToProps = state => {
    // console.log(state);
    return {
      authError: state.auth.authError,
      emailIsSent: state.auth.emailIsSent,
      emailVerified: state.firebase.auth.emailVerified,
      auth: state.firebase.auth
    };
  };

  const mapDispatchToProps = dispatch => {
    return {
      verifyEmail: () => dispatch(verifyEmail())
    };
  };

  return compose(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )
  )(EmailVerification);
};
export default EmailVerification;
