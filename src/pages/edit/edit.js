import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Stack, Typography, Box, Grid, IconButton } from "@mui/material";
import Navbar from '../../components/navbar/Navbar';
import OfficeStore from "../../api/OfficeStore";

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
    console.log('Form data:', formData);

    try {
      const data = await updateOffice(formData);
      console.log('Office space updated:', data);
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
      console.log('Office space deleted');
      navigate("/myspaces");
    } catch (error) {
      console.error("Error deleting office space:", error);
    }
  };

  return (
    <div data-testid="editPage-1">
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
            />

            <Stack direction="row" alignItems="center" marginY={2}>
              <TextField
                label="Image URL"
                placeholder="Image URL"
                value={formData.photos}
                onChange={(e) => handleInputChange("photos", e.target.value)}
                fullWidth
                margin="normal"
              />
            </Stack>

            {formData.photos && (
              <Grid container spacing={2} style={{ maxHeight: "600px", overflowY: 'auto', marginBottom: '40px' }}>
                <Grid item xs={12} style={{ marginBottom: '16px', breakInside: 'avoid', height: "250px" }}>
                  <img
                    src={formData.photos}
                    alt="Office Space"
                    style={{ width: "100%", height: "100%", objectFit: "contain" }}
                  />
                </Grid>
              </Grid>
            )}

            <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
              <Stack spacing={3} flexGrow={4}>
                <TextField
                  label="Size"
                  placeholder="Size"
                  type="number"
                  value={formData.size}
                  onChange={(e) => handleInputChange("size", e.target.value)}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => handleInputChange("price", e.target.value)}
                  fullWidth
                  margin="normal"
                />
              </Stack>
            </Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              marginTop={6}
              sx={{ paddingLeft: "1.25%", paddingRight: "1.25%" }}
            >
              <Button variant="outlined" color="error" onClick={cancelHandler}>
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                sx={{ backgroundColor: "red"}}
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
    </div>
  );
};

export default EditOfficeSpaceForm;
