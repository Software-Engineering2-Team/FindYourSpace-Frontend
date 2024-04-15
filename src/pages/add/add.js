import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Stack, Typography, IconButton, Box, ImageListItem, Grid} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FlagIcon from '@mui/icons-material/Flag';
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import Navbar from "../../components/navbar/Navbar";
import OfficeStore from "../../api/OfficeStore";
import {uploadAdditionalPhoto, uploadMainPhoto} from '../../api/photos';

const AddOfficeSpaceForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    description: "",
    price: 0,
    location: "",
    size: "",
    availability: "",
    photos: "",
    owner: ""
  });

  const [uploadedImages, setUploadedImages] = useState([]);
  const [mainImageIndex, setMainIndex] = useState(0);

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    OfficeStore.getState().addOffice(formData)
        .then((response) => response.json())
        .then((data) => {
          console.log("AdSpace data:", data);
          uploadPhotos(data[0].id)
              .finally(() => navigate("/spaces"))
              .catch((error) => {
                console.error("Error adding AdSpace photos:", error)});
        })
        .catch((error) => {
          console.error("Error adding AdSpace data:", error);
        });
  };

  const uploadPhotos = async (officeId) => {
    for(let i = 0; i < uploadedImages.length; i++)
    {
      const image = uploadedImages[i];
      if(mainImageIndex === i)
        await uploadMainPhoto(officeId, image);
      else
        await uploadAdditionalPhoto(officeId, image);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const currentFiles = [...uploadedImages];
    currentFiles.push(file);
    setUploadedImages(currentFiles);
  };

  const handleImageDelete = (index) => {
    if(index === mainImageIndex)
      setMainIndex(0);
    else if(index < mainImageIndex)
      setMainIndex(mainImageIndex-1);

    setUploadedImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages.splice(index, 1);
      return updatedImages;
    });
  };

  const handleMarkMainPhoto = (index) => {
    setMainIndex(index);
  }

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
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  fullWidth
                  margin="normal"
              />

              <Stack direction="row" alignItems="center" marginY={2}>
                <input
                    type="file"
                    id="imageUpload"
                    style={{display: "none"}}
                    onChange={handleImageUpload}
                />
                <label htmlFor="imageUpload">
                  <IconButton component="span" color="primary">
                    <AddPhotoAlternateIcon/>
                  </IconButton>
                </label>
                <Typography variant="body1" component="label">
                  Add Images
                </Typography>
              </Stack>

              <Grid container spacing={2} style={{ maxHeight: "600px", overflowY: 'auto',marginBottom: '40px' }}>
                {uploadedImages.map((image, index) => (
                    <Grid item key={index} xs={4} style={{marginBottom:'16px', breakInside: 'avoid', height: "250px" }}>
                      <ImageListItem style = {{height: "250px" }}>
                        <img
                            src={URL.createObjectURL(image)}
                            alt={`Uploaded ${index}`}
                            style={{ width: "100%", height: "100%", objectFit: "contain", border: index === mainImageIndex ? '2px solid red' : 'none' }}
                        />
                        <IconButton
                            style={{ position: "absolute", top: "5px", right: "40px", color: "orange" }}
                            onClick={() => handleMarkMainPhoto(index)}
                        >
                          <FlagIcon />
                        </IconButton>
                        <IconButton
                            style={{ position: "absolute", top: "5px", right: "5px", color: "red" }}
                            onClick={() => handleImageDelete(index)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ImageListItem>
                    </Grid>
                ))}
              </Grid>

              <Stack direction={{xs: "column", md: "row"}} spacing={3}>
                <Stack spacing={4} flexGrow={4} width={1000}>
                  <TextField
                      label="Size"
                      placeholder="Size"
                      type="number"
                      value={formData.size}
                      onChange={(e) => handleInputChange("size", e.target.value)}
                      fullWidth
                      margin="normal"
                      sx={{marginBottom:"20"}}
                  />
                  <TextField
                      label="Price"
                      placeholder="Price"
                      type="number"
                      value={formData.price}
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