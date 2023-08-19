import React, { useState } from "react";
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
import { Doctor } from "./Doctor";

const DoctorManagement = () => {
  const [headerTitle, setHeaderTitle] = useState("Doctor Management");
  const [open, setOpen] = React.useState(false);
  const [doctorStatus, setDoctorStatus] = useState(() => {
    const initialStatus = {};

    Doctor.forEach((doctor) => {
      initialStatus[doctor.id] = doctor.status;
    });
    return initialStatus;
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Your form submission logic here
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
                  Work Day
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
              {Doctor.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="center">{row.day}</TableCell>
                  <TableCell align="center">
                    <span
                      style={{
                        color: doctorStatus[row.id] ? "red" : "green",
                        fontWeight: "bolder",
                      }}
                    >
                      {doctorStatus[row.id] ? "Absent" : "Working"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <button
                      className="service-button-update"
                      onClick={handleOpen}
                    >
                      Update
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
          fullWidth="true"
          maxWidth="xs"
          sx={{
            fontFamily: "Arial, Helvetica, sans-serif",
            overflow: "hidden",
          }}
        >
          <DialogTitle>Update Service</DialogTitle>
          <DialogContent>
            <DialogContentText />
            <form
              style={{ display: "flex", flexDirection: "column" }}
              onSubmit={handleSubmit}
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
              <input type="text" name="name" style={{ height: "3rem", width:"15rem"}}></input>

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
                  marginBottom: "4rem",
                }}
              >
                <MenuItem value="Monday">Monday</MenuItem>
                <MenuItem value="Tuesday">Tuesday</MenuItem>
                <MenuItem value="Wednesday">Wednesday</MenuItem>
                <MenuItem value="Thursday">Thursday</MenuItem>
                <MenuItem value="Friday">Friday</MenuItem>
              </Select>

              <InputLabel
                id="workDay"
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
                labelId="workDay"
                id="workDay"
                name="workDay"
                label="Work Day"
                sx={{
                  height: "2rem",
                  width: "15rem",
                  backgroundColor: "white",
                  marginBottom: "4rem",
                }}
              >
                <MenuItem value="Working">Working</MenuItem>
                <MenuItem value="Absent">Absent</MenuItem>
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
                  Update Service
                </button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default DoctorManagement;
