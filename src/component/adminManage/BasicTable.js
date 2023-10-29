import React from 'react';
import { Button, Select, TableCell, TableRow, TableBody, TableHead, Table, TableContainer, Paper, MenuItem } from '@mui/material';

export default function BasicTable({ rows }) {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Username</TableCell>
                        <TableCell align="right">Role</TableCell>
                        <TableCell align="right">ChangeRole</TableCell>
                        <TableCell align="right">Option</TableCell>
                        <TableCell align="right">Lock/Unlock</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.username}>
                            <TableCell component="th" scope="row">
                                {row.username}
                            </TableCell>
                            <TableCell align="right">{row.role}</TableCell>
                            <TableCell align="right">
                                <Select value={row.changeRole} sx={{
                                    border: '1px solid #ccc', fontSize: '12px',
                                    height: '3rem',
                                }}>
                                    <MenuItem value="contentManager">Content Manager</MenuItem>
                                    <MenuItem value="user">User</MenuItem>
                                </Select>
                            </TableCell>
                            {row.role === 'contentManager' && (
                                <TableCell align="right">
                                    <Select value={row.selectedOption} sx={{
                                        border: '1px solid #ccc',
                                        fontSize: '12px',
                                        height: '3rem',
                                    }}>
                                        <MenuItem value="sdn">SDN</MenuItem>
                                        <MenuItem value="public">Public</MenuItem>
                                    </Select>
                                </TableCell>
                            )}
                            {row.role !== 'contentManager' && (
                                <TableCell align="right">
                                    <span>No Option</span>
                                </TableCell>
                            )}
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
