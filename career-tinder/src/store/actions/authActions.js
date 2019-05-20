export const signIn = credentials => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        dispatch({ type: "LOGIN_SUCCESS" });
      })
      .catch(err => {
        dispatch({ type: "LOGIN_ERROR", err });
      });
  };
};

export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: "SIGNOUT_SUCCESS" });
      });
  };
};

export const signUpAsJobSeeker = newUser => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const batch = firestore.batch();

    firebase
      .auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then(resp => {

        var newUserType = firestore.collection("users").doc(resp.user.uid);
        batch.set(newUserType, {userType: 'jobseeker'});

        var jobSeeker = firestore
          .collection("jobseeker")
          .doc(resp.user.uid);
         
          batch.set(jobSeeker, {firstName: newUser.firstName, lastName: newUser.lastName});

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

export const signUpAsEmployer = newUser => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const batch = firestore.batch();

    firebase
      .auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then(resp => {

        var newUserType = firestore.collection("users").doc(resp.user.uid);
        batch.set(newUserType, {userType: 'employer'});

        var employer = firestore
          .collection("employer")
          .doc(resp.user.uid);
          batch.set(employer, {companyname: newUser.companyname});

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
