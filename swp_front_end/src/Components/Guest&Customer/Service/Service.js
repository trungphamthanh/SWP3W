import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import Banner from '../Banner/Banner';
import Footer from '../Footer/Footer';
import './Service.scss';
import Image from '../../asset/images/Service.jpg';
import { Dialog, DialogContent, DialogContentText, MenuItem, Paper, Rating, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { isLoggedIn } from '../Header/Auth';
import Background from '../../asset/images/BannerImage.png';
import { Link } from 'react-router-dom';
import BoxBackground from '../../asset/images/BannerImage2.avif';
import { useNavigate, useParams } from "react-router-dom/dist";
import { UseServices } from '../../../Context/UseContext';
import { toast } from 'react-toastify';

const URL = 'https://localhost:7028/api/DASServices/GetAllServices';

const Service = () => {
  const navigate = useNavigate();
  const userLoggedIn = isLoggedIn();
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const { AddServices } = UseServices();
  
  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch(URL);
      if (response.ok) {
        const data = await response.json();
        setServices(data);
      } else {
        console.error('Failed to fetch services.');
      }
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const HandleServiceBook = (serviceId) => {
    AddServices(serviceId)
    toast.success("Service Added")
  }

  const getServiceContent = () => {
    if (!selectedService) {
      return (
        <div className='content-text'>
          <p style={{fontSize:"1.5rem"}}>Welcome to King's Teeth Dental Clinic, where we blend state-of-the-art dental technology, personalized care, and a relaxing atmosphere to deliver top-tier oral health services. Our dedicated team of experienced professionals is committed to providing tailored solutions for all your dental needs, whether it's a routine check-up, cosmetic treatment, or specialized procedure. At King's Teeth, we prioritize your comfort and well-being, ensuring every smile receives the royal treatment it deserves.</p>
        </div>
      );
    }

    return (
      <div className='content-text'>
        {/* <img src={Image} alt='Service' /> */}
        <Rating name="read-only" value={selectedService.rating} readOnly />
        <h1>{selectedService.serviceName}</h1>
        <p>{selectedService.intro}</p>
        <p>{selectedService.contents}</p>
        <p>{selectedService.outro}</p>
        <h1 style={{textAlign:"center"}}>Price Table</h1>
        <Table sx={{ minWidth: 650, marginBottom:"2rem", boxShadow:"rgba(0, 0, 0, 0.2) 0px 20px 30px" }} aria-label="simple table">
            <TableHead sx={{backgroundColor:"#0C3F7E"}}>
              <TableRow>
                <TableCell align="center" sx={{fontWeight:"bold", color:"white"}}>Low Service</TableCell>
                <TableCell align="center" sx={{fontWeight:"bold", color:"white"}}>Advanced Service</TableCell>
                <TableCell align="center" sx={{fontWeight:"bold", color:"white"}}>Top service</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                  <TableCell align="center" sx={{fontWeight:"bold", color:"black", backgroundColor:"white"}}>${selectedService.lowPrice}</TableCell>
                  <TableCell align="center" sx={{fontWeight:"bold", color:"black", backgroundColor:"white"}}>${selectedService.advancedPrice}</TableCell>
                  <TableCell align="center" sx={{fontWeight:"bold", color:"black", backgroundColor:"white"}}>${selectedService.topPrice}</TableCell>
                </TableRow>
            </TableBody>
          </Table>
        <button className='button' onClick={() => HandleServiceBook(selectedService.id)}>Book this service</button>
       </div>
    );
  };

  return (
    <div className='service-container'>
      <Header />
      <Banner />
      <div className='service-main'>
        <div className='service-sidebar'>
          <h1 className='our-services-header'>Our Services</h1>
          {services.map((service) => (
            <div key={service.id}>
              <button onClick={() => setSelectedService(service)}>
                {service.serviceName}
              </button>
            </div>
          ))}
        </div>
        <div className='service-content'>
          {getServiceContent()}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Service;
