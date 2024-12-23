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

const ContactAdminForm = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [adminEmail, setAdminEmail] = useState("akhilajithuni@gmail.com");
  const [errors, setErrors] = useState({});

  const form = useRef();

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "fullName":
        if (!value.trim()) {
          error = "Full Name is required.";
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
    if (!validateForm()) {
      console.log("Form validation failed.");
      return;
    }
    e.preventDefault();
    emailjs
      .sendForm("service_0fkozoz", "template_7c06qpa", form.current, {
        publicKey: "O_9E7yjTjSaZP0Fr9",
        adminEmail_email: adminEmail,
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
    setAdminEmail("");
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

  // const handleAdminEmailChange = (event) => {
  //     setAdminEmail(event.target.value);
  // };

  return (
    <div data-testid="contactAdminForm-1">
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
            Contact Admin
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
              label="Admin Email"
              variant="outlined"
              fullWidth
              margin="normal"
              name="admin_email"
              value={adminEmail}
              disabled
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

export default ContactAdminForm;
