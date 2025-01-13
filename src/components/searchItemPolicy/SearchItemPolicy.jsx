import React from "react";
import "../mySpaceItem/mySpaceItem.css";

export const formatAdSpaceType = (officeType) => {
    const lowerCaseAdSpaceType = officeType.toLowerCase();
    const words = lowerCaseAdSpaceType.split('_');
    const formattedAdSpaceType = words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    return formattedAdSpaceType;
};

const SearchItem = ({user, onUpdate}) => {

    return (
        <div>
            <div className="searchItemHis">
                <div className="siDescHis">
                    <h1 className="siTitleHis">{user.username}</h1>
                    <h1 className="siTitleHis">{`${user.first_name} ${user.last_name}`}</h1>
                    <span className="siFeaturesHis">{user.email}</span>
                    <span className="siFeaturesHis">{user.contact_info}</span>
                    <span className="siFeaturesHis">{`Joined: ${user.date_joined}`}</span>
                </div>
            </div>
        </div>
    );
};

export default SearchItem;
