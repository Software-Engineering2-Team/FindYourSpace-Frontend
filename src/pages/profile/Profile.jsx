import React, { useState, useEffect } from "react";
import LoginStore from "../../api/LoginStore";
import NavbarUser from "../../components/navbar/NavbarUser";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {Snackbar, Alert} from "@mui/material";
import ProfileStore from "../../api/ProfileStore";

const Profile = () => {
    const [userData, setUserData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        contactInfo: "",
        password: "",
    });

  const [userInfoErrors, setUserInfoErrors] = useState({
    first_name: "",
    last_name: "",
    email: "",
    contactInfo: "",
    password: "",
  });

  const [passwordData, setPasswordData] = useState({
    password: "",
    confirm_password: "",
  });

  const [passwordError, setPasswordError] = useState("");
  const [resetError, setresetError] = useState("");
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [passChangeConfirmationOpen, setPassChangeConfirmationOpen] =
    useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const username = LoginStore.getState().userData.username;
                await ProfileStore.getState().fetchUserProfile(username);
                const fetchedData = ProfileStore.getState().userData;
                setUserData(fetchedData);
                console.log("User Data Fetched From Store ", fetchedData);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchData();
    }, []);

    const validatePassword = (value) => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,32}$/;

        if (!passwordRegex.test(value)) {
            if (value.length < 8 || value.length > 32) {
                setPasswordError("Password must be between 8 and 32 characters long.");
            } else if (!/[A-Za-z]/.test(value)) {
                setPasswordError("Password must contain at least one letter.");
            } else if (!/\d/.test(value)) {
                setPasswordError("Password must contain at least one number.");
            } else {
                setPasswordError("Invalid password format.");
            }
            return false;
        }

        setPasswordError("");
        return true;
    };

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "first_name":
        if (!value.trim()) {
          error = "First name is required.";
        } else if (!/^[a-zA-Z]+$/.test(value)) {
          error = "First name can only contain letters.";
        }
        break;
      case "last_name":
        if (!value.trim()) {
          error = "Last name is required.";
        } else if (!/^[a-zA-Z]+$/.test(value)) {
          error = "Last name can only contain letters.";
        }
        break;
      case "email":
        if (!value.trim()) {
          error = "Email is required.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "Invalid email address.";
        }
        break;
      case "contactInfo":
        if (!value.trim()) {
          error = "Contact Info is required.";
        } else if (!/^\d{9}$/.test(value)) {
          error = "Contact Info must be 9 digits.";
        }
        break;
      default:
        break;
    }
    return error;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log("Changed data ", userData);

    const error = validateField(name, value);
    setUserInfoErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

    const handlePasswordInputChange = (e) => {
        const {name, value} = e.target;
        setPasswordData({
            ...passwordData,
            [name]: value,
        });
        if (name === "password") {
            validatePassword(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

    // Collect all validation errors
    const newErrors = {};
    Object.keys(userData).forEach((field) => {
      const error = validateField(field, userData[field]);
      if (error) {
        newErrors[field] = error;
      }
    });

    // Update state with errors
    setUserInfoErrors(newErrors);

    // If there are validation errors, stop form submission
    if (Object.keys(newErrors).length > 0) {
      console.log("Form validation failed:", newErrors);
      return;
    }

        try {
            await ProfileStore.getState().updateUserProfile(userData);
            setConfirmationOpen(true);
            console.log("Profile updated successfully.");
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    const handleConfirmationClose = () => {
        console.log("Code comes inside handleConfirmationClose");
        console.log("ConfirmationOpen value:", confirmationOpen);
        setConfirmationOpen(false);
    };

    const handlePassChangeConfirmationClose = () => {
        console.log("Code comes inside handlePassChangeConfirmationClose");
        console.log(
            "PassChangeConfirmationClose value:",
            passChangeConfirmationOpen
        );
        setPassChangeConfirmationOpen(false);
    };

    // Handle password change form submission
    const handlePasswordChangeSubmit = async (e) => {
        e.preventDefault();

        const {password, confirm_password} = passwordData;

        // Validate password
        if (!validatePassword(password)) {
            return;
        }

        // Validate if passwords match
        if (password !== confirm_password) {
            setresetError("Passwords do not match");
            return;
        }

        try {
            const updatedUserData = {
                ...userData,
                password: password,
            };

            await ProfileStore.getState().updateUserProfile(updatedUserData);
            setPassChangeConfirmationOpen(true);
            setPasswordData({password: "", confirm_password: ""});
            setresetError("");
        } catch (error) {
            console.error("Error updating profile:", error);
            setresetError("Failed to update profile");
        }
    };

    return (
        <div data-testid="profilePage-1" style={{paddingTop: "64px"}}>
            <NavbarUser/>
            <Grid
                container
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "40px",
                }}
            >
                <Box
                    sx={{
                        padding: 4,
                        boxShadow: 2,
                        borderRadius: "9px",
                        backgroundColor: "#fff",
                        width: "40%",
                        textAlign: "center",
                        marginTop: 5,
                        marginBottom: 5,
                    }}
                >
                    <Typography
                        component="h1"
                        variant="h5"
                        sx={{fontSize: "30px", textAlign: "center"}}
                    >
                        Profile Details
                    </Typography>
                    <Box
                        component="form"
                        noValidate
                        onSubmit={handleSubmit}
                        sx={{mt: 1}}
                    >
                        <TextField
                            margin="normal"
                            fullWidth
                            id="firstname"
                            label="First Name"
                            name="first_name"
                            value={userData.first_name}
                            onChange={handleInputChange}
                            InputLabelProps={{shrink: true}}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "9px",
                                },
                            }}
                            error={!!userInfoErrors.first_name}
                            helperText={userInfoErrors.first_name}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            id="lastname"
                            label="Last Name"
                            name="last_name"
                            value={userData.last_name}
                            onChange={handleInputChange}
                            InputLabelProps={{shrink: true}}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "9px",
                                },
                            }}
                            error={!!userInfoErrors.last_name}
                            helperText={userInfoErrors.last_name}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            value={userData.email}
                            onChange={handleInputChange}
                            InputLabelProps={{shrink: true}}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "9px",
                                },
                            }}
                            error={!!userInfoErrors.email}
                            helperText={userInfoErrors.email}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            id="contactinfo"
                            label="Contact Info"
                            type="number"
                            name="contactInfo"
                            value={userData.contactInfo}
                            onChange={handleInputChange}
                            InputLabelProps={{shrink: true}}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "9px",
                                },
                            }}
                            error={!!userInfoErrors.contactInfo}
                            helperText={userInfoErrors.contactInfo}
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            sx={{color: "#fff", backgroundColor: "#000", marginY: 2}}
                            style={{marginTop: 20, borderRadius: 7}}
                        >
                            Save Changes
                        </Button>
                    </Box>
                </Box>

                <Box
                    sx={{
                        padding: 4,
                        boxShadow: 2,
                        borderRadius: "9px",
                        backgroundColor: "#fff",
                        width: "40%",
                        textAlign: "center",
                        marginTop: 5,
                        marginBottom: 10,
                    }}
                >
                    <Typography
                        component="h2"
                        variant="h5"
                        sx={{fontSize: "24px", textAlign: "center"}}
                    >
                        Reset or Change Password
                    </Typography>
                    <Box
                        component="form"
                        noValidate
                        onSubmit={handlePasswordChangeSubmit}
                        sx={{mt: 1}}
                    >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="New Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={handlePasswordInputChange}
                            value={passwordData.password}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "9px",
                                },
                            }}
                            error={!!passwordError}
                            helperText={passwordError}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="confirm_password"
                            label="Confirm Password"
                            type="password"
                            id="confirm_password"
                            autoComplete="current-password"
                            onChange={handlePasswordInputChange}
                            value={passwordData.confirm_password}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "9px",
                                },
                            }}
                            error={!!resetError}
                            helperText={resetError}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{color: "#fff", backgroundColor: "#000", marginY: 2}}
                            style={{marginTop: 20, borderRadius: 7}}
                        >
                            Reset Password
                        </Button>
                    </Box>
                </Box>
            </Grid>
            <Snackbar
                open={confirmationOpen}
                autoHideDuration={2000}
                onClose={handleConfirmationClose}
                anchorOrigin={{vertical: "top", horizontal: "center"}}
            >
                <Alert
                    onClose={handleConfirmationClose}
                    severity="success"
                    sx={{width: "100%", border: "2px border green"}}
                >
                    Your profile has been updated successfully!
                </Alert>
            </Snackbar>
            <Snackbar
                open={passChangeConfirmationOpen}
                autoHideDuration={2000}
                onClose={handlePassChangeConfirmationClose}
                anchorOrigin={{vertical: "top", horizontal: "center"}}
            >
                <Alert
                    onClose={handlePassChangeConfirmationClose}
                    severity="success"
                    sx={{width: "100%", border: "2px border green"}}
                >
                    Your password has been changed successfully!
                </Alert>
            </Snackbar>
        </div>
    );
};

export default Profile;
