import React, { useContext } from "react";
import AuthContext from "../Auth/AuthContext";
import classes from "./HomePage.module.css";
import Header from "../Layout/Header";
import { Link } from "react-router-dom";

const HomePage = () => {
  const authCtx = useContext(AuthContext);

  return (
    <>
      <Header />
      <div className={classes.homepage}>
        {authCtx.isLoggedIn && (
          <h1>Welcome, {authCtx.userName}!</h1>
        )}
        <p className={classes.text}>
          Go to meals, Choose your favorite meal from our broad selection of available meals.
        </p>
         <Link to="/meals"><button className={classes.btnMeal}>Go to meals</button></Link>
      </div>
    </>
  );
};

export default HomePage;
