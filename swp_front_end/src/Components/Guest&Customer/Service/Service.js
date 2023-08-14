import React, { useState } from 'react';
import Header from '../Header/Header';
import Banner from '../Banner/Banner';
import Footer from '../Footer/Footer';
import './Service.scss';
import Image from '../../asset/images/Service.jpg';
import { ServiceMap } from './ServiceMap';

const Service = () => {
  const [selectedService, setSelectedService] = useState('Service'); // Default to 'Service'
  

  const getServiceContent = () => {
    const service = ServiceMap.find(dentalservice => dentalservice.name === selectedService);
    if (!service) {
      return (
        <div className='content-text'>
          <h1>Your time is up. Please go away</h1>
        </div>
      );
    }

    return (
      <div className='content-text'>
        <img src={service.image} alt='Service' />
        <h1>{service.name}</h1>
        <p>{service.intro}</p>
        <p>{service.content}</p>
        <p>{service.outro}</p>
      </div>
    );
  };

  return (
    <div className='service-container'>
      <Header />
      <Banner />
      <div className='service-main'>
        <div className='service-sidebar'>
          <h1>Our Services</h1>
          {ServiceMap.map((dentalservice) => (
            <div key={dentalservice.name}>
              {dentalservice.name !== 'Service' && (
                <button onClick={() => setSelectedService(dentalservice.name)}>
                  {dentalservice.name}
                </button>
              )}
            </div>
          ))}
          <h1></h1>
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
