import { useEffect, useState } from "react";
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, TextField, Typography } from "@mui/material";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";


export default function TopicTable({ rows }) {

    const token = localStorage.getItem("accessToken");
    const [topic, setTopic] = useState([]);

    const fetchTopicIDs = async () => {
        try {
            const response = await axios.get('http://localhost:5000/topic', {
                headers: {
                    authorization: `token ${token}`,
                },
            });
            //   console.log("Fetching topic",response.data.data);
            setTopic(response.data.data);
        } catch (error) {
            console.error('Error fetching TopicIDs:', error);
        }
    };
    console.log('topic:', topic);

    useEffect(() => {
        fetchTopicIDs();
    }, []);


    const handleCreateTopic = async () => {
        try {
          // Lấy giá trị từ trường nhập liệu
          const inputTopic = document.getElementById('topic-input').value;
      
          // Gọi API để tạo chủ đề mới
          const response = await axios.post('http://localhost:5000/topic/create', {
            TopicName: inputTopic,
          }, {
            headers: {
              authorization: `token ${token}`,
            },
          });
          toast.success("Create Successfully!");
      
          // Thêm chủ đề mới vào danh sách hiện tại
          const newTopic = response.data;
          setTopic([...topic, newTopic]);
      
          // Xóa giá trị trong trường nhập liệu
          document.getElementById('topic-input').value = '';
          fetchTopicIDs();
        } catch (error) {
          console.error('Error creating topic:', error);
        }
      };


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
                        {topic.map((topicItem) => (
                            <TableRow
                                key={topicItem.TopicName}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {topicItem.TopicName}
                                </TableCell>
                                <TableCell align="right">
                                    <Button
                                        sx={topicItem.status ? {
                                            marginRight: '1rem',
                                            backgroundColor: '#FF9685',
                                            color: 'white',
                                            height: '28px',
                                            width: '86px',
                                            borderRadius: 8,
                                            textAlign: 'center',
                                            paddingTop: '3px',
                                        } : { fontSize: '14px', color: 'black', textAlign: 'center' }}>Delete</Button>
                                    <Button sx={!topicItem.status ? {
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
                    // justifyContent: 'space-between'
                    // , borderRadius: 7, height: '100%', width: '100%'
                    // , flexDirection: 'column',
                    // flexGrow: 1.5
                    // , display: 'flex', paddingLeft: 4, paddingTop: 2, paddingRight: 2
                }}>
                    <Typography variant="h5" sx={{ textAlign: 'center' }}>Add Topics</Typography>
                    <TextField placeholder="Enter topic"  id="topic-input"size="small"></TextField>
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
                    }} onClick={handleCreateTopic}>Add</Button>
                </Box>
            </div>
        </div>
    );
}
