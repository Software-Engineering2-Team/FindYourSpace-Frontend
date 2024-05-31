import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Stack, Typography, Box,Grid} from "@mui/material";
import Navbar from "../../components/navbar/Navbar";
import AddOfficeStore from "../../api/AddOfficeStore";
import LoginStore from "../../api/LoginStore";

const AddOfficeSpaceForm = () => {
  const navigate = useNavigate();
  const loginInfo = LoginStore.getState().userData;
  const ownerId = loginInfo.id;
  console.log(ownerId);
  const [formData, setFormData] = useState({
    description: "",
    price: 0,
    location: "",
    size: "",
    availability: "true",
    isApproved:"false",
    photos: "",
    owner: ownerId
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
      navigate("/spaces");
    } catch (error) {
      console.error("Error adding AdSpace data:", error);
    }
  };

  const cancelHandler = () => {
    navigate("/spaces");
  };

  return (
      <div data-testid="addOfficeSpaceForm-1">
        <Navbar />
        <div className="ad_space_form">
          <Typography sx={{ marginTop: "2%", paddingLeft: "1.5%" }}>
            <h2>Create A New Advertisement Space Listing</h2>
          </Typography>
          <Box
              sx={{
                padding: {xs: "24px", md: "32px"},
                margin: {xs: "16px", md: "32px"},
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

              <Stack direction={{xs: "column", md: "row"}} spacing={3}>
                <Stack spacing={4} flexGrow={4} width={1000}>
                  <TextField
                      label="Size"
                      placeholder="Size"
                      value={formData.size}
                      type = "number"
                      onChange={(e) => handleInputChange("size", e.target.value)}
                      fullWidth
                      margin="normal"
                      sx={{marginBottom:"20"}}
                  />
                  <TextField
                      label="Price"
                      placeholder="Price"
                      value={formData.price}
                      type = "number"
                      onChange={(e) => handleInputChange("price", e.target.value)}
                      fullWidth
                      margin="normal"
                      sx={{marginBottom:"20"}}
                  />
                </Stack>

                <TextField
                    label="Description"
                    placeholder="Description"
                    multiline
                    rows={8}
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    fullWidth
                    margin="normal"
                />
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
                    sx={{ color: "#fff", backgroundColor: "#000" }}
                    onClick={submitHandler}
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
export default AddOfficeSpaceForm;