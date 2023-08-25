import React, { useEffect, useState } from "react";
import "./ScheduleDoctor.scss";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import {
  InputLabel,
  TableHead,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";
import { WeekDate, DateSlot, ServiceMap, Week } from "./SlotMap";
import { WeeklyCalendar } from "react-week-picker";
import "react-week-picker/src/lib/calendar.css";
import moment from "moment";
import "moment/locale/en-gb";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom/dist";
import _ from "lodash";
import { UseServices } from "../../../Context/UseContext";
import Background from "../../asset/images/BackBackground.png";

const DateURL = "https://localhost:7028/api/Slot/GetAllSlotByDoctorId?id";

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

const ScheduleDoctor = () => {
  const doctorId = localStorage.getItem("userId");
  const [headerTitle, setHeaderTitle] = useState("Work Schedule");
  const [selectedSlots, setSelectedSlots] = useState({});
  const [selectedWeek, setSelectedWeek] = useState(Week[0]);
  const [slotsData, setSlotsData] = useState([]);
  const [selectedSlotId, setSelectedSlotId] = useState(null);
  const navigate = useNavigate();
  const { selectedBookingService } = UseServices();
  const userId = localStorage.getItem("userId");

  async function fetchSlotsData() {
    try {
      const response = await fetch(`${DateURL}=${doctorId}`);
      if (response.ok) {
        const data = await response.json();
        setSlotsData(data);
        // console.log(data)
      } else {
        console.error("Failed to fetch slot data");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  useEffect(() => {
    fetchSlotsData();
  }, []);

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

  const handleSlotSelect = (day, slot) => {
    setSelectedSlots((prevSelectedSlots) => {
      const newSelectedSlots = { ...prevSelectedSlots };
      newSelectedSlots[day] = slot;
      return newSelectedSlots;
    });
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

  const handleWeekPick = (startDate, endDate) => {
    setSelectedWeek({ startOfWeek: startDate, endOfWeek: endDate });
  };

  return (
    <div className="work-container"       style={{
      background: `url(${Background})`,
      paddingBottom: "5rem",
    }}>
      <Sidebar />
      <Header title={headerTitle} />
      <div className="form-schedule">
        <div className="work-form-time">
        <InputLabel
          id="time"
          sx={{
            color: "Black",
            fontSize: "2rem",
            fontWeight: "bold",
          }}
        >
          Week
        </InputLabel>
        <div>
          <WeeklyCalendar
            onWeekPick={handleWeekPick}
            jumpToCurrentWeekRequired={true}
          />
        </div>
        <TableContainer
          component={Paper}
          sx={{
            backgroundColor: "#5088C9",
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
                    const isSelected = selectedSlots[date] === slotIndex + 1;
                    const slotData = slotsData.find(
                      (slot) =>
                        moment(slot.date).format("ddd DD/MM") === date &&
                        slot.slotNo === slotIndex + 1
                    );
                    const status = slotData ? slotData.slotStatus : "Closed"; // Default to "Closed" if no data is found
                    const timeDescription = DateSlot[slotIndex].description; // Use time description from DateSlot
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
      </div>
    </div>
  );
};

export default ScheduleDoctor;
