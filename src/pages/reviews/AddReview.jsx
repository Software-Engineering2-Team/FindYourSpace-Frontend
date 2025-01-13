import React, {useRef, useState} from "react";
import {TextField, Button, Box, Typography} from "@mui/material";
import NavbarUser from "../../components/navbar/NavbarUser";

import {useNavigate, useParams} from "react-router-dom";
import LoginStore from "../../api/LoginStore";
import ReviewsStore from "../../api/ReviewsStore";

const AddReviewForm = () => {
    const navigate = useNavigate();
    var userData = LoginStore.getState().userData;
    if (userData == null) {
        userData = {
            username: "",
            id: 0,
        };
    }

    const {id} = useParams();
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
        const {name, value} = e.target;
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
        </div>
    );
};

export default AddReviewForm;
