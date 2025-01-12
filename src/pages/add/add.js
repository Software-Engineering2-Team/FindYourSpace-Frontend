import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Stack,
  Typography,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import Navbar from "../../components/navbar/Navbar";
import AddOfficeStore from "../../api/AddOfficeStore";
import LoginStore from "../../api/LoginStore";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const AddOfficeSpaceForm = () => {
  const navigate = useNavigate();
  var loginInfo = LoginStore.getState().userData;
  if (loginInfo == null) {
    loginInfo = {
      username: "",
      id: 0,
    };
  }
  const ownerId = loginInfo.id;
  const [errors, setErrors] = useState({});
  const [confirmationOpen, setConfirmationOpen] = useState(false);

  console.log(ownerId);

  const [formData, setFormData] = useState({
    price: null,
    location: null,
    size: null,
    availability: "true",
    isApproved: "false",
    photos: null,
    owner: ownerId,
  });

  const theme = createTheme({
    palette: {
      primary: {
        main: "#000000", // Set primary color to black
      },
    },
    typography: {
      fontFamily:
        "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    },
  });

  const validateField = (field, value) => {
    let error = "";
    console.log(`Validating ${field} with value ${value}`);
    switch (field) {
      case "location":
        if (value === null || value.trim().length <= 2) {
          error = "Location is not valid.";
          console.log("Error in location field");
        }
        break;
      case "photos":
        if (
          value === null ||
          (value.trim() && !/^(https?:\/\/[^\s$.?#].[^\s]*)$/i.test(value))
        ) {
          error = "Invalid URL format.";
          console.log("Error in photos field");
        }
        break;
      case "size":
        if (value === null || isNaN(value) || Number(value) <= 0) {
          error = "Size must be a positive number.";
          console.log("Error in size field");
        }
        break;
      case "price":
        if (value === null || isNaN(value) || Number(value) <= 0) {
          error = "Price must be a positive number.";
          console.log("Error in price field");
        }
        break;
      default:
        break;
    }
    return error;
  };

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));

    const error = validateField(field, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: error || "", // Clear the error if the field is valid
    }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const newErrors = {};
    let isValid = true;

    Object.keys(formData).forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);

    if (!isValid) {
      console.log("Form validation failed.");
      console.log("Form validation errors", newErrors);
      return;
    }

    try {
      await AddOfficeStore.getState().createAdSpace(formData);
      setConfirmationOpen(true); // Show confirmation message
    } catch (error) {
      console.error("Error adding AdSpace data:", error);
    }
  };

  const handleConfirmationClose = () => {
    console.log("Code comes inside handleConfirmationClose");
    console.log("ConfirmationOpen value:", confirmationOpen);
    setConfirmationOpen(false);
    navigate("/spaces");
  };

  const cancelHandler = () => {
    navigate("/spaces");
  };

  return (
    <div data-testid="addOfficeSpaceForm-1" style={{ paddingTop: "64px" }}>
      <ThemeProvider theme={theme}>
        <Navbar />
        <div className="ad_space_form">
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              fontSize: "30px",
              marginLeft: "25px",
              marginTop: "30px",
              marginBottom: "30px",
            }}
          >
            Create A New Advertisement Space Listing
          </Typography>
          <Box
            sx={{
              padding: { xs: "24px", md: "32px" },
              margin: { xs: "16px", md: "32px" },
              boxShadow: "0px 0px 16px rgba(0, 0, 0, 0.1)",
              borderRadius: "9px",
              backgroundColor: "#fff",
            }}
          >
            <form onSubmit={submitHandler}>
              <TextField
                label="Location"
                placeholder="Location"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                fullWidth
                sx={{
                  marginBottom: "20px",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "9px", // Custom border radius
                  },
                }}
                margin="normal"
                error={!!errors.location}
                helperText={errors.location}
              />

              <TextField
                label="Image URL"
                placeholder="Image URL"
                value={formData.photos}
                onChange={(e) => handleInputChange("photos", e.target.value)}
                fullWidth
                sx={{
                  marginBottom: "20px",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "9px", // Custom border radius
                  },
                }}
                margin="normal"
                error={!!errors.photos}
                helperText={errors.photos}
              />

              {formData.photos && (
                <div
                  style={{
                    display: "flex", // Flexbox for centering
                    justifyContent: "center", // Center horizontally
                    alignItems: "center", // Center vertically
                    margin: "20px",
                  }}
                >
                  <img
                    src={formData.photos}
                    alt="Office Space"
                    style={{
                      width: "50%",
                      height: "50%",
                      objectFit: "contain",
                      borderRadius: "13px", // Apply rounded corners
                    }}
                  />
                </div>
              )}

              <TextField
                label="Size"
                placeholder="Size"
                value={formData.size}
                type="number"
                onChange={(e) => handleInputChange("size", e.target.value)}
                fullWidth
                margin="normal"
                sx={{
                  marginBottom: "20px",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "9px", // Custom border radius
                  },
                }}
                error={!!errors.size}
                helperText={errors.size}
              />
              <TextField
                label="Price"
                placeholder="Price"
                value={formData.price}
                type="number"
                onChange={(e) => handleInputChange("price", e.target.value)}
                fullWidth
                margin="normal"
                sx={{
                  marginBottom: "20px",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "9px", // Custom border radius
                  },
                }}
                error={!!errors.price}
                helperText={errors.price}
              />
              <Stack
                direction="row"
                justifyContent="space-between"
                marginTop={3}
                sx={{ paddingLeft: "1.25%", paddingRight: "1.25%" }}
              >
                <Button
                  variant="outlined"
                  color="error"
                  onClick={cancelHandler}
                  style={{ borderRadius: "7px" }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ color: "#fff", backgroundColor: "#000" }}
                  style={{ borderRadius: "7px" }}
                >
                  Submit
                </Button>
              </Stack>
            </form>
          </Box>
        </div>
        <Snackbar
          open={confirmationOpen}
          autoHideDuration={2000}
          onClose={handleConfirmationClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={handleConfirmationClose}
            severity="success"
            sx={{ width: "100%", border: "2px solid green" }}
          >
            Your ad space has been submitted for review!
          </Alert>
        </Snackbar>
      </ThemeProvider>
    </div>
  );
};
export default AddOfficeSpaceForm;
