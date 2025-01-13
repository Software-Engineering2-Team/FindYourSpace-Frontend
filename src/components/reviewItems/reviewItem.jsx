import StarIcon from "@mui/icons-material/Star";
import Stack from "@mui/material/Stack";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const ReviewItem = ({review}) => {
    const starIcons = [];

    for (let index = 0; index < review.rating; index++) {
        starIcons.push(
            <StarIcon sx={{fontSize: 18}} key={index} color="black"/>
        );
    }
    return (
        <div data-testid="reviewItem-1">

            <Box
                style={{marginBottom: "20px"}}
                sx={{
                    boxShadow: "0px 0px 16px rgba(0, 0, 0, 0.1)",
                    borderRadius: "9px",
                    margin: {xs: "10px", md: "10px"},
                    padding: {xs: "24px", md: "32px"},
                    width: "80%",
                }}
            >
                <Stack direction="row" spacing={30} marginBottom={0.5}>
                    <div style={{width: "350px"}}>{starIcons}</div>
                    <div style={{width: "150px"}}>
                        <Typography sx={{fontSize: 15}}>{review.date}</Typography>
                    </div>
                </Stack>
                <Stack direction="row" spacing={23}>
                    <div style={{width: "350px"}}>
                        <Typography sx={{fontSize: 24}}>{review.title}</Typography>
                    </div>
                    <div>
                        <Typography sx={{fontSize: 15}}>{review.name}</Typography>
                    </div>
                </Stack>
                <div style={{width: "100%"}}>
                    <Typography>{review.description}</Typography>
                </div>
            </Box>

        </div>
    );
};

export default ReviewItem;
