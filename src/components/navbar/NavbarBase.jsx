import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const NavbarBase = ({ title, links, onLogout }) => {
  return (
    <div data-testid="navbar-1">
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
                sx={{
                  color: "inherit",
                  "&:hover": {
                    backgroundColor: "#f0f0f0",
                    color: "#000",
                  },
                }}
              >
                {label}
              </Button>
            ))}
            {onLogout && (
              <Button
                color="inherit"
                component={Link}
                to={"/"}
                onClick={onLogout}
                sx={{
                  color: "inherit",
                  "&:hover": {
                    backgroundColor: "#f0f0f0",
                    color: "#000",
                  },
                }}
              >
                Log Out
              </Button>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavbarBase;
