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
        const fileName = new Date().toISOString().slice(0,10) + 
                            "_" + Math.floor(Math.random() * 90 + 10) +
                            "_" + file.name ;
        const uploadTask = storage.ref(`exchange_files/${fileName}`).put(file);
        uploadTask.on('state_changed', 
        (snapshot) => {
          // progrss function ....
  //        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
  //        this.setState({progress});
        }, 
        (error) => {
             // error function ....
          console.log(error);
        }, 
        () => {
            // complete function ....
            // we instert a record in collection fileSharing
            firestore
                .collection("fileSharing")
                .add({
                    senderID: userId,
                    receiverID: 2,   //this has to changed to file receiver userId
                    fileName: fileName,
                    createdAt: new Date()
                  });

 //           storage.ref('exchange_files').child(file.name).getDownloadURL().then(url => {
 //               console.log(url);
 //               this.setState({url});
            })
  //      });
    
    };
  };