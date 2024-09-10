import React, { useRef, useState, useContext } from "react";
import AuthContext from "./AuthContext";
import classes from "./AuthModal.module.css";

const LoginModal = ({ onClose, onSwitchToSignup }) => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const authCtx = useContext(AuthContext);

  const displayError = (setError, message) => {
    setError(message);
    setTimeout(() => setError(""), 3000);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    displayError(setErrorMessage, "");
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    try {
      const response = await fetch("http://localhost:9080/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        authCtx.login(data.userName,data.token);
        onClose();
        localStorage.setItem("token", data.token);
        alert("Logged in successfully with email: " + enteredEmail);
      } 
      else {
        const errorData = await response.json();
        console.error("Login failed:", errorData.message);
        displayError(
          setErrorMessage,
          errorData.message || "Invalid email or password"
        );
      }
    } catch (error) {
      console.error("Error during login:", error);
      displayError(
        setErrorMessage,
        "Internal server error occurred during login!"
      );
    }
  };

  return (
    <div className={classes.modal}>
      <div className={classes.modalContent}>
        <span className={classes.close} onClick={onClose}>
          &times;
        </span>
        <h2>Login</h2>
        <form onSubmit={submitHandler}>
          <div className={classes.control}>
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
            <button type="submit">Log In</button>
            <button
              type="button"
              className={classes.toggle}
              onClick={onSwitchToSignup}
            >
              Create an account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
