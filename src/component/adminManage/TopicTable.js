import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, TextField, Typography } from "@mui/material";

export default function TopicTable({ rows }) {

    return (
        <div style={{ display: 'flex' }}>
            {/* Bảng Topic hiện tại */}
            <TableContainer component={Paper} sx={{ width: '50%' }}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>TopicName</TableCell>
                            <TableCell align="right" >Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.topicname}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.topicname}
                                </TableCell>
                                <TableCell align="right">
                                    <Button
                                        sx={row.status ? {
                                            marginRight: '1rem',
                                            backgroundColor: '#FF9685',
                                            color: 'white',
                                            height: '28px',
                                            width: '86px',
                                            borderRadius: 8,
                                            textAlign: 'center',
                                            paddingTop: '3px',
                                        } : { fontSize: '14px', color: 'black', textAlign: 'center' }}>Delete</Button>
                                    <Button sx={!row.status ? {
                                        marginLeft: '5px',
                                        backgroundColor: '#FF9685',
                                        color: 'white',
                                        height: '28px',
                                        width: '86px',
                                        borderRadius: 8,
                                        textAlign: 'center',
                                        paddingTop: '3px',
                                    } : { marginLeft: '5px', color: 'black', textAlign: 'center' }}>Edit</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Mục New Topic sang bên phải */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', marginLeft: '10rem' }}>
                <Box sx={{
                    justifyContent: 'space-between'
                    , borderRadius: 7, height: '100%', width: '100%'
                    , flexDirection: 'column',
                    flexGrow: 1.5
                    , display: 'flex', paddingLeft: 4, paddingTop: 2, paddingRight: 2
                }}>
                    <Typography variant="h5" sx={{ textAlign: 'center' }}>Add Topics</Typography>
                    <TextField placeholder="Enter topic" size="small"></TextField>
                </Box>
                <Box sx={{
                    justifyContent: 'space-between'
                    , borderRadius: 7, height: '100px', width: '240px',
                    flexDirection: 'column-reverse',
                    padding: '10px'
                    , display: 'flex', paddingLeft: 4, paddingTop: 2, paddingRight: 2,
                    marginTop: "3px", 
                }}>
                    <Button sx={{
                        borderRadius: 7, backgroundColor: '#FF9685',
                        padding: 2, width: '106px', marginTop: 1,
                        height: '41px', color: 'white', marginLeft: 5,
                    }}>Search</Button>
                </Box>
            </div>
        </div>
    );
}
