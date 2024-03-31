import { useParams } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import Grid from '@mui/material/Grid';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import OfficeStore from '../../api/OfficeStore';
import React, { useState, useEffect } from 'react';
const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#000000',
    },
  },
  typography: {
    fontFamily: 'Dubai Medium',
  },
});

const ExpandedSpacePage = () => {
    const [space, setSpace] = useState(null);
    const { id } = useParams();
    console.log("The id is ");
    console.log(id);
  
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await OfficeStore.getState().fetchOffice(id);
            const data = await response.json();
            console.log('Fetched office space:', data);
            setSpace(data);
          } catch (error) {
            console.error('Error fetching office space:', error);
          }
        };
      
        console.log('Fetching office space with id:', id);
        fetchData();
    }, [id]);
    console.log(space)
  return (
    <ThemeProvider theme={defaultTheme}>
      <Navbar />
      <CssBaseline />
      <Grid container component="main" sx={{ height: '100vh' }}>
        {/* Display space image */}
        <Grid item xs={12} md={6}>
          <img src={space.mainPhoto} alt="Space" />
        </Grid>
        {/* Display space details */}
        <Grid item xs={12} md={6} sx={{ padding: '20px' }}>
          <Typography variant="h5" gutterBottom>
            {space.address} 
          </Typography>
          <Typography variant="body1" gutterBottom>
            Price Per Day: {space.pricePerDay}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Description: {space.description}
          </Typography>
          {/* Add additional details like number of days counter, starting date selector, etc. */}
          {/* Add buttons for reviews and rent now */}
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default ExpandedSpacePage;
