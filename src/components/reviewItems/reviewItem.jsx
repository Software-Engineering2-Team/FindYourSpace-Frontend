import "./reviewItem.css";
import StarIcon from '@mui/icons-material/Star';
import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

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
const ReviewItem = ({review}) => {
  const starIcons = [];

  for (let index = 0; index < review.rating; index++) {
    starIcons.push(<StarIcon sx={{ fontSize: 18 }} key={index} color="black" />);
  }
  return (
    <div data-testid="reviewItem-1">
      <ThemeProvider theme={defaultTheme}>
        <Box style={{marginBottom:"50px"}}>
          <Stack direction="row" spacing={40} marginBottom={0.5}>
              <div style={{ width: '350px' }}>{starIcons}</div>
              <div><Typography sx={{fontSize: 15}}>{review.date}</Typography></div>
          </Stack>
          <Stack direction="row" spacing={40}>
              <div style={{ width: '350px' }}>
                <Typography sx={{fontSize: 24}}>{review.title}</Typography></div>
              <div><Typography sx={{fontSize: 15}}>{review.name}</Typography></div>
          </Stack>
          <div style={{ width: '60%' }}><Typography>{review.description}</Typography></div>
        </Box>
      </ThemeProvider>
    </div>
  );
};

export default ReviewItem;
