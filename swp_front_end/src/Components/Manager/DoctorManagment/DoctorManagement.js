import React, { useState, useEffect } from "react";
import "./DoctorManagement.scss";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import Background from "../../asset/images/BackBackground.png";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputLabel,
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
import { toast } from "react-toastify";
import { TextField, Button } from "@mui/material";

const URL = "https://localhost:7028/api/Account/GetAllDoctor";
const AddSlotURL = "https://localhost:7028/api/Slot/AddDoctorToSlot";
const WorkdateURL = "https://localhost:7028/api/Slot/GetAllSlotByDoctorId?id";
const StatusURL ="https://localhost:7028/api/Account/UpdateDoctorWorkingStatusById";

const DoctorManagement = () => {
  const [headerTitle, setHeaderTitle] = useState("Doctor Management");
  const [open, setOpen] = React.useState(false);
  const [openStatus, setOpenStatus] = React.useState(false);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState(
    doctors ? doctors.workingStatus : ""
  );

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await fetch(URL);
      if (response.ok) {
        const data = await response.json();
        setDoctors(data);
      } else {
        toast.error("Failed to fetch doctors.");
      }
    } catch (error) {
      toast.error("Error fetching doctors:", error);
    }
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleOpen = async (doctor) => {
    try {
      const workdayResponse = await fetch(`${WorkdateURL}=${doctor.id}`);

      if (workdayResponse.ok) {
        const workdayData = await workdayResponse.json();

        // Find the doctor with the same id as the workday's accountId
        const matchingDoctor = doctors.find(
          (d) => d.id === workdayData[0].accountId
        );

        if (matchingDoctor) {
          matchingDoctor.dayInWeek = workdayData[0].dayInWeek;
          setSelectedDoctor(matchingDoctor);
        } else {
          toast.error("No matching doctor found.");
        }
      } else {
        toast.error("Failed to fetch work day.");
      }
    } catch (error) {}
    setOpen(true);
    setSelectedDoctor(doctor);
  };

  const handleStatusDialogOpen = (doctor) => {
    setSelectedDoctor(doctor);
    setSelectedStatus(doctor.workingStatus);
    setOpenStatus(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseStatus = () => {
    setOpenStatus(false);
  };

  const handleSlotSubmit = async (event) => {
    event.preventDefault();
    
    const slotData = {
      month: selectedMonth,
      dayInWeek: selectedDoctor.dayInWeek,
      accountId: selectedDoctor.id,
      roleId: selectedDoctor.roleId,
      doctorName: selectedDoctor.user.userName
    };

    console.log(slotData);
    try {
      const response = await fetch(AddSlotURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(slotData),
      });

      // console.log("response",response.body);
      if (response.ok) {
        toast.success("Doctor Schedule Updated")
        fetchDoctors(); // Update the doctors list
        handleClose();
      } else {
        toast.error("Failed to add slot.");
      }
    } catch (error) {
      toast.error("Error adding slot:", error);
      console.log(error)
    }
  };

  const handleStatusSubmit = async (event) => {
    event.preventDefault();
    
    const statusData = {
      doctorId: selectedDoctor.id,
      accountStatus: "string",
      workingStatus: selectedStatus,
    };

    try {
      const statusResponse = await fetch(`${StatusURL}/${selectedDoctor.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(statusData),
      });

      if (statusResponse.ok) {
        handleCloseStatus()
        fetchDoctors()
      }
    } catch (statusError) {
      toast.error("Error updating working status:", statusError);
    }
  };


  return (
    <div
      className="doctor-container"
      style={{ background: `url(${Background})`, paddingBottom: "5rem" }}
    >
      <Sidebar />
      <Header title={headerTitle} />
      <div style={{ paddingTop: "15rem", paddingBottom: "7rem" }}>
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
                  Doctor
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontWeight: "bold", color: "white" }}
                >
                  PhoneNo
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontWeight: "bold", color: "white" }}
                >
                  Status
                </TableCell>
                <TableCell/>
                <TableCell/>
              </TableRow>
            </TableHead>
            <TableBody>
              {doctors.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="center">{row.user.userName}</TableCell>
                  <TableCell align="center">{row.user.phoneNum}</TableCell>
                  <TableCell align="center">
                    <span
                      style={{
                        color:
                          row.workingStatus === "working" ? "green" : "red",
                        fontWeight: "bolder",
                      }}
                    >
                      {row.workingStatus === "working" ? "Working" : "Absent"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <button
                      className="service-button-update"
                      onClick={() => handleOpen(row)}
                    >
                      Update Slot
                    </button>
                  </TableCell>
                  <TableCell>
              <button
                className="service-button-update"
                onClick={() => handleStatusDialogOpen(row)} // Use the new function for status dialog
              >
                Update Status
              </button>
            </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth={true}
          maxWidth="xs"
          sx={{
            fontFamily: "Arial, Helvetica, sans-serif",
            overflow: "hidden",
          }}
        >
          <DialogTitle>Update Slot</DialogTitle>
          <DialogContent>
            <DialogContentText />
            {selectedDoctor !== null && (
              <form
                style={{ display: "flex", flexDirection: "column" }}
                onSubmit={handleSlotSubmit}
              >
                <label
                  htmlFor="name"
                  style={{
                    color: "#0C3F7E",
                    fontSize: "1.4rem",
                    fontWeight: "bold",
                    margin: ".5rem 0",
                  }}
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  style={{ height: "3rem", width: "15rem" }}
                  value={selectedDoctor.user.userName}
                  readOnly
                />

                <InputLabel
                  id="workDay"
                  sx={{
                    color: "#0C3F7E",
                    fontSize: "1.4rem",
                    fontWeight: "bold",
                    marginTop: "2rem",
                  }}
                >
                  Work Day
                </InputLabel>
                <Select
                  labelId="workDay"
                  id="workDay"
                  name="workDay"
                  label="Work Day"
                  sx={{
                    height: "2rem",
                    width: "15rem",
                    backgroundColor: "white",
                    marginBottom: "2rem", // Adjusted margin
                  }}
                  value={selectedDoctor.dayInWeek ?? ""} // Display "dayInWeek" of the selected doctor's account or an empty string if it's null
                  onChange={(event) =>
                    setSelectedDoctor((prevDoctor) => ({
                      ...prevDoctor,
                      dayInWeek: event.target.value,
                    }))
                  }
                >
                  {/* Display "No working date" if dayInWeek is null */}
                  <MenuItem value="">No working date</MenuItem>
                  <MenuItem value="Mon">Mon</MenuItem>
                  <MenuItem value="Tue">Tue</MenuItem>
                  <MenuItem value="Wed">Wed</MenuItem>
                  <MenuItem value="Thu">Thu</MenuItem>
                  <MenuItem value="Fri">Fri</MenuItem>
                </Select>

                <InputLabel
                  id="workMonth"
                  sx={{
                    color: "#0C3F7E",
                    fontSize: "1.4rem",
                    fontWeight: "bold",
                    marginTop: "2rem",
                  }}
                >
                  Work Month
                </InputLabel>
                <Select
                  labelId="workMonth"
                  id="workMonth"
                  name="workMonth"
                  label="Work Month"
                  sx={{
                    height: "2rem",
                    width: "15rem",
                    backgroundColor: "white",
                    marginBottom: "2rem",
                  }}
                  value={selectedMonth}
                  onChange={handleMonthChange}
                >
                  {Array.from({ length: 12 }, (_, index) => index + 1).map(
                    (month) => (
                      <MenuItem key={month} value={month}>
                        {month}
                      </MenuItem>
                    )
                  )}
                </Select>
                <DialogActions>
                  <button
                    type="submit"
                    style={{
                      backgroundColor: "#0C3F7E",
                      borderRadius: "2rem",
                      color: "#ffffff",
                      border: "0",
                      cursor: "pointer",
                      fontWeight: "bold",
                      fontSize: "1rem",
                      padding: ".9rem 1rem",
                      width: "50%",
                      margin: "2rem auto",
                    }}
                  >
                    Update
                  </button>
                </DialogActions>
              </form>
            )}
          </DialogContent>
        </Dialog>
        <Dialog
          open={openStatus}
          onClose={handleCloseStatus}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth={true}
          maxWidth="xs"
          sx={{
            fontFamily: "Arial, Helvetica, sans-serif",
            overflow: "hidden",
          }}
        >
          <DialogTitle>Update Status</DialogTitle>
          <DialogContent>
            <DialogContentText />
            {selectedDoctor !== null && (
              <form
                style={{ display: "flex", flexDirection: "column" }}
                onSubmit={handleStatusSubmit}
              >
                {/* Form fields related to slot data... */}
              </form>
            )}

            {selectedDoctor !== null && (
              <form
                style={{ display: "flex", flexDirection: "column" }}
                onSubmit={handleStatusSubmit} // Use handleStatusSubmit here
              >
                <InputLabel
                  id="status"
                  sx={{
                    color: "#0C3F7E",
                    fontSize: "1.4rem",
                    fontWeight: "bold",
                    marginTop: "2rem",
                  }}
                >
                  Status
                </InputLabel>
                <Select
                  labelId="status"
                  id="status"
                  name="status"
                  label="Status"
                  sx={{
                    height: "2rem",
                    width: "15rem",
                    backgroundColor: "white",
                    marginBottom: "4rem",
                  }}
                  value={selectedStatus} // Use selectedStatus here
                  onChange={(event) => setSelectedStatus(event.target.value)}
                >
                  <MenuItem value="working">Working</MenuItem>
                  <MenuItem value="absent">Absent</MenuItem>
                </Select>
                <DialogActions>
                  <button
                    type="submit"
                    style={{
                      backgroundColor: "#0C3F7E",
                      borderRadius: "2rem",
                      color: "#ffffff",
                      border: "0",
                      cursor: "pointer",
                      fontWeight: "bold",
                      fontSize: "1rem",
                      padding: ".9rem 1rem",
                      width: "50%",
                      margin: "2rem auto",
                    }}
                  >
                    Update
                  </button>
                </DialogActions>
              </form>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default DoctorManagement;
