import React from "react";
import "./searchItem.css";
import {Link} from "react-router-dom";

import Typography from "@mui/material/Typography";

export const formatAdSpaceType = (officeType) => {
    const lowerCaseAdSpaceType = officeType.toLowerCase();
    const words = lowerCaseAdSpaceType.split("_");
    const formattedAdSpaceType = words
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    return formattedAdSpaceType;
};


const SearchItem = ({space, onUpdate}) => {
    return (
        <div className="searchItem" data-testid="searchItem-1">

            {space.photos.length >= 0 && (
                <div className="imageContainer">
                    <Link to={`/space/${space.id}`}>
                        <img src={space.photos} alt={space.location} className="siImg"/>
                    </Link>
                </div>
            )}
            <div>
                <Typography
                    fontWeight="bold"
                    sx={{fontSize: "17px"}}
                >
                    {space.location}
                </Typography>
                <Typography sx={{fontSize: "15px"}}>
                    {`$${space.price}`}
                </Typography>
            </div>

        </div>
    );
};

export default SearchItem;
