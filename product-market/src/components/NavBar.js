import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from './AuthService';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    AuthService.logout();
    navigate('/login');
  };

  return (
    <nav>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
}

export default Navbar;
