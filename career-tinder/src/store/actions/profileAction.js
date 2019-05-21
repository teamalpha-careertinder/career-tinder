export const createJobSeekerProfile = (jobseeker) => {
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

export const createEmployerProfile = (employer) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
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