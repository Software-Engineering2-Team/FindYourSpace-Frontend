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
import SearchItem from "../../components/searchItemBookingHistory/SearchItemBookingHistory";
import NavbarUser from "../../components/navbar/NavbarUser";
import BookingStore from "../../api/BookingStore";
import LoginStore from "../../api/LoginStore";


const BookingHistory = () => {
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [filteredBookings, setFilteredBookings] = useState([]);
    const [sortOption, setSortOption] = useState("default");
    const listRef = React.createRef();

    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const userData = LoginStore.getState().userData;

        if (!userData) {
            console.error("User is not logged in");
            return;
        }

        BookingStore.getState()
            .fetchBookingsByClient(userData.id)
            .then((response) => {
                console.log(response);
                const totalItems = response.length;
                setTotalPages(Math.ceil(totalItems / itemsPerPage));
                setBookings(response);
                setFilteredBookings(response);
            })
            .catch((error) => console.error(error));
    }, []);

    useEffect(() => {
        if (!bookings) {
            console.error("Bookings is null");
        } else {
            const start = (currentPage - 1) * itemsPerPage;
            const end = start + itemsPerPage;
            setFilteredBookings(bookings.slice(start, end));
        }
    }, [currentPage, bookings]);

    const handleSearch = (searchTerm) => {
        const filtered = bookings.filter((booking) =>
            booking.adSpace.location.toLowerCase().includes(searchTerm.toLowerCase()
            ));
        setFilteredBookings(filtered);
    }

    const handleSortChange = (event) => {
        const selectedSortOption = event.target.value;
        setSortOption(selectedSortOption);

        let sortedBookings;
        switch (selectedSortOption) {
            case "alphabetical":
                sortedBookings = [...filteredBookings].sort((a, b) =>
                    a.location.localeCompare(b.location)
                );
                break;
            case "price":
                sortedBookings = [...filteredBookings].sort(
                    (a, b) => parseFloat(a.price) - parseFloat(b.price)
                );
                break;
            default:
                sortedBookings = [...bookings];
                break;
        }

        setFilteredBookings(sortedBookings);
    };

    const handlePageChange = (event, newPage) => {
        setCurrentPage(newPage);
        if (listRef.current) {
            listRef.current.scrollIntoView({behavior: "smooth"});
        }
    };


    return (
        <div data-testid="bookingHistory-1" style={{paddingTop: "64px"}}>

            <NavbarUser/>
            <Typography
                variant="h5"
                gutterBottom
                sx={{fontSize: "30px", marginLeft: "25px", marginTop: "30px"}}
            >
                Your Booking History
            </Typography>
            <Container ref={listRef}>
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
                    <SearchBar onSearch={handleSearch} testId="searchHistoryPage-1"/>
                    <FormControl
                        style={{
                            width: "100%",
                            maxWidth: "200px",
                        }}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "6px",
                                height: "40px",
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
                <div className="listContainer">
                    <div className="listWrapper">
                        <div className="listResult">
                            {filteredBookings.length > 0 ? (
                                filteredBookings.map((booking) => (
                                    <SearchItem key={booking.id} booking={booking}/>
                                ))
                            ) : (
                                <div
                                    style={{
                                        textAlign: "center",
                                        padding: "20px",
                                        color: "gray",
                                    }}
                                >
                                    No bookings found.
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
                            {filteredBookings.length > 0 && (
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

export default BookingHistory;
