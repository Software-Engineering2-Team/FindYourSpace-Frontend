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
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });
  const spaceOwnerEmail = "davidabraham384@gmail.com";

  const form = useRef();

  const [errors, setErrors] = useState({});
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "fullName":
        if (!value.trim()) {
          // Check for empty string or whitespace
          error = "Full Name is required.";
          console.log("Full name is empty");
        } else if (value.trim().length < 2) {
          error = "Full name is not valid.";
        } else if (!/^[a-zA-Z\s]+$/.test(value)) {
          error = "Full Name can only contain letters and spaces.";
        }
        break;
      case "email":
        if (!value.trim()) {
          error = "Email is required.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "Invalid email address.";
        }
        break;
      case "subject":
        if (!value.trim()) {
          error = "Subject is required.";
        } else if (value.trim().length < 5) {
          error = "Subject must be at least 5 characters long.";
        }
        break;
      case "message":
        if (!value.trim()) {
          error = "Message is required.";
        } else if (value.trim().length < 10) {
          error = "Message must be at least 10 characters long.";
        }
        break;
      default:
        break;
    }
    if (error) {
      setIsLoading(false);
    }
    return error;
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const newErrors = {};

    Object.keys(formData).forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
      }
    });

    setErrors(newErrors);

    // If there are any errors, stop submission
    if (Object.keys(newErrors).length > 0) {
      console.log("Form validation failed:", newErrors);
      return;
    }

    // Proceed with sending the email
    emailjs
      .sendForm("service_ypanvv4", "template_a6s6y9o", form.current, {
        publicKey: "O_9E7yjTjSaZP0Fr9",
        spaceOwnerEmail_email: spaceOwnerEmail,
      })
      .then(
        () => {
          setIsLoading(false); // Remove loading state
          setConfirmationOpen(true);
        },
        (error) => {
          console.log("FAILED...", error.text);
          setIsLoading(false); // Remove loading state even on failure
        }
      );

    // Reset form
    setFormData({
      fullName: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  const handleConfirmationClose = () => {
    console.log("Code comes inside handleConfirmationClose");
    console.log("ConfirmationOpen value:", confirmationOpen);
    setConfirmationOpen(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateField(name, value),
    }));
  };

  return (
    <div data-testid="contactForm-1" style={{ paddingTop: "64px" }}>
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
            Contact Space
          </Typography>
          <form ref={form} onSubmit={sendEmail}>
            <TextField
              label="Full Name"
              variant="outlined"
              fullWidth
              margin="normal"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              error={!!errors.fullName}
              helperText={errors.fullName}
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
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              error={!!errors.email}
              helperText={errors.email}
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
              disabled
              // onChange={handleSpaceOwnerEmailChange}
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
              value={formData.subject}
              onChange={handleInputChange}
              error={!!errors.subject}
              helperText={errors.subject}
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
              value={formData.message}
              onChange={handleInputChange}
              error={!!errors.message}
              helperText={errors.message}
              size="large"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "9px",
                },
              }}
            />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ color: "#fff", backgroundColor: "#000" }}
                style={{ marginTop: 20, borderRadius: 7 }}
                disabled={isLoading} // Disable button when loading
              >
                {isLoading ? "Sending..." : "Send Message"}
              </Button>
            </div>
          </form>
        </Box>

        <Snackbar
          open={confirmationOpen}
          autoHideDuration={2000}
          onClose={handleConfirmationClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={handleConfirmationClose}
            severity="success"
            sx={{ width: "100%", border: "2px solid green" }}
          >
            Your message has been sent to the Space Owner!
          </Alert>
        </Snackbar>
      </ThemeProvider>
    </div>
  );
};

export default ContactForm;
