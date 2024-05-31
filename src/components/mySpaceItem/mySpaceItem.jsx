import React from "react";
import "./mySpaceItem.css";
import {Link} from "react-router-dom";
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

const MySpaceItem = ({ space, onUpdate }) => {

  return (
    <div data-testid="mySpaceItem-1" className="mySpaceItem-container">
      <ThemeProvider theme={defaultTheme}>
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
        </ThemeProvider>
      </div>
  );
};

export default MySpaceItem;
