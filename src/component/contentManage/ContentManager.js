import React, { useState, useEffect } from 'react';
import { Box, Container, MenuItem, Typography, InputLabel, Select } from "@mui/material";
import BasicTable from "./BasicTable";
import axios from 'axios';

const ContentManager = () => {
    const [rowsPublic, setRowsPublic] = useState([]);
    const [selectedTopic, setSelectedTopic] = useState('');
    const [topics, setTopics] = useState([]);
    const token = localStorage.getItem("accessToken");

    useEffect(() => {
        async function fetchData() {
            try {
                const topicsResponse = await axios.get('/topic', {
                    headers: {
                        Authorization: `token ${token}`,
                    },
                });
                setTopics(topicsResponse.data.data);


            } catch (error) {
                console.error('Lỗi khi gọi API:', error);
            }
        }

        fetchData();
    }, [token]);

    useEffect(() => {
        async function filterContentByTopic() {
            try {
                const apiUrl = selectedTopic
                    ? `/blog/filter/${selectedTopic}`
                    : '/blog/public-requested';

                const filteredContentResponse = await axios.get(apiUrl, {
                    headers: {
                        Authorization: `token ${token}`,
                    },
                });

                setRowsPublic(filteredContentResponse.data);
                // console.log("Mảng rowsPublic đã được cập nhật:", rowsPublic);
            } catch (error) {
                console.error('Lỗi khi gọi API:', error);
            }
        }

        filterContentByTopic();
    }, [selectedTopic, token]);




    const handleTopicChange = (event) => {
        setSelectedTopic(event.target.value);
    };

    return (
        <Container sx={{
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
            marginTop: '5rem'
        }}>
            <Box>
                <Typography variant="h4" sx={{ textAlign: 'center' }}>Content Manager</Typography>
            </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
            }}>
            </Box>
            <Box sx={{
                justifyContent: 'space-around'
                , borderRadius: 7, height: '100px', width: '240px', flexDirection: 'column'
                , display: 'flex', paddingLeft: 4, paddingTop: 2, paddingRight: 2,
                marginTop: "6px"
            }}><InputLabel id="select-label">Filter</InputLabel>
                <Select
                    labelId="select-label"
                    id="select"
                    sx={{ height: '38px', marginBottom: '3px' }}
                    value={selectedTopic}
                    onChange={handleTopicChange}
                >
                    {topics.map((topic) => (
                        <MenuItem key={topic._id} value={topic.TopicName}>
                            {topic.TopicName}
                        </MenuItem>
                    ))}
                </Select>
            </Box>
            <Box sx={{ marginTop: '50px' }}>
                <BasicTable rows={rowsPublic} />
            </Box>
        </Container>
    );
}

export default ContentManager;
