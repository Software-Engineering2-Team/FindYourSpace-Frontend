import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LoginStore from "../../api/LoginStore";

const theme = createTheme({
  palette: {
    primary: {
      main: "#000000", // Set primary color to black
    },
  },
  typography: {
    fontFamily:
      "Montserrat, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  },
});

const NavbarAdmin = () => {
  return (
    <div data-testid="navbar-1">
      <ThemeProvider theme={theme}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
              Find your space Admin
            </Typography>
            <div>
              <Button
                component={Link}
                to="/admin/platform-health"
                color="inherit"
              >
                Platform Health
              </Button>
              <Button component={Link} to="/admin/stats" color="inherit">
                Admin Analytics
              </Button>
              <Button
                component={Link}
                to="/admin/policy-enforcement"
                color="inherit"
              >
                Policy Enforcement
              </Button>
              <Button
                component={Link}
                to="/admin/review-spaces"
                color="inherit"
              >
                Review Spaces
              </Button>
              <Button
                component={Link}
                to="/"
                color="inherit"
                onClick={LoginStore.getState().logout}
              >
                Log Out
              </Button>
            </div>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </div>
  );
};

export default NavbarAdmin;
