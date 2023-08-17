import React, { useState } from "react";
import "./AccountManagement.scss";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import Background from "../../asset/images/BackBackground.png";
import {
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
import { Account, Role } from "./AccountMap"; // Import the Account data
import { Add } from "@mui/icons-material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const AccountManagement = () => {
  const [headerTitle, setHeaderTitle] = useState("Account Management");
  const [open, setOpen] = React.useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);

  const handleClickOpenForUpdate = (account) => {
    setOpen(true);
    setIsUpdate(true);
    setSelectedAccount(account); // Set the selected account when updating
  };

  const handleClose = () => {
    setOpen(false);
    setIsUpdate(false);
    setSelectedAccount(null); // Reset selected account when closing the dialog
  };

  const handleClickOpenForAdd = () => {
    setOpen(true);
    setIsUpdate(false);
    setSelectedAccount(null);
  };

  return (
    <div
      className="account-container"
      style={{ background: `url(${Background})`, paddingBottom: "5rem" }}
    >
      <Sidebar />
      <Header title={headerTitle} />

      <div style={{ paddingTop: "15rem" }}>
        <div
          style={{ width: "10rem", marginLeft: "80rem", marginBottom: "4rem" }}
        >
          <button
            className="account-button-add"
            onClick={handleClickOpenForAdd}
          >
            <Add /> Add Account
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
                  Email
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontWeight: "bold", color: "white" }}
                >
                  Role
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
              {Account.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="center">{row.email}</TableCell>
                  <TableCell align="center">{row.role}</TableCell>
                  <TableCell align="center">{row.status}</TableCell>
                  <TableCell>
                    <button
                      className="account-button-update"
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
          fullWidth={true}
          maxWidth="xs"
          sx={{ fontFamily: "Arial, Helvetica, sans-serif" }}
        >
          <DialogTitle>
            {isUpdate ? "Update Account" : "Add Account"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText />
            <form style={{ display: "flex", flexDirection: "column" }}>
              <label
                htmlFor="email"
                style={{
                  color: "#0C3F7E",
                  fontSize: "1.4rem",
                  fontWeight: "bold",
                  margin: ".5rem 0",
                  width: "10rem",
                }}
              >
                Email
              </label>
              <input
                type="text"
                name="email"
                style={{ height: "3rem", marginBottom: "2rem", width: "15rem" }}
              />

              {/* Display Role field only for Add Account form */}
              {!isUpdate && (
                <div style={{display:"grid"}}>
                  <label
                    htmlFor="role"
                    style={{
                      color: "#0C3F7E",
                      fontSize: "1.4rem",
                      fontWeight: "bold",
                      margin: ".5rem 0",
                      width: "10rem",
                    }}
                  >
                    Password
                  </label>
                  <input
                    type="text"
                    name="role"
                    style={{ height: "3rem", width: "10rem" }}
                  />
                </div>
              )}
            <InputLabel
                id="role-label"
                sx={{
                  color: "#0C3F7E",
                  fontSize: "1.4rem",
                  fontWeight: "bold",
                  margin: ".5rem 0",
                  width: "10rem",
                }}
              >
                Role
              </InputLabel>

            <Select
                labelId="role-label"
                id="role"
                name="role"
                sx={{
                  height: "2rem",
                  width: "15rem",
                  backgroundColor: "white",
                  marginBottom: "2rem",
                }}
              >
                {Role.map((role, index) => (
                  <MenuItem key={index} value={role.role}>
                    {role.role}
                  </MenuItem>
                ))}
              </Select>
              {isUpdate && selectedAccount && (
                <div>
                  <label
                    htmlFor="available"
                    style={{
                      color: "#0C3F7E",
                      fontSize: "1.4rem",
                      fontWeight: "bold",
                      margin: ".5rem 0",
                      width: "10rem",
                    }}
                  >
                    Status
                  </label>
                  <input
                    type="checkbox"
                    name="available"
                    defaultChecked={selectedAccount.available}
                    style={{ marginRight: "10rem" }}
                  />
                </div>
              )}
            </form>
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
                {isUpdate ? "Update Account" : "Add Account"}
              </button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AccountManagement;
