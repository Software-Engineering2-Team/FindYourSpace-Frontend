// SearchItemBookingHistory.js
import React from "react";
import {Link} from "react-router-dom";


export const formatAdSpaceType = (officeType) => {
    const lowerCaseAdSpaceType = officeType.toLowerCase();
    const words = lowerCaseAdSpaceType.split("_");
    const formattedAdSpaceType = words
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    return formattedAdSpaceType;
};

const SearchItem = ({booking}) => {
    // Changed prop name to 'booking'
    if (!booking) {
        booking = {
            id: 0,
            adSpace: {
                id: 0,
                location: "",
                size: 0,
                price: 0,
                availability: true,
                photos: "",
                isApproved: 0,
                owner: 0,
            },
            bookingDate: "2024-05-04T12:00:00",
            status: true,
        };
    }
    const bookingDate = new Date(booking.bookingDate);
    const formattedBookingDate = bookingDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
    return (
        <div data-testid="searchItemBookingHistory-1">

            <Link
                to={`/booking-history/${booking.id}`}
                style={{color: "inherit", textDecoration: "inherit"}}
            >
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

        </div>
    );
};

export default SearchItem;
