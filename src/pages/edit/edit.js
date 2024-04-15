import React, { useState,useEffect} from "react";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom"; // Import useNavigate from React Router
import {
  TextField,
  Button,
  Stack,
  Typography,
  IconButton,
  Box,
  //ImageListItem, 
  Grid,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
// import DeleteIcon from "@mui/icons-material/Delete";
import Navbar from '../../components/navbar/Navbar';
import OfficeStore from "../../api/OfficeStore";
// import FlagIcon from '@mui/icons-material/Flag';

const EditOfficeSpaceForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    description: "",
    price: 0,
    location: "",
    size: "",
    availability:"",
    photos: "",
    owner: ""
  });
  const { id } = useParams();

  useEffect(() => {
    const fetchOfficeData = () => {
      OfficeStore.getState().fetchOffice(id)
          .then((response) => response.json())
          .then((data) => {
            console.log("Ad Space data:", data);
            setFormData(data);
            // setImages(data.mainPhoto);
          })
          .catch((error) => {
            console.error("Error fetching office data:", error);
          });
    };

    if (id) {
      fetchOfficeData();
    }
  }, [id]);


  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  // const handleImageUpload = (e) => {
  //   const file = e.target.files[0];
  //   const currentFiles = [...images];
  //   currentFiles.push({url: URL.createObjectURL(file), file:file});
  //   setImages(currentFiles);
  //   console.log('Uploaded images:', currentFiles);
  // };

  // const handleImageDelete = (index) => {
  //   if(index == mainImageIndex)
  //     setMainIndex(0);
  //   else if(index < mainImageIndex)
  //     setMainIndex(mainImageIndex-1);

  //   if(!images[index].file)
  //   {
  //     const file = images[index];
  //     const currentToBeDeleted = [...imagesToRemove];
  //     currentToBeDeleted.push(file);
  //     setImagesToRemove(currentToBeDeleted);
  //   }

  //   setImages((prevImages) => {
  //     const updatedImages = [...prevImages];
  //     updatedImages.splice(index, 1);
  //     return updatedImages;
  //   });
  // };

  const submitHandler = async (event) => {
    console.log('Form data:', formData);
    // console.log('Uploaded images:', images);
    // console.log('Deleted images:', imagesToRemove);

    event.preventDefault();
    OfficeStore.getState().updateOffice(formData)
        .then((response) => response.json())
        .then((data) => {
          console.log('Office space updated:', data)})
        .then(() => navigate("/myspaces")
          // handlePhotos(data.id)
          //     .then(() => navigate("/spaces"))     
          //     .catch((error) => {console.error("Error adding office photos:", error)});
        )
        .catch((error) => {})
  };

  // const handlePhotos = async (officeId) => {
  //   console.log('Uploading photos for office:', images);
  //   for(let i = 0; i < images.length; i++)
  //   {
  //     const image = images[i];
  //     if(image.file)
  //     {
  //       if(mainImageIndex == i)
  //         await uploadMainPhoto(officeId, image.file);
  //       else
  //         await uploadAdditionalPhoto(officeId, image.file);
  //     }
  //     else
  //     {
  //       if(mainImageIndex == i && image.url != formData.mainPhoto)
  //       {
  //         // update main photo
  //         await deletePhoto(officeId, image.url);
  //         await uploadMainPhoto(officeId, image.url);
  //       }
  //     }
  //   }
  //   for(let i = 0; i < imagesToRemove.length; i++)
  //   {
  //     const image = imagesToRemove[i];
  //     await deletePhoto(officeId, image.url);
  //   }
  // };

  // const handleMarkMainPhoto = (index) => {
  //   setMainIndex(index);
  // }

  const cancelHandler = () => {
    navigate("/myspaces");
  };

  return (
      <div>
        <Navbar />
        <div className="ad_space_form">
          <Typography sx={{marginTop: "2%", paddingLeft: "1.5%"}}>
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
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  fullWidth
                  margin="normal"
              />

              <Stack direction="row" alignItems="center" marginY={2}>
                <input
                    type="file"
                    id="imageUpload"
                    style={{ display: "none" }}
                    // onChange={handleImageUpload}
                />
                <label htmlFor="imageUpload">
                  <IconButton component="span" color="primary">
                    <AddPhotoAlternateIcon />
                  </IconButton>
                </label>
                <Typography variant="body1" component="label">
                  Add Images
                </Typography>
              </Stack>
              
              <Grid container spacing={2} style={{ maxHeight: "600px", overflowY: 'auto', marginBottom: '40px' }}>
                {/* {images.map((image, index) => (
                    <Grid item key={index} xs={4} style={{ marginBottom: '16px', breakInside: 'avoid', height: "250px" }}>
                      <ImageListItem style={{ height: "250px" }}>
                        <img
                            src={image.url}
                            alt={`Uploaded Image ${index}`}
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
                ))} */}
              </Grid>

              <Stack direction={{xs: "column", md: "row"}} spacing={3}>
                <Stack spacing={3} flexGrow={4} width={1000}>
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

export default EditOfficeSpaceForm;