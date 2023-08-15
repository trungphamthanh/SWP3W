import React from 'react';
import './Header.scss';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  // Determine whether to display the login button
  const shouldDisplayLogin = !['/login', '/signup'].includes(location.pathname);

  return (
    <div className='header-container'>
      <div className='header-list'>
        <Link to="/home" className='header-link'>Home</Link>
        <Link to="/services" className='header-link'>Service</Link>
        <Link to="/ourteam" className='header-link'>Team</Link>
        <Link to="/policy" className='header-link'>Policy</Link>
        <Link to="/faqs" className='header-link'>FAQs</Link>
      </div>
      {shouldDisplayLogin && <Link to="/login" className='header-login'>Login</Link>}
    </div>
  );
}

export default Header;