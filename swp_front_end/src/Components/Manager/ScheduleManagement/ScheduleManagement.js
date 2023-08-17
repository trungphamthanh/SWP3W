import React, { useState } from 'react'
import './ScheduleManagement.scss'
import Sidebar from '../Sidebar/Sidebar';
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
import { WeekDate, DateSlot, Week, ServiceMap} from "./SlotMap";
import Header from '../Header/Header';
import { Delete } from '@mui/icons-material';
import Background from '../../asset/images/BackBackground.png'

const drawerWidth = 240;

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


const ScheduleManagement = () => {
  const [selectedSlots, setSelectedSlots] = useState({});
  const [selectedWeek, setSelectedWeek] = useState(Week[0]);
  const [headerTitle, setHeaderTitle] = useState('Schedule Management');
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const handleSlotClick = (day, time, status) => {
    if (status === "Open") {
      setSelectedSlots((prevSelectedSlots) => {
        const newSelectedSlots = { ...prevSelectedSlots };
  
        // Clear all previously selected slots
  
        // Set the clicked slot as selected
        newSelectedSlots[day] = time;
  
        return newSelectedSlots;
      });
    }
  };

  const handleSubmit = () => {
    // Send selectedSlots to the backend
    console.log(selectedSlots);
  };

  const handleDoctorSelect = (event) => {
    setSelectedDoctor(event.target.value);
  };

  const isDoctorSelected = selectedDoctor !== null; // Check if a doctor is selected

  return (
    <div className={`schedule-container ${isDoctorSelected ? "auto-height" : "full-height"}`} style={{ background: `url(${Background})`, paddingBottom: "5rem" }}>
      <Sidebar />
      <Header title={headerTitle} />
            <form className='schedule-form'>
            <div style={{display:"flex", justifyContent:"space-between"}}>
              <div>
                <InputLabel
                    id="doctor"
                    sx={{
                      color: "#0C3F7E",
                      fontSize: "2rem",
                      fontWeight: "bold",
                      marginLeft: "4rem",
                    }}
                  >
                    Select Doctor
                </InputLabel>
                <Select
                      labelId="doctor"
                      id="doctor"
                      label="doctor"
                      sx={{
                        height: "2rem",
                        width: "15rem",
                        backgroundColor: "white",
                        marginLeft: "4rem",
                        marginBottom: "4rem"
                      }}
                      value={selectedDoctor}
                      onChange={handleDoctorSelect}
                    >
                      <MenuItem value={10}>Male</MenuItem>
                      <MenuItem value={20}>Female</MenuItem>
                </Select>
              </div>
              <div style={{width: "10rem"}}>
                  <button type="submit" className="form-button-delete">
                    <Delete/> Delete Schedule
                  </button>
                </div>
            </div>
            {isDoctorSelected && ( // Only render the table if a doctor is selected
          <TableContainer
            component={Paper}
            sx={{
              width: "80%",
              backgroundColor: "#5088C9",
              margin: "0 auto",
              boxShadow:'#000000ae 0px 20px 30px',
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
          )}
              <div style={{textAlign:"center"}}>
                <button type="submit" className="form-button">
                  Save
                </button>
              </div>
              </form>
    </div>
  )
}

export default ScheduleManagement