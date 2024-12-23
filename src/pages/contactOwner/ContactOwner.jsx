import React, { useRef, useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
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
    fontFamily: "Dubai Medium",
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

  const form = useRef();

  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "fullName":
        if (value.trim().length <= 2) {
          error = "Full Name is not valid.";
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
        if (value.trim().length <= 2) {
          error = "Subject is not valid.";
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
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
    return !error;
  };

  const validateForm = () => {
    const isFullNameValid = validateField("fullName", fullName);
    const isEmailValid = validateField("email", email);
    const isSubjectValid = validateField("subject", subject);
    const isMessageValid = validateField("message", message);
    return isFullNameValid && isEmailValid && isSubjectValid && isMessageValid;
  };

  const sendEmail = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      console.log("Form validation failed.");
      return;
    }
    emailjs
      .sendForm("service_0fkozoz", "template_a6s6y9o", form.current, {
        publicKey: "O_9E7yjTjSaZP0Fr9",
        spaceOwnerEmail_email: spaceOwnerEmail,
      })
      .then(
        () => {
          console.log("SUCCESS!");
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );

    setFullName("");
    setEmail("");
    setSubject("");
    setMessage("");
    setSpaceOwnerEmail("");
  };

  const handleFullNameChange = (event) => {
    const value = event.target.value;
    setFullName(value);
    validateField("fullName", value); // Pass the field name and value
  };

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
    validateField("email", value);
  };

  const handleSubjectChange = (event) => {
    const value = event.target.value;
    setSubject(value);
    validateField("subject", value);
  };

  const handleMessageChange = (event) => {
    const value = event.target.value;
    setMessage(value);
    validateField("message", value);
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
            backgroundColor: "#f5f5f5",
            borderRadius: 8,
            boxShadow: 2,
            marginTop: 10,
            marginBottom: 5,
          }}
        >
          <Typography variant="h4" gutterBottom>
            Contact Space
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
              error={!!errors.fullName}
              helperText={errors.fullName}
              required
              size="large"
            />
            <TextField
              label="Your Email"
              variant="outlined"
              fullWidth
              margin="normal"
              name="user_email"
              value={email}
              onChange={handleEmailChange}
              error={!!errors.email}
              helperText={errors.email}
              required
              size="large"
            />
            <TextField
              label="Space Owner Email"
              variant="outlined"
              fullWidth
              margin="normal"
              name="spaceOwner_email"
              value={spaceOwnerEmail}
              // onChange={handleSpaceOwnerEmailChange}
              required
              size="large"
            />
            <TextField
              label="Subject"
              variant="outlined"
              fullWidth
              margin="normal"
              name="subject"
              value={subject}
              onChange={handleSubjectChange}
              error={!!errors.subject}
              helperText={errors.subject}
              required
              size="large"
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
              error={!!errors.message}
              helperText={errors.message}
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
              Send Message
            </Button>
          </form>
        </Box>
      </ThemeProvider>
    </div>
  );
};

export default ContactForm;
