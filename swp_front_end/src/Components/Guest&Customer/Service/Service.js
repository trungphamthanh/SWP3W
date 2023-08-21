import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import Banner from '../Banner/Banner';
import Footer from '../Footer/Footer';
import './Service.scss';
import Image from '../../asset/images/Service.jpg';

const URL = 'https://localhost:7028/api/DASServices/GetAllServices';

const Service = () => {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);

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

  const getServiceContent = () => {
    if (!selectedService) {
      return (
        <div className='content-text'>
          <h1>Select a service from the sidebar</h1>
        </div>
      );
    }

    return (
      <div className='content-text'>
        <img src={Image} alt='Service' />
        <h1>{selectedService.serviceName}</h1>
        <p>{selectedService.intro}</p>
        <p>{selectedService.contents}</p>
        <p>{selectedService.outro}</p>
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
