"use client";

import { useState } from "react";
import Navbar from "./Navbar";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";

const NavbarWrapper = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  const handleLoginClick = () => {
    setIsLoginOpen(true);
  };

  const handleSignupClick = () => {
    setIsSignupOpen(true);
  };

  const handleCloseLogin = () => {
    setIsLoginOpen(false);
  };

  const handleCloseSignup = () => {
    setIsSignupOpen(false);
  };

  return (
    <>
      <Navbar onSignupClick={handleSignupClick} onLoginClick={handleLoginClick} />
      <LoginModal isOpen={isLoginOpen} onClose={handleCloseLogin} />
      <SignupModal isOpen={isSignupOpen} onClose={handleCloseSignup} />
    </>
  );
};

export default NavbarWrapper;