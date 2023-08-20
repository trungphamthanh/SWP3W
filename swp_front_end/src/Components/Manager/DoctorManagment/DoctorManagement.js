import React, { useState, useEffect } from 'react';
import './DoctorManagement.scss';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import Background from '../../asset/images/BackBackground.png';
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
} from '@mui/material';
import { toast } from 'react-toastify';

const URL = 'https://localhost:7028/api/Account/GetAllDoctor';

const DoctorManagement = () => {
  const [headerTitle, setHeaderTitle] = useState('Doctor Management');
  const [open, setOpen] = React.useState(false);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

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
        toast.error('Failed to fetch doctors.');
      }
    } catch (error) {
      toast.error('Error fetching doctors:', error);
    }
  };

  const handleOpen = (doctor) => {
    setSelectedDoctor(doctor);
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
    <div className='doctor-container' style={{ background: `url(${Background})`, paddingBottom: '5rem' }}>
      <Sidebar />
      <Header title={headerTitle} />
      <div style={{ paddingTop: '15rem', paddingBottom: '7rem' }}>
        <TableContainer
          component={Paper}
          sx={{
            width: '70%',
            marginLeft: '20rem',
            boxShadow: 'rgba(0, 0, 0, 0.2) 0px 20px 30px',
          }}
        >
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead sx={{ backgroundColor: '#0C3F7E' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>ID</TableCell>
                <TableCell align='center' sx={{ fontWeight: 'bold', color: 'white' }}>
                  Doctor
                </TableCell>
                <TableCell align='center' sx={{ fontWeight: 'bold', color: 'white' }}>
                  Work Day
                </TableCell>
                <TableCell align='center' sx={{ fontWeight: 'bold', color: 'white' }}>
                  Status
                </TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {doctors.map((row) => (
                <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component='th' scope='row'>
                    {row.id}
                  </TableCell>
                  <TableCell align='center'>{row.username}</TableCell>
                  <TableCell align='center'>
                    {row.workingStatus === 'working' ? 'Working' : 'Not Working'}
                  </TableCell>
                  <TableCell align='center'>
                    <span
                      style={{
                        color: row.accountStatus === 'isActive' ? 'green' : 'red',
                        fontWeight: 'bolder',
                      }}
                    >
                      {row.accountStatus === 'isActive' ? 'Active' : 'Inactive'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <button className='service-button-update' onClick={() => handleOpen(row)}>
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
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
          fullWidth={true}
          maxWidth='xs'
          sx={{
            fontFamily: 'Arial, Helvetica, sans-serif',
            overflow: 'hidden',
          }}
        >
          <DialogTitle>Update Doctor</DialogTitle>
          <DialogContent>
            <DialogContentText />
            {selectedDoctor !== null && (
              <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={handleSubmit}>
                <label
                  htmlFor='name'
                  style={{
                    color: '#0C3F7E',
                    fontSize: '1.4rem',
                    fontWeight: 'bold',
                    margin: '.5rem 0',
                  }}
                >
                  Name
                </label>
                <input
                  type='text'
                  name='name'
                  style={{ height: '3rem', width: '15rem' }}
                  value={selectedDoctor.username}
                  readOnly
                />

                <InputLabel
                  id='workDay'
                  sx={{
                    color: '#0C3F7E',
                    fontSize: '1.4rem',
                    fontWeight: 'bold',
                    marginTop: '2rem',
                  }}
                >
                  Work Day
                </InputLabel>
                <Select
                  labelId='workDay'
                  id='workDay'
                  name='workDay'
                  label='Work Day'
                  sx={{
                    height: '2rem',
                    width: '15rem',
                    backgroundColor: 'white',
                    marginBottom: '4rem',
                  }}
                  value={selectedDoctor.workingStatus} // Set the value based on selectedDoctor's workingStatus
                >
                  <MenuItem value='working'>Working</MenuItem>
                  <MenuItem value='notWorking'>Not Working</MenuItem>
                </Select>

                <InputLabel
                  id='status'
                  sx={{
                    color: '#0C3F7E',
                    fontSize: '1.4rem',
                    fontWeight: 'bold',
                    marginTop: '2rem',
                  }}
                >
                  Status
                </InputLabel>
                <Select
                  labelId='status'
                  id='status'
                  name='status'
                  label='Status'
                  sx={{
                    height: '2rem',
                    width: '15rem',
                    backgroundColor: 'white',
                    marginBottom: '4rem',
                  }}
                  value={selectedDoctor.accountStatus} // Set the value based on selectedDoctor's accountStatus
                >
                  <MenuItem value='isActive'>Active</MenuItem>
                  <MenuItem value='isInactive'>Inactive</MenuItem>
                </Select>
                <DialogActions>
                  <button
                    type='submit'
                    style={{
                      backgroundColor: '#0C3F7E',
                      borderRadius: '2rem',
                      color: '#ffffff',
                      border: '0',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                      fontSize: '1rem',
                      padding: '.9rem 1rem',
                      width: '50%',
                      margin: '2rem auto',
                    }}
                  >
                    Update Service
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
