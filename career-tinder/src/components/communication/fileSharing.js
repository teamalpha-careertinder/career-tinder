import React from "react";
import * as ROUTES from "../../constants/routes";
import "./communication.css";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
//import { passwordChange } from "../../store/actions/profileAction";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import firebase from "../../config/firebaseConfig";

/*const INITIAL_STATE = {
  passwordOne: "",
  passwordTwo: "",
  error: null
};*/

//var newLoad;

/**************************************************** */

/**************************************************** */


class FileSharing extends React.Component {
//   state = { ...INITIAL_STATE };

  constructor(props) {
    super(props);
    this.state = {
      file: null,
      fileURL: '',
      progress: 0
    }
    //this.state = { ...INITIAL_STATE };
    //newLoad = true;
  }

  handleChange = event => {
    if (event.target.files[0]) {
      const file = event.target.files[0];
      this.setState(() => ({file}));
    }
  }

  handleUpload = () => {
    const {file} = this.state;
    //const storage = this.props.firestore; //getFirestore();
    const storage = firebase.storage();
    const uploadTask = storage.ref(`exchange_files/${file.name}`).put(file);
    uploadTask.on('state_changed', 
    (snapshot) => {
      // progrss function ....
      const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      this.setState({progress});
    }, 
    (error) => {
         // error function ....
      console.log(error);
    }, 
    () => {
        // complete function ....
        storage.ref('exchange_files').child(file.name).getDownloadURL().then(url => {
            console.log(url);
            this.setState({url});
        })
    });
  }
/*
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.passwordChange(this.state.passwordOne);
    newLoad = false;
    this.setState({
      passwordOne: "",
      passwordTwo: ""
    });
  };


  onChange(e)
  {
    let files=e.target.files;
    console.warn("data files " , files);
  }
*/
  render() {
 //   const { passwordOne, passwordTwo } = this.state;
 //   const isInvalid = passwordOne !== passwordTwo || passwordOne === "";
 //   const { auth, authStatus, authMsg } = this.props;

//    if (!auth.uid && !auth.emailVerified)
  //    return <Redirect to={ROUTES.LOG_IN} />;
    return (
      <div className="container page-wrapper">
        <h3 className="text-center font-weight-bold mt-4">
          <i className="fas fa-key" />
          <br />
          Share File{" "}
        </h3>

        <div className="row">
          <div onSubmit={this.onFormSubmit}>
            <input type="file" 
              name="file"
              className="form-control form-control-lg"
              {..."onChange={(e) => this.onChange(e)"}
              onChange={this.handleChange} />
            <button className="btn btn-lg btn-info w-100 mt-4"
              onClick={this.handleUpload}>Upload</button>
          </div>
          <progress value={this.state.progress} max="100"/>
        </div>

      </div>
    );
  }
}

const mapStateToProps = state => {
  const auth = state.firebase.auth;
  const users = state.firestore.data.users;
  const user = users ? users[auth.uid] : null;
  return {
    auth: auth,
    authStatus: state.profile.authStatus,
    authMsg: state.profile.authMsg,
    user: user
  };
};

const mapDispatchToProps = dispatch => {
  return {
//    passwordChange: newPassword => dispatch(passwordChange(newPassword))
//    shareFile: newPassword => dispatch(shareFile(newPassword))
};
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([
    {
      collection: "users"
    }
  ])
)(FileSharing);
