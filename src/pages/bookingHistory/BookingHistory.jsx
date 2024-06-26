// BookingHistory.js
import React, { useState, useEffect } from 'react';
import { Container, FormControl, InputLabel, MenuItem, Select, Pagination, Typography } from '@mui/material';
import SearchBar from './SearchBookingHistory';
import SearchItem from '../../components/searchItemBookingHistory/SearchItemBookingHistory';
import Navbar from '../../components/navbar/Navbar';
import useBookingStore from '../../api/BookingStore';
import LoginStore from '../../api/LoginStore';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const BookingHistory = () => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [sortOption, setSortOption] = useState('default');
  const listRef = React.createRef();
  
  const { bookings, fetchBookingsByClient} = useBookingStore();
  const { userData } = LoginStore.getState();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const parsedUserData = userData;
        const clientId = parsedUserData.id;
        await fetchBookingsByClient(clientId);
      } catch (error) {
        console.error('Error fetching booking data:', error);
      }
    };
    fetchBookings();
  }, [fetchBookingsByClient, userData]);

  useEffect(() => {
    if(!bookings){
      console.error("Bookings are null")
    }else{
      setFilteredBookings(bookings);
      setTotalPages(Math.ceil(bookings.length / itemsPerPage));
    }
    
  }, [bookings]);

  useEffect(() => {
    if(!bookings){
      console.error("Bookings is null")
    }else{
      const start = (currentPage - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      setFilteredBookings(bookings.slice(start, end));
    }
    
  }, [currentPage, bookings]);

  const handleSearch = (searchTerm) => {
    const filtered = bookings.filter(booking =>
      booking.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBookings(filtered);
  };

  const handleSortChange = (event) => {
    const selectedSortOption = event.target.value;
    setSortOption(selectedSortOption);

    let sortedBookings;
    switch (selectedSortOption) {
      case 'alphabetical':
        sortedBookings = [...filteredBookings].sort((a, b) =>
          a.location.localeCompare(b.location)
        );
        break;
      case 'price':
        sortedBookings = [...filteredBookings].sort((a, b) =>
          parseFloat(a.price) - parseFloat(b.price)
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
      listRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const defaultTheme = createTheme({
    palette: {
      primary: {
        main: '#000000',
      },
    },
    typography: {
      fontFamily: 'Dubai Medium',
    },
  });

  return (
    <div data-testid="bookingHistory-1">
      <ThemeProvider theme={defaultTheme}>
        <Navbar />
        <Typography variant="h5" gutterBottom sx={{ fontSize: '30px', marginLeft: '25px', marginTop: '30px' }}>
          Your Booking History
        </Typography>
        <Container ref={listRef}>
          <SearchBar onSearchHistory={handleSearch} />
          <FormControl style={{ margin: '20px 0' }}>
            <InputLabel htmlFor="sort">Sort by:</InputLabel>
            <Select id="sort" value={sortOption} onChange={handleSortChange} label="Sort by">
              <MenuItem value="default">Default</MenuItem>
              <MenuItem value="alphabetical">Alphabetical</MenuItem>
              <MenuItem value="price">Price</MenuItem>
            </Select>
          </FormControl>
          <div className="listContainer">
            <div className="listWrapper">
              <div className="listResult">
                {filteredBookings.map(booking => (
                  <SearchItem key={booking.id} booking={booking} />
                ))}
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  paddingTop: '20px',
                  marginBottom: '30px'
                }}
              >
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={handlePageChange}
                  color="primary"
                  size="large"
                />
                <div style={{ marginLeft: '20px' }}>Page {currentPage} of {totalPages}</div>
              </div>
            </div>
          </div>
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default BookingHistory;
