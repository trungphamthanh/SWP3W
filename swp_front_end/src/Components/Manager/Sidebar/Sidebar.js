import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../asset/images/logo.png';
import "./Sidebar.scss"

const drawerWidth = 240;

const Sidebar = ({ onLinkClick }) => {

  return (
    <div className='sidebar-container'>
        <div className='sidebar-logo'>
            <img src={Logo}/>
            <p>King's Teeth</p>
        </div>
        <Link to="/manager/booking" className='link'>Booking</Link>
        <Link to="/manager/schedule" className='link'>Schedule</Link>
        <Link to="/manager/services" className='link'>Services</Link>
        <Link to="/manager/doctor" className='link'>Doctor</Link>
  </div>
  )
}

export default Sidebar