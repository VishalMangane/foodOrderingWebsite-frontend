import React, { createContext, useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode";
import axios from "axios";

const AuthContext = createContext({
  isLoggedIn: false,
  userName: "",
  login: (userName,token) => {},
  logout: () => {},
});

export const AuthProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.post("http://localhost:9080/api/auth/validate", { token: token.trim() })
        .then(response => {
          if (response.data.isValid) {
            setIsLoggedIn(true);
            setUserName(response.data.userName || extractUserNameFromToken(token)); 
          } else {
            localStorage.removeItem("token");
            setIsLoggedIn(false);
          }
        })
        .catch(() => {
          localStorage.removeItem("token");
          setIsLoggedIn(false);
        });
    }
  }, []);

  const extractUserNameFromToken = (token) => {
    try {
      const decoded = jwtDecode(token);
      return decoded.sub;
    } catch (error) {
      return null;
    }
  };

  const loginHandler = (userName, token) => {
    setIsLoggedIn(true);
    setUserName(userName);
    localStorage.setItem("token", token);
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
    setUserName("");
    localStorage.removeItem("token");
    localStorage.removeItem("selectedCity");
    localStorage.removeItem("cartState");
  };

  const contextValue = {
    isLoggedIn,
    userName,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
