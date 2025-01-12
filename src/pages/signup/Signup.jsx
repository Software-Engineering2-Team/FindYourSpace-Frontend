import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Snackbar, Alert } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SignupStore from "../../api/SignupStore";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        findaspace.com
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#000000", // Set primary color to black
    },
  },
  typography: {
    fontFamily:
      "Montserrat, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  },
});

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [confirmationOpen, setConfirmationOpen] = useState(false);

  const navigate = useNavigate();

  // Validation functions
  const validateUsername = (value) => {
    const usernameRegex = /^[a-zA-Z][a-zA-Z0-9]{5,25}$/;
    if (!usernameRegex.test(value)) {
      if (value.length < 6 || value.length > 26) {
        setUsernameError("Username must be between 6 and 26 characters.");
      } else if (!/^[a-zA-Z]/.test(value)) {
        setUsernameError("Username must start with an alphabetical character.");
      } else if (!/^[a-zA-Z0-9]+$/.test(value)) {
        setUsernameError("Username can only contain alphanumeric characters.");
      } else {
        setUsernameError("Invalid username.");
      }
      return false;
    }
    setUsernameError("");
    return true;
  };

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setEmailError("Invalid email address.");
      return false;
    }
    setEmailError("");
    return true;
  };

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

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUsername(value);
    validateUsername(value);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    validateEmail(value);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    validatePassword(value);
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
  };

  const makeSignupRequest = () => {
    // TODO: change to email or username and update .login() method

    SignupStore.getState()
      .signup(username, email, password, confirmPassword)
      .then(() => {
        setConfirmationOpen(true);
        console.log("ConfirmationOpen set to true.");
      })
      .catch((error) => {
        console.log("Error", error);
        if (error.message == "Passwords do not match") {
          setConfirmPasswordError(error.message);
        } else if (error.message == "Username already exists") {
          setUsernameError(error.message);
        }
      });
  };

  const handleConfirmationClose = () => {
    console.log("Code comes inside handleConfirmationClose");
    console.log("ConfirmationOpen value:", confirmationOpen);
    setConfirmationOpen(false);
    navigate("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isUsernameValid = validateUsername(username);
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (isUsernameValid && isEmailValid && isPasswordValid) {
      console.log("Signup data:", {
        username,
        email,
        password,
        confirmPassword,
      });
      makeSignupRequest();
    } else {
      console.log("Form validation failed.");
    }
  };

  return (
    <div data-testid="signupPage-1" style={{ paddingTop: "64px" }}>
      <ThemeProvider theme={defaultTheme}>
        <Navbar />
        <Grid
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
              padding: { xs: "24px", md: "32px" },
              margin: { xs: "16px", md: "32px" },
              boxShadow: "0px 0px 16px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
              backgroundColor: "#fff",
              width: "50%",
            }}
          >
            <Typography
              component="h1"
              variant="h5"
              sx={{
                fontSize: "30px",
                textAlign: "center",
              }}
            >
              Let's Create an account at Find your space!
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                value={username}
                onChange={handleUsernameChange}
                error={!!usernameError}
                helperText={usernameError}
                autoComplete="username"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={email}
                onChange={handleEmailChange}
                error={!!emailError}
                helperText={emailError}
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password1"
                value={password}
                onChange={handlePasswordChange}
                error={!!passwordError}
                helperText={passwordError}
                autoComplete="current-password"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="password2"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                error={!!confirmPasswordError}
                helperText={confirmPasswordError}
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Create Account
              </Button>
              <Grid container>
                <Grid item xs></Grid>
                <Grid item>
                  <Link to="/" variant="body2" onClick={() => navigate("/")}>
                    {"Already have an account?"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
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
            Your account has been created!
          </Alert>
        </Snackbar>
      </ThemeProvider>
    </div>
  );
};

export default Signup;
