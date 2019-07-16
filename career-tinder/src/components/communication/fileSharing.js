import React from "react";
import * as ROUTES from "../../constants/routes";
import "./communication.css";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { shareFile } from "../../store/actions/communicationAction";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
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
    //this.state = { ...INITIAL_STATE };
    //newLoad = true;
  }

  handleChange = event => {
    if (event.target.files[0]) {
      const file = event.target.files[0];
      this.setState(() => ({file}));
    }
  }

  handleShare = () => {
    const {file} = this.state;
    // we call the action to upload the file.
    this.props.shareFile(file);
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

const mapDispatchToProps = dispatch => {
  return {
    shareFile: file => dispatch(shareFile(file))
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
