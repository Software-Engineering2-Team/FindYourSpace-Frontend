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

const MarketingComponent = () => {
    return (
        <ThemeProvider theme={theme}>
            <AppBar position="static">
                
                <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontSize: 40 }} marginLeft={10}>
                    Top advertisement spaces to rent
                </Typography>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 ,fontSize:15}} marginLeft={10}>
                    From high trafic urban hubs to exclusive venues.
                   
                </Typography>  
                <Typography variant="h6" component="div" sx={{ flexGrow: 1,fontSize:15 }} marginLeft={10}>
                    find the perfect spot to amplify your message!
                   
                </Typography>  
                
            </AppBar>
        </ThemeProvider>
    );
};

export default MarketingComponent;
