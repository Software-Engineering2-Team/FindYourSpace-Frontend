import React, { useState, useEffect } from "react";
import LoginStore from "../../api/LoginStore";
import Navbar from "../../components/navbar/Navbar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Snackbar, Alert } from "@mui/material";
import ProfileStore from "../../api/ProfileStore";

const defaultTheme = createTheme({
  palette: {
    primary: { main: "#000000" },
  },
  typography: {
    fontFamily: "Dubai Medium",
  },
});

const Profile = () => {
  const [userData, setUserData] = useState({
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
  const [userInfoErrors, setUserInfoErrors] = useState({});
  const [passwordError, setPasswordError] = useState("");
  const [resetError, setresetError] = useState("");
  const [confirmationOpen, setConfirmationOpen] = useState(false);

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
        if (value.trim().length <= 2) {
          error = `First name is not valid.`;
        }
        break;
      case "last_name":
        if (value.trim().length <= 2) {
          error = `${name.replace("_", " ")} is not valid.`;
        } else if (!/^[a-zA-Z]+$/.test(value)) {
          error = `${name.replace("_", " ")} can only contain letters.`;
        }
        break;
      case "email":
        if (value.trim().length <= 2) {
          error = "Email is required.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "Invalid email address.";
        }
        break;
      case "contactInfo":
        if (value.trim().length !== 9) {
          error = "Contact Info is required.";
        } else if (!/^\d+$/.test(value)) {
          error = "Contact Info can only contain numbers.";
        }
        break;
      default:
        break;
    }
    setUserInfoErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
    return !error;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    validateField(name, value);
    console.log("Changed data ", userData);
  };

  const handlePasswordInputChange = (e) => {
    const { name, value } = e.target;
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

    const isValid = Object.keys(userData).every((field) =>
      validateField(field, userData[field])
    );

    if (!isValid) {
      console.log("Form validation failed.");
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

  // Handle password change form submission
  const handlePasswordChangeSubmit = async (e) => {
    e.preventDefault();

    const { password, confirm_password } = passwordData;

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
      setConfirmationOpen(true);
      setPasswordData({ password: "", confirm_password: "" });
      setresetError("");
    } catch (error) {
      console.error("Error updating profile:", error);
      setresetError("Failed to update profile");
    }
  };

  return (
    <div data-testid="profilePage-1">
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <Navbar />
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
              padding: "32px",
              boxShadow: "0px 0px 16px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
              backgroundColor: "#fff",
              width: "40%",
              textAlign: "center",
            }}
          >
            <Typography
              component="h1"
              variant="h5"
              sx={{ fontSize: "30px", textAlign: "center" }}
            >
              Profile Details
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              {/* <TextField margin="normal" required fullWidth id="firstname" label="First Name" name="first_name" value={userData.first_name} onChange={handleInputChange} InputLabelProps={{ shrink: true }} />
              <TextField margin="normal" required fullWidth id="lastname" label="Last Name" name="last_name" value={userData.last_name} onChange={handleInputChange} InputLabelProps={{ shrink: true }} />
              <TextField margin="normal" required fullWidth id="email" label="Email Address" name="email" value={userData.email} onChange={handleInputChange} InputLabelProps={{ shrink: true }} />
              <TextField margin="normal" required fullWidth id="contactinfo" label="Contact Info" name="contactInfo" value={userData.contactInfo} onChange={handleInputChange} InputLabelProps={{ shrink: true }} /> */}

              <TextField
                margin="normal"
                required
                fullWidth
                id="firstname"
                label="First Name"
                name="first_name"
                value={userData.first_name}
                onChange={handleInputChange}
                error={!!userInfoErrors.first_name}
                helperText={userInfoErrors.first_name}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="lastname"
                label="Last Name"
                name="last_name"
                value={userData.last_name}
                onChange={handleInputChange}
                error={!!userInfoErrors.last_name}
                helperText={userInfoErrors.last_name}
                InputLabelProps={{ shrink: true }}
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
                error={!!userInfoErrors.email}
                helperText={userInfoErrors.email}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="contactinfo"
                label="Contact Info"
                name="contactInfo"
                value={userData.contactInfo}
                onChange={handleInputChange}
                error={!!userInfoErrors.contactInfo}
                helperText={userInfoErrors.contactInfo}
                InputLabelProps={{ shrink: true }}
              />

              <Button
                type="submit"
                variant="contained"
                sx={{ color: "#fff", backgroundColor: "#000", marginY: 2 }}
              >
                Save Changes
              </Button>
            </Box>
          </Box>

          <Box
            sx={{
              padding: "32px",
              boxShadow: "0px 0px 16px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
              backgroundColor: "#fff",
              width: "40%",
              textAlign: "center",
              marginTop: "20px",
            }}
          >
            <Typography
              component="h2"
              variant="h5"
              sx={{ fontSize: "24px", textAlign: "center" }}
            >
              Reset or Change Password
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handlePasswordChangeSubmit}
              sx={{ mt: 1 }}
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
                error={!!resetError}
                helperText={resetError}
              />
              <Button
                type="submit"
                variant="contained"
                sx={{ color: "#fff", backgroundColor: "#000", marginY: 2 }}
              >
                Reset Password
              </Button>
            </Box>
          </Box>
          <Button
            variant="outlined"
            color="error"
            style={{ marginTop: 50, marginBottom: 50 }}
          >
            Delete Account
          </Button>
        </Grid>
        <Snackbar
          open={confirmationOpen}
          autoHideDuration={2000}
          onClose={handleConfirmationClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={handleConfirmationClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Your profile has been updated!
          </Alert>
        </Snackbar>
      </ThemeProvider>
    </div>
  );
};

export default Profile;
