import React, { useEffect, useState } from 'react'
import './BookingManagement.scss'
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import Background from '../../asset/images/BackBackground.png'
import { Dialog, DialogContent, DialogContentText, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Booking } from './Booking';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

const BookingManagement = () => {
  const [headerTitle, setHeaderTitle] = useState('Booking Management');
  const [open, setOpen] = React.useState(false);
  const [bookings, setBookings] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    // Fetch booking data from the API
    fetch("API_URL/bookings")
      .then(response => response.json())
      .then(data => setBookings(data))
      .catch(error => console.error("Error fetching bookings:", error));
  }, []);

  return (
    <div className='book-container' style={{background:`url(${Background})`, paddingBottom:"5rem"}}>
      <Sidebar/>
      <Header title={headerTitle} />
      <div style={{paddingTop:"15rem"}}>
        <TableContainer component={Paper} sx={{width:"70%", marginLeft:"20rem", boxShadow:"rgba(0, 0, 0, 0.2) 0px 20px 30px"}}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead sx={{backgroundColor:"#0C3F7E"}}>
                <TableRow>
                  <TableCell sx={{fontWeight:"bold", color:"white"}}>ID</TableCell>
                  <TableCell align="center" sx={{fontWeight:"bold", color:"white"}}>Name</TableCell>
                  <TableCell align="center" sx={{fontWeight:"bold", color:"white"}}>Gender</TableCell>
                  <TableCell align="center" sx={{fontWeight:"bold", color:"white"}}>Phone</TableCell>
                  <TableCell align="center" sx={{fontWeight:"bold", color:"white"}}>Date</TableCell>
                  <TableCell/>
                </TableRow>
              </TableHead>
              <TableBody>
              {Booking.map(booking => (
                <TableRow key={booking.id}>
                  <TableCell>{booking.id}</TableCell>
                  <TableCell align="center">{booking.name}</TableCell>
                  <TableCell align="center">{booking.gender}</TableCell>
                  <TableCell align="center">{booking.phone}</TableCell>
                  <TableCell align="center">{booking.date}</TableCell>
                  <TableCell>
                  <button className="booking-viewdetail-button" onClick={handleClickOpen}>
                    View Detail
                  </button>
                  </TableCell>
                </TableRow>
              ))}
              </TableBody>
            </Table>
          </TableContainer>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth="true"
        maxWidth="xs"
        sx={{fontFamily:"Arial, Helvetica, sans-serif"}}
      >
        <DialogContent>
          <DialogContentText/>
          <form style={{display:"flex", flexDirection:"column"}}>
          <div style={{marginBottom:"2rem", display:"flex"}}>
            <div style={{display:"grid"}}>
              <label htmlFor="slot" style={{color:"#0C3F7E", fontSize:"1.4rem", fontWeight:"bold", margin:".5rem 0"}}>Slot </label>
              <input type="text" name="header" style={{height:"1.7rem", marginRight:"3rem"}}></input>
            </div>
            <div style={{display:"grid"}}>
            <label htmlFor="date" style={{color:"#0C3F7E", fontSize:"1.4rem", fontWeight:"bold", margin:".5rem 0"}}>Date </label>
            <input type="date" name="date" style={{height:"1.7rem"}}></input>
            </div>
          </div>
          <div style={{marginBottom:"2rem", display:"flex"}}>
            <div style={{display:"grid"}}>
              <label htmlFor="service1" style={{color:"#0C3F7E", fontSize:"1.4rem", fontWeight:"bold", margin:".5rem 0"}}>Service 1 </label>
              <input type="text" name="service1" style={{height:"1.7rem", marginRight:"3rem"}}></input>
            </div>
            <div style={{display:"grid"}}>
              <label htmlFor="service2" style={{color:"#0C3F7E", fontSize:"1.4rem", fontWeight:"bold", margin:".5rem 0"}}>Service 2 </label>
              <input type="text" name="service2" style={{height:"1.7rem"}}></input>
            </div>
          </div>
          <label htmlFor="doctor" style={{color:"#0C3F7E", fontSize:"1.4rem", fontWeight:"bold", margin:".5rem 0"}}>Doctor </label>
          <input type="text" name="doctor" style={{height:"1.7rem", width:"8rem"}}></input>
          <button onClick={handleClose} style={{
                      backgroundColor:"#0C3F7E",
                      borderRadius:"2rem",
                      color:"#ffffff",
                      border:"0",
                      cursor:"pointer",
                      fontWeight:"bold",
                      fontSize: "1rem",
                      padding:".9rem 1rem",
                      width:"50%",
                      margin:"2rem auto",
          }}>
                    Confirm
          </button>
          <Link to="/manager/booking/detail" style={{
                      backgroundColor:"#0C3F7E",
                      borderRadius:"2rem",
                      color:"#ffffff",
                      border:"0",
                      cursor:"pointer",
                      fontWeight:"bold",
                      fontSize: "1rem",
                      padding:".9rem 1rem",
                      width:"45%",
                      margin:"2rem auto",
                      textAlign:'center',
                      textDecoration:"none"
          }}>
                    Update
          </Link>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default BookingManagement