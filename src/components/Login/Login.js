import React, { useState, useContext } from "react";
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router-dom";
import { initializeLoginFramework, handleGoogleSignIn, handleSignOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, handleFbSignIn, resetPassword } from "./loginManager";



function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    email: "",
    password: "",
    photo: "",
  });

  initializeLoginFramework();

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  //Response - Redirect
  const handleResponse = (res, redirect) => {
    setUser(res);
    setLoggedInUser(res);
    if (redirect) {
    history.replace(from);
    }
  };

  //Google Sign In
  const googleSignIn = () => {
    handleGoogleSignIn()
    .then((res) => {
      handleResponse(res, true);
    })
  };

  //Google Sign Out
  const signOut = () => {
    handleSignOut()
    .then((res) => {
      handleResponse(res, false);
    })
  };

  //Facebook Sign In
  const fbSignIn = () => {
    handleFbSignIn()
    .then((res) => {
      handleResponse(res, true);
    });
  };

  //Submit
  const handleSubmit = (event) => {
    if (newUser && user.email && user.password) {
      createUserWithEmailAndPassword(user.name, user.email, user.password)
      .then(res => {
          handleResponse(res, true);
        })
    };

    if (!newUser && user.email && user.password) {
      signInWithEmailAndPassword(user.email, user.password)
      .then(res => {
        handleResponse(res, true);
      })
    };

    event.preventDefault();
  };

  //onBlur
  const handleBlur = (event) => {
    let isFieldValid;
    if (event.target.name === "email") {
      isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
    }
    if (event.target.name === "password") {
      const isPasswordValid = event.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(event.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber;
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      {user.isSignedIn ? 
        <button onClick={signOut}>Sign out</button>
       : 
        <button onClick={googleSignIn}>Sign in</button>
      }
      <br />
      <br />
      <button onClick={fbSignIn}>Sign in using Facebook</button>

      {user.isSignedIn && (
        <div>
          <p>Welcome, {user.name}</p>
          <p>Your Email: {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      )}

      <h1>Our own Authentication</h1>
      <p>
        <input
          type="checkbox"
          onChange={() => setNewUser(!newUser)}
          name="newUser"
          id=""
        />
        <label htmlFor="newUser">
          <small>New User Sign Up</small>
        </label>
      </p>
      <form onSubmit={handleSubmit}>
        <p>
          {newUser && (
            <input
              onBlur={handleBlur}
              type="text"
              name="name"
              id=""
              placeholder="Enter Your Name"
            />
          )}
          <br />
          <br />
          <input
            onBlur={handleBlur}
            type="text"
            name="email"
            id=""
            placeholder="Enter Your Email Address"
            required
          />
          <br />
          <br />
          <input
            onBlur={handleBlur}
            type="password"
            name="password"
            id=""
            placeholder="Enter Your Password"
            required
          />
          <br />
          <input type="submit" value={newUser ? "Sign Up" : "Sign In"} />
        </p>
      </form>

      <button onClick={() => resetPassword(user.email)}>Forget or Reset Password</button>

      <p style={{ color: "red" }}>{user.error}</p>
      {user.success && (
        <p style={{ color: "green" }}>
          User successfully {newUser ? "Sign Up" : "Sign In"}
        </p>
      )}
    </div>
  );
}

export default Login;
