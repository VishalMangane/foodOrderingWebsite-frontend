import React, { useRef, useState } from "react";
import classes from "./AuthModal.module.css";

const SignupModal = ({ onClose ,onSwitchToLogin}) => {
  const userNameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const displayError = (setError, message) => {
    setError(message);
    setTimeout(() => setError(""), 3000);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    displayError(setErrorMessage, "");
    const enteredUserName = userNameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    try {
      const response = await fetch("https://c574-205-254-163-115.ngrok-free.app/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: enteredUserName,
          email: enteredEmail,
          password: enteredPassword,
        }),
      });

      if (response.ok) {
        onClose(); // Close modal on successful signup
        alert("Registered successfully with email: " + enteredEmail);
      } else {
        const errorMessage = await response.text();
        console.error("Signup failed:", errorMessage);
        displayError(setErrorMessage, "User already exists with this Email");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      displayError(setErrorMessage, "Internal error during sign up");
    }
  };

  return (
    <div className={classes.modal}>
      <div className={classes.modalContent}>
        <span className={classes.close} onClick={onClose}>&times;</span>
        <h2>Sign Up</h2>
        <form onSubmit={submitHandler}>
          <div className={classes.control}>
            <label htmlFor="userName">User Name</label>
            <input
              type="text"
              id="userName"
              placeholder="Enter user name"
              ref={userNameInputRef}
              required
            />
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              ref={emailInputRef}
              required
            />
            <p>{errorMessage}</p>
          </div>
          <div className={classes.control}>
            <label htmlFor="password">Your Password</label>
            <div className={classes.passwordWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
                required
                ref={passwordInputRef}
              />
              <button
                type="button"
                className={classes.showPasswordBtn}
                onClick={() => setShowPassword((prevState) => !prevState)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <div className={classes.actions}>
            <button type="submit">Create Account</button>
            <button
              type="button"
              className={classes.toggle}
              onClick={onSwitchToLogin}
            >
              Log in with existing account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupModal;
