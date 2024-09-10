import React, { useState, useEffect, useContext, Fragment } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import AuthContext from "../Auth/AuthContext";
import LocationSearch from "../Location/LocationSearch";
import HeaderCartButton from "../Layout/HeaderCartButton";
import LoginModal from "../Auth/LoginModal";
import SignupModal from "../Auth/SignupModal";
import {
  Navbar,
  Nav,
  Button,
  Container,
  Dropdown,
  Offcanvas,
  Alert,
} from "react-bootstrap";
import mainheaderImage from "../../assets/meals.jpg";
import logoutSymbol from "../../assets/logout-symbol.webp";
import logo from "../../assets/logo.png";
import "./Header.module.css";
import ProfileImage from "../Pages/ProfileImage";
import CartContext from "../store/Cart-context";

const Header = ({ onShowCart }) => {
  const authCtx = useContext(AuthContext);
  const cartCtx = useContext(CartContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      authCtx.login(storedUserName);
    }
  }, [authCtx]);

  const cartButtonClickHandler = () => {
    if (
      location.pathname === "/" &&
      authCtx.isLoggedIn &&
      cartCtx.items.length === 0
    ) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    } else {
      onShowCart();
    }
  };

  const openSignupHandler = () => {
    if (location.pathname === "/meals") {
      navigate("/");
      setTimeout(() => {
        setShowSignupModal(true);
        setShowLoginModal(false);
      }, 100);
    } else {
      setShowSignupModal(true);
      setShowLoginModal(false);
    }
  };

  const openLoginHandler = () => {
    if (location.pathname === "/meals") {
      navigate("/");
      setTimeout(() => {
        setShowLoginModal(true);
        setShowSignupModal(false);
      }, 100);
    } else {
      setShowLoginModal(true);
      setShowSignupModal(false);
    }
  };

  const closeModalHandler = () => {
    setShowLoginModal(false);
    setShowSignupModal(false);
  };

  const logoutHandler = () => {
    authCtx.logout();
    localStorage.removeItem("userName");
    localStorage.removeItem("token");
    localStorage.removeItem("selectedCity");
    localStorage.removeItem("cartState");
    navigate("/");
  };

  const handleCitySelect = (selectedCity) => {
    console.log("Selected city:", selectedCity);
  };

  return (
    <Fragment>
      <Navbar
        bg="none"
        expand="lg"
        sticky="top"
        style={{ backgroundColor: "#f94a05" }}
        variant="dark"
      >
        <Container fluid>
          <Navbar.Brand href="/" className="d-flex align-items-center">
            <img src={logo} alt="logo" height="40" className="me-2" />
            <span className="fs-4 fw-bold text-white">Bitemeals</span>
          </Navbar.Brand>
          <HeaderCartButton
            onClick={cartButtonClickHandler}
            className="d-lg-none ms-auto"
          />
          <Navbar.Toggle aria-controls="offcanvasNavbar" />
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="end"
            className="offcanvas-custom"
            // style={{ maxWidth: "300px" }}
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel">Menu</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-4">
                {authCtx.isLoggedIn ? (
                  <>
                    <Dropdown className="profile-dropdown">
                      <Dropdown.Toggle variant="light" id="dropdown-basic">
                        <i className="bi bi-person-circle"></i>
                        {authCtx.userName || "User"}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item as={Link} to="/users/profile">
                          Profile
                          <ProfileImage />
                        </Dropdown.Item>
                        <Dropdown.Item onClick={logoutHandler}>
                          Log out{" "}
                          <img
                            src={logoutSymbol}
                            alt="logout symbol"
                            height="16"
                          />
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                    <div>
                      <LocationSearch onCitySelect={handleCitySelect} />
                    </div>
                  </>
                ) : (
                  <>
                    <Button
                      variant="light"
                      className="me-2 login-button"
                      onClick={openLoginHandler}
                    >
                      Log in
                    </Button>
                    <Button
                      variant="light"
                      className="signup-button"
                      onClick={openSignupHandler}
                    >
                      Sign Up
                    </Button>
                  </>
                )}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      {showAlert && (
        <div
          className="alert-container"
          style={{ position: "fixed", top: "72px", left: "10px", zIndex: 1050 }}
        >
          <Alert variant="info" onClose={() => setShowAlert(false)} dismissible>
            Please go to meals and add some foods to the cart.
          </Alert>
        </div>
      )}
      {location.pathname === "/meals" && (
        <div
          className="bg-image"
          style={{
            backgroundImage: `url(${mainheaderImage})`,
            height: "300px",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      )}
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

export default Header;
