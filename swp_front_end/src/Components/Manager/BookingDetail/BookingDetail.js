import React, { useEffect, useState } from "react";
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
import { useParams } from "react-router-dom/dist";
import { WeeklyCalendar } from "react-week-picker";
import moment from "moment";
import { toast } from "react-toastify";

const Slot = ({
  date,
  slot,
  status,
  description,
  selected,
  onClick,
  setSelectedSlotId,
  slotData,
}) => {
  const handleChangeMultiple = (event) => {
    console.log(event.value);
    setSelectedSlotId(event.value);
  };

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
        {/* {slotData && <div className="slot-id">ID: {slotData.id}</div>} */}
      </div>

      {/* Hidden input field to hold selected slot */}
    </TableCell>
  );
};

const DateURL = "https://localhost:7028/api/Slot/GetAllSlot";
const SlotURL = `https://localhost:7028/api/Booking/getListBookingByCustomerId`



const BookingDetail = ({ match }) => {
  const { bookingId } = useParams();
  const [selectedSlots, setSelectedSlots] = useState({});
  const [selectedWeek, setSelectedWeek] = useState(Week[0]);
  const [headerTitle, setHeaderTitle] = useState('Booking Update Management');
  const [selectedService1, setSelectedService1] = useState("");
  const [selectedService2, setSelectedService2] = useState("");
  const [selectedSlotId, setSelectedSlotId] = useState(null);
  const [slotsData, setSlotsData] = useState([]);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    async function fetchSlotsData() {
      try {
        const response = await fetch(DateURL);
        if (response.ok) {
          const data = await response.json();
          setSlotsData(data);
          // console.log(data)
        } else {
          toast.error("Failed to fetch slot data");
        }
      } catch (error) {
        toast.error("An error occurred:", error);
      }
    }

    fetchSlotsData();
  }, [])
  

  const handleSlotClick = (day, time, status, slotData) => {
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
      setSelectedSlotId(slotData.id);
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

  const handleJumpToCurrentWeek = (currenDate) => {
    // console.log(`current date: ${currenDate}`);
  };

  const handleWeekPick = (startDate, endDate) => {
    setSelectedWeek({ startOfWeek: startDate, endOfWeek: endDate });
  };

  const calculateSlotDates = () => {
    const startDate = moment(selectedWeek.startOfWeek).startOf("isoWeek"); // Start from Monday
    const endDate = moment(selectedWeek.startOfWeek)
      .startOf("isoWeek")
      .add(4, "days"); // End on Friday
    const slotDates = [];
    let currentDate = startDate.clone();

    while (currentDate.isSameOrBefore(endDate)) {
      slotDates.push(currentDate.format("ddd DD/MM"));
      // console.log(slotDates)
      currentDate.add(1, "days");
    }

    return slotDates;
  };

  const handleSlotSelect = (day, slot) => {
    setSelectedSlots((prevSelectedSlots) => {
      const newSelectedSlots = { ...prevSelectedSlots };
      newSelectedSlots[day] = slot;
      return newSelectedSlots;
    });
  };

  

  return (
    <div className="update-container" style={{background:`url(${Background})`, paddingBottom:"5rem"}}>
        <Sidebar/>
        <Header title={headerTitle} />
        <form style={{marginLeft:"20rem", paddingTop:"15rem"}} onSubmit={handleSubmit}>
        {/* <InputLabel
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
      </Select> */}
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
              <WeeklyCalendar
                onWeekPick={handleWeekPick}
                jumpToCurrentWeekRequired={true}
                onJumpToCurrentWeek={handleJumpToCurrentWeek}
              />
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
                      {calculateSlotDates().map((date) => (
                        <TableCell
                          key={date}
                          sx={{
                            textAlign: "center",
                            backgroundColor: "#5088C9",
                            color: "white",
                            fontSize: "1rem",
                          }}
                        >
                          {date}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Array.from({ length: 4 }).map((_, slotIndex) => (
                      <TableRow key={slotIndex}>
                        {calculateSlotDates().map((date) => {
                          const isSelected =
                            selectedSlots[date] === slotIndex + 1;
                          const slotData = slotsData.find(
                            (slot) =>
                              moment(slot.date).format("ddd DD/MM") === date &&
                              slot.slotNo === slotIndex + 1
                          );
                          const status = slotData
                            ? slotData.slotStatus
                            : "Closed"; // Default to "Closed" if no data is found
                          const timeDescription =
                            DateSlot[slotIndex].description; // Use time description from DateSlot
                          return (
                            <Slot
                              key={`${date}-${slotIndex}`}
                              date={date}
                              slot={slotIndex + 1}
                              description={timeDescription}
                              status={status}
                              selected={isSelected}
                              onClick={() => {
                                handleSlotClick(
                                  date,
                                  slotIndex + 1,
                                  status,
                                  slotData
                                );
                              }}
                              onSlotSelect={handleSlotSelect}
                              setSelectedSlotId={setSelectedSlotId}
                              slotData={slotData} // Pass the slot data here
                            />
                          );
                        })}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
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
