import React, { useRef, useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import Navbar from "../../components/navbar/Navbar";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate, useParams } from "react-router-dom";
import LoginStore from "../../api/LoginStore";
import ReviewsStore from "../../api/ReviewsStore";

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#000000",
    },
  },
  typography: {
    fontFamily:
      "Montserrat, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  },
});

const AddReviewForm = () => {
  const navigate = useNavigate();
  var userData = LoginStore.getState().userData;
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
      navigate(`/reviews/${id}`);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div data-testid="addReviewForm-1" style={{ paddingTop: "64px" }}>
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <Navbar />
        <Box
          sx={{
            width: "100%",
            maxWidth: 600,
            margin: "auto",
            padding: 4,
            backgroundColor: "#f5f5f5",
            borderRadius: 8,
            boxShadow: 2,
            marginTop: 10,
            marginBottom: 5,
          }}
        >
          <Typography variant="h4" gutterBottom>
            Add Review
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
              error={!!errors.description}
              helperText={errors.description}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              style={{ marginTop: 10 }}
            >
              Create Review
            </Button>
          </form>
        </Box>
      </ThemeProvider>
    </div>
  );
};

export default AddReviewForm;
