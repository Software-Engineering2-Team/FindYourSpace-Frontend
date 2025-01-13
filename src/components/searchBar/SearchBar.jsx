import React, { useState } from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function SearchBar({ onSearch, testId = "default-search", placeholder = "Search term ..." }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchClick = () => {
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearchClick();
    }
  };

  return (
    <div data-testid={testId} style={{ width: "50%" }}>
      <TextField
        fullWidth
        label={placeholder}
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
            height: "40px",
          },
          "& .MuiInputLabel-root": {
            transform: "translateY(-6%)",
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
