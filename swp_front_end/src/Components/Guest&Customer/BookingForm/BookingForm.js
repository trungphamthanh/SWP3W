import React, { useEffect, useState } from "react";
import "./BookingForm.scss";
import Header from "../Header/Header";
import Banner from "../Banner/Banner";
import Footer from "../Footer/Footer";
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
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { WeekDate, DateSlot, ServiceMap, Week } from "./SlotMap";
import { WeeklyCalendar } from "react-week-picker";
import "react-week-picker/src/lib/calendar.css";
import moment from "moment";
import "moment/locale/en-gb";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom/dist";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";

const URL = "https://localhost:7028/api/Booking/createBooking/customer";
const DateURL = "https://localhost:7028/api/Slot/GetAllSlot";
const ServiceURL = "https://localhost:7028/api/DASServices/GetAllServices";

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

const ServiceInput = ({
  index,
  onRemove,
  servicesData,
  setSelectedServiceIds,
  selectedServiceIds,
  service,
}) => {
  const handleChangeMultiple = (value, serviceId) => {
    let serviceListCLone = _.cloneDeep(selectedServiceIds)
    let indexArray = selectedServiceIds.findIndex((service) => service.id === serviceId) 
    
    if(indexArray>-1){
      serviceListCLone[indexArray].serviceId=value
      setSelectedServiceIds(serviceListCLone);
    }

  };

  console.log(service)

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
        Service {service.labelNo}
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
        onChange={(e) => handleChangeMultiple(e.target.value, service.id)}
        value={service.serviceId}
      >
        {servicesData?.map((service) => (
          <MenuItem key={service.id} value={service.id}>
            {service.serviceName}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};

const initSelectedService = [
  {
    id: uuidv4(),
    serviceId: null,
    labelNo:1,
  },
];

const BookingForm = () => {
  const [selectedSlots, setSelectedSlots] = useState({});
  const [serviceSectionAdded, setServiceSectionAdded] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState(Week[0]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [slotsData, setSlotsData] = useState([]);
  const [servicesData, setServicesData] = useState([]);
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [name, setName] = useState("");
  const [selectedServiceIds, setSelectedServiceIds] =
    useState(initSelectedService);
  const [selectedSlotId, setSelectedSlotId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchServicesData() {
      try {
        const response = await fetch(ServiceURL);
        if (response.ok) {
          const data = await response.json();
          setServicesData(data);
          toast.success("Services data fetched successfully!"); // Show success toast
        } else {
          console.error(
            "Failed to fetch services data:",
            response.status,
            response.statusText
          );
          toast.error("Failed to fetch services data"); // Show error toast
        }
      } catch (error) {
        console.error("An error occurred:", error);
        toast.error("An error occurred while fetching services data"); // Show error toast
      }
    }

    async function fetchSlotsData() {
      try {
        const response = await fetch(DateURL);
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

    // Fetch both services data and slot data
    fetchServicesData();
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

  const handleCloseDialog = () => {
    setIsDialogOpen(false); // Close the dialog
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Get the user data from localStorage
    const userId = localStorage.getItem("userId");
    // Check if user data exists and has the necessary information
    if (userId) {
      const accountId = userId;
      const bookingData = {
        bookingId: 0,
        customerName: name,
        phoneNum: phone,
        gender: gender,
        bookingStatus: "Ongoing",
        accountId: accountId,
        slotId: selectedSlotId,
        listservicesBookDTO: selectedServiceIds.map((service) => ({
          serviceId: service.serviceId,
        })),
      };

      console.log(bookingData);
      try {
        // Make a POST request to your API endpoint

        const response = await fetch(`${URL}/${accountId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingData),
        });

        if (response.ok) {
          toast.success("Form successfully submitted");
          navigate("/history");
        } else {
          toast.error("Failed to submit the form");
        }
      } catch (error) {
        toast.error("An error occurred:", error);
      }
    } else {
      // Handle the case where user data is not available
      toast.error("User data not available or incomplete.");
    }
  };

  const handleServiceButtonAdd = () => {
    // if (!serviceSectionAdded) {
    //   setServiceSectionAdded(true);
    // }
    if(selectedServiceIds.length>1){
      return 
    }

    const labelNo = selectedServiceIds.length+1

    let service = {
      id:uuidv4(),
      serviceId: null,
      labelNo:labelNo
    }

    setSelectedServiceIds([...selectedServiceIds, service])
  };

  const handleServiceRemove = () => {
    let serviceListCLone = _.cloneDeep(selectedServiceIds)
      serviceListCLone.pop()
    setSelectedServiceIds(serviceListCLone)
  };

  const handleJumpToCurrentWeek = (currenDate) => {
    // console.log(`current date: ${currenDate}`);
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
    <div className="booking-container">
      <Header />
      <Banner />
      <h1 className="booking-header">Booking Form</h1>
      <div className="booking-main">
        <form className="booking-form" onSubmit={handleSubmit}>
          <div className="form-content">
            <div className="form-personal">
              <label htmlFor="phone">Phone: </label>
              <input
                type="text"
                name="phone"
                onChange={(e) => setPhone(e.target.value)}
              ></input>
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
                  onChange={(e) => setGender(e.target.value)}
                >
                  <MenuItem value={10}>Male</MenuItem>
                  <MenuItem value={20}>Female</MenuItem>
                </Select>
                <label htmlFor="name">Name: </label>
                <input
                  type="text"
                  name="name"
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </div>
            </div>
            <div className="form-service">
              {selectedServiceIds &&
                selectedServiceIds.length > 0 &&
                selectedServiceIds.map((service) => (
                  <ServiceInput
                    index={1}
                    key={service.id}
                    service={service}
                    servicesData={servicesData}
                    setSelectedServiceIds={setSelectedServiceIds}
                    selectedServiceIds={selectedServiceIds}
                  />
                ))}

              {/* Render the "Add Service" button only if section is not added */}
              {selectedServiceIds.length == 1 ? (
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
              ) : (
                <Button
                variant="outlined"
                onClick={() => handleServiceRemove( )}
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

              {/* Render the second service input if section is added */}
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
