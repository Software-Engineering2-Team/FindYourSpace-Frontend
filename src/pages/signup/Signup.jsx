import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginStore from '../../api/LoginStore';
import Navbar from '../../components/navbar/Navbar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        findaspace.com
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.


const defaultTheme = createTheme({
  palette: {
      primary: {
          main: '#000000', // Set primary color to black
      },
  },
  typography: {
      fontFamily: 'Dubai Medium',
       // Replace with your desired font
  },
});

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginError,setLoginError] = useState('');

  const navigate = useNavigate();

  const validateEmail = () => {
    // TODO: consider if want to use email or username to login

    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // if (!emailRegex.test(email)) {
    //   setEmailError('Invalid email address');
    //   return false;
    // }
    // setEmailError('');
    return true;
  };

  const validatePassword = () => {
    if (password.length < 3) {
      setPasswordError('Password must be at least 3 characters');
      return false;
    }
    setPasswordError('');
    return true;
  };


  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    validateEmail(value);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    validatePassword(value);
  };

  const isValid = () => validateEmail() && validatePassword();

  const fetchData = () =>{
    // TODO: change to email or username and update .login() method

    LoginStore.getState()
      .login(email, password)
      .then(() =>
        {
          navigate('/spaces');
        }
      )
      .catch((error) => 
        {
          console.error('Invalid email or password');
          setLoginError("Incorrect Username or Password Entered!")
        })
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isValid()) {
      return;
    }
    console.log('An email was submitted: ', email);
    console.log('A password was submitted: ', password);
    fetchData();
  };

  return (
    <div data-testid="signupPage-1">
      <ThemeProvider theme={defaultTheme}>
      <Navbar />
      <Grid
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop:'40px'
        
        }}
      >
          <Box
            sx={{
              padding: {xs: "24px", md: "32px"},
              margin: {xs: "16px", md: "32px"},
              boxShadow: "0px 0px 16px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
              backgroundColor: "#fff",
              width:"50%"

            }}
        >
          <Typography
            component="h1"
            variant="h5"
            sx={{
              fontSize: '30px',
              textAlign:"center"
            }}
          >
            Let's Create an account at Find your space!
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
              margin="normal"
              required
              fullWidth
              id="firstname"
              label="First Name"
              name="firstname"
              autoComplete="First Name"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="lastname"
              label="Last Name"
              name="lastname"
              autoComplete="Last Name"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              onChange={handleEmailChange}
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={handlePasswordChange}
              autoComplete="current-password"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Confirm Password"
              type="password"
              id="password"
              onChange={handlePasswordChange}
              autoComplete="current-password"
            />
            {loginError && (
                <p style={{ color: 'red', textAlign: 'center' }}>{loginError}</p>
              )}
                <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create Account
            </Button>
            <Grid container>
              <Grid item xs>
              </Grid>
              <Grid item>
              <Link
                  to="/"
                  variant="body2"
                  onClick={() => navigate('/')}
                  >
                  {"Already have an account?"}
              </Link>
              </Grid>
            </Grid>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>  
      </Grid>
      </ThemeProvider>
    </div>
  );
}

export default Signup;