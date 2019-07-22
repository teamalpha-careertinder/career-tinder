export const shareFile = file => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const userId = getState().firebase.auth.uid;
    //const firestore = getFirestore();

/*      firebase
      .auth()
      .currentUser.updatePassword(newPassword)
      .then(() => {
        dispatch({ type: "PWCHANGE_SUCCESS" });
      })
      .catch(err => {
        dispatch({ type: "PWCHANGE_ERROR", err });
      });
*/
      const storage = firebase.storage();
  /*    const fileName = new Date().toISOString().slice(0,10) + 
                          "_" + Math.floor(Math.random() * 90 + 10) +
                          "_" + file.name ;
  */
      const uploadTask = storage.ref(`exchange_files/` + file.name);
      uploadTask.put(file).then((snapshot) => {
        // progrss function ....
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      }).then(() => {
        // Upload completed successfully, now we can get the download fileURL
        uploadTask.getDownloadURL().then((fileURL) => {
            console.log('File available at', fileURL);
        });
    });
  
  };
};