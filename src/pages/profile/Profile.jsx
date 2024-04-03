import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginStore from '../../api/LoginStore';
import Navbar from '../../components/navbar/Navbar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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

const Profile = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [emailError, setEmailError] = useState('');
  // const [passwordError, setPasswordError] = useState('');
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
    // if (password.length < 3) {
    //   setPasswordError('Password must be at least 3 characters');
    //   return false;
    // }
    // setPasswordError('');
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

  const handlePasswordChangeSubmit = (e) => {
    e.preventDefault();

    // Handle password change/reset here
    // Implement your logic for changing/resetting the password
  };

  return (
    <div data-testid="profilePage-1">
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
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
              padding: { xs: "24px", md: "32px" },
              margin: { xs: "10px", md: "10px" }, 
              boxShadow: "0px 0px 16px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
              backgroundColor: "#fff",
              width: "40%",
              textAlign: "center" 
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
              Profile Details
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
                id="contactinfo"
                label="Contact Info"
                name="contactinfo"
                autoComplete="Contact Info"
                autoFocus
              />
            
              {loginError && (
                <p style={{ color: 'red', textAlign: 'center' }}>{loginError}</p>
              )}
            </Box>
            <Button type="submit" variant="contained" sx={{ color: "#fff", backgroundColor: "#000", marginY: 2 }}> {/* Added marginY to create vertical space */}
                  Save Changes
              </Button> 
          </Box>

          {/* Reset or Change Password Section */}
          <Box
            sx={{
              padding: { xs: "24px", md: "32px" },
              margin: { xs: "10px", md: "10px" },
              boxShadow: "0px 0px 16px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
              backgroundColor: "#fff",
              width: "40%",
              textAlign:'center'
              
            }}
          >
            <Typography
              component="h2"
              variant="h5"
              sx={{
                fontSize: "24px",
                textAlign: "center",
              }}
            >
              Reset or Change Password
            </Typography>
            <Box component="form" noValidate onSubmit={handlePasswordChangeSubmit} sx={{ mt: 1 }}>
              {/* Add form fields for resetting or changing password */}
              
              <TextField
                margin="normal"
                required
                fullWidth
                name="  password"
                label="New Password"
                type="password"
                id="password"
                onChange={handlePasswordChange}
                autoComplete="current-password"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name=" password"
                label="Confirm Password"
                type="password"
                id="password"
                onChange={handlePasswordChange}
                autoComplete="current-password"
              />
            </Box>
            <Button type="submit" variant="contained" sx={{ color: "#fff", backgroundColor: "#000", marginY: 2 }}> {/* Added marginY to create vertical space */}
                  Reset Password
              </Button> 
          </Box>
          <Button variant="outlined" color="error">
                  Delete Account
          </Button>
        </Grid>
      </ThemeProvider>
    </div>
  );
}

export default Profile;
