import React, { useState, useEffect } from "react";
import { Container, Pagination } from "@mui/material";
import Navbar from "../../components/navbar/Navbar";
import ReviewsStore from "../../api/ReviewsStore";
import ReviewItem from "../../components/reviewItems/reviewItem";
import { useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const Reviews = () => {
  const { id } = useParams();
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [reviews, setReviews] = useState([]);

  const listRef = React.createRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ReviewsStore.getState().fetchReviewsBySpaceId(
          id
        );
        const data = await response.json();
        console.log(data);
        setReviews(data);
        setTotalPages(Math.ceil(data.length / itemsPerPage));
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchData();
  }, [id]);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
    if (listRef.current) {
      listRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const defaultTheme = createTheme({
    palette: {
      primary: {
        main: "#000000",
      },
    },
    typography: {
      fontFamily:
        "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    },
  });

  return (
    <div data-testid="reviewsPage-1">
      <ThemeProvider theme={defaultTheme}>
        <div>
          <Navbar />
          <Stack
            direction="row"
            spacing={150}
            sx={{ marginLeft: "25px", marginTop: "30px" }}
          >
            <Typography variant="h5" gutterBottom sx={{ fontSize: "30px" }}>
              Reviews
            </Typography>
            <Button
              component={Link}
              to={`/create-review/${id}`}
              type="submit"
              variant="contained"
              color="primary"
              width="100px"
              size="large"
              style={{ marginTop: 10 }}
            >
              Add a Review
            </Button>
          </Stack>

          <Container ref={listRef}>
            <div className="listContainer">
              <Box
                sx={{
                  marginLeft: "15%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div>
                  {reviews.map((review) => (
                    <ReviewItem
                      sx={{ marginBottom: "50px" }}
                      key={review.id}
                      review={review}
                    />
                  ))}
                </div>
              </Box>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  paddingTop: "20px", // Adjust as needed
                  marginBottom: "30px",
                }}
              >
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={handlePageChange}
                  color="primary"
                  size="large"
                />
                <div style={{ marginLeft: "20px" }}>
                  Page {currentPage} of {totalPages}
                </div>
              </div>
            </div>
          </Container>
        </div>
      </ThemeProvider>
    </div>
  );
};

export default Reviews;
