import React, { useEffect, useState } from "react";
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
import { Role } from "./AccountMap"; // Import the Account data
import { Add } from "@mui/icons-material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { toast } from "react-toastify";

const URL = "https://localhost:7028/api/Account/GetAllUser";
const UpdateURL = "https://localhost:7028/api/Account/UpdateProfile";

const AccountManagement = () => {
  const [headerTitle, setHeaderTitle] = useState("Account Management");
  const [open, setOpen] = React.useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [selectedRoleId, setSelectedRoleId] = useState(null);

  useEffect(() => {
    fetchAccounts();
  }, []);

  useEffect(() => {
    setSelectedRoleId(selectedAccount?.roleId);
  }, [selectedAccount]);

  const fetchAccounts = async () => {
    try {
      const response = await axios.get(URL);
      if (response.status === 200) {
        setAccounts(response.data);
      } else {
        toast.error("Failed to fetch accounts.");
      }
    } catch (error) {
      toast.error("Error fetching accounts:", error);
    }
  };

  const handleOpenForUpdate = (account) => {
    setOpen(true);
    setIsUpdate(true);
    setSelectedAccount(account);
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const accountData = {};

    for (let [key, value] of formData.entries()) {
      if (key === "accountStatus") {
        accountData[key] = value === "on" ? "isActive" : "notActive"; // Convert checkbox value to "isActive" or "notActive"
      } else {
        accountData[key] = value;
      }
    }

    if (isUpdate && selectedAccount) {
      try {
        console.log(accountData);
        // Send PUT request to update existing account
        if (
          accountData.username &&
          accountData.roleId &&
          accountData.accountStatus !== undefined
        ) {
          await axios.put(`${UpdateURL}/${selectedAccount.id}`, {
            ...selectedAccount, // Keep existing properties
            username: accountData.username,
            roleId: accountData.roleId,
            accountStatus: accountData.accountStatus,
          });
          handleClose(); // Close the dialog after successful update
          toast.success("Account updated successfully");
        } else {
          toast.error("Error updating account: Missing required fields");
        }
      } catch (error) {
        toast.error("Error updating account: " + error.message);
      }
    } else {
      try {
        // Send POST request to add new account
        if (
          accountData.username &&
          accountData.roleId &&
          accountData.accountStatus !== undefined
        ) {
          await axios.post(URL, accountData);
          handleClose(); // Close the dialog after successful addition
          toast.success("Account added successfully");
        } else {
          toast.error("Error adding account: Missing required fields");
        }
      } catch (error) {
        toast.error("Error adding account: " + error.message);
      }
    }
  };

  const handleChange = (event) => {
    setSelectedRoleId(event.target.value); // Update the selected roleId when the value changes
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
              {accounts.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {console.log(row)}
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="center">{row.username}</TableCell>
                  <TableCell align="center">
                    {
                      Role.find((role) => {
                        console.log(row.roleId, role.id);
                        return role.id == row.roleId;
                      })?.role
                    }
                  </TableCell>
                  <TableCell align="center">{row.accountStatus}</TableCell>
                  <TableCell>
                    <button
                      className="account-button-update"
                      onClick={() => handleOpenForUpdate(row)}
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
            <form
              style={{ display: "flex", flexDirection: "column" }}
              onSubmit={handleSubmit}
            >
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
                name="username"
                style={{
                  height: "3rem",
                  marginBottom: "2rem",
                  width: "15rem",
                }}
                defaultValue={selectedAccount ? selectedAccount.username : ""}
              />

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
                name="roleId"
                value={selectedRoleId ? selectedRoleId : ""}
                onChange={handleChange}
                sx={{
                  height: "2rem",
                  width: "15rem",
                  backgroundColor: "white",
                  marginBottom: "2rem",
                }}
              >
                {Role.map((role, index) => (
                  <MenuItem key={index} value={role.id}>
                    {role.role}
                  </MenuItem>
                ))}
              </Select>

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
                name="accountStatus"
                defaultChecked={
                  selectedAccount
                    ? selectedAccount.accountStatus === "isActive"
                    : false
                }
                style={{ marginRight: "10rem" }}
              />
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
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AccountManagement;
