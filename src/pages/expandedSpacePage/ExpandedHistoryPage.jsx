import React, { useState, useEffect } from 'react';
import { Link,useParams } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import Grid from '@mui/material/Grid';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
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
  // const [startDate, setStartDate] = useState(null);
  const [numberOfDays, setNumberOfDays] = useState(1);
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

  // const handleStartDateChange = (newDate) => {
  //   setStartDate(newDate);
  // };

  const handleNumberOfDaysChange = (value) => {
    setNumberOfDays(value);
  };

  return (
    <div data-testid="expandedSpacePage-1">
      <ThemeProvider theme={defaultTheme}>
        <Navbar />
        <CssBaseline />
        <Grid container component="main" sx={{ height: '100vh' }}>

        <Grid item xs={5} md={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center',marginTop: '-20px',marginLeft:'75px' }}>
          <img src={space?.photos} alt="Space" style={{ width: '500px', height: '500px' }} />
        </Grid>
  
        <Grid item xs={5} md={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' ,marginTop: '-30',flexDirection: 'column'  }}>
        <Box sx={{ maxWidth: '80%', marginLeft:'1px',marginBottom:'75px' }}>
            <Typography variant="h5" gutterBottom sx={{ fontSize: '40px' }}>
                {space?.location}
            </Typography>
            <Typography marginTop="10px" variant="body1" gutterBottom sx={{ fontSize: '25px' }}>
                {`$${space?.price}/day`}
            </Typography>
            <Typography marginTop="10px" variant="body1" gutterBottom sx={{ fontSize: '18px' }}>
                {`$${space?.size} meter square`}
            </Typography>
            <Typography marginTop="10px" variant="body1" gutterBottom sx={{ fontSize: '18px' }}>
                {space?.description}
            </Typography>
            {/* Add additional details like number of days counter and starting date selector */}
            <LocalizationProvider marginTop="10px" dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                {/* <DatePicker label="Starting Date" onClick={()=>handleStartDateChange()} /> */}
                <DatePicker label="Starting Date"/>
                </DemoContainer>
            </LocalizationProvider>

            <Grid container alignItems="center" spacing={2} marginTop="10px">
                <Grid item>
                <Button
                    variant="contained"
                    startIcon={<RemoveIcon />}
                    onClick={() => handleNumberOfDaysChange(numberOfDays - 1)}
                    disabled={numberOfDays === 1}
                >
                </Button>
                </Grid>
                <Grid item>
                <Typography>{numberOfDays}</Typography>
                </Grid>
                <Grid item>
                <Button
                    variant="contained"
                    endIcon={<AddIcon/>}
                    onClick={() => handleNumberOfDaysChange(numberOfDays + 1)}
                >
                </Button>
                </Grid>
            </Grid>

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