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
  </div>
  )
}

export default Sidebar