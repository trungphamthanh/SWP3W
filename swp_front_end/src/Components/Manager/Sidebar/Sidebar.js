import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../asset/images/logo.png';
import "./Sidebar.scss"
import { logout } from '../../Guest&Customer/Header/Auth';
import { useNavigate } from 'react-router-dom/dist';

const drawerWidth = 240;

const Sidebar = ({ onLinkClick }) => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className='sidebar-container'>
        <div className='sidebar-logo'>
            <img src={Logo}/>
            <p>King's Teeth</p>
        </div>
        <Link to="/manager/booking" className='link'>Booking</Link>
        <Link to="/manager/services" className='link'>Services</Link>
        <Link to="/manager/doctor" className='link'>Doctor</Link>
        <button onClick={handleLogout} className='header-login'>Logout</button>
        
  </div>
  )
}

export default Sidebar