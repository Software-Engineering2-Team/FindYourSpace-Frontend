import React from "react";
import "./mySpaceItem.css";
import {Link} from "react-router-dom";
import { FaTrash } from "react-icons/fa";

export const formatOfficeType = (officeType) => {
  const lowerCaseOfficeType = officeType.toLowerCase();
  const words = lowerCaseOfficeType.split('_');
  const formattedOfficeType = words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  return formattedOfficeType;
};

const MySpaceItem = ({ space, onUpdate }) => {
 
  const handleDelete = () => {};

  return (
    <div data-testid="mySpaceItem-1" className="mySpaceItem-container">
        <Link to={`/myspaces/${space.id}`} style={{ color: 'inherit', textDecoration: 'inherit'}}>
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
                    <span className="siFeaturesHis">{space.description}</span>
                    <span className="siPriceHis">{`$${space.price}`}</span>
                </div>
            </div>
        </Link>
        <button className="deleteIcon" onClick={handleDelete}><FaTrash /></button>
      </div>
  );
};

export default MySpaceItem;
