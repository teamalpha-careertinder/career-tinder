import React from "react";
import { NavLink,Link } from "react-router-dom";
import {
 MDBBtn,
 MDBCardFooter,
 MDBInput
} from "mdbreact";
import "./login.css";
import { signIn } from "../../store/actions/authActions";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

class Login extends React.Component {
 state = {
   email: "",
   password: ""
 };
 handleChange = e => {
   this.setState({
     [e.target.id]: e.target.value
   });
 };
 handleSubmit = e => {
   e.preventDefault();
   this.props.signIn(this.state);
 };

 render() {
   const { authError, auth } = this.props;
   if (auth.uid) return <Redirect to="/feed" />;
   return (
       <div className="container">
           <div className="card border-info mb-3 mt-4">
             <div className="card-header">
               <i className="fas fa-sign-in-alt"></i> Sign In
             </div>
             <div className="card-body text-info">
               <div className="gradient-text">
                 <div className="row">
                   <div className="col-md-6 col-sm-12">
                     <form onSubmit={this.handleSubmit}>
                       <MDBInput
                         label="Your email"
                         icon="envelope"
                         type="email"
                         id="email"
                         onChange={this.handleChange}
                       />
                       <MDBInput
                         label="Your password"
                         icon="lock"
                         type="password"
                         id="password"
                         onChange={this.handleChange}
                       />
                       <div className="text-center mt-4 black-text">
                         <MDBBtn color="indigo" type="submit" className="mb-4">
                           Sign In
                         </MDBBtn>
                         <div className="center red-text">
                           {authError ? <p>{authError}</p> : null}
                         </div>
                       </div>

                       <Link className="text-center d-flex justify-content-center black-text" to="/forgot-password">
                         Forgot password ?
                       </Link>
                     </form>
                   </div>
                 </div>
               </div>
               <div className="text-center mt-4 black-text">
                 <div className="text-center d-flex justify-content-center white-label">
                   <div className="black-text">
                     <hr className="hr-dark" />
                     Don't have an account ?{" "}
                     <NavLink exact className="nav-link red-text" to="/">
                       <i className="fas fa-user-plus" /> Register
                     </NavLink>
                   </div>
                 </div>
               </div>
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
   );
 }
}

const mapStateToProps = state => {
 return {
   authError: state.auth.authError,
   auth: state.firebase.auth
 };
};

const mapDispatchToProps = dispatch => {
 return {
   signIn: creds => dispatch(signIn(creds))
 };
};

export default connect(
 mapStateToProps,
 mapDispatchToProps
)(Login);