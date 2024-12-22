import React, { useState } from "react";
import { TextField, Button, Grid } from "@mui/material";
import styled from "@emotion/styled";
function SearchBar(props) {
  const [searchTerm, setSearchTerm] = useState("");

  const searchContainerStyle = {
    width: "100%",
    margin: "auto",
    marginTop: "30px",
  };

  const SearchButton = styled(Button)`
    width: 100px;
    height: 40px;
    border: none;
    border-radius: 6px;
    background-color: black;
    color: white;
    font-family: "Dubai Medium", serif;
    cursor: pointer;
    transition: background-color 0.1s ease;
  `;

  const handleSearchClick = () => {
    props.onSearch(searchTerm);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearchClick();
    }
  };

  return (
    <div style={searchContainerStyle}>
      <Grid container spacing={2} alignItems="center">
        {/* TextField */}
        <Grid item xs={9}>
          <TextField
            fullWidth
            label="Search term ..."
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "6px", // Same border radius
                height: "40px", // Set consistent height
              },
              "& .MuiOutlinedInput-input": {
                padding: "10px 14px", // Adjust padding for proper vertical centering
                height: "100%", // Ensure input height matches parent
                boxSizing: "border-box", // Proper box-sizing
              },
              "& .MuiInputLabel-root": {
                transform: "translateY(-6%)", // Center transform
                fontSize: "1rem", // Optional: Adjust font size
                padding: "10px",
              },
              "& .MuiInputLabel-shrink": {
                top: 0, // Reset position when label shrinks
                fontSize: "0.8rem", // Optional: Adjust font size
                marginLeft: "5px",
                transform: "translateY(-50%)", // Reset transform
              },
            }}
          />
        </Grid>

        {/* Button */}
        <Grid item xs={3}>
          <SearchButton
            variant="contained"
            color="primary"
            onClick={handleSearchClick}
          >
            Search
          </SearchButton>
        </Grid>
      </Grid>
    </div>
  );
}

export default SearchBar;
