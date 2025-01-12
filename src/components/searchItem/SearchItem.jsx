import React from "react";
import "./searchItem.css";
import { Link } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

export const formatOfficeType = (officeType) => {
  const lowerCaseOfficeType = officeType.toLowerCase();
  const words = lowerCaseOfficeType.split("_");
  const formattedOfficeType = words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  return formattedOfficeType;
};

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#000000",
    },
  },
  typography: {
    fontFamily:
      "Montserrat, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  },
});

const SearchItem = ({ space, onUpdate }) => {
  return (
    <div className="searchItem" data-testid="searchItem-1">
      <ThemeProvider theme={defaultTheme}>
        {space.photos.length >= 0 && (
          <div className="imageContainer">
            <Link to={`/space/${space.id}`}>
              <img src={space.photos} alt={space.location} className="siImg" />
            </Link>
          </div>
        )}
        <div>
          <Typography
            component="h2"
            variant="h5"
            fontWeight="bold"
            sx={{ fontSize: "17px" }}
          >
            {space.location}
          </Typography>
          <Typography component="h2" variant="h5" sx={{ fontSize: "15px" }}>
            {`$${space.price}`}
          </Typography>
        </div>
      </ThemeProvider>
    </div>
  );
};

export default SearchItem;
