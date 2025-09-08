"use client";

import React, { createContext, useContext, useState } from 'react';
import LoginModal from '@/app/components/LoginModal';
import SignupModal from '@/app/components/SignupModal';

const ModalContext = createContext();

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

export const ModalProvider = ({ children }) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  const openLogin = () => {
    setIsSignupModalOpen(false); 
    setIsLoginModalOpen(true);
  };

  const openSignup = () => {
    setIsLoginModalOpen(false); 
    setIsSignupModalOpen(true); 
  };

  const closeLogin = () => {
    setIsLoginModalOpen(false);
  };

  const closeSignup = () => {
    setIsSignupModalOpen(false);
  };

  const switchToSignup = () => {
    setIsLoginModalOpen(false);
    setIsSignupModalOpen(true);
  };

  const switchToLogin = () => {
    setIsSignupModalOpen(false);
    setIsLoginModalOpen(true);
  };

  const value = {
    isLoginModalOpen,
    isSignupModalOpen,
    openLogin,
    openSignup,
    closeLogin,
    closeSignup,
    switchToSignup,
    switchToLogin,
  };

  return (
    <ModalContext.Provider value={value}>
      {children}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={closeLogin}
        onSwitchToSignup={switchToSignup}
      />
      
      <SignupModal
        isOpen={isSignupModalOpen}
        onClose={closeSignup}
        onSwitchToLogin={switchToLogin}
      />
    </ModalContext.Provider>
  );
};