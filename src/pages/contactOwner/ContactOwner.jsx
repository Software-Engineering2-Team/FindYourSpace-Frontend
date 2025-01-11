import React, { useRef, useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import Navbar from "../../components/navbar/Navbar";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import emailjs from "@emailjs/browser";
import { useNavigate } from "react-router-dom"; // For navigation

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

const ContactForm = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [spaceOwnerEmail, setSpaceOwnerEmail] = useState(
    "davidabraham384@gmail.com"
  );
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Snackbar state
  const form = useRef();
  const navigate = useNavigate(); // For navigation

  const [isLoading, setIsLoading] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state
    emailjs
      .sendForm("service_ypanvv4", "template_a6s6y9o", form.current, {
        publicKey: "O_9E7yjTjSaZP0Fr9",
        spaceOwnerEmail_email: spaceOwnerEmail,
      })
      .then(
        () => {
          setSnackbarOpen(true);
          setIsLoading(false); // Remove loading state
          setTimeout(() => navigate(-1), 2000);
        },
        (error) => {
          console.log("FAILED...", error.text);
          setIsLoading(false); // Remove loading state even on failure
        }
      );
  };

  const handleFullNameChange = (event) => {
    setFullName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // const handleSpaceOwnerEmailChange = (event) => {
  //     setSpaceOwnerEmail(event.target.value);
  // };

  return (
    <div data-testid="contactForm-1">
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <Navbar />
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
          <Typography variant="h4" gutterBottom sx={{ textAlign: "center" }}>
            Contact Space Owner
          </Typography>
            <form ref={form} onSubmit={sendEmail}>
                <TextField
                    label="Full Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="user_name"
                    value={fullName}
                    onChange={handleFullNameChange}
                    required
                    size="large"
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            borderRadius: "9px",
                        },
                    }}
                />
                <TextField
                    label="Your Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="user_email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                    size="large"
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            borderRadius: "9px",
                        },
                    }}
                />
                <TextField
                    label="Space Owner Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="spaceOwner_email"
                    value={spaceOwnerEmail}
                    required
                    size="large"
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            borderRadius: "9px",
                        },
                    }}
                />
                <TextField
                    label="Subject"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="subject"
                    value={subject}
                    onChange={handleSubjectChange}
                    required
                    size="large"
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            borderRadius: "9px",
                        },
                    }}
                />
                <TextField
                    label="Message"
                    variant="outlined"
                    multiline
                    rows={6}
                    fullWidth
                    margin="normal"
                    name="message"
                    value={message}
                    onChange={handleMessageChange}
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
                        disabled={isLoading} // Disable button when loading
                    >
                        {isLoading ? "Sending..." : "Send Message"}
                    </Button>
                </div>
            </form>
        </Box>
          {/* Snackbar for confirmation */}
          <Snackbar
              open={snackbarOpen}
              autoHideDuration={2500}
              onClose={handleSnackbarClose}
              anchorOrigin={{vertical: "top", horizontal: "center"}}
          >
              <Alert
                  onClose={handleSnackbarClose}
                  severity="success"
                  sx={{width: "100%"}}
              >
                  Message sent successfully!
              </Alert>
          </Snackbar>
      </ThemeProvider>
    </div>
  );
};

export default ContactForm;
