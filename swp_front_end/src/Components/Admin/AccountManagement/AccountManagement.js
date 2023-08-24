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
const UpdateURL =
  "https://localhost:7028/api/Account/AdminUpdateAccountByAccountId";
const AddURL = "https://localhost:7028/api/Account/RegisterDoctorManager";

const AccountManagement = () => {
  const [headerTitle, setHeaderTitle] = useState("Account Management");
  const [open, setOpen] = React.useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [gender, setGender] = useState('');
  const [selectedRoleId, setSelectedRoleId] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    fullName: "",
    roleId: "",
    accountStatus: true,
  });
  const [status, setStatus] = useState('')

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
    setStatus(account.accountStatus)
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
    setSelectedRoleId("");
    setFormData({
      username: "",
      password: "",
      fullName: "",
      roleId: "",
      accountStatus: false,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const accountData = {};

    for (let [key, value] of formData.entries()) {{
        accountData[key] = value;
      }
    }

    if (isUpdate && selectedAccount) {
      try {
        const AccountUpdate ={
          accountId: selectedAccount.id,
          fullName: accountData.fullName,
          accountStatus: status,
          workingStatus:"string",
          phoneNum: accountData.phoneNum,
          gender: "string",
        }
        console.log(AccountUpdate);
        // Send PUT request to update existing account
          const statusResponse = await fetch(`${UpdateURL}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(AccountUpdate),
          });
          handleClose(); // Close the dialog after successful update
          toast.success("Account updated successfully");
          fetchAccounts()
      } catch (error) {
        toast.error("Error updating account: " + error.message);
      }
    } else {
      try {

        const AddAccount = {
          accountId: 0,
          userId: 0,
          fullName: accountData.fullName,
          username: accountData.username,
          password: accountData.password,
          roleId: accountData.roleId,
          accountStatus: 'isActive',
          workingStatus: "string",
          phoneNum: accountData.phoneNum,
          gender: gender
        }

        console.log(AddAccount)
        // Send POST request to add new account
        const response = await axios.post(AddURL, AddAccount);
        if (response.status === 200) {
          
          toast.success("Account added successfully");
          handleClose();
          fetchAccounts();
        } else {
          toast.error("Error adding account.");
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
                  Username
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontWeight: "bold", color: "white" }}
                >
                  Full Name
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
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="center">{row.username}</TableCell>
                  <TableCell align="center">{row.user.userName}</TableCell>
                  <TableCell align="center">
                    {
                      Role.find((role) => {
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
              {!isUpdate ? (
                <div style={{ display: "flex", flexDirection: "column" }}>
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
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    style={{
                      height: "3rem",
                      marginBottom: "2rem",
                      width: "15rem",
                    }}
                  />
                  <label
                    htmlFor="password"
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
                    name="password"
                    style={{
                      height: "3rem",
                      marginBottom: "2rem",
                      width: "15rem",
                    }}
                  />
                </div>
              ) : (
                <div></div>
              )}
              <label
                htmlFor="fullName"
                style={{
                  color: "#0C3F7E",
                  fontSize: "1.4rem",
                  fontWeight: "bold",
                  margin: ".5rem 0",
                  width: "10rem",
                }}
              >
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                style={{
                  height: "3rem",
                  marginBottom: "2rem",
                  width: "15rem",
                }}
                defaultValue={selectedAccount?.user.userName}
              />


                  <label
                    htmlFor="phoneNum"
                    style={{
                      color: "#0C3F7E",
                      fontSize: "1.4rem",
                      fontWeight: "bold",
                      margin: ".5rem 0",
                      width: "10rem",
                    }}
                  >
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phoneNum"
                    style={{
                      height: "3rem",
                      marginBottom: "2rem",
                      width: "15rem",
                    }}
                    defaultValue={selectedAccount?.user.phoneNum}
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
                Gender
              </InputLabel>
              <Select
                labelId="role-label"
                id="role"
                name="gender"
                onChange={(event) => setGender(event.target.value)}
                sx={{
                  height: "2rem",
                  width: "15rem",
                  backgroundColor: "white",
                  marginBottom: "2rem",
                }}
              >
                <MenuItem value={"Male"}>Male</MenuItem>
                <MenuItem value={"Female"}>Female</MenuItem>
              </Select>
              {!isUpdate && (
                <div>
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
                </div>
              )}


              {isUpdate && (
                <div>
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
                Status
              </InputLabel>
              <Select
                labelId="role-label"
                id="role"
                name="accountStatus"
                value={status}
                onChange={(event) => setStatus(event.target.value)}
                sx={{
                  height: "2rem",
                  width: "15rem",
                  backgroundColor: "white",
                  marginBottom: "2rem",
                }}
              >
                <MenuItem value={"isActive"}>isActive</MenuItem>
                <MenuItem value={"notActive"}>notActive</MenuItem>
              </Select>
                </div>
              )}
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
