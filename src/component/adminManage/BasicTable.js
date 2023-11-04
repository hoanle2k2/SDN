import React from 'react';
import { Button, Select, TableCell, TableRow, TableBody, TableHead, Table, TableContainer, Paper, MenuItem } from '@mui/material';
import axios from 'axios';

export default function BasicTable({ rows, fetchData }) {
    const token = localStorage.getItem("accessToken");

    const handleRoleChange = (event, accountId) => {
        const newRole = event.target.value;

        axios.post(`/accounts/updateAccountRole/${accountId}`, {
            roleName: newRole,
        }, {
            headers: {
                Authorization: `token ${token}`,
            }
        })
            .then((response) => {
                console.log("Role updated successfully", response);
                fetchData(); 
            })
            .catch((error) => {
                console.error("Error updating role", error);
            });
    };

    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Username</TableCell>
                        <TableCell align="right">Role</TableCell>
                        <TableCell align="right">ChangeRole</TableCell>
                        <TableCell align="right">Lock/Unlock</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row._id}>
                            <TableCell component="th" scope="row">
                                {row.usename}
                            </TableCell>
                            <TableCell align="right">{row.Role}</TableCell>
                            <TableCell align="right">
                                <Select
                                    value={row.Role}
                                    onChange={(event) => handleRoleChange(event, row._id)}
                                    sx={{
                                        border: '1px solid #ccc',
                                        fontSize: '12px',
                                        height: '3rem',
                                    }}
                                >
                                    <MenuItem value="CONTENT_MANAGER">CONTENT_MANAGER</MenuItem>
                                    <MenuItem value="USER">USER</MenuItem>
                                </Select>
                            </TableCell>
                            <TableCell align="right">
                                <Button
                                    sx={{
                                        backgroundColor: row.status ? '#FF9685' : 'transparent',
                                        color: row.status ? 'white' : 'black',
                                        height: '28px',
                                        width: '86px',
                                        borderRadius: 8,
                                        textAlign: 'center',
                                        paddingTop: '3px',
                                        border: '1px solid #ccc',
                                    }}
                                >
                                    Lock
                                </Button>
                                <Button
                                    sx={{
                                        marginLeft: '5px',
                                        backgroundColor: row.status ? 'transparent' : '#FF9685',
                                        color: row.status ? 'black' : 'white',
                                        height: '28px',
                                        width: '86px',
                                        borderRadius: 8,
                                        textAlign: 'center',
                                        paddingTop: '3px',
                                        border: '1px solid #ccc',
                                    }}
                                >
                                    Unlock
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
