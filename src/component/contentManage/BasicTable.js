import React from 'react';
import { Button, TableCell, TableRow, TableBody, TableHead, Table, TableContainer, Paper } from '@mui/material';
import { Link } from 'react-router-dom';

export default function BasicTable({ rows }) {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Blog</TableCell>
                        <TableCell align="right">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row._id}>
                            <TableCell component="th" scope="row">
                                {row.Title}
                            </TableCell>

                            <TableCell align="right">
                                <Link to={`/blogDetail/${row._id}`}>
                                    <Button
                                        sx={{
                                            height: '35px',
                                            width: '100px',
                                            borderRadius: 8,
                                            textAlign: 'center',
                                            paddingTop: '3px',
                                            border: '1px solid #ccc',
                                            backgroundColor: '#007bff',
                                            color: '#fff',
                                            fontSize: '11px',
                                            '&:hover': {
                                                backgroundColor: '#0056b3',
                                            },
                                        }}
                                    >
                                        View Detail
                                    </Button>
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
