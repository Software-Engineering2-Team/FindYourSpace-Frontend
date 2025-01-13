import React, {useState, useEffect} from "react";
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Pagination,
} from "@mui/material";
import SearchBar from "../../components/searchBar/SearchBar";
import SearchItem from "../../components/searchItem/SearchItem";
import NavbarUser from "../../components/navbar/NavbarUser";
import AdSpaceStore from "../../api/AdSpaceStore";
import MarketingComponent from "../../components/marketingComponent/MarketingComponent";


const List = () => {
    const itemsPerPage = 9;
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [officeSpaces, setAdSpaceSpaces] = useState(
        AdSpaceStore.getState().adspaces
    );
    const [filteredAdSpaceSpaces, setFilteredAdSpaceSpaces] = useState(
        AdSpaceStore.getState().adspaces
    );
    const [sortOption, setSortOption] = useState("default");
    const listRef = React.createRef();

    useEffect(() => {
        AdSpaceStore.getState()
            .fetchAdSpaces(1000, 0)
            .then((response) => response.json())
            .then((response) => {
                console.log(response);
                const totalItems = response.length;
                setTotalPages(Math.ceil(totalItems / itemsPerPage));
                AdSpaceStore.getState().setAdSpaces(response);
                setAdSpaceSpaces(response);
                setFilteredAdSpaceSpaces(response);
            })
            .catch((error) => console.error(error));
    }, []);

    const handleAdSpaceUpdate = async () => {
        try {
            const response = await AdSpaceStore.getState().fetchAdSpaces(1000, 0);
            const data = await response.json();

            AdSpaceStore.getState().setAdSpaces(data);
            setAdSpaceSpaces(data);
            setFilteredAdSpaceSpaces(data);
        } catch (error) {
            console.error("Error updating adspaces:", error);
        }
    };

    useEffect(() => {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const slicedSpaces = officeSpaces.slice(start, end);
        setFilteredAdSpaceSpaces(slicedSpaces);
    }, [currentPage, officeSpaces]);

    const handleSearch = (searchTerm) => {
        let filteredSpaces = officeSpaces.filter((space) =>
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
        <div data-testid="list-1" style={{paddingTop: "64px"}}>

            <NavbarUser/>
            <div style={{height: "1px", backgroundColor: "white"}}/>
            <MarketingComponent/>
            <div
                ref={listRef}
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                }}
            >
                <div
                    style={{display: "flex", flexDirection: "column", width: "80%"}}
                >
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            margin: "50px",
                            gap: "20px",
                        }}
                    >
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
                        {filteredAdSpaceSpaces.map((space) => (
                            <div key={space.id}>
                                <SearchItem space={space} onUpdate={handleAdSpaceUpdate}/>
                            </div>
                        ))}
                    </div>
                </div>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        padding: "50px",
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
        </div>
    );
};

export default List;
