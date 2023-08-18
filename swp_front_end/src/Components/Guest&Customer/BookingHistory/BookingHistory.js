import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import Banner from '../Banner/Banner';
import Footer from '../Footer/Footer';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { History } from './History'; // Import the History map
import "./BookingHistory.scss"

const BookingHistory = () => {
    const [bookingHistory, setBookingHistory] = useState([]); // State to hold fetched booking history data

    useEffect(() => {
      // Fetch booking history data from the API
      fetch('API_ENDPOINT_URL') // Replace 'API_ENDPOINT_URL' with the actual API URL
        .then(response => response.json())
        .then(data => setBookingHistory(data))
        .catch(error => console.error('Error fetching data:', error));
    }, []); // Empty dependency array ensures the effect runs only once

  return (
    <div className='history-container'>
      <Header />
      <Banner />
      <div className='history-board' style={{margin:"2rem"}}>
        <h1>Booking History</h1>
        <TableContainer component={Paper} sx={{ width: '70%', marginLeft: '15rem', boxShadow: 'rgba(0, 0, 0, 0.2) 0px 20px 30px' }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead sx={{ backgroundColor: "#0C3F7E" }}>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", color: "white" }}>ID</TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold", color: "white" }}>Date</TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold", color: "white" }}>Slot</TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold", color: "white" }}>Doctor</TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold", color: "white" }}>Service 1</TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold", color: "white" }}>Service 2</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {bookingHistory.map((booking, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell> {/* Assuming you want to display index + 1 as ID */}
                  <TableCell align="center">{booking.date}</TableCell>
                  <TableCell align="center">{booking.slot}</TableCell>
                  <TableCell align="center">{booking.doctor}</TableCell>
                  <TableCell align="center">{booking.service1}</TableCell>
                  <TableCell align="center">{booking.service2}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Footer />
    </div>
  );
};

export default BookingHistory;
