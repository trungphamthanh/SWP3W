import React from 'react'
import './Footer.scss'
import { LocationOn, Phone } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import Logo from '../../asset/images/logo.png';

const Footer = () => {
  return (
    <div className='footer-container'>
      <div className='footer-upper'>
        <div className='footer-row1'>
          <div><img src={Logo}/> King's Teeth</div>
          <div><LocationOn/>123 Place place, City city</div>
          <div><Phone/> 123 4567 890</div>
        </div>
        <div className='footer-row2'>
          <div>Company</div>
          <Link to="" className='link'>Home</Link>
          <Link to="" className='link'>Our Team</Link>
          <Link to="" className='link'>Policy</Link>
          <Link to="" className='link'>FAQs</Link>
        </div>
        <div className='footer-row3'>
          <div>Service</div>
          <Link to="" className='link'>Bonding & White Filling</Link>
          <Link to="" className='link'>Bridges</Link>
          <Link to="" className='link'>Cleaning</Link>
          <Link to="" className='link'>Crowns</Link>
        </div>
      </div>
      <div className='footer-lower'>
        <div className='footer-row1'>
          Copyright 2023 King's Teeth
        </div>
        <div className='footer-row2'>
          <Link to="" className='link'>Terms & Conditions</Link>
          <Link to="" className='link'>Privacy Policy</Link>
        </div>
      </div>
    </div>
  )
}

export default Footer