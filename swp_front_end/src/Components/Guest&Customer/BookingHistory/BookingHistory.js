import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import Banner from '../Banner/Banner';
import Footer from '../Footer/Footer';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import "./BookingHistory.scss";
import * as moment from 'moment'


const URL = `https://localhost:7028/api/Booking/getListBookingByCustomerId`;
const DoctorURL = "https://localhost:7028/api/Account/GetAllDoctor";

const BookingHistory = () => {
  const [bookingHistory, setBookingHistory] = useState([]);
  const [doctors, setDoctors] = useState({}); // Store doctors' names with account IDs
  const userId = localStorage.getItem('userId');

  const slotStringData =(i) =>{
   if(i==1){
    return "7:00-9:00"
   } 
   if(i==2){
    return "9:00-11:00"
   }
   if(i==3){
    return "13:00-15:00"
   }
   if(i==4){
    return "15:00-17:00"
   }
  }
  useEffect(() => {
    // Fetch doctors' data
    fetch(DoctorURL)
      .then(response => response.json())
      .then(data => {
        const doctorsMap = {};
        data.forEach(doctor => {
          doctorsMap[doctor.id] = doctor.username; // Assuming "id" is the account ID and "username" is the doctor's name
        });
        setDoctors(doctorsMap);
      })
      .catch(error => {
        console.error('Error fetching doctors:', error);
        toast.error('Error fetching doctors');
      });

    // Fetch booking history
    fetch(`${URL}/${userId}`)
      .then(response => response.json())
      .then(data => setBookingHistory(data))
      .catch(error => {
        console.error('Error fetching data:', error);
        toast.error('Error fetching booking history');
      });
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'OnProcess':
        return 'gray';
      case 'Complete':
        return 'green';
      case 'Canceled':
        return 'red';
      default:
        return 'inherit';
    }
  };

  return (
    <div className='history-container'>
      <Header />
      <Banner />
      <div className='history-board' style={{ margin: "2rem" }}>
        <h1>Booking History</h1>
        <TableContainer component={Paper} sx={{ width: '70%', marginLeft: '15rem', boxShadow: 'rgba(0, 0, 0, 0.2) 0px 20px 30px' }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead sx={{ backgroundColor: "#0C3F7E" }}>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", color: "white" }}>ID</TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold", color: "white" }}>Date</TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold", color: "white" }}>Slot</TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold", color: "white" }}>Total Price</TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold", color: "white" }}>Status</TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold", color: "white" }}>Doctor</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
  {bookingHistory.map((booking, index) => (
    <TableRow key={index}>
      <TableCell>{booking.id}</TableCell>
      <TableCell align="center">
        {moment(booking.slot.date).format('MM/DD/YYYY')}
      </TableCell>
      <TableCell align="center">
        {slotStringData(booking.slot.slotNo)}
      </TableCell>
      <TableCell align="center">
        ${booking.totalPrice}
      </TableCell>
      <TableCell align="center" style={{ color: getStatusColor(booking.bookingStatus), fontWeight:"bold"}}>
        {booking.bookingStatus}
      </TableCell>
      <TableCell align="center">
        {booking.slot.doctorName}
      </TableCell>
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