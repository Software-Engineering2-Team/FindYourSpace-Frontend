import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  TextField,
  Button,
  Box,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import NavbarUser from "../../components/navbar/NavbarUser";
import emailjs from "@emailjs/browser";
import ExpandedAdSpaceStore from "../../api/ExpandedAdSpaceStore";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });

  const { id } = useParams();

  const [spaceOwnerEmail, setSpaceOwnerEmail] = useState("");

  const form = useRef();

  const [errors, setErrors] = useState({});
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await ExpandedAdSpaceStore.getState().fetchExpandedAdSpace(id);
        const fetchedData = ExpandedAdSpaceStore.getState().expandedAdSpace;
        console.log("Fetched owner email", fetchedData.owner_email);
        if (fetchedData.owner_email) {
          setSpaceOwnerEmail(fetchedData.owner_email);
        } else {
          setSpaceOwnerEmail("davidabraham384@gmail.com");
        }
      } catch (error) {
        console.error("Error fetching expanded ad space:", error);
      }
    };

    console.log("Fetching expanded ad space with id:", id);
    fetchData();
  }, [id]);

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

    console.log("Form Data content before sending email", formData);
    console.log("Space owner email", spaceOwnerEmail);

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
      <NavbarUser />
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
    </div>
  );
};

export default ContactForm;
