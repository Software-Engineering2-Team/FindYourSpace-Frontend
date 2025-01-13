import React, {useState, useEffect} from "react";
import EndPointLogStore from "../../api/EndpointLogStore";
import {Typography, Box, Paper} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import NavbarAdmin from "../../components/navbar/NavbarAdmin";

const EndpointRequestsTable = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true); // New state for loading

    useEffect(() => {
        EndPointLogStore.getState()
            .fetchLogs(1000, 0)
            .then((response) => response.json())
            .then((response) => {
                console.log(response);
                EndPointLogStore.getState().setEndpointLogs(response);
                setRequests(response);
            })
            .catch((error) => console.error(error))
            .finally(() => setLoading(false)); // Set loading to false after data is fetched
    }, []);

    const successfulRequestsCount = requests.filter(
        (request) => request.status_code === 200
    ).length;
    const failedRequestsCount = requests.filter(
        (request) => request.status_code !== 200
    ).length;
    const totalRequestsCount = requests.length;
    const successPercentage = totalRequestsCount
        ? ((successfulRequestsCount / totalRequestsCount) * 100).toFixed(2)
        : 0;

    let successPercentageColor = "";
    if (successPercentage >= 75) {
        successPercentageColor = "green";
    } else if (successPercentage >= 50) {
        successPercentageColor = "yellow";
    } else {
        successPercentageColor = "red";
    }

    return (
        <div data-testid="platformHealth-1" style={{paddingTop: "64px"}}>
            <NavbarAdmin/>
            <Typography
                variant="h5"
                gutterBottom
                sx={{fontSize: "30px", marginLeft: "25px", marginTop: "30px"}}
            >
                Endpoint Requests
            </Typography>
            <Box sx={{margin: "3%"}}>
                {loading ? ( // Show loading indicator while data is being fetched
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "200px",
                        }}
                    >
                        Loading...
                    </Box>
                ) : (
                    <>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                marginBottom: "60px",
                                marginLeft: "4%",
                            }}
                        >
                            <Paper
                                elevation={5}
                                sx={{padding: "30px", marginRight: "45px", borderRadius: "13px"}}
                            >
                                <Typography variant="h6" color="green">
                                    Successful Requests
                                </Typography>
                                <Typography variant="h4" color="green" align="center">
                                    {successfulRequestsCount}
                                </Typography>
                            </Paper>
                            <Paper
                                elevation={5}
                                sx={{padding: "30px", marginRight: "45px", borderRadius: "13px"}}
                            >
                                <Typography variant="h6" color="red">
                                    Failed Requests
                                </Typography>
                                <Typography variant="h4" color="red" align="center">
                                    {failedRequestsCount}
                                </Typography>
                            </Paper>
                            <Paper
                                elevation={5}
                                sx={{padding: "30px", marginRight: "45px", borderRadius: "13px"}}
                            >
                                <Typography variant="h6" color={successPercentageColor}>
                                    Success Percentage
                                </Typography>
                                <Typography
                                    variant="h4"
                                    align="center"
                                    color={successPercentageColor}
                                >
                                    {successPercentage}%
                                </Typography>
                            </Paper>
                        </Box>
                        <Paper elevation={5} sx={{borderRadius: "13px"}}>
                            <TableContainer width="80%">
                                <Table>
                                    <TableHead align="center">
                                        <TableRow>
                                            <TableCell align="center">Endpoint</TableCell>
                                            <TableCell align="center">Method</TableCell>
                                            <TableCell align="center">Status Code</TableCell>
                                            <TableCell align="center">Duration</TableCell>
                                            <TableCell align="center">Timestamp</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody align="center">
                                        {requests
                                            .slice()
                                            .reverse()
                                            .map((request) => (
                                                <TableRow key={request.id}>
                                                    <TableCell align="center">{request.path}</TableCell>
                                                    <TableCell align="center">{request.method}</TableCell>
                                                    <TableCell align="center">
                                                        {request.status_code}
                                                    </TableCell>
                                                    <TableCell align="center">{request.duration}</TableCell>
                                                    <TableCell align="center">
                                                        {request.timestamp}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </>
                )}
            </Box>
        </div>
    );
};

export default EndpointRequestsTable;
