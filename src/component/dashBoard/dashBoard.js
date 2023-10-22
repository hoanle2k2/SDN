import { Box, Button, Container, Typography } from "@mui/material";
import UsersLogo from '../../users.svg';
import TopicsLogo from '../../topics.svg';
import { useState } from "react";
import ColumnChart from "./columnGraph";

const DashBoard = () => {
    const [isMonthly, setIsMonthly] = useState(false);
    const monthData = [
        { name: 'Tháng 1', visitors: 10, color: '#FFE7E5' },
        { name: 'Tháng 2', visitors: 15, color: '#FFE7E5' },
        { name: 'Tháng 3', visitors: 5, color: '#FFE7E5' },
        { name: 'Tháng 4', visitors: 20, color: '#FFE7E5' },
        { name: 'Tháng 5', visitors: 12, color: '#FFE7E5' },
        { name: 'Tháng 6', visitors: 18, color: '#FFE7E5' },
        { name: 'Tháng 7', visitors: 12, color: '#FFE7E5' },
        { name: 'Tháng 8', visitors: 18, color: '#FFE7E5' },
        { name: 'Tháng 9', visitors: 11, color: '#FFE7E5' },
        { name: 'Tháng 10', visitors: 1, color: '#FFE7E5' },
        { name: 'Tháng 11', visitors: 1, color: '#FFE7E5' },
        { name: 'Tháng 12', visitors: 17, color: '#FF887A' },
    ];
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const yearData = [];
    for (let i = currentYear - 9; i <= currentYear; i++) {
        yearData.push({ name: `${i}`, visitors: Math.floor(Math.random() * 100), color: '#FFE7E5' });
    }
    yearData[yearData.length - 1].color = '#FF887A'; // Highlight
    return (
        <Container sx={{
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
            marginTop: 10,
            marginLeft: 35
        }}>
            <Box>
                <Typography variant="h4">Dashboard</Typography>
                <Typography variant="h6" sx={{ color: '#918282' }}>Home/Dashboard</Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                <Box sx={{
                    backgroundColor: '#FFF0EF', justifyContent: 'space-between'
                    , borderRadius: 7, height: '155px', width: '305px'
                    , display: 'flex', paddingLeft: 4, paddingTop: 2, paddingRight: 2
                }}>
                    <Box>
                        <Typography variant="h6" sx={{ fontSize: 20 }}>Topics</Typography>
                        <Typography sx={{ color: '#FF3939', fontSize: 24 }}>3</Typography>
                    </Box>
                    <Box sx={{ paddingTop: 3 }}>
                        <img src={UsersLogo} alt="Users Logo" style={{ width: '100px', height: '70px' }} />
                    </Box>
                </Box>
                <Box sx={{
                    backgroundColor: '#FFF0EF', justifyContent: 'space-between'
                    , borderRadius: 7, height: '155px', width: '305px'
                    , display: 'flex', paddingLeft: 4, paddingTop: 2, paddingRight: 2
                }}>
                    <Box>
                        <Typography variant="h6" sx={{ fontSize: 20 }}>Users</Typography>
                        <Typography sx={{ color: '#FF3939', fontSize: 24 }}>10</Typography>
                    </Box>
                    <Box sx={{ paddingTop: 3 }}>
                        <img src={TopicsLogo} alt="Topics Logo" style={{ width: '100px', height: '70px' }} />
                    </Box>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '70px' }}>
                <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '679px' }}>
                        <Typography variant="h5">Visitor Growth</Typography>
                        <Box sx={{
                            backgroundColor: '#FFF0EF'
                            , borderRadius: 8, height: '59px', width: '251px'
                            , padding: '12px',
                            display: 'flex'
                        }}>
                            <Button
                                sx={isMonthly ? {
                                    backgroundColor: '#FF9685', color: 'white',
                                    height: '32px', width: '126px', borderRadius: 8
                                    , textAlign: 'center', paddingTop: '3px'
                                } : { fontSize: '14px', color: 'black', textAlign: 'center' }} onClick={() => setIsMonthly(true)}>Monthly</Button>
                            <Button sx={!isMonthly ? {
                                marginLeft: '5px',
                                backgroundColor: '#FF9685', color: 'white',
                                height: '32px', width: '126px', borderRadius: 8
                                , textAlign: 'center', paddingTop: '3px'
                            } : { marginLeft: '5px', color: 'black', textAlign: 'center' }} onClick={() => setIsMonthly(false)}>Yearly</Button>
                        </Box>
                    </Box>
                    <Box sx={{ width: '100%' , marginTop : '50px'}}>
                        {isMonthly ? <ColumnChart elements={monthData} /> : <ColumnChart elements={yearData} />}
                    </Box>
                </Box>
                <Box>
                    <Typography variant="h5" sx={{
                        backgroundColor: '#FFF0EF'
                        , borderRadius: 8, height: '59px', width: '251px'
                        , fontSize : '20px'
                        , padding: 2,
                        textAlign: 'center'
                    }}>Newest Posts</Typography>
                    <Box sx={{
                    marginTop : '50px' , display : 'flex' 
                    , justifyContent : 'space-between' , flexDirection : 'column'
                    }}>
                        <Box>
                            <Typography variant="h5">Post 1</Typography>
                            <Typography variant="h6" sx={{ color: '#918282' }}>1/1/2023</Typography>
                        </Box>
                        <Box>
                            <Typography variant="h5">Post 2</Typography>
                            <Typography variant="h6" sx={{ color: '#918282' }}>2/1/2023</Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>

        </Container>
    )
}

export default DashBoard;