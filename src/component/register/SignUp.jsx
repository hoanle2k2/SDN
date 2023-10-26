import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Link, useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './SignUp.css'
import axios from 'axios';


// function Copyright(props) {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props}>
//       {'Copyright © '}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp() {
    const navigate = useNavigate();
    const accesstoken = (localStorage.getItem("accessToken"));
    const [loginError, setLoginError] = useState('');


    useEffect(() => {
        if (accesstoken) {
            navigate('/')
        }
    }, [accesstoken, navigate])

    const handleSubmit = async (event) => {
        event.preventDefault();

        const form = new FormData(event.currentTarget);

        const userData = {
            usename: form.get('usename'),
            email: form.get('email'),
            password: form.get('password'),
        };

        try {
            const response = await axios.post('http://localhost:5000/accounts/register', userData);

            if (response.status === 201) {
                console.log('Registration successful');
                navigate('/login');
            } else {
                setLoginError('Đăng nhập thất bại. Vui lòng kiểm tra email và mật khẩu.');
            }
        } catch (error) {
            console.error('Error:', error);
            if (error.response) {
                const errors = error.response.data.errors;
                console.log(errors);
                setLoginError('Đăng nhập thất bại. Vui lòng kiểm tra email và mật khẩu.');
            }
        }
    };



    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container container2  component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://lawnet.vn/uploads/image/2020/06/02/021956527.jpg)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Đăng Kí
                        </Typography>
                        {loginError && (
                            <div className="error-message">
                                <p>{loginError}</p>
                            </div>
                        )}
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid container container2 spacing={2}>
                                <Grid item xs={12}>
                                    <TextField

                                        fullWidth
                                        id="usename"
                                        label="Họ và Tên"
                                        name="usename"
                                        autoComplete="usename"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email"
                                        name="email"
                                        autoComplete="email"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="Mật khẩu"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Đăng Kí
                            </Button>
                            <Grid container container2 justifyContent="space-between">
                                <Grid item>
                                    <Link to="/" variant="body2">
                                        Trở về Home
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link to="/login" variant="body2">
                                        Bạn đã có tài khoản? Đăng nhập
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}
