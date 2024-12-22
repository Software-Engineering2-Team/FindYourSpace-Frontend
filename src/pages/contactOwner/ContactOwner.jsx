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

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
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
