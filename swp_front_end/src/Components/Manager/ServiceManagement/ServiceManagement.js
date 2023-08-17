import React, { useState } from 'react';
import './ServiceManagement.scss';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import Background from '../../asset/images/BackBackground.png';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Service } from './ServiceMap';
import { Add } from '@mui/icons-material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const ServiceManagement = () => {
  const [headerTitle, setHeaderTitle] = useState('Service Management');
  const [open, setOpen] = React.useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const handleClickOpenForUpdate = (service) => {
    setOpen(true);
    setIsUpdate(true);
    setSelectedService(service); // Set the selected service when updating
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

  return (
    <div className="service-container" style={{background:`url(${Background})`, paddingBottom:"5rem"}}>
      <Sidebar/>
      <Header title={headerTitle} />

      <div style={{paddingTop:"15rem"}}>
      <div style={{width: "10rem", marginLeft:"80rem", marginBottom:"4rem"}}>
      <button className="service-button-add" onClick={handleClickOpenForAdd}>
  <Add/> Add Service
</button>
      </div>
        <TableContainer component={Paper} sx={{width:"70%", marginLeft:"20rem", boxShadow:"rgba(0, 0, 0, 0.2) 0px 20px 30px"}}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead sx={{backgroundColor:"#0C3F7E"}}>
              <TableRow>
                <TableCell sx={{fontWeight:"bold", color:"white"}}>ID</TableCell>
                <TableCell align="center" sx={{fontWeight:"bold", color:"white"}}>Service</TableCell>
                <TableCell align="center" sx={{fontWeight:"bold", color:"white"}}>Available</TableCell>
                <TableCell/>
              </TableRow>
            </TableHead>
            <TableBody>
              {Service.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="center">{row.service}</TableCell>
                  <TableCell align="center" sx={{fontWeight:"bolder"}}>
                    <span style={{ color: row.available === 'true' ? 'green' : 'red' }}>
                      {row.available}
                    </span>
                  </TableCell>
                  <TableCell>
                  <button className="service-button-update" onClick={() => handleClickOpenForUpdate(row)}>
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
          sx={{fontFamily:"Arial, Helvetica, sans-serif"}}
        >
          <DialogTitle>{isUpdate ? 'Update Service' : 'Add Service'}</DialogTitle>
          <DialogContent>
          <DialogContentText/>
          <form style={{display:"flex", flexDirection:"column"}}>
          <label htmlFor="header" style={{color:"#0C3F7E", fontSize:"1.4rem", fontWeight:"bold", margin:".5rem 0"}}>Header </label>
          <input type="text" name="header" style={{height:"3rem"}}></input>
          <label htmlFor="intro" style={{color:"#0C3F7E", fontSize:"1.4rem", fontWeight:"bold", margin:".5rem 0"}}>Intro </label>
          <textarea name='intro'/>
          <label htmlFor="content" style={{color:"#0C3F7E", fontSize:"1.4rem", fontWeight:"bold", margin:".5rem 0"}}>Content </label>
          <textarea name='content'/>
          <label htmlFor="outro" style={{color:"#0C3F7E", fontSize:"1.4rem", fontWeight:"bold", margin:".5rem 0"}}>Outro </label>
          <textarea name='outro'/>
          {isUpdate && selectedService && (
                <div>
                  <label htmlFor="available" style={{color:"#0C3F7E", fontSize:"1.4rem", fontWeight:"bold", margin:".5rem 0"}}>Available </label>
                  <input type="checkbox" name="available" defaultChecked={selectedService.available} style={{marginRight:" 70rem"}} />
                </div>
              )}
            </form>
          <DialogActions>
            <button
              type='submit'
              style={{
                backgroundColor:"#0C3F7E",
                borderRadius:"2rem",
                color:"#ffffff",
                border:"0",
                cursor:"pointer",
                fontWeight:"bold",
                fontSize: "1rem",
                padding:".9rem 1rem",
                width:"20%",
                margin:"2rem auto",
              }}
            >
              {isUpdate ? 'Update Service' : 'Add Service'}
            </button>
            </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
    </div>
  )
}

export default ServiceManagement;