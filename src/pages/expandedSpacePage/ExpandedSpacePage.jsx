import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import Grid from '@mui/material/Grid';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import OfficeStore from '../../api/OfficeStore';

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
  console.log("The id is ", id);

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

  useEffect(() => {
    console.log('Fetching office space with id:', id);
    fetchData();
  }, [id]);

  console.log(JSON.stringify(space, null, 2));

  return (
    <ThemeProvider theme={defaultTheme}>
      <Navbar />
      <CssBaseline />
      <Grid container component="main" sx={{ height: '100vh' }}>
        {/* Display space image */}
        <Grid item xs={12} md={6}>
          <img src={space?.mainPhoto} alt="Space" /> {/* Use optional chaining to prevent errors if space is null */}
        </Grid>
        {/* Display space details */}
        <Grid item xs={12} md={6} sx={{ padding: '20px' }}>
          <Typography variant="h5" gutterBottom>
            {space?.address} {/* Use optional chaining to prevent errors if space is null */}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Price Per Day: {space?.pricePerDay} {/* Use optional chaining to prevent errors if space is null */}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Description: {space?.description} {/* Use optional chaining to prevent errors if space is null */}
          </Typography>
          {/* Add additional details like number of days counter, starting date selector, etc. */}
          {/* Add buttons for reviews and rent now */}
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default ExpandedSpacePage;
