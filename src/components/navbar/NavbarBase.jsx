// NavbarBase.jsx
import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";

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

const NavbarBase = ({ title, links, onLogout }) => {
  return (
    <div data-testid="navbar-1">
      <ThemeProvider theme={theme}>
        <AppBar position="fixed">
          <Toolbar>
            <Typography
              variant="h5"
              component="div"
              sx={{ flexGrow: 1, fontWeight: "bold" }}
            >
              {title}
            </Typography>
            <div>
              {links.map(({ label, href, onClick }, index) => (
                <Button
                  key={index}
                  component={Link}
                  to={href}
                  color="inherit"
                  onClick={onClick}
                >
                  {label}
                </Button>
              ))}
              {onLogout && (
                <Button color="inherit" component={Link} to={"/"} onClick={onLogout}>
                  Log Out
                </Button>
              )}
            </div>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </div>
  );
};

export default NavbarBase;
