import React, { useState, useEffect } from "react";
import {
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Pagination,
  Typography,
} from "@mui/material";
import SearchBar from "./SearchMySpaces";
import MySpaceItem from "../../components/mySpaceItem/mySpaceItem";
import NavbarUser from "../../components/navbar/NavbarUser";
import OfficeStore from "../../api/OfficeStore";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LoginStore from "../../api/LoginStore";

const MySpaces = () => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [officeSpaces, setOfficeSpaces] = useState([]);
  const [filteredOfficeSpaces, setFilteredOfficeSpaces] = useState([]);
  const [sortOption, setSortOption] = useState("default");
  const listRef = React.createRef();

  useEffect(() => {
    const userData = LoginStore.getState().userData;

    if (!userData) {
      console.error("User is not logged in");
      return;
    }

    OfficeStore.getState()
      .fetchOfficesByOwner(userData.id)
      .then((response) => {
        console.log(response);
        const totalItems = response.length;
        setTotalPages(Math.ceil(totalItems / itemsPerPage));
        setOfficeSpaces(response);
        setFilteredOfficeSpaces(response);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleOfficeUpdate = async () => {
    try {
      const response = await OfficeStore.getState().fetchOfficesByOwner(
        LoginStore.getState().userData.id
      );
      const data = await response.json();
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
    const filteredSpaces = officeSpaces.filter((space) =>
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
    <div data-testid="mySpacesPage-1" style={{ paddingTop: "64px" }}>
      <ThemeProvider theme={defaultTheme}>
        <NavbarUser />
        <Typography
          variant="h5"
          gutterBottom
          sx={{ fontSize: "30px", marginLeft: "25px", marginTop: "30px" }}
        >
          Your Rented Spaces
        </Typography>
        <Container ref={listRef}>
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
          <div className="listContainerMySpace">
            <div className="listWrapperMySpace">
              <div className="listResultMySpace">
                {filteredOfficeSpaces.length > 0 ? (
                    filteredOfficeSpaces.map((space) => (
                        <MySpaceItem
                            key={space.id}
                            space={space}
                            onUpdate={handleOfficeUpdate}
                        />
                    ))
                ) : (
                    <div
                        style={{
                          textAlign: "center",
                          padding: "20px",
                          color: "gray",
                        }}
                    >
                      No office spaces available.
                    </div>
                )}
              </div>
              <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    paddingTop: "20px",
                    marginBottom: "30px",
                  }}
              >
              {filteredOfficeSpaces.length > 0 && (
                  <>
                    <Pagination
                      count={totalPages}
                      page={currentPage}
                      onChange={handlePageChange}
                      color="primary"
                      size="large"
                    />
                    <div style={{ marginLeft: "20px" }}>
                      Page {currentPage} of {totalPages}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default MySpaces;
