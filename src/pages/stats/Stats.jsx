import React, {useState, useEffect, useRef} from "react";
import Chart from "chart.js/auto";
import prepareChartData from "./prepareChart";
import BookingsStore from "../../api/BookingStore";
import {
    Container,
    Typography,
    FormControl,
    Select,
    MenuItem,
    Paper,
} from "@mui/material";
import NavbarAdmin from "../../components/navbar/NavbarAdmin";

const Stats = () => {
    const [bookingsData, setBookingsData] = useState(null);
    const [graphRange, setGraphRange] = useState("hourly");
    const chartInstanceRef = useRef(null);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const bookings = await BookingsStore.getState().fetchBookings();
                setBookingsData(bookings);
            } catch (error) {
                console.error("Error fetching bookings:", error);
            }
        };

        fetchBookings();
    }, []);

    useEffect(() => {
        if (bookingsData) {
            const ctx = document.getElementById("bookingChart").getContext("2d");
            const data = prepareChartData(bookingsData, graphRange);

            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }

            const newChartInstance = new Chart(ctx, {
                type: "bar",
                data: data,
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                        },
                    },
                },
            });

            chartInstanceRef.current = newChartInstance;
        }
    }, [bookingsData, graphRange]);

    const handleRangeChange = (event) => {
        setGraphRange(event.target.value);
    };

    return (
        <div data-testid="statsPage-1" style={{paddingTop: "64px"}}>
            <NavbarAdmin/>
            <Typography
                variant="h5"
                gutterBottom
                sx={{fontSize: "30px", marginLeft: "25px", marginTop: "30px"}}
            >
                Booking Stats
            </Typography>
            <Container>
                <FormControl
                    style={{marginBottom: "20px"}}
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            borderRadius: "9px",
                        },
                    }}
                >
                    <Select
                        id="graphRange"
                        value={graphRange}
                        onChange={handleRangeChange}
                    >
                        <MenuItem value="hourly">Hour</MenuItem>
                        <MenuItem value="weekly">Day</MenuItem>
                        <MenuItem value="monthly">Month</MenuItem>
                    </Select>
                </FormControl>
                <Paper elevation={3} style={{padding: "10px", borderRadius: "13px"}}>
                    <canvas id="bookingChart" width="400" height="100"></canvas>
                </Paper>
            </Container>
        </div>
    );
};

export default Stats;
