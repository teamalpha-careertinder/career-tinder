export const jobAdActions = jobAd => {
  return (dispatch, getState, { getFirestore }) => {
    // make async call to database
    const userId = getState().firebase.auth.uid;
    const firestore = getFirestore();
    firestore
      .collection("employer")
      .doc(userId)
      .get()
      .then(d => {
        const employername = d.data().employerName ? d.data().employerName : "";
        console.log(jobAd.employername);
        firestore
          .collection("jobposting")
          .add({
            ...jobAd,
            employerid: userId,
            employername: employername,
            createdAt: new Date()
          })
          .then(() => {
            console.log("Created job posting successfully");
            dispatch({ type: "CREATE_JOBPOST_SUCCESS" });
          })
          .catch(err => {
            console.log("Job posting creation error");
            dispatch({ type: "CREATE_JOBPOST_ERROR" }, err);
          });
      })
      .catch(err => {
        console.log("Job posting creation error");
        dispatch({ type: "CREATE_JOBPOST_ERROR" }, err);
      });
  };
};

export const jobUpdateActions = jobAd => {
  return (dispatch, getState, { getFirestore }) => {
    // make async call to database
    const userId = getState().firebase.auth.uid;
    const firestore = getFirestore();
    const jobAdId = jobAd.id;

    firestore
      .collection("employer")
      .doc(userId)
      .get()
      .then(d => {
        jobAd.employername = d.data().companyname ? d.data().companyname : "";

        delete jobAd.id;

        firestore
          .collection("jobposting")
          .doc(jobAdId)
          .update({
            ...jobAd,
            employerid: userId,
            lastUpdatedAt: new Date()
          })
          .then(() => {
            console.log("Updated job posting successfully");
            dispatch({ type: "UPDATE_JOBPOST_SUCCESS" });
          })
          .catch(err => {
            console.log("Job posting update error");
            dispatch({ type: "UPDATE_JOBPOST_ERROR" }, err);
          });
      })
      .catch(err => {
        console.log("Could not find employer with the specified employer id");
        dispatch({ type: "UPDATE_JOBPOST_ERROR" }, err);
      });
  };
};

export const jobDeleteActions = jobAdId => {
  return (dispatch, getState, { getFirestore }) => {
    // make async call to database
    const firestore = getFirestore();

    firestore
      .collection("jobposting")
      .doc(jobAdId)
      .delete()
      .then(() => {
        console.log("Deleted job posting successfully");
        dispatch({ type: "DELETE_JOBPOST_SUCCESS" });
      })
      .catch(err => {
        console.log("Job posting delete error");
        dispatch({ type: "DELETE_JOBPOST_ERROR" }, err);
      });
  };
};

// jobseeeker choice Saving-
export const saveUserChoice = choice => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();

    // a new document is created, no need to update since user won't see jobAd again:
    firestore
      .collection("jobSeekerChoice")
      .add({
        ...choice,
        createdAt: new Date()
      })
      .then(() => {
        if (choice.isLiked) {
          dispatch(matchJobSeekerLikeWithEmployerChoice(choice));
        } //if jobseeker likes the jobAd, a new match should be verified.
        dispatch({ type: "SAVE_JOB_SEEKER_CHOICE_SUCCESS" });
      })
      .catch(err => {
        dispatch({ type: "SAVE_JOB_SEEKER_CHOICE_ERROR" }, err);
      });
  };
};

export const matchJobSeekerLikeWithEmployerChoice = choice => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const matchEntity = {
      jobAdId: null,
      jobSeekerId: null,
      employerID: null
    };
    const firestore = getFirestore();

    //search if company also likes this jobseeker and for the same jobAd
    firestore
      .collection("employerChoice")
      .where("jobSeekerId", "==", choice.jobSeekerId) //company likes jobSeeker
      .where("jobAdId", "==", choice.jobAdId) //for the same JobAd
      .where("isLiked", "==", true) //company likes (true) and not dislikes
      .get()
      .then(function(querySnapshot) {
        //if company also likes jobseeker for the same jobAd, a new match is arises <3
        querySnapshot.forEach(function(userSnapshot) {
          //console.log("querySnapshot", userSnapshot.data())
          //  create document with match:
          var match = matchEntity;
          match.jobAdId = choice.jobAdId;
          match.jobSeekerId = choice.jobSeekerId;
          match.employerID = userSnapshot.data().employerId;

          //we save this relationship in DB, collection: match
          firestore
            .collection("match")
            .add({
              ...match,
              createdAt: new Date()
            })
            .then(() => {
              dispatch({ type: "SAVE_JOB_SEEKER_MATCH_SUCCESS" }); /////////////////////////
            })
            .catch(err => {
              dispatch({ type: "SAVE_JOBSEEKER_MATCH_ERROR" }, err); ////////////////////////
            });
        });
      })
      .catch(function(error) {
        // console.log("Error getting documents: ", error);
        dispatch({ type: "SAVE_JOBSEEKER_MATCH_ERROR" }, error); ////////////////////////
      });
  };
};
// jobseeeker choice Saving-

// saveEmployerChoice
export const saveEmployerChoice = employerChoice => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();

    firestore
      .collection("employerChoice")
      .add({
        ...employerChoice,
        createdAt: new Date()
      })
      .then(() => {
        if (employerChoice.isLiked) {
          dispatch(matchEmployerLikeWithJobSeekerChoice(employerChoice));
        } //if jobseeker likes the jobAd, a new match should be verified.
        dispatch({ type: "SAVE_EMPLOYER_CHOICE_SUCCESS" });
      })
      .catch(err => {
        dispatch({ type: "SAVE_EMPLOYER_CHOICE_ERROR" }, err);
      });
  };
};

export const matchEmployerLikeWithJobSeekerChoice = employerChoice => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const matchEntity = {
      jobAdId: null,
      jobSeekerId: null,
      employerID: null
    };
    const firestore = getFirestore();
    //search if jobseeker also likes this same jobAd
    firestore
      .collection("jobSeekerChoice")
      .where("jobSeekerId", "==", employerChoice.jobSeekerId) //company likes jobSeeker
      .where("jobAdId", "==", employerChoice.jobAdId) //for the same JobAd
      .where("isLiked", "==", true) //company likes (true) and not dislikes
      .get()
      .then(function(querySnapshot) {
        //if jobseeker also likes this same jobAd, a new match is arises <3
        querySnapshot.forEach(function(userSnapshot) {
          //  create document with match:
          var match = matchEntity;
          match.jobAdId = employerChoice.jobAdId;
          match.jobSeekerId = employerChoice.jobSeekerId;
          match.employerID = getState().firebase.auth.uid;

          //we save this relationship in DB, collection: match
          firestore
            .collection("match")
            .add({
              ...match,
              createdAt: new Date()
            })
            .then(() => {
              dispatch({ type: "SAVE_EMPLOYER_MATCH_SUCCESS" }); /////////////////////////
            })
            .catch(err => {
              dispatch({ type: "SAVE_EMPLOYER_MATCH_ERROR" }, err); ////////////////////////
            });
        });
      })
      .catch(function(error) {
        dispatch({ type: "SAVE_EMPLOYER_MATCH_ERROR" }, error); ////////////////////////
      });
  };
};
