import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Stack,
  Typography,
  Box,
  Grid,
  Snackbar,
  Alert,
} from "@mui/material";
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
    fontFamily: "Dubai Medium",
    // Replace with your desired font
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
  const [errors, setErrors] = useState({});
  const [confirmationOpen, setConfirmationOpen] = useState(false);

  const fetchOffice = OfficeStore((state) => state.fetchOffice);
  const updateOffice = OfficeStore((state) => state.updateOffice);
  const deleteOffice = OfficeStore((state) => state.deleteOffice);

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

  const validateField = (field, value) => {
    let error = "";
    console.log(`Validating ${field} with value ${value}`);
    switch (field) {
      case "location":
        if (value === "" || value.trim().length <= 2) {
          error = "Location is not valid.";
          console.log("Error in location field");
        }
        break;
      case "photos":
        if (
          value === "" ||
          (value.trim() && !/^(https?:\/\/[^\s$.?#].[^\s]*)$/i.test(value))
        ) {
          error = "Invalid URL format.";
          console.log("Error in photos field");
        }
        break;
      case "size":
        if (value === 0 || isNaN(value) || Number(value) <= 0) {
          error = "Size must be a positive number.";
          console.log("Error in size field");
        }
        break;
      case "price":
        if (value === 0 || isNaN(value) || Number(value) <= 0) {
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
      const data = await updateOffice(formData);
      console.log("Office space updated:", data);
      setConfirmationOpen(true);
      console.log("ConfirmationOpen set to true.");
      setTimeout(() => navigate("/spaces"), 2000);
    } catch (error) {
      console.error("Error updating office space:", error);
    }
  };

  const handleConfirmationClose = () => {
    console.log("Code comes inside handleConfirmationClose");
    console.log("ConfirmationOpen value:", confirmationOpen);
    setConfirmationOpen(false);
    navigate("/spaces");
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
          <Typography sx={{ marginTop: "2%", paddingLeft: "1.5%" }}>
            <h2>Edit and View the Advertisement Space Listing</h2>
          </Typography>
          <Box
            sx={{
              padding: { xs: "24px", md: "32px" },
              margin: { xs: "16px", md: "32px" },
              boxShadow: "0px 0px 16px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
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
                margin="normal"
                error={!!errors.location}
                helperText={errors.location}
              />
              <Stack direction="row" alignItems="center" marginY={2}>
                <TextField
                  label="Image URL"
                  placeholder="Image URL"
                  value={formData.photos}
                  onChange={(e) => handleInputChange("photos", e.target.value)}
                  fullWidth
                  margin="normal"
                  error={!!errors.photos}
                  helperText={errors.photos}
                />
              </Stack>

              {formData.photos && (
                <Grid
                  container
                  spacing={2}
                  style={{
                    maxHeight: "600px",
                    overflowY: "auto",
                    marginBottom: "40px",
                  }}
                >
                  <Grid
                    item
                    xs={12}
                    style={{
                      marginBottom: "16px",
                      breakInside: "avoid",
                      height: "250px",
                    }}
                  >
                    <img
                      src={formData.photos}
                      alt="Office Space"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </Grid>
                </Grid>
              )}

              <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
                <Stack spacing={4} flexGrow={4} width={1000}>
                  <TextField
                    label="Size"
                    placeholder="Size"
                    value={formData.size}
                    type="number"
                    onChange={(e) => handleInputChange("size", e.target.value)}
                    fullWidth
                    margin="normal"
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
                    error={!!errors.price}
                    helperText={errors.price}
                  />
                </Stack>
              </Stack>
              <Stack
                direction="row"
                justifyContent="space-between"
                marginTop={6}
                sx={{ paddingLeft: "1.25%", paddingRight: "1.25%" }}
              >
                <Button
                  variant="outlined"
                  color="error"
                  onClick={cancelHandler}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ backgroundColor: "red" }}
                  onClick={deleteHandler}
                >
                  Delete
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ color: "#fff", backgroundColor: "#000" }}
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
            Your ad space has been edited successfully!
          </Alert>
        </Snackbar>
      </ThemeProvider>
    </div>
  );
};

export default EditOfficeSpaceForm;
