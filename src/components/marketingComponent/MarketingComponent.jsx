import React from 'react';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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
        <div data-testid="marketingComponent-1">
            <ThemeProvider theme={theme}>
                <AppBar position="static">
                    
                    <Typography   variant="h5" component="div" sx={{ flexGrow: 1, fontSize: 40, marginTop:5}} marginLeft={10}>
                        Top advertisement spaces to rent
                    </Typography>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 ,fontSize:20}} marginLeft={10}>
                        {/* From high trafic urban hubs to exclusive venues. */}
                        NETLIFY IS HEREEEEEE!!!!!!!!!!
                    
                    </Typography>  
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1,fontSize:20,marginBottom:6}} marginLeft={10}>
                        find the perfect spot to amplify your message!
                    
                    </Typography>  
                    
                </AppBar>
            </ThemeProvider>
        </div>
    );
};

export default MarketingComponent;
