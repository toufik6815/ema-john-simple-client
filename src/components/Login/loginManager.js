import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";

export const initializeLoginFramework = () => {
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }
};

//Google Sign In
export  const handleGoogleSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then((res) => {
        const { displayName, email, photoURL } = res.user;
        const signInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL,
          success: true
        };
        return signInUser;
      })
      .catch((error) => {
        console.log(error);
        console.log(error.message);
    });
};


//Google Sign Out
  export const handleSignOut = () => {
    return firebase
      .auth()
      .signOut()
      .then((res) => {
        const signOutUser = {
          isSignedIn: false,
          name: "",
          photo: "",
          email: "",
          error: "",
          success: false,
        };
        return signOutUser;
     })
    .catch((error) => {});
};



//Facebook Sign In
export const handleFbSignIn = () => {
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    return firebase
      .auth()
      .signInWithPopup(fbProvider)
      .then(function (result) {
        let user = result.user;
        user.success = true;
        return user;
      })
      .catch(function (error) {
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
};



// Submit - (create User With Email & Password)
export const createUserWithEmailAndPassword = (name, email, password) => {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        const newUserInfo = res.user;
        newUserInfo.error = '';
        newUserInfo.success = true;
        updateUserName(name);
        verifyEmail();
        return newUserInfo;
      })

      .catch((error) => {
        const newUserInfo = {};
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        return newUserInfo;
      })
};


// Submit - (Sign In With Email & Password)
export const signInWithEmailAndPassword = (email, password) => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        const newUserInfo = res.user;
        newUserInfo.error = "";
        newUserInfo.success = true;
        return newUserInfo;
      })
      .catch(function (error) {
        const newUserInfo = {};
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        return newUserInfo;
      })
};



// Update User Name
const updateUserName = (name) => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
    displayName: name
    })
    
    .then(function () {
        console.log("user name updated successfully");
    })

    .catch(function (error) {
        console.log(error);
    });
};



//Verify Email
const verifyEmail = () => {
  var user = firebase.auth().currentUser;
    user.sendEmailVerification().then(function () {
        // Email sent.
      })
      .catch(function (error) {
        // An error happened.
      });
}



//Reset Password 
export const resetPassword = email =>{
  var auth = firebase.auth();

  auth.sendPasswordResetEmail(email).then(function () {
      // Email sent.
    })
    .catch(function (error) {
      // An error happened.
    });
}
