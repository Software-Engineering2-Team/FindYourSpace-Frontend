import React, {useState, useEffect} from "react";
import {
    Container,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Pagination,
    Typography,
} from "@mui/material";
import SearchBar from "../../components/searchBar/SearchBar";
import MySpaceItem from "../../components/mySpaceItem/mySpaceItem";
import NavbarUser from "../../components/navbar/NavbarUser";
import AdSpaceStore from "../../api/AdSpaceStore";

import LoginStore from "../../api/LoginStore";

const MySpaces = () => {
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [officeSpaces, setAdSpaceSpaces] = useState([]);
    const [filteredAdSpaceSpaces, setFilteredAdSpaceSpaces] = useState([]);
    const [sortOption, setSortOption] = useState("default");
    const listRef = React.createRef();

    useEffect(() => {
        const userData = LoginStore.getState().userData;

        if (!userData) {
            console.error("User is not logged in");
            return;
        }

        AdSpaceStore.getState()
            .fetchAdSpacesByOwner(userData.id)
            .then((response) => {
                console.log(response);
                const totalItems = response.length;
                setTotalPages(Math.ceil(totalItems / itemsPerPage));
                setAdSpaceSpaces(response);
                setFilteredAdSpaceSpaces(response);
            })
            .catch((error) => console.error(error));
    }, []);

    useEffect(() => {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const slicedSpaces = officeSpaces.slice(start, end);
        setFilteredAdSpaceSpaces(slicedSpaces);
    }, [currentPage, officeSpaces]);

    const handleSearch = (searchTerm) => {
        const filteredSpaces = officeSpaces.filter((space) =>
            space.location.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredAdSpaceSpaces(filteredSpaces);
    };

    const handleSortChange = (event) => {
        const selectedSortOption = event.target.value;
        setSortOption(selectedSortOption);

        let sortedSpaces;
        switch (selectedSortOption) {
            case "alphabetical":
                sortedSpaces = [...filteredAdSpaceSpaces].sort((a, b) =>
                    a.location.localeCompare(b.location)
                );
                break;
            case "price":
                sortedSpaces = [...filteredAdSpaceSpaces].sort(
                    (a, b) => parseFloat(a.price) - parseFloat(b.price)
                );
                break;
            default:
                sortedSpaces = [...officeSpaces];
                break;
        }

        setFilteredAdSpaceSpaces(sortedSpaces);
    };

    const handlePageChange = (event, newPage) => {
        setCurrentPage(newPage);
        if (listRef.current) {
            listRef.current.scrollIntoView({behavior: "smooth"});
        }
    };


    return (
        <div data-testid="mySpacesPage-1" style={{paddingTop: "64px"}}>
            <NavbarUser/>
            <Typography
                variant="h5"
                gutterBottom
                sx={{fontSize: "30px", marginLeft: "25px", marginTop: "30px"}}
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
                    <SearchBar onSearch={handleSearch} testid="searchMySpacesPage-1"/>
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
                            {filteredAdSpaceSpaces.length > 0 ? (
                                filteredAdSpaceSpaces.map((space) => (
                                    <MySpaceItem
                                        key={space.id}
                                        space={space}
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
                                    You have no ad spaces.
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
                            {filteredAdSpaceSpaces.length > 0 && (
                                <>
                                    <Pagination
                                        count={totalPages}
                                        page={currentPage}
                                        onChange={handlePageChange}
                                        color="primary"
                                        size="large"
                                    />
                                    <div style={{marginLeft: "20px"}}>
                                        Page {currentPage} of {totalPages}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default MySpaces;
