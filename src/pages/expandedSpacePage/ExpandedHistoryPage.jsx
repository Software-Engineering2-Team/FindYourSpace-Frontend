import React, {useState, useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import NavbarUser from "../../components/navbar/NavbarUser";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import BookingStore from "../../api/BookingStore";
import LoginStore from "../../api/LoginStore";

const ExpandedHistoryPage = () => {
    const [space, setSpace] = useState(null);
    const {id} = useParams();
    const bookingId = parseInt(id, 10);
    const [booking, setBooking] = useState("");
    const [adSpaceID, setAdSpaceID] = useState("");

    useEffect(() => {
        const userData = LoginStore.getState().userData;

        if (!userData) {
            console.error("User is not logged in");
            return;
        }

        const fetchData = async () => {
            try {
                const bookings = await BookingStore.getState().fetchBookingsByClient(userData.id);
                console.log("bookings", bookings)
                const booking = bookings.find((booking) => booking.id === bookingId);
                setBooking(booking);
                if (!booking) {
                    console.error(`No booking found with id: ${bookingId}`);
                    return;
                }
                const fetchedData = booking.adSpace;
                setAdSpaceID(fetchedData.id)
                console.log("Fetched ad space:", fetchedData);

                setSpace(fetchedData);
            } catch (error) {
                console.error("Error fetching expanded ad space:", error);
            }
        };
        fetchData();
    }, [bookingId]);

    const bookingDate = new Date(booking.bookingDate);
    const formattedBookingDate = bookingDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <div data-testid="expandedSpacePage-1" style={{paddingTop: "64px"}}>
            <NavbarUser/>
            <Grid
                container
                component="main"
                sx={{
                    height: "90vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "10%",
                }}
            >
                {/* Image Section */}
                <Grid
                    item
                    xs={12}
                    md={6}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <img
                        src={space?.photos}
                        alt="Space"
                        style={{
                            width: "100%",
                            height: "auto",
                            borderRadius: "13px",
                            objectFit: "cover",
                        }}
                    />
                </Grid>

                <Grid
                    item
                    xs={12}
                    md={6}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        justifyContent: "center",
                        padding: "5%",
                    }}
                >
                    <Box sx={{width: "100%"}}>
                        <Typography variant="h5" gutterBottom sx={{fontSize: "40px"}}>
                            {space?.location}
                        </Typography>
    
                        <Typography
                            marginTop="10px"
                            variant="body1"
                            gutterBottom
                            sx={{fontSize: "18px"}}
                        >
                            <strong>Booking ID:</strong> {booking?.id}
                        </Typography>
                        <Typography
                            marginTop="10px"
                            variant="body1"
                            gutterBottom
                            sx={{fontSize: "18px"}}
                        >
                            Booking Date: {formattedBookingDate}
                        </Typography>

                        <Typography
                            marginTop="10px"
                            variant="body1"
                            gutterBottom
                            sx={{fontSize: "18px"}}
                        >
                            Fare per day: {`$${space?.price}/day`}
                        </Typography>
                        <Typography
                            marginTop="10px"
                            variant="body1"
                            gutterBottom
                            sx={{fontSize: "18px"}}
                        >
                            Size: {`${space?.size} meter square`}
                        </Typography>

                        <Grid
                            container
                            spacing={2}
                            justifyContent="left"
                            marginTop="10px"
                        >
                            <Grid item>
                                <Link to={`/reviews/${adSpaceID}`}>
                                    <Button style={{borderRadius: "6px"}} variant="contained">
                                        Reviews
                                    </Button>
                                </Link>
                            </Grid>
                            <Grid item>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    style={{borderRadius: "6px"}}
                                    component={Link}
                                    to={`/contact/${id}`}
                                >
                                    Contact Space Owner
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </div>
    );
};

export default ExpandedHistoryPage;
