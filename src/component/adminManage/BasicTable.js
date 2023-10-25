import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';

export default function BasicTable({ rows }) {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Username</TableCell>
                        <TableCell align="right">Role</TableCell>
                        <TableCell align="right">Action</TableCell>
                        <TableCell align="right">Lock/Unlock</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.username}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.username}
                            </TableCell>
                            <TableCell align="right">{row.role}</TableCell>
                            <TableCell align="right">{row.action}</TableCell>
                            <TableCell align="right">
                                <Button
                                    sx={row.status ? {
                                        backgroundColor: '#FF9685', color: 'white',
                                        height: '28px', width: '86px', borderRadius: 8
                                        , textAlign: 'center', paddingTop: '3px'
                                    } : { fontSize: '14px', color: 'black', textAlign: 'center' }}>Lock</Button>
                                <Button sx={!row.status ? {
                                    marginLeft: '5px',
                                    backgroundColor: '#FF9685', color: 'white',
                                    height: '28px', width: '86px', borderRadius: 8
                                    , textAlign: 'center', paddingTop: '3px'
                                } : { marginLeft: '5px', color: 'black', textAlign: 'center' }}>Unlock</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
