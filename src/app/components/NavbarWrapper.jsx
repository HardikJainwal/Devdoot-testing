'use client';

import Navbar from './Navbar';

export default function NavbarWrapper() {
  const handleSignupClick = () => {
    console.log('Signup clicked');
    // Add modal logic or routing here
  };

  return <Navbar onSignupClick={handleSignupClick} />;
}
