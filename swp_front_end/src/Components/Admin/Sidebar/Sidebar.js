import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../asset/images/logo.png';
import "./Sidebar.scss"
import { useNavigate } from 'react-router-dom/dist';
import { logout } from '../../Guest&Customer/Header/Auth';

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
        <button onClick={handleLogout} className='header-login'>Logout</button>
  </div>
  )
}

export default Sidebar