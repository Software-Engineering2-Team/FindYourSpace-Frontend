import React from "react";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";

const MarketingComponent = () => {
    return (
        <div data-testid="marketingComponent-1">
            <AppBar position="static">
                <Typography
                    variant="h5"
                    component="div"
                    sx={{
                        flexGrow: 1,
                        fontSize: 40,
                        paddingTop: 5,
                        paddingLeft: 10,
                        marginBottom: 2,
                    }}
                >
                    Top advertisement spaces to rent
                </Typography>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{flexGrow: 1, fontSize: 20}}
                    marginLeft={10}
                >
                    From high trafic urban hubs to exclusive venues
                </Typography>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{flexGrow: 1, fontSize: 20, marginBottom: 6}}
                    marginLeft={10}
                >
                    Find the perfect spot to amplify your message!
                </Typography>
            </AppBar>
        </div>
    );
};

export default MarketingComponent;
