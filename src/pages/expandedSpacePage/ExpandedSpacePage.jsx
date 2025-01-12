import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ExpandedAdSpaceStore from "../../api/ExpandedAdSpaceStore";
import Button from "@mui/material/Button";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import axios from "axios";
import LoginStore from "../../api/LoginStore";

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
  const [startDate, setStartDate] = useState(null);
  const [startDateError, setStartDateError] = useState("");
  const [numberOfDays, setNumberOfDays] = useState(1);
  const { id } = useParams();
  console.log("The id is: ", id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await ExpandedAdSpaceStore.getState().fetchExpandedAdSpace(id); // Fetch data and set it in the store
        const fetchedData = ExpandedAdSpaceStore.getState().expandedAdSpace; // Access the updated state
        console.log("Fetched ad space:", fetchedData);
        setSpace(fetchedData);
      } catch (error) {
        console.error("Error fetching expanded ad space:", error);
      }
    };

    console.log("Fetching expanded ad space with id:", id);
    fetchData();
  }, [id]);

  // const handleStartDateChange = (newDate) => {
  //   setStartDate(newDate);
  // };

  const validateForm = () => {
    let isValid = true;
    console.log("Start date value", startDate);

    // Validate start date
    if (startDate == null) {
      setStartDateError("Please select a start date.");
      isValid = false;
    } else {
      setStartDateError(""); // Clear error if valid
    }

    console.log("Start Date Error", startDateError);

    return isValid;
  };

  const handleNumberOfDaysChange = (value) => {
    setNumberOfDays(value);
  };

  const handleRentNowClick = async () => {
    if (!validateForm()) {
      return; // Stop if validation fails
    }

    try {
      const response = await axios.post(
        "http://localhost:4242/create-checkout-session",
        {
          price: space.price,
          imageUrl: space.photos,
          quantity: numberOfDays,
          name: space.location,
          ad_space_id: id,
          client_id: LoginStore.getState().userData.id,
          start_date: startDate, // Include start date
        }
      );
      const { checkoutUrl } = response.data;
      window.location.href = checkoutUrl;
    } catch (error) {
      console.error("Error creating checkout session:", error);
    }
  };

  return (
    <div data-testid="expandedSpacePage-1" style={{ paddingTop: "64px" }}>
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

          {/* Text Section */}
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
              <Typography
                marginTop="10px"
                variant="body1"
                gutterBottom
                sx={{ fontSize: "25px" }}
              >
                {`$${space?.price}/day`}
              </Typography>
              <Typography
                marginTop="10px"
                variant="body1"
                gutterBottom
                sx={{ fontSize: "18px" }}
              >
                {space?.description}
              </Typography>
              {/* Add additional details like number of days counter and starting date selector */}
              <LocalizationProvider marginTop="10px" dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "6px",
                      },
                    }}
                    label="Starting Date"
                    value={startDate}
                    onChange={(newValue) => {
                      setStartDate(newValue);
                      setStartDateError("");
                    }}
                    slotProps={{
                      textField: {
                        error: !!startDateError,
                        helperText: startDateError,
                      },
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>

              <Grid container alignItems="center" spacing={2} marginTop="10px">
                <Grid item>
                  <Button
                    variant="contained"
                    startIcon={<RemoveIcon />}
                    style={{ borderRadius: "6px" }}
                    onClick={() => handleNumberOfDaysChange(numberOfDays - 1)}
                    disabled={numberOfDays === 1}
                  />
                </Grid>
                <Grid item>
                  <Typography>{numberOfDays}</Typography>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    endIcon={<AddIcon />}
                    style={{ borderRadius: "6px" }}
                    onClick={() => handleNumberOfDaysChange(numberOfDays + 1)}
                  />
                </Grid>
              </Grid>

              <Grid
                container
                spacing={2}
                justifyContent="flex-start" // Ensures buttons align to the left
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
                    onClick={handleRentNowClick}
                  >
                    Rent Now
                  </Button>
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
