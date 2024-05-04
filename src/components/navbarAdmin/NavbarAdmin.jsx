import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LoginStore from '../../api/LoginStore';

const theme = createTheme({
    palette: {
        primary: {
            main: '#000000', // Set primary color to black
        },
    },
    typography: {
        fontFamily: 'Dubai Medium, serif', // Replace with your desired font
    },
});

const Navbar = () => {
    return (
        <div data-testid="navbar-1">
            <ThemeProvider theme={theme}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                            Find your space
                        </Typography>
                        <div>
                            <Button component={Link} to="/admin/stats" color="inherit">
                                Statistics
                            </Button>
                        </div>
                    </Toolbar>
                </AppBar>
            </ThemeProvider>
        </div>
    );
};

export default Navbar;