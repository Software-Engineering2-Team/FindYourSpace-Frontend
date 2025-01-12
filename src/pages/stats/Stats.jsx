import React, { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import prepareChartData from "./prepareChart";
import useBookingsStore from "../../api/BookingStore";
import {
  Container,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Paper,
} from "@mui/material";
import NavbarAdmin from "../../components/navbarAdmin/NavbarAdmin";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const Stats = () => {
  const defaultTheme = createTheme({
    palette: {
      primary: {
        main: "#000000",
      },
    },
    typography: {
      fontFamily:
        "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    },
  });

  const [bookingsData, setBookingsData] = useState(null);
  const [graphRange, setGraphRange] = useState("hourly");
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        await useBookingsStore.getState().fetchBookings();
        setBookingsData(useBookingsStore.getState().bookings);
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
    <div data-testid="statsPage-1" style={{ paddingTop: "64px" }}>
      <ThemeProvider theme={defaultTheme}>
        <NavbarAdmin />
        <Container>
          <Typography
            variant="h5"
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingTop: "40px",
              paddingBottom: "20px",
            }}
          >
            Booking Stats
            <FormControl
              style={{ position: "absolute", right: "200px", top: "92px" }}
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
          </Typography>
          <Paper elevation={3} style={{ padding: "10px" }}>
            <canvas id="bookingChart" width="400" height="100"></canvas>
          </Paper>
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default Stats;
