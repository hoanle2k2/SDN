import * as React from 'react';
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Link, Outlet } from 'react-router-dom';
import { ListItemButton, ListItemText } from '@mui/material';

const drawerWidth = 240;

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            backgroundColor : '#FF9685'  , 
            borderRadius : 12,
            marginTop : '70px',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            height : '100vh',
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

export default function Navbar() {
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
            <Box sx={{ display: 'flex' }}>
                <Drawer variant="permanent" open={open}> 
                    <Toolbar
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            px: [1],
                        }}
                    >
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon sx={{color : 'white'}}/>
                        </IconButton>
                    </Toolbar>
                    <Divider />
                    <List component="nav">
                        <ListItemButton>
                            <Link to={'/admin/dashboard'} style={{
                                textDecoration: 'none',
                                color: 'grey',
                                width: '100%'
                            }}>
                                <img className='logo_img' style={{height : '70px' , objectFit : 'cover'}} src="https://cdn.logojoy.com/wp-content/uploads/2018/05/30164225/572.png" alt="Logo" />
                            </Link>
                        </ListItemButton>
                        <ListItemButton>
                            <Link to={'/admin/dashboard'} style={{
                                textDecoration: 'none',
                                color: 'grey',
                                width: '100%'
                            }}>
                                <ListItemText primary="Blog SDN Team 3" style={{ display: 'inline-block' }} sx={{color : 'white'}}/>
                            </Link>
                        </ListItemButton>
                        <ListItemButton>
                            <Link to={'/admin/dashboard'} style={{
                                textDecoration: 'none',
                                color: 'grey',
                                width: '100%'
                            }}>
                                <ListItemText primary="DashBoard" style={{ display: 'inline-block' }} sx={{color : '#645858'}} />
                            </Link>
                        </ListItemButton>
                        <ListItemButton>
                            <Link to={'/'} style={{
                                textDecoration: 'none',
                                color: 'grey',
                                width: '100%'
                            }}>
                                <ListItemText primary="Topics" style={{ display: 'inline-block' }} sx={{color : 'white'}}/>
                            </Link>
                        </ListItemButton>
                        <ListItemButton>
                            <Link to={'/admin/users'} style={{
                                textDecoration: 'none',
                                color: 'grey',
                                width: '100%'
                            }}>
                                <ListItemText primary="Users" style={{ display: 'inline-block' }} sx={{color : 'white'}}/>
                            </Link>
                        </ListItemButton>
                    </List>
                </Drawer>
                <Outlet />
            </Box>
    );
}