import React, { useState, useEffect } from "react";
import {
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Pagination,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";
import SearchBar from "./Search";
import SearchItem from "../../components/searchItem/SearchItem";
import Navbar from "../../components/navbar/Navbar";
import OfficeStore from "../../api/OfficeStore";
import MarketingComponent from "../../components/marketingComponent/MarketingComponent";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const List = () => {
  const itemsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [officeSpaces, setOfficeSpaces] = useState(
    OfficeStore.getState().offices
  );
  const [filteredOfficeSpaces, setFilteredOfficeSpaces] = useState(
    OfficeStore.getState().offices
  );
  const [sortOption, setSortOption] = useState("default");
  const listRef = React.createRef();

  useEffect(() => {
    OfficeStore.getState()
      .fetchOffices(1000, 0)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        const totalItems = response.length;
        setTotalPages(Math.ceil(totalItems / itemsPerPage));
        OfficeStore.getState().setOffices(response);
        setOfficeSpaces(response);
        setFilteredOfficeSpaces(response);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleOfficeUpdate = async () => {
    try {
      const response = await OfficeStore.getState().fetchOffices(1000, 0);
      const data = await response.json();

      OfficeStore.getState().setOffices(data);
      setOfficeSpaces(data);
      setFilteredOfficeSpaces(data);
    } catch (error) {
      console.error("Error updating offices:", error);
    }
  };

  useEffect(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const slicedSpaces = officeSpaces.slice(start, end);
    setFilteredOfficeSpaces(slicedSpaces);
  }, [currentPage, officeSpaces]);

  const handleSearch = (searchTerm) => {
    let filteredSpaces = officeSpaces.filter((space) =>
      space.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredOfficeSpaces(filteredSpaces);
  };

  const handleSortChange = (event) => {
    const selectedSortOption = event.target.value;
    setSortOption(selectedSortOption);

    let sortedSpaces;
    switch (selectedSortOption) {
      case "alphabetical":
        sortedSpaces = [...filteredOfficeSpaces].sort((a, b) =>
          a.location.localeCompare(b.location)
        );
        break;
      case "price":
        sortedSpaces = [...filteredOfficeSpaces].sort(
          (a, b) => parseFloat(a.price) - parseFloat(b.price)
        );
        break;
      default:
        sortedSpaces = [...officeSpaces];
        break;
    }

    setFilteredOfficeSpaces(sortedSpaces);
  };

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
    if (listRef.current) {
      listRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const defaultTheme = createTheme({
    palette: {
      primary: {
        main: "#000000",
      },
    },
    typography: {
      fontFamily:
        "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    },
  });

  return (
    <div data-testid="list-1" style={{ paddingTop: "64px" }}>
      <ThemeProvider theme={defaultTheme}>
        <Navbar />
        <div style={{ height: "1px", backgroundColor: "white" }} />
        <MarketingComponent />
        <div
          ref={listRef}
          style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}
        >
          <div style={{display: "flex", flexDirection: "column", width: "80%"}}>
            <div style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              margin: "50px",
              gap: "20px"
            }}>
              <SearchBar onSearch={handleSearch}/>
              <FormControl
                  style={{
                    width: "100%",
                    maxWidth: "200px",
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "6px", // Same border radius
                      height: "40px", // Set consistent height
                    },
                  }}
              >
                <InputLabel htmlFor="sort">Sort by:</InputLabel>
                <Select
                    id="sort"
                    value={sortOption}
                    onChange={handleSortChange}
                    label="Sort by"
                >
                  <MenuItem value="default">Default</MenuItem>
                  <MenuItem value="alphabetical">Alphabetical</MenuItem>
                  <MenuItem value="price">Price</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  // width: "100%",
                  columnGap: "40px", // Add spacing between items
                  rowGap: "40px",
                  justifyContent: "center",
                }}
            >
              {filteredOfficeSpaces.map((space) => (
                  <div
                      key={space.id}
                  >
                    <SearchItem space={space} onUpdate={handleOfficeUpdate}/>
                  </div>
              ))}
            </div>
          </div>

          <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                padding: "50px"
              }}
          >
              <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={handlePageChange}
                  color="primary"
                  size="large"
              />
              Page {currentPage} of {totalPages}
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
};

export default List;
