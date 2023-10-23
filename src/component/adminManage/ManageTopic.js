import { Box, Button, Container, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import TopicTable from "./TopicTable";

const ManageTopic = () => {
    const rows = [{topicname : 'Công Nghệ' , status : true} , 
    {topicname : 'Kinh Tế' , status : true}];
    return (
        <Container sx={{
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
            marginTop: 10,
            marginLeft: 35
        }}>
            <Box>
                <Typography variant="h4">Topics</Typography>
                <Typography variant="h6" sx={{ color: '#918282' }}>Home/Topics</Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                <Box sx={{
                     justifyContent: 'space-around'
                    , borderRadius: 7, height: '100px', width: '240px', flexDirection: 'column'
                    , display: 'flex', paddingLeft: 4, paddingTop: 2, paddingRight: 2 ,
                    marginTop : "6px"
                }}><InputLabel id="select-label">Filter</InputLabel>
                    <Select
                        labelId="select-label"
                        id="select"
                        sx={{height : '38px' , marginBottom : '3px'}}
                    >
                        <MenuItem value="Item 1">Item 1</MenuItem>
                        <MenuItem value="Item 2">Item 2</MenuItem>
                        <MenuItem value="Item 3">Item 3</MenuItem>
                        <MenuItem value="Item 4">Item 4</MenuItem>
                    </Select></Box>
                <Box sx={{
                    justifyContent: 'space-between'
                    , borderRadius: 7, height: '100px', width: '240px'
                    , flexDirection: 'column',
                    flex: 1.5
                    , display: 'flex', paddingLeft: 4, paddingTop: 2, paddingRight: 2
                }}>
                    <Typography variant="h5" sx={{ textAlign: 'center' }}>Manage Topics</Typography>
                    <TextField placeholder="Enter topic" size="small"></TextField>
                </Box>
                <Box sx={{
                     justifyContent: 'space-between'
                    , borderRadius: 7, height: '100px', width: '240px',
                    flexDirection : 'column-reverse',
                    padding : '10px'
                    , display: 'flex', paddingLeft: 4, paddingTop: 2, paddingRight: 2,
                    marginTop : "6px"
                }}>
                    <Button sx={{
                        borderRadius: 7, backgroundColor: '#FF9685',
                        padding: 2, width: '106px', marginTop: 3, 
                        height: '41px', color: 'white', 
                    }}>Search</Button>
                </Box>
            </Box>
            <Box sx={{marginTop : '50px'}}>
                <TopicTable rows={rows} />
            </Box>
        </Container>
    );
}

export default ManageTopic;
