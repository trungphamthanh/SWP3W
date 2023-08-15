import React from 'react'
import './SignUp.scss'
import { Link } from 'react-router-dom'
import Background from '../../asset/images/LoginBackground.png'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'

const SignUp = () => {
  return (
    <div className='signup-container'>
    <Header/>
    <div className='signup-background'   
    style={{
      background: `linear-gradient(304deg, rgba(0, 0, 0, 0) 35%, rgba(0, 0, 255, 0.5)) 35%, url(${Background})`,
      backgroundSize: 'cover'
    }}>
      <form className='signup-form'>
          <div className='signup-title'>
              Sign Up
          </div>
          <div className='signup-main'>
            <div className='signup-left'>
              <div>Already create an account?</div>
              <Link to="/login" className='link'>Login</Link>
            </div>
            <div className='signup-right'>
              <label htmlFor='email'>Email: </label>
              <input type="text" name="email"></input>
              <label htmlFor='password'>Password: </label>
              <input type="text" name="password"></input>
              <label htmlFor='reenterpassword'>Re-Enter Password: </label>
              <input type="text" name="reenterpassword"></input>
              <button type='submit' className='button'>Sign Up</button>
            </div>
          </div>
      </form>
    </div>
    <Footer/>
  </div>
  )
}

export default SignUp