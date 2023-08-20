import React, { useState } from 'react';
import './SignUp.scss';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // Make sure to install react-toastify: npm install react-toastify
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'; // Make sure to install axios: npm install axios
import Background from '../../asset/images/LoginBackground.png';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

const URL="https://localhost:7028/api/Account/RegisterCustomer"

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [reenterPassword, setReenterPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== reenterPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const data = {
      accountId: 0,
      userId: 0,
      username: username,
      password: password,
      roleId: 3,
      accountStatus: "string",
      workingStatus: "string",
      userNamess: "string",
      phoneNum: "string",
      gender: "string"
    };

    try {
      const response = await axios.post(URL, data);
      // Handle successful response, e.g., redirect user or show a success message
      console.log(response.data); // Assuming the API returns a response
      toast.success("Signup successful!");
      navigate('/login');
    } catch (error) {
      // Handle error, e.g., show an error message
      console.error("Error signing up:", error.response); // Log the response for more details
    
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message || "An error occurred while signing up";
        console.log("Error details:", error.response.data); // Log the error details
        toast.error(errorMessage);
      } else {
        toast.error("An error occurred while signing up");
      }
    }
  };

  return (
    <div className='signup-container'>
    <Header/>
    <div className='signup-background'   
    style={{
      background: `linear-gradient(304deg, rgba(0, 0, 0, 0) 35%, rgba(0, 0, 255, 0.5)) 35%, url(${Background})`,
      backgroundSize: 'cover'
    }}>
      <form className='signup-form' onSubmit={handleSubmit}>
          <div className='signup-title'>
              Sign Up
          </div>
          <div className='signup-main'>
            <div className='signup-left'>
              <div>Already create an account?</div>
              <Link to="/login" className='link'>Login</Link>
            </div>
            <div className='signup-right'>
              <label htmlFor='email'>Username: </label>
              <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              />
              <label htmlFor='password'>Password: </label>
              <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor='reenterpassword'>Re-Enter Password: </label>
              <input
              type="password"
              name="reenterpassword"
              value={reenterPassword}
              onChange={(e) => setReenterPassword(e.target.value)}
             />
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