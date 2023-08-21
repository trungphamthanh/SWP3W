import React from 'react';
import Background from '../../asset/images/BannerImage.png';
import './Banner.scss';
import { Link } from 'react-router-dom';
import BoxBackground from '../../asset/images/BannerImage2.avif';
import Doctor from '../../asset/images/BannerDoctor.png';
import { isLoggedIn } from '../Header/Auth';

const Banner = () => {
  const userLoggedIn = isLoggedIn();

  return (
    <div
      className='banner-container'
      style={{
        background: `linear-gradient(315deg, rgba(0, 0, 0, 0) 22%, rgba(0, 0, 255, 0.5)) 22%, url(${Background})`,
        backgroundSize: 'cover',
        height: '40rem',
        marginTop: '-8rem',
      }}
    >
      <span className='banner-slogan'>
        <p className='slogan-main'>Let Us</p>
        <p>Give you the <span>Teeth</span></p>
        <p>The <span>Confident</span></p>
        <p>and the reason to <span>Smile</span></p>
      </span>
      <img src={Doctor} className='banner-doctor' />
      {userLoggedIn ? (
        <span className='banner-button' style={{ background: `url(${BoxBackground})` }}>
          <Link to='/booking' className='link'>
            Book Now
          </Link>
          <div>
            <p>Treat your teeth</p>
            <p>The right way</p>
            <p>Click here to Book</p>
          </div>
        </span>
      ) : (
        <span className='banner-button' style={{ background: `url(${BoxBackground})` }}>
          <Link to='/login' className='link'>
            Book Now
          </Link>
          <div>
            <p>Treat your teeth</p>
            <p>The right way</p>
            <p>Log in to book</p>
          </div>
        </span>
      )}
    </div>
  );
};

export default Banner;
