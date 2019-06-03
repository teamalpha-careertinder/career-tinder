export const saveUserChoice = choice => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
      const firestore = getFirestore();
      const jobSeekerID = getState().firebase.auth.uid;
  
      const batch = firestore.batch();
      console.log(`saveUserChoise: `, choice);
      // a new document is created, no need to update since user won't see jobAd again:
      var jobSeekerChoiceDoc = firestore.collection("jobSeekerChoice").doc();
      batch.set(
        jobSeekerChoiceDoc,
        {
          ...choice,
          lastUpdateAt: new Date()
        },
        { merge: false }   //only one doc for jobseeker-jobad, so no need to merge.
      );
      batch
        .commit()
        .then(() => {
          dispatch({ type: "SAVE_USER_CHOISE_SUCCESS" });
        })
        .catch(err => {
          dispatch({ type: "SAVE_USER_CHOISE_ERROR" }, err);
        });
    };
  };
  