import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './SignIn.css'
import { Link, useNavigate } from 'react-router-dom';
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

export default function SignInSide() {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState(null);
  const accesstoken = (localStorage.getItem("accessToken"));
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (accesstoken) {
      navigate('/')
    }
  }, [accesstoken, navigate])

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    

    const userData = {
      email: form.get('email'),
      password: form.get('password'),
    };

    try {
      const response = await axios.post('http://localhost:5000/accounts/login', userData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        const data = response.data;
        const token = data.data.token;
        const role = data.data.Role;
        const name = data.data.usename;

        localStorage.setItem('accessToken', token);
        localStorage.setItem('Role', role);
        localStorage.setItem('name', name);

        setUserRole(role);

        navigate('/');
      } else {
        setErrors('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error:', error);
      if (error.response) {
        const errors = error.response.data.errors;
        console.log(errors);
        // Render errors
        setErrors(errors);
      }
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        {userRole && (
          <Typography variant="body2">
            Your role: {userRole}
          </Typography>
        )}
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
              Đăng Nhập
            </Typography>
            {errors.length > 0 && (
              <div className="error-message">
                {errors.map((errorObj, index) => (
                  <div key={index} className="error-item">
                    <p>{errorObj.msg}</p>
                  </div>
                ))}
              </div>
            )}
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Mật khẩu"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                className='remember-me-checkbox'
                control={<Checkbox value="remember" color="primary" />}
                label="Nhớ mật khẩu"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Đăng Nhập
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link to="/forgot" variant="body2" className='forgot'>
                    Quên mật khẩu?
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/register" variant="body2">
                    Bạn chưa có tài khoản? Đăng ký
                  </Link>
                </Grid>
              </Grid>
              {/* <Copyright sx={{ mt: 5 }} /> */}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
