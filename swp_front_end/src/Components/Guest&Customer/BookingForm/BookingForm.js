import React, { useState } from "react";
import "./BookingForm.scss";
import Header from "../Header/Header";
import Banner from "../Banner/Banner";
import Footer from "../Footer/Footer";
import { InputLabel, MenuItem, Select, TableHead } from "@mui/material";
import { WeekDate, DateSlot, ServiceMap, Week } from "./SlotMap";
import _ from "lodash";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Button,
} from "@mui/material";

const initSlot = [
  {
    slotId: "",
    status: "",
  },
];

const Slot = ({ date, slot, status, description, selected, onClick }) => {
  return (
    <TableCell
      onClick={onClick}
      style={{
        cursor: "pointer",
        border: "1px solid #ccc",
        padding: "0",
        backgroundColor: "#f0f0f0",
        transition: "all 0.3s ease-in-out", // For the shrinking effect
        transform: selected ? "scale(0.9)" : "scale(1)",
        border: "#5088C9 solid 5px",
      }}
    >
      {status === "Open" ? (
        <div className="slot-available">
          <h1 className="available-header">Slot {slot}</h1>
          <div className="available-time">({description})</div>
          <div className="available-status">{status}</div>
        </div>
      ) : (
        <div className="slot-taken">
          <h1 className="available-header">Slot {slot}</h1>
          <div className="available-time">({description})</div>
          <div className="available-status">{status}</div>
        </div>
      )}
    </TableCell>
  );
};

const ServiceInput = ({ index, onRemove }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <InputLabel
        id={`service-${index}`}
        sx={{
          color: "white",
          fontSize: "2rem",
          fontWeight: "bold",
        }}
      >
        Service {index + 1}
      </InputLabel>
      <Select
        labelId={`service-${index}`}
        id={`service-${index}`}
        label={`service-${index}`}
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
      {onRemove && (
        <Button
          variant="outlined"
          onClick={onRemove}
          sx={{
            marginTop: "1rem",
            backgroundColor: "white",
            color: "black",
            "&:hover": {
              color: "white",
              borderColor: "white",
            },
            width: "14rem",
          }}
        >
          Remove Service
        </Button>
      )}
    </div>
  );
};

const BookingForm = () => {
  const [selectedSlots, setSelectedSlots] = useState({});
  const [serviceSectionAdded, setServiceSectionAdded] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState(null);

  const handleSlotClick = (day, time, status) => {
    if (status === "Open") {
      setSelectedSlots((prevSelectedSlots) => {
        const newSelectedSlots = { ...prevSelectedSlots };
        if (newSelectedSlots[day] === time) {
          // If the clicked slot is already selected, deselect it
          delete newSelectedSlots[day];
        } else {
          // Otherwise, select the clicked slot
          newSelectedSlots[day] = time;
        }
        return newSelectedSlots;
      });
    }
  };

  const handleSubmit = () => {
    // Send selectedSlots to the backend
    console.log(selectedSlots);
  };

  const handleServiceButtonAdd = () => {
    if (!serviceSectionAdded) {
      setServiceSectionAdded(true);
    }
  };

  const handleServiceRemove = () => {
    setServiceSectionAdded(false);
  };

  const handleWeekSelect = (event) => {
    const selectedWeekIndex = event.target.value;
    setSelectedWeek(Week[selectedWeekIndex]); // Store the selected week's information
  };

  return (
    <div className="booking-container">
      <Header />
      <Banner />
      <h1 className="booking-header">Booking Form</h1>
      <div className="booking-main">
        <form className="booking-form">
          <div className="form-content">
            <div className="form-personal">
              <label htmlFor="phone">Phone: </label>
              <input type="text" name="phone"></input>
              <div className="personal-lower">
                <label htmlFor="gender">Gender: </label>
                <Select
                  labelId="gender"
                  id="gender"
                  label="gender"
                  sx={{
                    height: "2rem",
                    width: "6rem",
                    backgroundColor: "white",
                    marginRight: "2rem",
                  }}
                >
                  <MenuItem value={10}>Male</MenuItem>
                  <MenuItem value={20}>Female</MenuItem>
                </Select>
                <label htmlFor="name">Name: </label>
                <input type="text" name="name"></input>
              </div>
            </div>
            <div className="form-service">
        <ServiceInput index={0} />

        {/* Render the "Add Service" button only if section is not added */}
        {!serviceSectionAdded && (
          <div>
            <Button
              variant="outlined"
              onClick={handleServiceButtonAdd}
              sx={{
                marginTop: "1rem",
                backgroundColor: "white",
                color: "black",
                "&:hover": {
                  color: "white",
                  borderColor: "white",
                },
              }}
            >
              Add Service
            </Button>
          </div>
        )}

        {/* Render the second service input if section is added */}
        {serviceSectionAdded && (
          <ServiceInput
            index={1}
            onRemove={handleServiceRemove}
          />
        )}
      </div>
      <div className="form-time">
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
                      {WeekDate.map((day) => (
                        <TableCell
                          key={day}
                          sx={{
                            textAlign: "center",
                            backgroundColor: "#5088C9",
                            color: "white",
                            fontSize: "1rem",
                          }}
                        >
                          <h1>{day.day}</h1>
                          {selectedWeek && (
                            <h2>{selectedWeek[day.day.toLowerCase()]}</h2>
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
            </div>
          </div>
          <button type="submit" className="form-button">
            Submit
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default BookingForm;
