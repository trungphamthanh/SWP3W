import React from 'react';
import './Header.scss';
import { Link, useLocation } from 'react-router-dom';
import { logout, isLoggedIn } from './Auth';
import { useNavigate } from 'react-router-dom/dist';
import { Badge } from '@mui/material';
import { UseServices } from '../../../Context/UseContext';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {selectedBookingService} = UseServices();

  const shouldDisplayLogin = !['/login', '/signup'].includes(location.pathname);
  const userLoggedIn = isLoggedIn(); // Check if the user is logged in

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className='header-container'>
      <div className='header-list'>
        <Link to="/home" className='header-link'>Home</Link>
        <Link to="/services" className='header-link'>Service</Link>
        {/* <Link to="/ourteam" className='header-link'>Team</Link> */}
        {/* <Link to="/policy" className='header-link'>Policy</Link> */}
        <Link to="/faqs" className='header-link'>FAQs</Link>
        {userLoggedIn && <Link to="/history" className='header-link'>History</Link>}
        {userLoggedIn && <Badge badgeContent={selectedBookingService.length} color="error">
        <Link to="/booking" className='header-link'>Booking Cart</Link>
        </Badge>}
      </div>
      {isLoggedIn() ? (
        <button onClick={handleLogout} className='header-login'>Logout</button>
      ) : (
        shouldDisplayLogin && <Link to="/login" className='header-login'>Login</Link>
      )}
        
    </div>
  );
}

export default Header;
