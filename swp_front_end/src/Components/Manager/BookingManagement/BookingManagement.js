import React, { useEffect, useState } from 'react'
import './BookingManagement.scss'
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import Background from '../../asset/images/BackBackground.png'
import { Dialog, DialogContent, DialogContentText, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Booking } from './Booking';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const drawerWidth = 240;

const URL="https://localhost:7028/api/Booking/getListBookingBymanager"
const DoctorURL="https://localhost:7028/api/Account/GetAllDoctor"
const BookingURL="https://localhost:7028/api/BookingDetail/GetBookingDetail?bookingId"
const BookingStatusURL="https://localhost:7028/api/Booking/ManagerUpdateBookStatus/bookingId"

const BookingManagement = () => {
  const [headerTitle, setHeaderTitle] = useState('Booking Management');
  const [open, setOpen] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [doctors, setDoctors] = useState([]); // State to store the list of doctors
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [selectedBookingServices, setSelectedBookingServices] = useState([]); // State for selected booking's services
  const [bookingStatusOptions] = useState([
    { value: 'OnProcess', label: 'OnProcess' },
    { value: 'Canceled', label: 'Canceled' },
    { value: 'Complete', label: 'Complete' },
  ]);
  const [selectedBookingStatus, setSelectedBookingStatus] = useState("");
  const [numBookings, setNumBookings] = useState(0);

  const handleBookingClick = (booking) => {
    setSelectedBooking(booking);
    fetchBookingServices(booking.id); // Fetch services for the selected booking
    setOpen(true);
  };

  const handleBookingStatusChange = (event) => {
    setSelectedBookingStatus(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdateBookingStatus = async (event) => {
    event.preventDefault();
    // console.log(selectedBooking)

    // Update the selected booking status using the API
    if (selectedBooking) {
      const updatedBooking = {
          id: selectedBooking.id,
          customerName: selectedBooking.customerName,
          phoneNo: selectedBooking.phoneNo,
          gender: selectedBooking.gender,
          bookingStatus: selectedBookingStatus,
          accountId:selectedBooking.accountId,
          slotId:selectedBooking.slotId,
          account:null,
          bookingDetails:[],
          slot:null
        };
      const updatedStatusUrl = `${BookingStatusURL}/${selectedBooking.id}?bookingStatus=${selectedBookingStatus}`;
      console.log(updatedBooking)
      fetch(updatedStatusUrl, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedBooking),
      })
        .then(response => response.json())
        .then(updatedData => {
          // Handle success, if needed
          console.log('Booking status updated:', updatedData);
          // Fetch updated booking data again
          fetchBookings();
        })
        .catch(error => {
          // Handle error, if needed
          toast.error('Error updating booking status:', error);
          console.log(error)
        });
    }
    // Close the dialog
    handleClose();
  };

  async function fetchBookings() {
    try {
      const response = await fetch(URL);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  }
  

  useEffect(() => {
    // Fetch booking data from the API

    fetchBookings();

    // Fetch doctors data from the API
    fetch(DoctorURL)
      .then(response => response.json())
      .then(data => setDoctors(data))
      .catch(error => console.error("Error fetching doctors:", error));

  }, []);

  useEffect(() => {
    setNumBookings(bookings.length);
  }, []);
  

  const fetchBookingServices = (bookingId) => {
    fetch(`${BookingURL}=${bookingId}`)
      .then(response => response.json())
      .then(data => {
        setSelectedBookingServices(data.listServicesBooking)
        setSelectedBookingStatus(data.bookingStatus)
        console.log(data.bookingStatus)
      })
      .catch(error => console.error("Error fetching booking services:", error));
  };
  

  // Function to get doctor's name based on accountId
  const getDoctorName = (userId) => {
    const doctor = doctors.find(doctor => doctor.userId === userId);
    return doctor ? doctor.username : "N/A"; // Return doctor's username or "N/A" if not found
  };

  return (
    <div className='book-container' style={{ background: `url(${Background})`, paddingBottom: "5rem", minHeight: numBookings < 5 ? '100vh' : 'auto' }}>
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
                <TableCell align="center" sx={{fontWeight:"bold", color:"white"}}>Status</TableCell>
                <TableCell/>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings.map(booking => (
                <TableRow key={booking.id}>
                  <TableCell>{booking.id}</TableCell>
                  <TableCell align="center">{booking.customerName}</TableCell>
                  <TableCell align="center">{booking.gender}</TableCell>
                  <TableCell align="center">{booking.phoneNo}</TableCell>
                  <TableCell align="center">{booking.slot.date}</TableCell>
                  <TableCell align="center">{booking.bookingStatus}</TableCell>
                  <TableCell>
                    <button className="booking-viewdetail-button" onClick={() => handleBookingClick(booking)}>
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
        fullWidth={true}
        maxWidth="xs"
        sx={{fontFamily:"Arial, Helvetica, sans-serif"}}
      >
        <DialogContent>
          <DialogContentText/>
          <form style={{display:"flex", flexDirection:"column"}} onSubmit={handleUpdateBookingStatus}>
            <div style={{marginBottom:"2rem", display:"flex"}}>
              <div style={{display:"grid"}}>
                <label htmlFor="slot" style={{color:"#0C3F7E", fontSize:"1.4rem", fontWeight:"bold", margin:".5rem 0"}}>Slot </label>
                <input type="text" name="header" style={{height:"1.7rem", marginRight:"3rem"}} value={selectedBooking?.slot.slotNo} readOnly />
              </div>
              <div style={{display:"grid"}}>
                <label htmlFor="date" style={{color:"#0C3F7E", fontSize:"1.4rem", fontWeight:"bold", margin:".5rem 0"}}>Date </label>
                <input type="text" name="date" style={{height:"1.7rem"}} value={selectedBooking?.slot.date} readOnly />
              </div>
            </div>
            {selectedBookingServices.length > 0 && (
              <div style={{ marginBottom: "2rem", display: "flex" }}>
                {selectedBookingServices.map((service, index) => (
                  <div key={index} style={{ display: "grid" }}>     
                    <label htmlFor={`service${index}`} style={{ color: "#0C3F7E", fontSize: "1.4rem", fontWeight: "bold", margin: ".5rem 0" }}>
                      Service {index+1}
                    </label>
                    <input type="text" name={`service${index}`} style={{ height: "1.7rem", marginRight: "3rem" }} value={service.serviceName} readOnly />
                  </div>
                ))}
              </div>
            )}
            <label htmlFor="doctor" style={{color:"#0C3F7E", fontSize:"1.4rem", fontWeight:"bold", margin:".5rem 0"}}>Doctor </label>
            <input type="text" name="doctor" style={{height:"1.7rem", width:"8rem"}} value={getDoctorName(selectedBooking?.slot.accountId)} readOnly />
            <label htmlFor="bookingStatus" style={{color:"#0C3F7E", fontSize:"1.4rem", fontWeight:"bold", margin:".5rem 0"}}>Booking Status</label>
            <Select
              labelId="bookingStatus"
              id="bookingStatus"
              label="Booking Status"
              sx={{
                height: "2rem",
                width: "10rem",
                backgroundColor: "white",
                marginRight: "2rem",
              }}
              value={selectedBookingStatus}
              onChange={handleBookingStatusChange}
            >
              {bookingStatusOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
              ))}
            </Select>
            <button type='submit' style={{
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
            <Link to={`/manager/booking/detail/${selectedBooking?.id}`} style={{
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
              To Update Page
            </Link>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default BookingManagement