import React, { useState } from "react";
import "./BookingDetail.scss";
import { 
  InputLabel, 
  MenuItem, 
  Select, 
  TableHead,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Button,} from "@mui/material";
import { WeekDate, DateSlot, ServiceMap, Week } from "../ScheduleManagement/SlotMap";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import Background from '../../asset/images/BackBackground.png'
import { Link } from "react-router-dom";

const Slot = ({ date, slot, status, description, selected, onClick }) => {
  return (
    <TableCell
      onClick={onClick}
      style={{
        cursor: "pointer",
        padding: "0",
        backgroundColor: "#f0f0f0",
        transition: "transform 0.3s ease-in-out",
        transform: selected ? "scale(0.9)" : "scale(1)",
        border: "#5088C9 solid 5px",
      }}
    >
      {/* Display the slot information */}
      <div className={status === "Open" ? "slot-available" : "slot-taken"}>
        <h1 className="available-header">Slot {slot}</h1>
        <div className="available-time">({description})</div>
        <div className="available-status">{status}</div>
      </div>
      
      {/* Hidden input field to hold selected slot */}
      <input
        type="hidden"
        name={`selectedSlots[${date}]`}
        value={selected ? slot : ""}
      />
    </TableCell>
  );
};


const BookingDetail = () => {
  const [selectedSlots, setSelectedSlots] = useState({});
  const [selectedWeek, setSelectedWeek] = useState(Week[0]);
  const [headerTitle, setHeaderTitle] = useState('Booking Update Management');
  const [selectedService1, setSelectedService1] = useState("");
  const [selectedService2, setSelectedService2] = useState("");

  const handleSlotClick = (day, time, status) => {
    if (status === "Open") {
      setSelectedSlots((prevSelectedSlots) => {
        const newSelectedSlots = { ...prevSelectedSlots };
  
        // Clear all previously selected slots
        Object.keys(newSelectedSlots).forEach((selectedDay) => {
          newSelectedSlots[selectedDay] = null;
        });
  
        // Set the clicked slot as selected
        newSelectedSlots[day] = time;
  
        return newSelectedSlots;
      });
    }
  };

  const handleSubmit = () => {
    // Prepare the data to send to the API
    const requestData = {
      service1: selectedService1,
      service2: selectedService2,
      slot: selectedSlots[selectedWeek],
      date: selectedWeek,
      // Add other data properties as needed
    };

    // Send the data to the API
    fetch("API_URL/bookings", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then(response => response.json())
      .then(data => {
        console.log("Data saved:", data);
        // Handle successful response
      })
      .catch(error => {
        console.error("Error saving data:", error);
        // Handle error
      });
  };

  const handleWeekSelect = (event) => {
    const selectedWeekIndex = event.target.value;
    setSelectedWeek(Week[selectedWeekIndex]); // Store the selected week's information
  };

  

  return (
    <div className="update-container" style={{background:`url(${Background})`, paddingBottom:"5rem"}}>
        <Sidebar/>
        <Header title={headerTitle} />
        <form style={{marginLeft:"20rem", paddingTop:"15rem"}} onSubmit={handleSubmit}>
        <InputLabel
        id={`service-1`}
        sx={{
          color: "#1257ab",
          fontSize: "2rem",
          fontWeight: "bold",
        }}
      >
        Service 1
      </InputLabel>
      <Select
        labelId={`service-1`}
        id={`service-1`}
        label={`service-1`}
        sx={{
          height: "2rem",
          width: "15rem",
          backgroundColor: "white",
          marginBottom: "2rem",
        }}
      >
        {ServiceMap.map((service) => (
          <MenuItem key={service.id} value={service.id}>
            {service.service}
          </MenuItem>
        ))}
      </Select>
      <InputLabel
        id={`service-2`}
        sx={{
          color: "#1257ab",
          fontSize: "2rem",
          fontWeight: "bold",
        }}
      >
        Service 2
      </InputLabel>
      <Select
        labelId={`service-2`}
        id={`service-2`}
        label={`service-2`}
        sx={{
          height: "2rem",
          width: "15rem",
          backgroundColor: "white",
          marginBottom: "2rem",
        }}
      >
        {ServiceMap.map((service) => (
          <MenuItem key={service.id} value={service.id}>
            {service.service}
          </MenuItem>
        ))}
      </Select>
                  <InputLabel
                    id="time"
                    sx={{
                      color: "white",
                      fontSize: "2rem",
                      fontWeight: "bold",
                      marginLeft: "4rem",
                    }}
                  >
                    Week
                  </InputLabel>
                  <Select
                    labelId="time"
                    id="time"
                    label="time"
                    value={0} // Set the initial value to 0 for the first week
                    sx={{
                      height: "2rem",
                      width: "15rem",
                      backgroundColor: "white",
                      marginLeft: "4rem",
                      marginBottom: "4rem",
                    }}
                    onChange={handleWeekSelect} // Call this function when a week is selected
                  >
                    {Week.map((week, index) => (
                      <MenuItem key={week.week} value={index}>
                        {week.week}
                      </MenuItem>
                    ))}
                  </Select>
                  {/* ... (rest of your form) */}
                  <TableContainer
                    component={Paper}
                    sx={{
                      width: "80%",
                      backgroundColor: "#5088C9",
                      margin: "0 auto",
                      height: "",
                    }}
                  >
                    <Table>
                      <TableHead>
  <TableRow>
    {WeekDate.map(({ day }) => (
      <TableCell
        key={day}
        sx={{
          textAlign: "center",
          backgroundColor: "#5088C9",
          color: "white",
          fontSize: "1rem",
        }}
      >
        <h1>{day}</h1>
        {selectedWeek && (
          <h2>{selectedWeek[day.toLowerCase()]}</h2>
        )}
      </TableCell>
    ))}
  </TableRow>
</TableHead>
                      <TableBody>
                        {DateSlot.map(({ slot, description, status }) => (
                          <TableRow key={slot}>
                            {WeekDate.map(({ day }) => (
                              <Slot
                                key={`${day}-${slot}`}
                                date={day}
                                slot={slot}
                                status={status}
                                description={description}
                                selected={selectedSlots[day] === slot}
                                onClick={() => handleSlotClick(day, slot, status)}
                              />
                            ))}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                <div style={{display:"flex", justifyContent:"space-evenly", marginTop:"3rem",}}>
                    <button type="submit" className="form-button">
                      Save
                    </button>
                    <Link to="/manager/booking" className="link-button">
                        Go back
                    </Link>
                </div>
              </form>
    </div>
  );
};

export default BookingDetail;
