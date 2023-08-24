import React, { useEffect, useState } from "react";
import "./ServiceManagement.scss";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import Background from "../../asset/images/BackBackground.png";
import {
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
import { Service } from "./ServiceMap";
import { Add } from "@mui/icons-material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { toast } from "react-toastify";

const URL = "https://localhost:7028/api/DASServices/GetAllServices";
const UpdateURL = "https://localhost:7028/api/DASServices/UpdateServices";
const AddURL= "https://localhost:7028/api/DASServices/AddServices"
const userId = localStorage.getItem("userId");


const ServiceManagement = () => {
  const [headerTitle, setHeaderTitle] = useState("Service Management");
  const [open, setOpen] = React.useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [services, setServices] = useState([]);
  console.log(selectedService)

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get(URL);
      setServices(response.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  const handleClickOpenForUpdate = (service) => {
    setOpen(true);
    setIsUpdate(true);
  
    // Convert serviceIsActive to number type
    const serviceIsActive = service.serviceIsActive === 1 ? 1 : 0;
  
    setSelectedService({ ...service, serviceIsActive });
  };

  const handleClose = () => {
    setOpen(false);
    setIsUpdate(false);
    setSelectedService(null); // Reset selected service when closing the dialog
  };

  const handleClickOpenForAdd = () => {
    setOpen(true);
    setIsUpdate(false); // Set isUpdate to false for adding a service
    setSelectedService(null); // Reset selected service when opening for adding
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const serviceData = {}

    for (let [key, value] of formData.entries()) {

        serviceData[key] = value;
    }

    console.log(serviceData);


    if (isUpdate && selectedService) {
      try {
        // Send PATCH request to update existing service
        await axios.patch(`${UpdateURL}/${selectedService.id}`, serviceData);
        // Close the dialog and update the service list or other relevant actions
        handleClose();
        // Show a success toast message
        toast.success("Service updated successfully!");
        fetchServices();
      } catch (error) {
        toast.error(`Error updating service: ${error.message}`);
        console.log(error);
      }
    } else {
      try {
      // Send POST request to add new service
      console.log(serviceData)
      await axios.post(AddURL, serviceData); // Use the AddURL here
      // Close the dialog and update the service list or other relevant actions
      handleClose();
      // Show a success toast message
      toast.success("Service added successfully!");
      fetchServices();
      // Fetch updated services
      fetchServices();
    } catch (error) {
      toast.error(`Error adding service: ${error.message}`);
    }
    }
  };

  return (
    <div
      className="service-container"
      style={{ background: `url(${Background})`, paddingBottom: "5rem" }}
    >
      <Sidebar />
      <Header title={headerTitle} />

      <div style={{ paddingTop: "15rem" }}>
        <div
          style={{ width: "10rem", marginLeft: "80rem", marginBottom: "4rem" }}
        >
          <button
            className="service-button-add"
            onClick={handleClickOpenForAdd}
          >
            <Add /> Add Service
          </button>
        </div>
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
                  Service
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontWeight: "bold", color: "white" }}
                >
                  Available
                </TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {services.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="center">{row.serviceName}</TableCell>
                  <TableCell align="center">{row.serviceIsActive === 1 ? "Available" : "Not Available"}</TableCell>
                  <TableCell>
                    <button
                      className="service-button-update"
                      onClick={() => handleClickOpenForUpdate(row)}
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
          maxWidth="lg"
          sx={{ fontFamily: "Arial, Helvetica, sans-serif" }}
        >
          <DialogTitle>
            {isUpdate ? "Update Service" : "Add Service"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText />
            <form
              style={{ display: "flex", flexDirection: "column" }}
              onSubmit={handleSubmit}
            >
              <label
                htmlFor="serviceName"
                style={{
                  color: "#0C3F7E",
                  fontSize: "1.4rem",
                  fontWeight: "bold",
                  margin: ".5rem 0",
                }}
              >
                Service Name
              </label>
              <input
                type="text"
                name="serviceName"
                style={{ height: "3rem", fontSize: "1.5rem" }}
                defaultValue={selectedService?.serviceName || ""}
              />
              <label
                htmlFor="intro"
                style={{
                  color: "#0C3F7E",
                  fontSize: "1.4rem",
                  fontWeight: "bold",
                  margin: ".5rem 0",
                }}
              >
                Intro{" "}
              </label>
              <textarea
                name="intro"
                defaultValue={selectedService?.intro || ""}
              />
              <label
                htmlFor="content"
                style={{
                  color: "#0C3F7E",
                  fontSize: "1.4rem",
                  fontWeight: "bold",
                  margin: ".5rem 0",
                }}
              >
                Content{" "}
              </label>
              <textarea
                name="contents"
                defaultValue={selectedService?.contents || ""}
              />
              <label
                htmlFor="outro"
                style={{
                  color: "#0C3F7E",
                  fontSize: "1.4rem",
                  fontWeight: "bold",
                  margin: ".5rem 0",
                }}
              >
                Outro{" "}
              </label>
              <textarea
                name="outro"
                defaultValue={selectedService?.outro || ""}
              />
              <label
                htmlFor="Low"
                style={{
                  color: "#0C3F7E",
                  fontSize: "1.4rem",
                  fontWeight: "bold",
                  margin: ".5rem 0",
                }}
              >
                Low Price{" "}
              </label>
              <input
              type="text"
                name="lowPrice"
                defaultValue={selectedService?.lowPrice || ""}
                style={{fontSize:"1.2rem", width:"5rem"}}
              />
                            <label
                htmlFor="Advance"
                style={{
                  color: "#0C3F7E",
                  fontSize: "1.4rem",
                  fontWeight: "bold",
                  margin: ".5rem 0",
                }}
              >
                Advance Price{" "}
              </label>
              <input
              type="text"
                name="advancedPrice"
                defaultValue={selectedService?.advancedPrice || ""}
                style={{fontSize:"1.2rem", width:"5rem"}}
              />
              <label
                htmlFor="Top Price"
                style={{
                  color: "#0C3F7E",
                  fontSize: "1.4rem",
                  fontWeight: "bold",
                  margin: ".5rem 0",
                }}
              >
                Top Price{" "}
              </label>
              <input
              type="text"
                name="topPrice"
                defaultValue={selectedService?.topPrice || ""}
                style={{fontSize:"1.2rem", width:"5rem"}}
              />
              <input type="hidden" name="accountId" value={userId} />
              {isUpdate && selectedService && (
                <div style={{marginTop:"2rem"}}>
                  <label
                    htmlFor="serviceIsActive"
                    style={{
                      color: "#0C3F7E",
                      fontSize: "1.4rem",
                      fontWeight: "bold",
                      margin: ".5rem 0",
                    }}
                  >
                    Available
                  </label>
                  <Select
                    name="serviceIsActive"
                    value={selectedService.serviceIsActive}
                    onChange={(event) => {
                      const newValue = event.target.value;
                      setSelectedService((prevService) => ({
                        ...prevService,
                        serviceIsActive: newValue,
                      }));
                    }}
                    sx={{ marginRight: "70rem" }}
                  >
                    <MenuItem value={1}>Available</MenuItem>
                    <MenuItem value={0}>Not Available</MenuItem>
                  </Select>
                  <input
                    type="hidden"
                    name="serviceId"
                    value={selectedService.id}
                  />
                </div>
              )}
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
                  width: "20%",
                  margin: "2rem auto",
                }}
              >
                {isUpdate ? "Update Service" : "Add Service"}
              </button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ServiceManagement;
