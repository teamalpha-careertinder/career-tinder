import React from "react";
import * as ROUTES from "../../constants/routes";
import "./communication.css";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { storage } from "../../config/firebaseConfig"
//import firebase from "../../config/firebaseConfig";

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
    this.handleChange = this
      .handleChange
      .bind(this);
    this.handleShare = this.handleShare.bind(this);
  }

  handleChange = event => {
    if (event.target.files[0]) {
      const file = event.target.files[0];
      this.setState(() => ({ file }));
    }
  }

  handleShare = () => {
    const { file } = this.state;
    const fileName = new Date().toISOString().slice(0,10) + 
                            "_" + Math.floor(Math.random() * 90 + 10) +
                            "_" + file.name ;
    const uploadTask = storage.ref(`exchange_files/` + fileName).put(file);
    uploadTask.on('state_changed',
      (snapshot) => {
        // progrss function ....
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        this.setState({ progress });
      },
      (error) => {
        // error function ....
        console.log(error);
      },
      () => {
        // Upload completed successfully, now we can get the download fileURL
        storage.ref(`exchange_files/`).child(fileName).getDownloadURL().then((fileURL) => {
          console.log('File available at', fileURL);
          this.setState({ fileURL });
        });
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
          File Sharing{" "}
        </h3>

        <div className="row">
          <div className="form-group">
            <progress value={this.state.progress} max="100" />
            <br />
            <input type="file"
              name="file"
              className="form-control form-control-lg"
              onChange={this.handleChange} />
            <button
              type="submit"
              className="btn btn-lg btn-info w-100 mt-4"
              onClick={this.handleShare}
            >
              <i className="fas fa-exchange-alt" />Share File
              </button>
            <br />
            {this.state.file && <img src={this.state.fileURL} hightt="300" width="400" />}
            <br />
            {this.state.fileURL && <h6><b>File uploaded successfully</b></h6>}
            <br />
            {this.state.fileURL && <a href = {this.state.fileURL}><u><h6>Click here to download</h6></u></a>}
            <br />
          </div>
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

export default compose(
  connect(
    mapStateToProps
  ),
  firestoreConnect([
    {
      collection: "users"
    }
  ])
)(FileSharing);