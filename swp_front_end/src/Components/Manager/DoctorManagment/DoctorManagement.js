import React, { useState } from 'react';
import './DoctorManagement.scss';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import Background from '../../asset/images/BackBackground.png';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Doctor } from './Doctor';

const DoctorManagement = () => {
    const [headerTitle, setHeaderTitle] = useState('Doctor Management');
    const [doctorStatus, setDoctorStatus] = useState({});

    const handleStatusToggle = (doctorId) => {
        setDoctorStatus((prevDoctorStatus) => {
            return {
                ...prevDoctorStatus,
                [doctorId]: !prevDoctorStatus[doctorId]
            };
        });
    };

    return (
        <div className='doctor-container' style={{ background: `url(${Background})`, paddingBottom: "5rem" }}>
            <Sidebar />
            <Header title={headerTitle} />
            <div style={{ paddingTop: "15rem", paddingBottom: "7rem" }}>
                <TableContainer component={Paper} sx={{ width: "70%", marginLeft: "20rem", boxShadow: "rgba(0, 0, 0, 0.2) 0px 20px 30px" }}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead sx={{ backgroundColor: "#0C3F7E" }}>
                            <TableRow>
                                <TableCell sx={{ fontWeight: "bold", color: "white" }}>ID</TableCell>
                                <TableCell align="center" sx={{ fontWeight: "bold", color: "white" }}>Doctor</TableCell>
                                <TableCell align="center" sx={{ fontWeight: "bold", color: "white" }}>Status</TableCell>
                                <TableCell />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Doctor.map((row) => (
                                <TableRow
                                    key={row.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.id}
                                    </TableCell>
                                    <TableCell align="center">{row.name}</TableCell>
                                    <TableCell align="center">
                                        <span
                                            style={{
                                                color: doctorStatus[row.id] ? 'red' : 'green',
                                                fontWeight: 'bolder'
                                            }}
                                        >
                                            {doctorStatus[row.id] ? 'Absent' : 'Working'}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <button className="service-button-update" onClick={() => handleStatusToggle(row.id)}>
                                            Change Status
                                        </button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
};

export default DoctorManagement;
