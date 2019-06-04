export const saveUserChoice = choice => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const jobSeekerID = getState().firebase.auth.uid;

    // a new document is created, no need to update since user won't see jobAd again:
    firestore
      .collection("jobSeekerChoice")
      .add({
        ...choice,
        lastUpdateAt: new Date()
      })
      .then(() => {
        dispatch({ type: "SAVE_USER_CHOICE_SUCCESS" });
      })
      .catch(err => {
        dispatch({ type: "SAVE_USER_CHOICE_ERROR" }, err);
      });
  };
};
