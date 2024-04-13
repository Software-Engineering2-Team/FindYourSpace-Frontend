import React, {useRef, useState} from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import Navbar from "../../components/navbar/Navbar";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import emailjs from '@emailjs/browser';

const defaultTheme = createTheme({
    palette: {
        primary: {
            main: '#000000',
        },
    },
    typography: {
        fontFamily: 'Dubai Medium',
    },
});

const ContactForm = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    
    const form = useRef();
    
    const sendEmail = (e) => {
        e.preventDefault();
        emailjs
          .sendForm('service_0fkozoz', 'template_a6s6y9o', form.current, {
            publicKey: 'O_9E7yjTjSaZP0Fr9',
          })
          .then(
            () => {
              console.log('SUCCESS!');
            },
            (error) => {
              console.log('FAILED...', error.text);
            },
        );
        e.preventDefault();
        // Here you can handle sending the email
        console.log('Email sent to:', email);
        // Reset form fields after submission
        setFullName('');
        setEmail('');
        setSubject('');
        setMessage('');
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

    return (
        <ThemeProvider theme={defaultTheme} >
            <CssBaseline />
            <Navbar />
            <Box
                sx={{
                    width: '100%',
                    maxWidth: 600, // Increased max-width
                    margin: 'auto',
                    padding: 4, // Increased padding
                    backgroundColor: '#f5f5f5',
                    borderRadius: 8, // Increased border-radius
                    boxShadow: 2,
                    marginTop: 10,
                    marginBottom: 5,

                }}
            >
                <Typography variant="h4" gutterBottom> {/* Increased font size */}
                    Contact Space Owner
                </Typography>
                <form ref={form} onSubmit={sendEmail} >
                    <TextField
                        label="Full Name"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="user_name"
                        value={fullName}
                        onChange={handleFullNameChange}
                        required
                        size="large" // Increased size
                    />
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="user_email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                        size="large" // Increased size
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
                        size="large" // Increased size
                    />
                    <TextField
                        label="Message"
                        variant="outlined"
                        multiline
                        rows={6} // Increased rows
                        fullWidth
                        margin="normal"
                        name="message"
                        value={message}
                        onChange={handleMessageChange}
                        required
                        size="large" // Increased size
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        size="large"
                        style={{marginTop: 10}}
                    >
                        Send Message
                    </Button>
                </form>
            </Box>
        </ThemeProvider>
    );
};

export default ContactForm;
