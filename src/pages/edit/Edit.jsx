import React, {useState, useEffect} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {
    TextField,
    Button,
    Stack,
    Typography,
    Box,
    Alert,
    Snackbar,
} from "@mui/material";
import NavbarUser from "../../components/navbar/NavbarUser";
import AdSpaceStore from "../../api/AdSpaceStore";


const EditAdSpaceSpaceForm = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [formData, setFormData] = useState({
        location: "",
        size: "",
        price: 0,
        photos: "",
    });
    const [errors, setErrors] = useState({});

    const fetchAdSpace = AdSpaceStore((state) => state.fetchAdSpace);
    const updateAdSpace = AdSpaceStore((state) => state.updateAdSpace);
    const deleteAdSpace = AdSpaceStore((state) => state.deleteAdSpace);

    const [editConfirmationOpen, setEditConfirmationOpen] = useState(false);
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);

    useEffect(() => {
        const fetchAdSpaceData = async () => {
            try {
                const data = await fetchAdSpace(id);
                console.log("Ad Space data:", data);
                setFormData(data);
            } catch (error) {
                console.error("Error fetching adspace data:", error);
            }
        };

        if (id) {
            fetchAdSpaceData();
        }
    }, [id, fetchAdSpace]);

    const validateField = (field, value) => {
        let error = "";
        console.log(`Validating ${field} with value ${value}`);
        switch (field) {
            case "location":
                if (value === "" || value.trim().length <= 2) {
                    error = "Location is not valid.";
                    console.log("Error in location field");
                }
                break;
            case "photos":
                if (
                    value === "" ||
                    (value.trim() && !/^(https?:\/\/[^\s$.?#].[^\s]*)$/i.test(value))
                ) {
                    error = "Invalid URL format.";
                    console.log("Error in photos field");
                }
                break;
            case "size":
                if (value === 0 || isNaN(value) || Number(value) <= 0) {
                    error = "Size must be a positive number.";
                    console.log("Error in size field");
                }
                break;
            case "price":
                if (value === 0 || isNaN(value) || Number(value) <= 0) {
                    error = "Price must be a positive number.";
                    console.log("Error in price field");
                }
                break;
            default:
                break;
        }
        return error;
    };

    const handleInputChange = (field, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));

        const error = validateField(field, value);
        setErrors((prevErrors) => ({
            ...prevErrors,
            [field]: error || "",
        }));
    };

    const submitHandler = async (event) => {
        event.preventDefault();

        const newErrors = {};
        let isValid = true;

        Object.keys(formData).forEach((field) => {
            const error = validateField(field, formData[field]);
            if (error) {
                newErrors[field] = error;
                isValid = false;
            }
        });

        setErrors(newErrors);

        if (!isValid) {
            console.log("Form validation failed.");
            console.log("Form validation errors", newErrors);
            return;
        }

        try {
            const data = await updateAdSpace(formData);
            console.log("AdSpace space updated:", data);
            setEditConfirmationOpen(true);
        } catch (error) {
            console.error("Error updating adspace space:", error);
        }
    };

    const handleEditConfirmationClose = () => {
        setEditConfirmationOpen(false);
        navigate("/myspaces");
    };

    const handleDeleteConfirmationClose = () => {
        setDeleteConfirmationOpen(false);
        navigate("/myspaces");
    };

    const cancelHandler = () => {
        navigate("/myspaces");
    };

    const deleteHandler = async () => {
        try {
            await deleteAdSpace(id);
            console.log("AdSpace space deleted");
            setDeleteConfirmationOpen(true);
        } catch (error) {
            console.error("Error deleting adspace space:", error);
        }
    };

    return (
        <div data-testid="editPage-1" style={{paddingTop: "64px"}}>

            <NavbarUser/>
            <div className="ad_space_form">
                <Typography
                    variant="h5"
                    gutterBottom
                    sx={{
                        fontSize: "30px",
                        marginLeft: "25px",
                        marginTop: "30px",
                        marginBottom: "30px",
                    }}
                >
                    Edit and View the Advertisement Space Listing
                </Typography>
                <Box
                    sx={{
                        padding: {xs: "24px", md: "32px"},
                        margin: {xs: "16px", md: "32px"},
                        boxShadow: "0px 0px 16px rgba(0, 0, 0, 0.1)",
                        borderRadius: "9px",
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
                            sx={{
                                marginBottom: "20px",
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "9px",
                                },
                            }}
                            margin="normal"
                            error={!!errors.location}
                            helperText={errors.location}
                        />

                        <TextField
                            label="Image URL"
                            placeholder="Image URL"
                            value={formData.photos}
                            onChange={(e) => handleInputChange("photos", e.target.value)}
                            fullWidth
                            margin="normal"
                            error={!!errors.photos}
                            helperText={errors.photos}
                        />

                        {formData.photos && (
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    margin: "20px",
                                }}
                            >
                                <img
                                    src={formData.photos}
                                    alt="AdSpace Space"
                                    style={{
                                        width: "50%",
                                        height: "50%",
                                        objectFit: "contain",
                                        borderRadius: "13px",
                                    }}
                                />
                            </div>
                        )}

                        <TextField
                            label="Size"
                            placeholder="Size"
                            value={formData.size}
                            type="number"
                            onChange={(e) => handleInputChange("size", e.target.value)}
                            fullWidth
                            margin="normal"
                            error={!!errors.size}
                            helperText={errors.size}
                            sx={{
                                marginBottom: "20px",
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "9px",
                                },
                            }}
                        />
                        <TextField
                            label="Price"
                            placeholder="Price"
                            value={formData.price}
                            type="number"
                            onChange={(e) => handleInputChange("price", e.target.value)}
                            fullWidth
                            margin="normal"
                            error={!!errors.price}
                            helperText={errors.price}
                            sx={{
                                marginBottom: "20px",
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "9px",
                                },
                            }}
                        />

                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            marginTop={3}
                            sx={{paddingLeft: "1.25%", paddingRight: "1.25%"}}
                        >
                            <Button
                                variant="outlined"
                                color="error"
                                onClick={cancelHandler}
                                style={{borderRadius: "7px"}}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="outlined"
                                color="error"
                                onClick={deleteHandler}
                                style={{borderRadius: "7px"}}
                            >
                                Delete
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{color: "#fff", backgroundColor: "#000"}}
                                style={{borderRadius: "7px"}}
                            >
                                Submit
                            </Button>
                        </Stack>
                    </form>
                </Box>
            </div>
            <Snackbar
                open={editConfirmationOpen}
                autoHideDuration={2000}
                onClose={handleEditConfirmationClose}
                anchorOrigin={{vertical: "top", horizontal: "center"}}
            >
                <Alert
                    onClose={handleEditConfirmationClose}
                    severity="success"
                    sx={{width: "100%", border: "2px solid green"}}
                >
                    Your ad space has been updated successfully!
                </Alert>
            </Snackbar>{" "}
            <Snackbar
                open={deleteConfirmationOpen}
                autoHideDuration={2000}
                onClose={handleDeleteConfirmationClose}
                anchorOrigin={{vertical: "top", horizontal: "center"}}
            >
                <Alert
                    onClose={handleDeleteConfirmationClose}
                    severity="info"
                    sx={{width: "100%", border: "2px solid cyan"}}
                >
                    Your ad space has been deleted successfully!
                </Alert>
            </Snackbar>
        </div>
    );
};

export default EditAdSpaceSpaceForm;
