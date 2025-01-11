import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {TextField, Button, Stack, Typography, Box, Alert, Snackbar} from "@mui/material";
import Navbar from "../../components/navbar/Navbar";
import OfficeStore from "../../api/OfficeStore";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#000000", // Set primary color to black
    },
  },
  typography: {
    fontFamily:
      "Montserrat, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  },
});

const EditOfficeSpaceForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    location: "",
    size: "",
    price: 0,
    photos: "",
  });

  const fetchOffice = OfficeStore((state) => state.fetchOffice);
  const updateOffice = OfficeStore((state) => state.updateOffice);
  const deleteOffice = OfficeStore((state) => state.deleteOffice);

  const [confirmationOpen, setConfirmationOpen] = useState(false); // State for Snackbar

  useEffect(() => {
    const fetchOfficeData = async () => {
      try {
        const data = await fetchOffice(id);
        console.log("Ad Space data:", data);
        setFormData(data);
      } catch (error) {
        console.error("Error fetching office data:", error);
      }
    };

    if (id) {
      fetchOfficeData();
    }
  }, [id, fetchOffice]);

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    console.log("Form data:", formData);

    try {
      const data = await updateOffice(formData);
      console.log("Office space updated:", data);
      setConfirmationOpen(true);
    } catch (error) {
      console.error("Error updating office space:", error);
    }
  };

  const handleConfirmationClose = () => {
    setConfirmationOpen(false);
    navigate("/myspaces"); // Navigate to the spaces page after confirmation
  };

  const cancelHandler = () => {
    navigate("/myspaces");
  };

  const deleteHandler = async () => {
    try {
      await deleteOffice(id);
      console.log("Office space deleted");
      navigate("/myspaces");
    } catch (error) {
      console.error("Error deleting office space:", error);
    }
  };

  return (
    <div data-testid="editPage-1">
      <ThemeProvider theme={defaultTheme}>
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
            Edit and View the Advertisement Space Listing
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
                  variant="outlined"
                  color="error"
                  onClick={deleteHandler}
                  style={{ borderRadius: "7px" }}
                >
                  Delete
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
            sx={{ width: "100%" }}
          >
            Your ad space has been updated!
          </Alert>
        </Snackbar>
      </ThemeProvider>
    </div>
  );
};

export default EditOfficeSpaceForm;
