import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';

const FormPage = () => {
  return (
    <MDBContainer>
      <MDBRow>
        <MDBCol md="6">
          <form >
            <p className="h4 text-center mb-4">Sign up</p>
            
            <div className="form-group">
              <input type="first_name" className="form-control" placeholder="First Name" />
            </div>
            <br />

            <div className="form-group">
              <input type="last_name" className="form-control" placeholder="Last Name" />
            </div>
            <br />

            <div className="form-group">
              <input type="email" className="form-control" placeholder="Email Address" />
            </div>
            <br />

            <div className="form-group">
              <input type="text" className="form-control" placeholder="Address" />
            </div>
            <br />

            <div className="form-group">
              <input type="tel" className="form-control" placeholder="Postal" />
            </div>
            <br />

            <div className="form-group">
              <input type="password" className="form-control" placeholder="Password" />
            </div>
                   
            <div className="text-center mt-4">
              <MDBBtn color="unique" type="submit">
                Register
              </MDBBtn>
            </div>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default FormPage;