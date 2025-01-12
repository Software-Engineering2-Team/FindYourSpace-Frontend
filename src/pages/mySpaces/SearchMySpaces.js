import React, { useState } from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search"; // Import the search icon

function SearchBar(props) {
  const [searchTerm, setSearchTerm] = useState("");

  const searchContainerStyle = {
    width: "50%",
  };

  const handleSearchClick = () => {
    props.onSearch(searchTerm);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearchClick();
    }
  };

  return (
    <div data-testid="searchMySpacesPage-1" style={searchContainerStyle}>
      <TextField
        fullWidth
        label="Search term ..."
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={handleKeyPress}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon
                onClick={handleSearchClick}
                style={{ cursor: "pointer", color: "black" }}
              />
            </InputAdornment>
          ),
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "6px",
            height: "40px", // Set consistent height
          },
          "& .MuiInputLabel-root": {
            transform: "translateY(-6%)", // Center transform
            fontSize: "1rem",
            padding: "10px",
          },
          "& .MuiInputLabel-shrink": {
            top: 0,
            fontSize: "0.8rem",
            marginLeft: "5px",
            transform: "translateY(-50%)",
          },
        }}
      />
    </div>
  );
}

export default SearchBar;
