import React, { useState, useEffect } from "react";
import EndPointLogStore from "../../api/EndpointLogStore";
import { Typography, Box, Paper } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import NavbarAdmin from "../../components/navbarAdmin/NavbarAdmin";
const EndpointRequestsTable = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    EndPointLogStore.getState()
      .fetchLogs(1000, 0)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        EndPointLogStore.getState().setEndpointLogs(response);
        setRequests(response);
      })
      .catch((error) => console.error(error));
  }, []);

  // Calculate counts and success percentage
  const successfulRequestsCount = requests.filter(
    (request) => request.status_code === 200
  ).length;
  const failedRequestsCount = requests.filter(
    (request) => request.status_code !== 200
  ).length;
  const totalRequestsCount = requests.length;
  const successPercentage = (
    (successfulRequestsCount / totalRequestsCount) *
    100
  ).toFixed(2);
  // Define color based on success percentage value
  let successPercentageColor = "";
  if (successPercentage >= 75) {
    successPercentageColor = "green";
  } else if (successPercentage >= 50) {
    successPercentageColor = "yellow";
  } else {
    successPercentageColor = "red";
  }

  const defaultTheme = createTheme({
    palette: {
      primary: {
        main: "#000000",
      },
    },
    typography: {
      fontFamily:
        "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    },
  });

  return (
    <div data-testid="platformHealth-1" style={{ paddingTop: "64px" }}>
      <ThemeProvider theme={defaultTheme}>
        <NavbarAdmin />
        <Typography sx={{ marginTop: "2%", marginLeft: "5%" }}>
          <h2>Endpoint Requests</h2>
        </Typography>
        <Box sx={{ padding: "5%" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "60px",
              marginLeft: "4%",
            }}
          >
            <Paper elevation={5} sx={{ padding: "30px", marginRight: "45px" }}>
              <Typography variant="h6" color="green">
                Successful Requests
              </Typography>
              <Typography variant="h4" color="green" align="center">
                {successfulRequestsCount}
              </Typography>
            </Paper>
            <Paper elevation={5} sx={{ padding: "30px", marginRight: "45px" }}>
              <Typography variant="h6" color="red">
                Failed Requests
              </Typography>
              <Typography variant="h4" color="red" align="center">
                {failedRequestsCount}
              </Typography>
            </Paper>
            <Paper elevation={5} sx={{ padding: "30px" }}>
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
          <Paper elevation={4}>
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
                  {requests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell align="center">{request.path}</TableCell>
                      <TableCell align="center">{request.method}</TableCell>
                      <TableCell align="center">
                        {request.status_code}
                      </TableCell>
                      <TableCell align="center">{request.duration}</TableCell>
                      <TableCell align="center">{request.timestamp}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      </ThemeProvider>
    </div>
  );
};

export default EndpointRequestsTable;
