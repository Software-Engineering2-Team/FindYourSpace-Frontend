import React, {useRef, useState} from "react";
import {TextField, Button, Box, Typography,  Snackbar, Alert} from "@mui/material";
import NavbarUser from "../../components/navbar/NavbarUser";
import {useNavigate, useParams} from "react-router-dom";
import LoginStore from "../../api/LoginStore";
import ReviewsStore from "../../api/ReviewsStore";

const AddReviewForm = () => {
  const navigate = useNavigate();
  var userData = LoginStore.getState().userData;
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  if (userData == null) {
    userData = {
      username: "",
      id: 0,
    };
  }

  const { id } = useParams();
  const [reviewData, setReviewData] = useState({
    title: "",
    rating: "",
    description: "",
    client: userData.id,
    adSpace: id,
  });

  const initialReviewData = {
    title: "",
    rating: "",
    description: "",
  };

  const [errors, setErrors] = useState({
    title: "",
    rating: "",
    description: "",
  });

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "title":
        if (!value.trim()) {
          error = "Title is too short";
        } else if (value.trim().length < 5) {
          error = "Title must be at least 5 characters long.";
        }
        break;
      case "rating":
        if (!value) {
          error = "Rating is required.";
        } else if (isNaN(value) || value < 1 || value > 5) {
          error = "Rating must be a number between 1 and 5.";
        }
        break;
      case "description":
        if (!value.trim()) {
          error = "Description cannot be empty.";
        } else if (value.trim().length < 10) {
          error = "Description must be at least 5 characters long.";
        }
        break;
      default:
        break;
    }
    return error;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReviewData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log("Changed data ", reviewData);

    const error = validateField(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const form = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.keys(reviewData).forEach((field) => {
      const error = validateField(field, reviewData[field]);
      if (error) {
        newErrors[field] = error;
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      console.log("Form validation failed.");
      return;
    }

    try {
      await ReviewsStore.getState().createReview(reviewData);
      setReviewData(initialReviewData);
      setConfirmationOpen(true);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleConfirmationClose = () => {
    console.log("Code comes inside handleConfirmationClose");
    console.log("ConfirmationOpen value:", confirmationOpen);
    setConfirmationOpen(false);
    navigate(`/reviews/${id}`);
  };

    return (
        <div data-testid="addReviewForm-1" style={{paddingTop: "64px"}}>
            <NavbarUser/>
            <Box
                sx={{
                    width: "100%",
                    maxWidth: 600,
                    margin: "auto",
                    padding: 4,
                    borderRadius: "9px",
                    boxShadow: 2,
                    marginTop: 10,
                    marginBottom: 5,
                }}
            >
                <Typography variant="h4" gutterBottom sx={{textAlign: "center"}}>
                    Add review
                </Typography>
                <form ref={form} onSubmit={handleSubmit}>
                    <TextField
                        label="Title"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="title"
                        value={reviewData.title}
                        onChange={handleInputChange}
                        required
                        size="large"
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "9px",
                            },
                        }}
                        error={!!errors.title}
                        helperText={errors.title}
                    />
                    <TextField
                        label="Rating"
                        variant="outlined"
                        fullWidth
                        type="number"
                        margin="normal"
                        name="rating"
                        value={reviewData.rating}
                        onChange={handleInputChange}
                        required
                        size="large"
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "9px",
                            },
                        }}
                        error={!!errors.rating}
                        helperText={errors.rating}
                    />
                    <TextField
                        label="Description"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="description"
                        value={reviewData.description}
                        onChange={handleInputChange}
                        required
                        size="large"
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "9px",
                            },
                        }}
                        error={!!errors.description}
                        helperText={errors.description}
                    />
                    <div style={{display: "flex", justifyContent: "center"}}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            sx={{color: "#fff", backgroundColor: "#000"}}
                            style={{marginTop: 20, borderRadius: 7}}
                        >
                            Create Review
                        </Button>
                    </div>
                </form>
            </Box>
            <Snackbar
              open={confirmationOpen}
              autoHideDuration={2500}
              onClose={handleConfirmationClose}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <Alert
                onClose={handleConfirmationClose}
                severity="success"
                sx={{ width: "100%", border: "2px solid green" }}
              >
                Your review has been added successfully!
              </Alert>
            </Snackbar>
        </div>
    );
};

export default AddReviewForm;
