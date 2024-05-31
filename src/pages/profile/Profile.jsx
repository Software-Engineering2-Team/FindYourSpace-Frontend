import React, { useState, useEffect } from 'react';
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
import ProfileStore from '../../api/ProfileStore';

const defaultTheme = createTheme({
  palette: {
    primary: { main: '#000000' },
  },
  typography: {
    fontFamily: 'Dubai Medium',
  },
});

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    contactInfo: '',
  });
  const [loginError, setLoginError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const username = LoginStore.getState().userData.username;
        await ProfileStore.getState().fetchUserProfile(username);
        const fetchedData = ProfileStore.getState().userData;
        setUserData(fetchedData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await ProfileStore.getState().updateUserProfile(userData);
      console.log('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      setLoginError('Failed to update profile');
    }
  };

  const handlePasswordChangeSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div data-testid="profilePage-1">
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <Navbar />
        <Grid container sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop:'40px'
          }}>
          <Box sx={{ padding: '32px', boxShadow: '0px 0px 16px rgba(0, 0, 0, 0.1)', borderRadius: '8px', backgroundColor: '#fff', width: '40%', textAlign: 'center' }}>
            <Typography component="h1" variant="h5" sx={{ fontSize: '30px', textAlign: 'center' }}>
              Profile Details
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField margin="normal" required fullWidth id="firstname" label="First Name" name="first_name" value={userData.first_name} onChange={handleInputChange} InputLabelProps={{ shrink: true }} />
              <TextField margin="normal" required fullWidth id="lastname" label="Last Name" name="last_name" value={userData.last_name} onChange={handleInputChange} InputLabelProps={{ shrink: true }} />
              <TextField margin="normal" required fullWidth id="email" label="Email Address" name="email" value={userData.email} onChange={handleInputChange} InputLabelProps={{ shrink: true }} />
              <TextField margin="normal" required fullWidth id="contactinfo" label="Contact Info" name="contactInfo" value={userData.contactInfo} onChange={handleInputChange} InputLabelProps={{ shrink: true }} />
              {loginError && <p style={{ color: 'red', textAlign: 'center' }}>{loginError}</p>}
              <Button type="submit" variant="contained" sx={{ color: '#fff', backgroundColor: '#000', marginY: 2 }}>
                Save Changes
              </Button>
            </Box>
          </Box>

          <Box sx={{ padding: '32px', boxShadow: '0px 0px 16px rgba(0, 0, 0, 0.1)', borderRadius: '8px', backgroundColor: '#fff', width: '40%', textAlign: 'center', marginTop: '20px' }}>
            <Typography component="h2" variant="h5" sx={{ fontSize: '24px', textAlign: 'center' }}>
              Reset or Change Password
            </Typography>
            <Box component="form" noValidate onSubmit={handlePasswordChangeSubmit} sx={{ mt: 1 }}>
              <TextField margin="normal" required fullWidth name="password" label="New Password" type="password" id="password" autoComplete="current-password" onChange={handleInputChange} />
              <TextField margin="normal" required fullWidth name="confirm_password" label="Confirm Password" type="password" id="confirm_password" autoComplete="current-password" onChange={handleInputChange} />
              <Button type="submit" variant="contained" sx={{ color: '#fff', backgroundColor: '#000', marginY: 2 }}>
                Reset Password
              </Button>
            </Box>
          </Box>
          <Button variant="outlined" color="error" style={{ marginTop: 50, marginBottom: 50 }}>
            Delete Account
          </Button>
        </Grid>
      </ThemeProvider>
    </div>
  );
};

export default Profile;
