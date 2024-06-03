import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Layout({ children }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const isUser = localStorage.getItem('isUser');

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('isUser');
    navigate('/');
  };

  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        {isUser ? (
          <>
            <Link to="/products">Products</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
      <main>{children}</main>
    </div>
  );
}

export default Layout;
