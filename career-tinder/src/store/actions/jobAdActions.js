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
        // const companyname = d.data().companyname;
        jobAd.employername = d.data().companyname ? d.data().companyname : "";

        firestore
          .collection("jobposting")
          .add({
            ...jobAd,
            employerid: userId,
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
      }).catch(err => {
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
    const jobAdId = jobAd.jobAdId;

    firestore
      .collection("employer")
      .doc(userId)
      .get()
      .then(d => {
        // const companyname = d.data().companyname;
        jobAd.employername = d.data().companyname ? d.data().companyname : "";

        const batch = firestore.batch();

        var jobPostDoc = firestore.collection("jobposting").doc(jobAdId);

        batch.set(
          jobPostDoc,
          {
            ...jobAd,
            employerid: userId,
            lastUpdateAt: new Date()
          },
          { merge: true }
        );

        // firestore
        //   .collection("jobposting")
        //   .doc(jobAdId)
        //   .set({
        //     ...jobAd,
        //     merge: true,
        //     // employerid: userId,
        //     lastUpdatedAt: new Date()
        //   })
        batch.commit()
          .then(() => {
            console.log("Updated job posting successfully");
            dispatch({ type: "UPDATE_JOBPOST_SUCCESS" });
          })
          .catch(err => {
            console.log("Job posting update error");
            dispatch({ type: "UPDATE_JOBPOST_ERROR" }, err);
          });
      }).catch(err => {
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
        dispatch({ type: "SAVE_USER_CHOICE_SUCCESS" });
      })
      .catch(err => {
        dispatch({ type: "SAVE_USER_CHOICE_ERROR" }, err);
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
          dispatch({ type: "SAVE_USER_CHOICE_SUCCESS" });
        })
        .catch(err => {
          dispatch({ type: "SAVE_USER_CHOICE_ERROR" }, err);
        });
    };
  };