import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import Grid from '@mui/material/Grid';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ExpandedAdSpaceStore from '../../api/ExpandedAdSpaceStore';

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
  console.log("The id is: ", id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await ExpandedAdSpaceStore.getState().fetchExpandedAdSpace(id); // Fetch data and set it in the store
        const fetchedData = ExpandedAdSpaceStore.getState().expandedAdSpace; // Access the updated state
        console.log('Fetched ad space:', fetchedData);
        setSpace(fetchedData);
      } catch (error) {
        console.error('Error fetching expanded ad space:', error);
      }
    };
  
    console.log('Fetching expanded ad space with id:', id);
    fetchData();
  }, [id]);

  return (
    <div data-testid="expandedSpacePage-1">
      <ThemeProvider theme={defaultTheme}>
        <Navbar />
        <CssBaseline />
        <Grid container component="main" sx={{ height: '100vh' }}>

        <Grid item xs={5} md={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '-20px', marginLeft: '75px' }}>
          <img src={space?.photos} alt="Space" style={{ width: '500px', height: '500px' }} />
        </Grid>

        <Grid item xs={5} md={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '-30', flexDirection: 'column'  }}>
        <Box sx={{ maxWidth: '80%', marginLeft: '1px', marginBottom: '75px' }}>

            <Typography variant="h5" gutterBottom sx={{ fontSize: '40px' }}>
                {space?.location}
            </Typography>
            {/* New Booking Details Section */}
            <Typography marginTop="10px" variant="body1" gutterBottom sx={{ fontSize: '18px' }}>
                <strong>Booking ID:</strong> {space?.id}
            </Typography>
            <Typography marginTop="10px" variant="body1" gutterBottom sx={{ fontSize: '18px' }}>
                Booking Date: {space?.bookingDate}
            </Typography>

            <Typography marginTop="10px" variant="body1" gutterBottom sx={{ fontSize: '18px' }}>
                Fare per day: {`$${space?.price}/day`}
            </Typography>
            <Typography marginTop="10px" variant="body1" gutterBottom sx={{ fontSize: '18px' }}>
                Size: {`${space?.size} meter square`}
            </Typography>


            <Grid container spacing={2} justifyContent="left" marginTop="10px">
                <Grid item>
                  <Link to={`/reviews/${id}`}>  
                        <Button variant="contained">Reviews</Button>
                  </Link>
                </Grid>
                <Grid item>
                  <Button
                      variant="contained"
                      color="primary"
                      component={Link}
                      to={`/contact/${id}`}>
                      Contact Space Owner
                  </Button>
              </Grid>
          </Grid>
        </Box>
          
        </Grid>
      </Grid>
    </ThemeProvider>
    </div>
  );
};

export default ExpandedSpacePage;
