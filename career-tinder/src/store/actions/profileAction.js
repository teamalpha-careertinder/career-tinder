export const editJobSeekerProfile = (jobseeker) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
      const firestore = getFirestore();
      const profile = getState().firebase.profile;
      const authorId = getState().firebase.auth.uid;
      firestore.collection('jobseeker').doc(authorId).update({
        ...jobseeker,
        usertype: profile.userType,
        authorId: authorId
      }).then(() => {
        dispatch({ type: 'CREATE_PROJECT_SUCCESS' });
      }).catch(err => {
        dispatch({ type: 'CREATE_PROJECT_ERROR' }, err);
      });
    }
};

export const editEmployerProfile = (employer) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
      console.log(employer);
      const firestore = getFirestore();
      const profile = getState().firebase.profile;
      const authorId = getState().firebase.auth.uid;
      firestore.collection('employer').doc(authorId).update({
        ...employer,
        usertype: profile.userType,
        authorId: authorId
      }).then(() => {
        dispatch({ type: 'CREATE_PROJECT_SUCCESS' });
      }).catch(err => {
        dispatch({ type: 'CREATE_PROJECT_ERROR' }, err);
      });
    }
};

//@begin: Password Change - Abel G.
export const passwordChange = newPassword => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    //const firestore = getFirestore();

    firebase
      .auth()
      .currentUser
      .updatePassword(newPassword)
      .then(() => {
        dispatch({ type: "PWCHANGE_SUCCESS" });
      })
      .catch(err => {
        dispatch({ type: "PWCHANGE_ERROR", err });
      });
  };
};
//@end: PasswordChange - Abel G.