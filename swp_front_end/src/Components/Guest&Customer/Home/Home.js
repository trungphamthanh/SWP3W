import React from 'react'
import "./Home.scss"
import { Headphones, LocalHospital, Star } from '@mui/icons-material'
import Banner from '../Banner/Banner'
import Location from '../../asset/images/Location.jpg'
import Reason from '../../asset/images/Reason1.jpg'
import Feedback from "../../asset/images/Feedback.png"
import BoxBackground from '../../asset/images/BannerImage2.avif'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { Link } from 'react-router-dom'
import { isLoggedIn } from '../Header/Auth';


const Home = () => {
  const userLoggedIn = isLoggedIn();

  return (
    <div className='home-container'>
      <Header/>
      <Banner/>
      <div className='home-location'>
        <div className='location'>
          <div className='location-content'>
            <h1>Welcome to King's Teeth Dental Clinic</h1>
            <p>
              We would like to welcome you to our office. We take great satisfaction in helping you
              maintain optimal oral health. Our practice is devoted to comprehensive and preventive patient care.
            </p>
            <p>
              Throughout our website, you will find an abundance of information about our practice, procedures we
              provide, and dentistry in general. Please explore and learn as much about dentistry and our services
              as you desire. We believe our patients should have as much information as possible in order to make
              important, informed decisions regarding their oral health and treatment options.
            </p>
            <p>
            Our patients are our most important asset, and we strive to develop long-lasting, trusting relationships
            with all of our patients. Your referrals are welcome and appreciated.
            </p>
            <h2>We look forward to seeing you!</h2>
          </div>
          <img src={Location}/>
        </div>
      </div>
      <div className='home-feature'>
        <div className='feature-header'>Featuring</div>
        <div className='feature-card-list'>
          <div className='feature-card'>
              <Headphones className='card-icon'/>
              <div className='card-header'>
                  Free Advices
              </div>
              <div className='card-content'>
              Receive valuable oral health guidance without any cost. Our clinic is committed to educating 
              patients, offering free advice to help you make informed decisions about your dental well-being.
              </div>
          </div>
          <div className='feature-card'>
              <Star className='card-icon'/>
              <div className='card-header'>
                  Excellent Rating
              </div>
              <div className='card-content'>
              Join our community of satisfied patients who have consistently given us top ratings. 
              We take pride in our positive reputation, reflecting the quality of our services and the trust 
              we've built over time.
              </div>
          </div>
          <div className='feature-card'>
              <LocalHospital className='card-icon'/>
              <div className='card-header'>
                  Expert Dentists
              </div>
              <div className='card-content'>
              Your smile is in the hands of skilled professionals. Our expert dentists bring years of 
              experience and specialized knowledge to ensure that you receive the best possible care, tailored 
              to your individual needs.
              </div>
          </div>
        </div>
      </div>
      <div className='home-reason'>
        <img src={Reason}/>
        <div className='reason-content'>
          <p><span>Speed:</span> Our dental clinic prioritizes your time. With state-of-the-art equipment 
          and streamlined processes, we ensure that your appointments are efficient and punctual, minimizing 
          wait times and getting you back to your busy schedule without compromising on the quality of care.</p>
          <p><span>Quality:</span> Experience dental care made easy. From hassle-free appointment scheduling 
          and convenient online forms to clear treatment explanations, we believe in simplicity at every step. 
          We aim to provide a straightforward and comfortable experience that eliminates confusion and puts you 
          at ease.</p>
          <p><span>Simplicity:</span> Your smile deserves the best. Our highly skilled team of experienced 
          dentists is dedicated to delivering top-tier care using the latest techniques and materials. We take 
          pride in maintaining the highest standards of quality and personalized attention to ensure your oral 
          health and satisfaction are exceptional.</p>
        </div>
      </div>
      <div className='home-feedback' style={{backgroundImage:`url(${Feedback})`, backgroundSize: 'cover'}}>
        <h1>Feedbacks</h1>
      <div className='feedback-card-list'>
        <div className='feedback-card'>
                <LocalHospital className='card-icon'/>
                <div className='card-header'>
                    Walter White
                </div>
                <div className='card-content'>
                Say my name
                </div>
        </div>
        <div className='feedback-card'>
                <LocalHospital className='card-icon'/>
                <div className='card-header'>
                    Walter White
                </div>
                <div className='card-content'>
                Say my name
                </div>
        </div>
        <div className='feedback-card'>
                <LocalHospital className='card-icon'/>
                <div className='card-header'>
                    Walter White
                </div>
                <div className='card-content'>
                Say my name
                </div>
        </div>
        <div className='feedback-card'>
                <LocalHospital className='card-icon'/>
                <div className='card-header'>
                    Walter White
                </div>
                <div className='card-content'>
                Say my name
                </div>
        </div>
      </div>
      <Link to={''} className='link'>See More</Link>
      {userLoggedIn ? (
      <div className='book-box' style={{background:`url(${BoxBackground})`, width:"30%", padding:""}}>
      <h2>Ready to Book?</h2>
      <Link to='/booking' className='link'>Book Now</Link>
      </div>
        ) : (
          <div className='book-box' style={{background:`url(${BoxBackground})`, width:"30%", padding:""}}>
          <h2>Ready to Book?</h2>
          <Link to='/login' className='link'>Book Now</Link>
          </div>
        )}
      </div>
      <Footer/>
    </div>
  )
}

export default Home