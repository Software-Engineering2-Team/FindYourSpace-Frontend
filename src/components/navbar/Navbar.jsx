import React from "react";
import { useState, useEffect } from "react";
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

const Navbar = () => {
  // const [isLoggedIn, setIsLoggedIn] = useState(() => LoginStore.getState().userData !== null);

  // const handleLogout = async () => {
  //     await LoginStore.getState().logout();
  //     setIsLoggedIn(false); // Update isLoggedIn state after logout
  // };

  // // Inside the useEffect, remove isLoggedIn from the dependency array
  // useEffect(() => {
  //     const unsubscribe = LoginStore.subscribe(
  //         (userData) => setIsLoggedIn(userData !== null)
  //     );
  //     return () => unsubscribe();
  // }, [isLoggedIn]);

  const [isLoggedIn, setIsLoggedIn] = useState(
    () => LoginStore.getState().userData !== null
  );

  useEffect(() => {
    const unsubscribe = LoginStore.subscribe((state) =>
      setIsLoggedIn(state.userData !== null)
    );
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await LoginStore.getState().logout();
    setIsLoggedIn(false); // Explicitly set state after logout completes
  };

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
              Find your space
            </Typography>
            <div>
              {isLoggedIn ? (
                <>
                  <Button
                    component={Link}
                    to="/booking-history"
                    color="inherit"
                  >
                    Booking History
                  </Button>
                  <Button component={Link} to="/add" color="inherit">
                    Rent my space
                  </Button>
                  <Button component={Link} to="/myspaces" color="inherit">
                    My Spaces
                  </Button>
                  <Button component={Link} to="/spaces" color="inherit">
                    Find spaces
                  </Button>
                  <Button component={Link} to="/profile" color="inherit">
                    Profile
                  </Button>
                  <Button component={Link} to="/contact-us" color="inherit">
                    Contact Us
                  </Button>
                  <Button
                    component={Link}
                    to="/"
                    color="inherit"
                    onClick={handleLogout}
                  >
                    Log Out
                  </Button>
                </>
              ) : (
                <>
                  <Button component={Link} to="/spaces" color="inherit">
                    Find spaces
                  </Button>
                  <Button component={Link} to="/contact-us" color="inherit">
                    Contact Us
                  </Button>
                  <Button component={Link} to="/" color="inherit">
                    Login
                  </Button>
                </>
              )}
            </div>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </div>
  );
};

export default Navbar;
