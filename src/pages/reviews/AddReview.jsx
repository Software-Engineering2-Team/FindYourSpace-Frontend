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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReviewData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log("Changed data ", reviewData);
  };

  const form = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await ReviewsStore.getState().createReview(reviewData);
      setReviewData(initialReviewData);
      navigate(`/reviews/${id}`);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div data-testid="addReviewForm-1">
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
              required
              size="large"
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
