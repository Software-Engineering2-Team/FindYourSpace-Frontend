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
      <Link to={`/booking-history/${space.id}`} style={{ color: 'inherit', textDecoration: 'inherit'}}>
          <div className="searchItemHis">
            {space.mainPhoto.length > 0 && (
                <img
                    src={space.mainPhoto}
                    alt={space.name}
                    className="siImgHis"
                />
            )}
              <div className="siDescHis">
                  <h1 className="siTitleHis">{space.name}</h1>
                  <span className="siSubtitleHis">{space.address}</span>
                  <span className="siFeaturesHis">{space.description}</span>
                  <span className="siPriceHis">{`$${space.pricePerDay}`}</span>
              </div>
          </div>
      </Link>
  );
};

export default SearchItem;
