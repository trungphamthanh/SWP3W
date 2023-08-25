import React, { useEffect, useState } from "react";
import "./BookingDoctor.scss";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import Background from "../../asset/images/BackBackground.png";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import * as moment from "moment";

const drawerWidth = 240;

const URL =
  "https://localhost:7028/api/Booking/getListBookingByDoctorByDoctorID?id";
const DoctorURL = "https://localhost:7028/api/Account/GetAllDoctor";
const BookingURL =
  "https://localhost:7028/api/BookingDetail/GetBookingDetail?bookingId";

const BookingDoctor = () => {
  const doctorId = localStorage.getItem("userId");
  const [headerTitle, setHeaderTitle] = useState("Booking List");
  const [open, setOpen] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [doctors, setDoctors] = useState([]); // State to store the list of doctors
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [selectedBookingServices, setSelectedBookingServices] = useState([]); // State for selected booking's services
  const [bookingStatusOptions] = useState([
    { value: "OnProcess", label: "OnProcess" },
    { value: "Canceled", label: "Canceled" },
    { value: "Complete", label: "Complete" },
  ]);
  const [selectedBookingStatus, setSelectedBookingStatus] = useState("");
  const [numBookings, setNumBookings] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleBookingClick = (booking) => {
    setSelectedBooking(booking);
    fetchBookingServices(booking.id); // Fetch services for the selected booking
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function fetchBookings() {
    try {
      const response = await fetch(`${URL}=${doctorId}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
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
      .then((response) => response.json())
      .then((data) => setDoctors(data))
      .catch((error) => console.error("Error fetching doctors:", error));
  }, []);

  useEffect(() => {
    setNumBookings(bookings.length);
  }, []);

  const fetchBookingServices = (bookingId) => {
    fetch(`${BookingURL}=${bookingId}`)
      .then((response) => response.json())
      .then((data) => {
        setSelectedBookingServices(data.listServicesBooking);
        setSelectedBookingStatus(data.bookingStatus);
        console.log(data.bookingStatus);
        setTotalPrice(data.totalPrice); // Set the total price from the API response
      })
      .catch((error) =>
        console.error("Error fetching booking services:", error)
      );
  };

  // Function to get doctor's name based on accountId
  const getDoctorName = (userId) => {
    const doctor = doctors.find((doctor) => doctor.userId === userId);
    console.log("doctorName:", doctor);
    return doctor ? doctor.user.userName : "N/A"; // Return doctor's username or "N/A" if not found
  };

  return (
    <div
      className="book-container"
      style={{
        background: `url(${Background})`,
        paddingBottom: "5rem",
        minHeight: numBookings < 5 ? "100vh" : "auto",
      }}
    >
      <Sidebar />
      <Header title={headerTitle} />
      <div style={{ paddingTop: "15rem" }}>
        <TableContainer
          component={Paper}
          sx={{
            width: "70%",
            marginLeft: "20rem",
            boxShadow: "rgba(0, 0, 0, 0.2) 0px 20px 30px",
          }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead sx={{ backgroundColor: "#0C3F7E" }}>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", color: "white" }}>
                  ID
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontWeight: "bold", color: "white" }}
                >
                  Customer name
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontWeight: "bold", color: "white" }}
                >
                  Gender
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontWeight: "bold", color: "white" }}
                >
                  Phone
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontWeight: "bold", color: "white" }}
                >
                  Date
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontWeight: "bold", color: "white" }}
                >
                  Status
                </TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell>{booking.id}</TableCell>
                  <TableCell align="center">{booking.customerName}</TableCell>
                  <TableCell align="center">{booking.gender}</TableCell>
                  <TableCell align="center">{booking.phoneNo}</TableCell>
                  <TableCell align="center">
                    {moment(booking.slot.date).format("MM/DD/YYYY")}
                  </TableCell>
                  <TableCell align="center">{booking.bookingStatus}</TableCell>
                  <TableCell>
                    <button
                      className="booking-viewdetail-button"
                      onClick={() => handleBookingClick(booking)}
                    >
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
        maxWidth="md"
        sx={{ fontFamily: "Arial, Helvetica, sans-serif" }}
      >
        <DialogContent>
          <DialogContentText />
          <form style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ marginBottom: "2rem", display: "flex" }}>
              <div style={{ display: "grid" }}>
                <label
                  htmlFor="slot"
                  style={{
                    color: "#0C3F7E",
                    fontSize: "1.4rem",
                    fontWeight: "bold",
                    margin: ".5rem 0",
                  }}
                >
                  Slot{" "}
                </label>
                <input
                  type="text"
                  name="header"
                  style={{ height: "1.7rem", marginRight: "3rem" }}
                  value={selectedBooking?.slot.slotNo}
                  readOnly
                />
              </div>
              <div style={{ display: "grid" }}>
                <label
                  htmlFor="date"
                  style={{
                    color: "#0C3F7E",
                    fontSize: "1.4rem",
                    fontWeight: "bold",
                    margin: ".5rem 0",
                  }}
                >
                  Date{" "}
                </label>
                <input
                  type="text"
                  name="date"
                  style={{ height: "1.7rem" }}
                  value={moment(selectedBooking?.slot.date).format(
                    "MM/DD/YYYY"
                  )}
                  readOnly
                />
              </div>
            </div>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead sx={{ backgroundColor: "#0C3F7E" }}>
                <TableRow>
                  <TableCell
                    align="center"
                    sx={{ fontWeight: "bold", color: "white" }}
                  >
                    Service Name
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontWeight: "bold", color: "white" }}
                  >
                    Service Type
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontWeight: "bold", color: "white" }}
                  >
                    Price
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedBookingServices.length > 0 &&
                  selectedBookingServices.map((service, index) => (
                    <TableRow key={index}>
                      <TableCell align="center">
                        {service.serviceName}
                      </TableCell>
                      <TableCell align="center">
                        {service.serviceType}
                      </TableCell>
                      <TableCell align="center">
                        {/* Display the correct price based on service type */}$
                        {service.serviceType === "Advance"
                          ? service.advancedPrice
                          : service.serviceType === "Top"
                          ? service.topPrice
                          : service.serviceType === "Low"
                          ? service.lowPrice
                          : 0}
                      </TableCell>
                    </TableRow>
                  ))}
                <TableRow>
                  <TableCell />
                  <TableCell />
                  <TableCell align="center">${totalPrice}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <label
              htmlFor="doctor"
              style={{
                color: "#0C3F7E",
                fontSize: "1.4rem",
                fontWeight: "bold",
                margin: ".5rem 0",
              }}
            >
              Doctor{" "}
            </label>
            <input
              type="text"
              name="doctor"
              style={{ height: "1.7rem", width: "8rem" }}
              value={getDoctorName(selectedBooking?.slot.accountId)}
              readOnly
            />
            <label
              htmlFor="bookingStatus"
              style={{
                color: "#0C3F7E",
                fontSize: "1.4rem",
                fontWeight: "bold",
                margin: ".5rem 0",
              }}
            >
              Booking Status
            </label>
            <input
              type="text"
              name="doctor"
              style={{ height: "1.7rem", width: "8rem" }}
              value={selectedBookingStatus}
              readOnly
            />
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BookingDoctor;