import React from 'react';
import './Header.scss';

const Header = ({ title }) => {
  return (
    <h1 className='header'>{title}</h1>
  );
};

export default Header;