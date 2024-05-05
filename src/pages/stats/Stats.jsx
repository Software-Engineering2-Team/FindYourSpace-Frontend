import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import prepareChartData from './prepareChart';
import BookingsStore from '../../api/BookingStore';
import { Container, Typography, FormControl, Select, MenuItem, Paper } from '@mui/material';
import NavbarAdmin from '../../components/navbarAdmin/NavbarAdmin';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const Stats = () => {

    const defaultTheme = createTheme({
        palette: {
            primary: {
                main: '#000000', 
            },
        },
        typography: {
            fontFamily: 'Dubai Medium'
        },
      });

    const [bookingsData, setBookingsData] = useState(null);
    const [graphRange, setGraphRange] = useState('hourly');
    const [chartInstance, setChartInstance] = useState(null);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                await BookingsStore.getState().fetchBookings();
                setBookingsData(BookingsStore.getState().userData);
            } catch (error) {
                console.error('Error fetching bookings:', error);
            }
        };

        fetchBookings();
    }, []);

    useEffect(() => {
        if (bookingsData) {
            const ctx = document.getElementById('bookingChart').getContext('2d');
            const data = prepareChartData(bookingsData, graphRange);

            // Destroy existing chart to prevent duplicates
            if (chartInstance) {
                chartInstance.destroy();
            }

            const newChartInstance = new Chart(ctx, {
                type: 'bar', // Default chart type to 'bar'
                data: data,
                options: {
                    scales: {
                        y: {
                            beginAtZero: true // Start y-axis at 0
                        }
                    }
                }
            });

            setChartInstance(newChartInstance);
        }
    }, [bookingsData, graphRange,chartInstance]);

    const handleRangeChange = (event) => {
        setGraphRange(event.target.value);
    };

    return (
        <div>
            <ThemeProvider theme={defaultTheme}>
                <NavbarAdmin />
                <Container>
                    <Typography variant="h4" style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '40px' }}>
                        Booking Stats
                        <FormControl style={{paddingBottom:'10px'}}>
                            <Select
                                id="graphRange"
                                value={graphRange}
                                onChange={handleRangeChange}
                                style={{fontSize:'1rem'}}
                            >
                                <MenuItem value="hourly">Hour</MenuItem>
                                <MenuItem value="weekly">Day</MenuItem>
                                <MenuItem value="monthly">Month</MenuItem>
                            </Select>
                        </FormControl>
                    </Typography>
                    <Paper elevation={3} style={{ padding: '10px'}}>
                        <canvas id="bookingChart" width="400" height="100"></canvas>
                    </Paper>
                </Container>
            </ThemeProvider>
        </div>
    );
};

export default Stats;