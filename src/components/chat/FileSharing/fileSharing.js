import React from "react";
import {
  FormControl,
  InputLabel,
  Input,
  Button,
  Paper,
  withStyles,
  CssBaseline,
  Typography
} from "@material-ui/core";
import styles from "./styles";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect, firestore } from "react-redux-firebase";
import firebase from "../../../config/firebaseConfig";

class FileCenterComponent extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      fileURL: '',
      progress: 0,
      chatID: this.props.fileDocKey,
      fileSender: this.props.fileSender,
      fileReceiver: this.props.fileReceiver
     // username: null,   //delete
     // message: null //delete
    }
    console.log("props1 ", this.props);
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
    //const firebase = getFirebase();
    //const firestore = getFirestore();
    //const userId = getState().firebase.auth.uid;
    const userId = firebase.auth().currentUser;
    const storage = firebase.storage();

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
        // we instert a record in collection fileSharing
        firebase
        .firestore()
        .collection("fileSharing")
        .add({
            chatID: this.state.chatID,
            senderID: this.state.fileSender,
            receiverID: this.state.fileReceiver,   //this has to changed to file receiver userId
            fileName: fileName,
            createdAt: new Date()
          });
        // Upload completed successfully, now we can get the download fileURL
        storage.ref(`exchange_files/`).child(fileName).getDownloadURL().then((fileURL) => {
          console.log('File available at', fileURL);
          this.setState({ fileURL });
        });
      });
  }


  componentDidMount = () => {
    if (this.props.redirectEmail) {
      this.setState({
        username: this.props.redirectEmail
      });
    }
  };

  componentWillReceiveProps = nextProps => {
    this.setState({ username: nextProps.redirectEmail });
  };
  render() {
    const { classes } = this.props;

    return (
      <main className={classes.main}>
        <div className={classes.chatHeader}>
            Your conversation with {this.props.fileReceiver}
        </div>
        <div className={classes.paper}>
          <h3 className="text-center font-weight-bold mt-4">
            <i className="fas fa-link" />
            <br />
            File Center
          </h3>
          <div className="row">
            <div className="form-group">
              <input type="file" 
                name="file"
                className="form-control form-control-lg"
                onChange={this.handleChange} />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
                className={classes.submit}
                onClick={this.handleShare}
              >
                <i className="fas fa-exchange-alt" /> Share File
              </Button>
              <progress value={this.state.progress} max="100" />
              <br />
              {this.state.fileURL && <h6><b>File uploaded successfully</b></h6>}
              <br />
              {/*this.state.fileURL && <a href = {this.state.fileURL}><u><h6>Click here to download</h6></u></a>*/}
              <br />
            </div>
          </div>

          {this.state.serverError ? (
            <Typography
              component="h5"
              variant="h6"
              className={classes.errorText}
            >
              Unable to locate the user
            </Typography>
          ) : null}
        </div>
      </main>
    );
  }

  componentWillMount() {
    if (!firebase.auth().currentUser) this.props.history.push("/login");
  }
}

/*const mapStateToProps = state => {
  console.log("state1 ", state);
  const auth = state.firebase.auth;
  const users = state.firestore.data.users;
  const user = users ? users[auth.uid] : null;
  
  return {
    auth: auth,
    authStatus: state.profile.authStatus,
    authMsg: state.profile.authMsg,
    user: user,
    fileDocKey: state.fileDocKey
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
)(NewFileComponent);
*/
export default withStyles(styles)(FileCenterComponent);
