import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import CartContext from "../store/Cart-context";
import { Fragment, useContext, useEffect, useState } from "react";
import AuthContext from "../Auth/AuthContext";
import Modal from "../UI/Modal";
import LoginModal from "../Auth/LoginModal";
import SignupModal from "../Auth/SignupModal";
import { Button } from "react-bootstrap";


const HeaderCartButton = (props) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const [showLoginButton, setShowLoginButton] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const cartCtx = useContext(CartContext);
  const authCtx = useContext(AuthContext);
  const { items } = cartCtx;

  const numberOfCartItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const btnClasses = `${classes.button} ${
    btnIsHighlighted ? classes.bump : ""
  }`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  const cartButtonHandler = () => {
    if (!authCtx.isLoggedIn) {
      setShowLoginButton(true);
    } else {
      props.onClick();
    }
  };

  const openSignupHandler = () => {
    setShowSignupModal(true);
    setShowLoginModal(false);
    setShowLoginButton(false);
};

const openLoginHandler = () => {
    setShowLoginModal(true);
    setShowSignupModal(false);
    setShowLoginButton(false);
};

const closeModalHandler = () => {
  setShowLoginModal(false);
  setShowSignupModal(false);
  setShowLoginButton(false);
};
  return (
    <Fragment>
      <>
        {showLoginButton && (
          <Modal onClose={closeModalHandler}>
            <p>Please login to place an order.</p>
            <Button variant="primary" onClick={openLoginHandler}>
              Login
            </Button>
            <Button variant="secondary" onClick={closeModalHandler}>
              Close
            </Button>
          </Modal>
        )}
        <button className={btnClasses} onClick={cartButtonHandler}>
          <span className={classes.icon}>
            <CartIcon />
          </span>
          <span>Cart</span>
          <span className={classes.badge}>{numberOfCartItems}</span>
        </button>
      </>
      {!authCtx.isLoggedIn && showLoginModal && (
        <LoginModal
          onClose={closeModalHandler}
          onSwitchToSignup={openSignupHandler}
        />
      )}
      {!authCtx.isLoggedIn && showSignupModal && (
        <SignupModal
          onClose={closeModalHandler}
          onSwitchToLogin={openLoginHandler}
        />
      )}
    </Fragment>
  );
};

export default HeaderCartButton;
