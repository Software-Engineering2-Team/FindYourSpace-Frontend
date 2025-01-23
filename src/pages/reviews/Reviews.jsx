import React, {useState, useEffect} from "react";
import {Container, Pagination} from "@mui/material";
import NavbarUser from "../../components/navbar/NavbarUser";
import ReviewsStore from "../../api/ReviewsStore";
import ReviewItem from "../../components/reviewItems/reviewItem";
import {useParams} from "react-router-dom";
import Typography from "@mui/material/Typography";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import {Button} from "@mui/material";
import {Link} from "react-router-dom";

const Reviews = () => {
    const {id} = useParams();
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
            listRef.current.scrollIntoView({behavior: "smooth"});
        }
    };


    return (
        <div data-testid="reviewsPage-1" style={{paddingTop: "64px"}}>
            <div>
                <NavbarUser/>
                <Stack
                    direction="row"
                    spacing={150}
                    sx={{marginLeft: "25px", marginTop: "30px"}}
                >
                    <Typography variant="h5" gutterBottom sx={{fontSize: "30px"}}>
                        Reviews
                    </Typography>
                </Stack>
                <div style={{
                    marginRight: "15%",
                    display: "flex",
                    justifyContent: "flex-end",
                    alignSelf: "flex-end",

                }}>
                    <Button
                        component={Link}
                        to={`/create-review/${id}`}
                        type="submit"
                        variant="contained"
                        color="primary"
                        width="100px"
                        size="large"
                        style={{borderRadius: "7px"}}
                    >
                        Add a Review
                    </Button>
                </div>
                <Container ref={listRef}>
                    <div>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            {reviews.length > 0 ? (
                                <div>
                                    {reviews.map((review) => (
                                        <ReviewItem
                                            sx={{marginBottom: "50px"}}
                                            key={review.id}
                                            review={review}
                                        />
                                    ))}
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "flex-end",
                                            alignItems: "center",
                                            margin: "50px",
                                        }}
                                    >
                                        <Pagination
                                            count={totalPages}
                                            page={currentPage}
                                            onChange={handlePageChange}
                                            color="primary"
                                            size="large"
                                        />
                                        <Typography variant="body2" style={{marginLeft: "10px"}}>
                                            {`Page ${currentPage} of ${totalPages}`}
                                        </Typography>
                                    </div>
                                </div>
                            ) : (
                                <Typography
                                    variant="h6"
                                    align="center"
                                    color="textSecondary"
                                    style={{marginTop: "20px"}}
                                >
                                    No reviews found.
                                </Typography>
                            )}

                        </Box>
                    </div>
                </Container>
            </div>
        </div>
    );
};

export default Reviews;
