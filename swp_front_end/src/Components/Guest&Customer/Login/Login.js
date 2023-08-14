import React from 'react'
import './Login.scss'
import { Link } from 'react-router-dom'
import Background from '../../asset/images/LoginBackground.png'
import Footer from '../Footer/Footer'

const Login = () => {
  return (
    <div
      className='login-container'>
      <div className='login-background'     
      style={{
        background: `linear-gradient(304deg, rgba(0, 0, 0, 0) 35%, rgba(0, 0, 255, 0.5)) 35%, url(${Background})`,
        backgroundSize: 'cover'
      }}>
        <form className='login-form'>
          <div className='login-title'>
            Login
          </div>
          <div className='login-main'>
            <div className='login-left'>
              <div>Haven't created an account?</div>
              <Link to="/signup" className='link'>Sign Up</Link>
            </div>
            <div className='login-right'>
              <label htmlFor='email'>Email: </label>
              <input type="text" name="email"></input>
              <label htmlFor='password'>Password: </label>
              <input type="text" name="password"></input>
              <button type='submit' className='button'>Login</button>
            </div>
          </div>
        </form>
      </div>
      <Footer/>
    </div>
  )
}

export default Login
