import React, { useState } from 'react';
import './Login.scss';
import { Link } from 'react-router-dom';
import Background from '../../asset/images/LoginBackground.png';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from correct path

const URL = "https://localhost:7028/api/Account/Login";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = {
      username: email,
      password: password,
    };

    try {
      const response = await fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const responseData = await response.json(); // Parse response JSON
        const userId = responseData.userId; // Assuming the response contains userId
        const roleId = responseData.roleId; // Assuming the response contains roleId

        toast.success('Login successful');
        localStorage.setItem('userId', userId);

        if (roleId === 2) {
          navigate('/manager/booking'); // Redirect to manager booking page
        } else {
          if (roleId === 1) {
            navigate('/admin/account')
          }else{
            navigate('/home'); // Redirect to default home page
          }
        }
      } else {
        toast.error('Login failed');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      toast.error('Error logging in');
    }
  };

  return (
    <div className='login-container'>
      <Header />
      <div className='login-background'
        style={{
          background: `linear-gradient(304deg, rgba(0, 0, 0, 0) 35%, rgba(0, 0, 255, 0.5)) 35%, url(${Background})`,
          backgroundSize: 'cover'
        }}>
        <form className='login-form' onSubmit={handleSubmit}>
          <div className='login-title'>
            Login
          </div>
          <div className='login-main'>
            <div className='login-left'>
              <div>Haven't created an account?</div>
              <Link to="/signup" className='link'>Sign Up</Link>
            </div>
            <div className='login-right'>
              <label htmlFor='username'>Username: </label>
              <input type="text" name="username" onChange={e => setEmail(e.target.value)} />
              <label htmlFor='password'>Password: </label>
              <input type="password" name="password" onChange={e => setPassword(e.target.value)} />
              <button type='submit' className='button'>Login</button>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
