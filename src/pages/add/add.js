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

  console.log(ownerId);
  const [formData, setFormData] = useState({
    description: "",
    price: 0,
    location: "",
    size: "",
    availability: "true",
    isApproved: "false",
    photos: "",
    owner: ownerId,
  });

  const [confirmationOpen, setConfirmationOpen] = useState(false); // State for Snackbar

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

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      await AddOfficeStore.getState().createAdSpace(formData);
      setConfirmationOpen(true); // Show confirmation message
    } catch (error) {
      console.error("Error adding AdSpace data:", error);
    }
  };

  const handleConfirmationClose = () => {
    setConfirmationOpen(false);
    navigate("/spaces"); // Navigate to the spaces page after confirmation
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
        {/* Snackbar for confirmation */}
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
