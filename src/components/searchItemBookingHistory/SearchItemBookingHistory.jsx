// SearchItemBookingHistory.js
import React from "react";
import "./searchItemBookingHistory.css";
import { Link } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';

export const formatOfficeType = (officeType) => {
  const lowerCaseOfficeType = officeType.toLowerCase();
  const words = lowerCaseOfficeType.split('_');
  const formattedOfficeType = words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  return formattedOfficeType;
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


const SearchItem = ({ booking }) => { // Changed prop name to 'booking'
  const bookingDate = new Date(booking.bookingDate);
  const formattedBookingDate = bookingDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  return (
    <div data-testid="searchItemBookingHistory-1">
      <ThemeProvider theme={defaultTheme}>
        <Link to={`/booking-history/${booking.id}`} style={{ color: 'inherit', textDecoration: 'inherit'}}>
            <div className="searchItemHis">
              {booking.adSpace.photos && (
                  <img
                      src={booking.adSpace.photos} // Assuming photos is an array, so accessing the first one
                      alt={booking.adSpace.location}
                      className="siImgHis"
                  />
              )}
              <div className="siDescHis">
                <h1 className="siTitleHis">{booking.adSpace.location}</h1>
                <div style={{marginTop: "auto"}}/>
                <div>
                  <span className="siHeading">Date of booking:</span>
                  <span className="siPriceHis">{formattedBookingDate}</span>
                </div>
                <div>
                  <span className="siHeading">Size:</span>
                  <span className="siPriceHis">{booking.adSpace.size}</span>
                </div>
                <div>
                  <span className="siHeading">Price:</span>
                  <span className="siPriceHis">{`$${booking.adSpace.price}`}</span>
                </div>
              </div>
            </div>
        </Link>
      </ThemeProvider>
    </div>
  );
};

export default SearchItem;