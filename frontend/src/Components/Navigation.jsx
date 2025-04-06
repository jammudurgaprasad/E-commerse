import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Navigation.css';
import account from '../Logos/account.png';
import cart from '../Logos/cart.png';
import dpmart from '../Logos/dpmart.png'

const Navigation = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  return (
    <div className="navigation-container">
      {/* Left side: Logo and search bar */}
      <div className="nav-left">
        <img
          onClick={() => navigate('/home')}
          src={dpmart} 
          alt="Logo"
          className="nav-logo"
        />
        <input
          type="text"
          placeholder="Search..."
          className="search-bar"
        />
      </div>

      {/* Right side: Logout, Account, and Cart icons */}
      <div className="nav-right">
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
        <div className="nav-item" onClick={() => navigate('/account')}>
          <img
            src={account}
            alt="Account"
            className="nav-icon"
          />
        </div>
        <div className="nav-item" onClick={() => navigate('/cart')}>
          <img
            src={cart}
            alt="Cart"
            className="nav-icon"
          />
        </div>
      </div>
    </div>
  );
};

export default Navigation;