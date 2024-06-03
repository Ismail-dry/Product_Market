import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from './AuthService';

function Sidebar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    AuthService.logout();
    navigate('/login');
  };

  return (
    <aside className="sidebar">
      <nav>
        <ul>
          <li><Link to="/"><h1>Home</h1></Link></li>
          {AuthService.isUserLogged() ? (
            <>
              <li><a href="#" onClick={handleLogout}><h1>Logout</h1></a></li>
              <li><Link to="/products"><h1>Products</h1></Link></li>
            </>
          ) : (
            <>
              <li><Link to="/login"><h1>Login</h1></Link></li>
              <li><Link to="/register"><h1>Register</h1></Link></li>
            </>
          )}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;