import React from "react";
import "./searchItem.css";
// import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
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
      fontFamily: 'Dubai-Medium'
      
  },
});
const SearchItem = ({ space, onUpdate }) => {
  // const navigate = useNavigate();
  // const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  // const handleDeleteClick = async (office) => {
  //   try {
  //     console.log("Delete Clicked");
  //     await OfficeStore.getState().deleteOffice(office);

  //     // Call the onUpdate function from props to update the office list
  //     onUpdate();
  //   } catch (error) {
  //     console.error("Error deleting office:", error);
  //   }
  // };

  // const handleDeleteConfirmation = () => {
  //   setShowDeleteConfirmation(true);
  // };

  // const handleDeleteCancel = () => {
  //   setShowDeleteConfirmation(false);
  // };

  // const handleDeleteConfirmed = () => {
  //   handleDeleteClick(space);
  //   setShowDeleteConfirmation(false);
  // };
  

  return (
    <div className="searchItem" data-testid="searchItem-1">
      <ThemeProvider theme={defaultTheme}/>
      {space.photos.length >= 0 && (
        <div className="imageContainer">
          <Link to={`/space/${space.id}`}>
            <img
              src={space.photos}
              alt = {space.location}
              className="siImg"
            />
          </Link>
        </div>
      )}
      <div>
        <Typography
          component="h2"
          variant="h5"
          fontWeight="bold"
          sx={{fontSize: '17px'}}>
          {space.location}
        </Typography>
        <Typography
          component="h2"
          variant="h5"
          sx={{fontSize: '15px'}}>
          {`$${space.price}`}
        </Typography>
      </div>
    </div>
  );
};

export default SearchItem;
