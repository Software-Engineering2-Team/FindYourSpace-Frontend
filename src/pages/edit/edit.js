import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TextField, Button, Stack, Typography, Box, Grid } from "@mui/material";
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
    switch (field) {
      case "location":
        if (value.trim().length <= 2) error = "Location is not valid.";
        break;
      case "photos":
        if (value.trim() && !/^(https?:\/\/[^\s$.?#].[^\s]*)$/i.test(value))
          error = "Invalid URL format.";
        break;
      case "size":
        if (!value.trim()) error = "Size is required.";
        else if (isNaN(value) || Number(value) <= 0)
          error = "Size must be a positive number.";
        break;
      case "price":
        if (!value.trim()) error = "Price is required.";
        else if (isNaN(value) || Number(value) <= 0)
          error = "Price must be a positive number.";
        break;
      default:
        break;
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: error,
    }));
    return !error;
  };

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
    validateField(field, value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    console.log("Form data:", formData);
    const isValid = Object.keys(formData).every((field) =>
      validateField(field, formData[field])
    );

    if (!isValid) {
      console.log("Form validation failed.");
      return;
    }

    try {
      const data = await updateOffice(formData);
      console.log("Office space updated:", data);
      navigate("/myspaces");
    } catch (error) {
      console.error("Error updating office space:", error);
    }
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
      </ThemeProvider>
    </div>
  );
};

export default EditOfficeSpaceForm;
