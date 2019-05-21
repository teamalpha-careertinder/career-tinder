import React from "react";
import { MDBBtn, MDBInput } from "mdbreact";
import "./login.css";

class ForgotPassword extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="card-body text-info">
          <div className="card border-info mb-3">
            <div className="card-header">
              Reset your password
            </div>
            <div className="card-body text-info">
              <div className="gradient-text">
                <h6 className="mb-2 black-text" align="center">
                  Enter the e-mail address associated with your Career Tinder account and we'll send 
                  you instructions on how to reset your password.
                </h6>
                <form onSubmit={this.handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 col-sm-12">
                      <MDBInput
                      label="Your email"
                      icon="envelope"
                      className="black-text"
                      type="email"
                      id="email"
                      onChange={this.handleChange}
                      />

                      <div className="text-center mt-4 black-text">
                        <MDBBtn color="indigo" type="submit">
                          Send
                        </MDBBtn>
                      </div>
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


export default ForgotPassword;
