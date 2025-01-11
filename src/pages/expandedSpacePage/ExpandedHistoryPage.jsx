import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import useBookingStore from "../../api/BookingStore";

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#000000",
    },
  },
  typography: {
    fontFamily:
      "Montserrat, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  },
});

const ExpandedSpacePage = () => {
  const [space, setSpace] = useState(null);
  const { id } = useParams();
  const bookingId = parseInt(id, 10); // Ensure id is a number
  const [booking, setBooking] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookings = useBookingStore.getState().bookings;
        console.log("Bookings", bookings);
        const booking = bookings.find((booking) => booking.id === bookingId);
        console.log("Booking", booking);
        setBooking(booking);
        console.log("Set booking as ", booking);
        if (!booking) {
          console.error(`No booking found with id: ${bookingId}`);
          return;
        }
        const fetchedData = booking.adSpace;
        console.log("Fetched ad space:", fetchedData);
        setSpace(fetchedData);
      } catch (error) {
        console.error("Error fetching expanded ad space:", error);
      }
    };

    console.log("Fetching expanded ad space with booking id:", bookingId);
    fetchData();
  }, [bookingId]);

  console.log("Here", booking);
  const bookingDate = new Date(booking.bookingDate);
  const formattedBookingDate = bookingDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div data-testid="expandedSpacePage-1">
      <ThemeProvider theme={defaultTheme}>
        <Navbar />
        <CssBaseline />
        <Grid
          container
          component="main"
          sx={{
            height: "90vh", // Full viewport height
            display: "flex", // Flex display for alignment
            alignItems: "center", // Center vertically
            justifyContent: "center", // Center horizontally
            padding: "10%",
          }}
        >
          {/* Image Section */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={space?.photos}
              alt="Space"
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "13px",
                objectFit: "cover",
              }}
            />
          </Grid>

          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start", // Ensures text is left-aligned
              justifyContent: "center", // Centers the text section vertically
              padding: "5%",
            }}
          >
            <Box sx={{ width: "100%" }}>
              <Typography variant="h5" gutterBottom sx={{ fontSize: "40px" }}>
                {space?.location}
              </Typography>
              {/* New Booking Details Section */}
              <Typography
                marginTop="10px"
                variant="body1"
                gutterBottom
                sx={{ fontSize: "18px" }}
              >
                <strong>Booking ID:</strong> {booking?.id}
              </Typography>
              <Typography
                marginTop="10px"
                variant="body1"
                gutterBottom
                sx={{ fontSize: "18px" }}
              >
                Booking Date: {formattedBookingDate}
              </Typography>

              <Typography
                marginTop="10px"
                variant="body1"
                gutterBottom
                sx={{ fontSize: "18px" }}
              >
                Fare per day: {`$${space?.price}/day`}
              </Typography>
              <Typography
                marginTop="10px"
                variant="body1"
                gutterBottom
                sx={{ fontSize: "18px" }}
              >
                Size: {`${space?.size} meter square`}
              </Typography>

              <Grid
                container
                spacing={2}
                justifyContent="left"
                marginTop="10px"
              >
                <Grid item>
                  <Link to={`/reviews/${id}`}>
                    <Button style={{ borderRadius: "6px" }} variant="contained">
                      Reviews
                    </Button>
                  </Link>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ borderRadius: "6px" }}
                    component={Link}
                    to={`/contact/${id}`}
                  >
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
