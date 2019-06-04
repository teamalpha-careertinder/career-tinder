
export const jobAdActions = (jobAd) => {
  return (dispatch, getState, {getFirestore}) => {
    // make async call to database
    const userId = getState().firebase.auth.uid
    const firestore = getFirestore();
    firestore.collection("employer").doc(userId).get().then(d => {
      const companyname = d.data().companyname;
      firestore.collection('jobposting').add({
        ...jobAd,
        employerid: userId,
        createdAt: new Date(),
        employername: companyname
      }).then(() => {
        console.log("Created job posting successfully")
        dispatch({ type: 'CREATE_JOBPOST_SUCCESS' });
      }).catch(err => {
        console.log("Job posting creation error")
        dispatch({ type: 'CREATE_JOBPOST_ERROR' }, err);
      });
    });
  }
};








/*export const signUpAsEmployer = newUser => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const batch = firestore.batch();
    const employerId = getState().auth.currentUser.getState.uid;
    

    firebase
      .auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then(resp => {
        var newUserType = firestore.collection("users").doc(resp.user.uid);
        batch.set(newUserType, {
          userType: "employer",
          profileCompletenessPercentage: 0
        });

        resp.user.updateProfile({
          displayName: newUser.companyname
        });
        dispatch(verifyEmail());

        batch.commit();
      })
      .then(() => {
        dispatch({ type: "SIGNUP_SUCCESS" });
      })
      .catch(err => {
        dispatch({ type: "SIGNUP_ERROR", err });
      });
  };
};
export const verifyEmail = () => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    //const firestore = getFirestore();
    var user = firebase.auth().currentUser;
    if (user) {
      firebase
        .auth()
        .currentUser.sendEmailVerification({
          // url: ROUTES.EMAIL_REDIRECT_URL_DEV
        })
        .then(() => {
          dispatch(signOut());
          dispatch({ type: "EMAIL_SENT_SUCCESS" });
        })
        .catch(err => {
          dispatch({ type: "EMAIL_SENT_ERROR", err });
        });
    }
  };
};
//@begin: Password Reset (Forget) - Abel G.
export const passwordForget = email => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    //const firestore = getFirestore();

    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        // this.setState({ ...INITIAL_STATE });
        dispatch({ type: "PWFORGET_SUCCESS" });
      })
      .catch(err => {
        //      this.setState({ error });
        dispatch({ type: "PWFORGET_ERROR", err });
      });
  };
};
//@end: Password Reset (Forget) - Abel G.
*/