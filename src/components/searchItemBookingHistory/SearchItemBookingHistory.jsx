import React from "react";
import "./searchItemBookingHistory.css";
import {Link} from "react-router-dom";

export const formatOfficeType = (officeType) => {
  const lowerCaseOfficeType = officeType.toLowerCase();
  const words = lowerCaseOfficeType.split('_');
  const formattedOfficeType = words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  return formattedOfficeType;
};

const SearchItem = ({ space, onUpdate }) => {
 
  return (
    <div data-testid="searchItemBookingHistory-1">
      <Link to={`/booking-history/${space.id}`} style={{ color: 'inherit', textDecoration: 'inherit'}}>
          <div className="searchItemHis">
            {space.photos.length > 0 && (
                <img
                    src={space.photos}
                    alt={space.location}
                    className="siImgHis"
                />
            )}
              <div className="siDescHis">
                  <h1 className="siTitleHis">{space.location}</h1>
                  <span className="siFeaturesHis">{`${space.price} meter square`}</span>
                  <span className="siPriceHis">{`$${space.price}`}</span>
              </div>
          </div>
      </Link>
    </div>
  );
};

export default SearchItem;
