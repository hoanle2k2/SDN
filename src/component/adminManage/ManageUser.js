import { Box, Button, Container, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import BasicTable from "./BasicTable";
import { useEffect, useState } from "react";
import axios from 'axios';

const ManageUser = () => {
    const [users, setUsers] = useState([]);
    const [searchUsername, setSearchUsername] = useState('');
    const [selectedItem, setSelectedItem] = useState('');
    const token = localStorage.getItem("accessToken");

    useEffect(() => {
        if (!searchUsername) {
            fetchData();
        }
    }, [searchUsername]);

    const fetchData = () => {
        axios.get("/accounts", {
            headers: {
                Authorization: `token ${token}`,
            },
        })
            .then((response) => {
                setUsers(response.data.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    };

    const handleSearch = () => {
        axios.get(`/accounts/search/${searchUsername}`, {
            headers: {
                Authorization: `token ${token}`,
            },
        })
            .then((response) => {
                setUsers(response.data.users);
                // console.log(response.data.users);
            })
            .catch((error) => {
                console.error("Error searching users:", error);
            });
    };

    const handleItemChange = (event) => {
        const selectedRole = event.target.value;
        setSelectedItem(selectedRole);

        axios.get(`/accounts/filter/${selectedRole}`, {
            headers: {
                Authorization: `token ${token}`,
            },
        })
            .then((response) => {
                setUsers(response.data.users);
                // console.log(response.data.users);
            })
            .catch((error) => {
                console.error("Error filtering users by role:", error);
            });
    };


    return (
        <Container sx={{
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
            marginTop: 10,
            marginLeft: 35
        }}>
            <Box>
                <Typography variant="h4" onClick={fetchData}>Users</Typography>
                <Typography variant="h6" sx={{ color: '#918282' }}>Home/Users</Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                <Box sx={{
                    justifyContent: 'space-around'
                    , borderRadius: 7, height: '100px', width: '240px', flexDirection: 'column'
                    , display: 'flex', paddingLeft: 4, paddingTop: 2, paddingRight: 2,
                    marginTop: "6px"
                }}>
                    <InputLabel id="select-label">Filter</InputLabel>
                    <Select
                        labelId="select-label"
                        id="select"
                        value={selectedItem}
                        onChange={handleItemChange}
                        sx={{ height: '38px', marginBottom: '3px' }}
                    >
                        <MenuItem value="CONTENT_MANAGER">CONTENT_MANAGER</MenuItem>
                        <MenuItem value="USER">USER</MenuItem>
                    </Select>
                </Box>
                <Box sx={{
                    justifyContent: 'space-between',
                    borderRadius: 7,
                    height: '100px',
                    width: '240px',
                    flexDirection: 'column',
                    flex: 1.5,
                    display: 'flex',
                    paddingLeft: 4,
                    paddingTop: 2,
                    paddingRight: 2
                }}>
                    <Typography variant="h5" sx={{ textAlign: 'center' }}>Manage Users</Typography>
                    <TextField
                        placeholder="Enter username"
                        size="small"
                        value={searchUsername}
                        onChange={(e) => setSearchUsername(e.target.value)}
                    />
                </Box>
                <Box sx={{
                    justifyContent: 'space-between'
                    , borderRadius: 7, height: '100px', width: '240px',
                    flexDirection: 'column-reverse',
                    padding: '10px'
                    , display: 'flex', paddingLeft: 4, paddingTop: 2, paddingRight: 2,
                    marginTop: "6px"
                }}>
                    <Button sx={{
                        borderRadius: 7, backgroundColor: '#FF9685',
                        padding: 2, width: '106px', marginTop: 3,
                        height: '41px', color: 'white',
                    }} onClick={handleSearch}
                    >Search</Button>
                </Box>
            </Box>
            <Box sx={{ marginTop: '50px' }}>
                <BasicTable rows={users} fetchData={fetchData} />
            </Box>
        </Container>
    );
}

export default ManageUser;
