import React, {useState, useEffect} from "react";
import {
    Container,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Pagination,
    Typography,
    Paper,
    Button,
    Stack,
} from "@mui/material";
import SearchBar from "../../components/searchBar/SearchBar";
import ApproveSpaceStore from "../../api/ApproveSpaceStore";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import NavbarAdmin from "../../components/navbar/NavbarAdmin";

const ApproveSpacesPage = () => {
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [approvedSpaces, setApprovedSpaces] = useState([]);
    const [filteredSpaces, setFilteredSpaces] = useState([]);
    const [sortOption, setSortOption] = useState("default");

    useEffect(() => {
        ApproveSpaceStore.getState()
            .fetchNonApprovedSpaces(1000, 0)
            .then((response) => response.json())
            .then((data) => {
                console.log("Spaces:", data);
                setTotalPages(Math.ceil(data.length / itemsPerPage));
                setApprovedSpaces(data);
                setFilteredSpaces(data);
            })
            .catch((error) => console.error("Error fetching spaces:", error));
    }, []);

    useEffect(() => {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const slicedSpaces = approvedSpaces.slice(start, end);
        setFilteredSpaces(slicedSpaces);
    }, [currentPage, approvedSpaces]);

    const handleSearch = (searchTerm) => {
        const filtered = approvedSpaces.filter((space) =>
            space.location.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredSpaces(filtered);
    };

    const handleSortChange = (event) => {
        const selectedSortOption = event.target.value;
        setSortOption(selectedSortOption);

        let sortedSpaces;
        switch (selectedSortOption) {
            case "alphabetical":
                sortedSpaces = [...filteredSpaces].sort((a, b) =>
                    a.location.localeCompare(b.location)
                );
                break;

            case "price":
                sortedSpaces = [...filteredSpaces].sort((a, b) =>
                    a.price.localeCompare(b.price)
                );
                break;

            default:
                sortedSpaces = [...approvedSpaces];
                break;
        }

        setFilteredSpaces(sortedSpaces);
    };

    const handlePageChange = (event, newPage) => {
        setCurrentPage(newPage);
    };

    const handleApprove = (id) => {
        fetch(`http://localhost:8000/api/adspace/${id}/update/`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({isApproved: true}),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(() => {
                setApprovedSpaces((prevSpaces) =>
                    prevSpaces.filter((space) => space.id !== id)
                );
                setFilteredSpaces((prevSpaces) =>
                    prevSpaces.filter((space) => space.id !== id)
                );
            })
            .catch((error) => console.error("Error approving space:", error));
    };

    const handleDisapprove = (id) => {
        fetch(`http://localhost:8000/api/adspace/${id}/delete/`, {
            method: "DELETE",
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                setApprovedSpaces((prevSpaces) =>
                    prevSpaces.filter((space) => space.id !== id)
                );
                setFilteredSpaces((prevSpaces) =>
                    prevSpaces.filter((space) => space.id !== id)
                );
            })
            .catch((error) => console.error("Error deleting space:", error));
    };

    return (
        <div data-testid="ApproveSpacesPage-1" style={{paddingTop: "64px"}}>

            <NavbarAdmin/>
            <Typography
                variant="h5"
                gutterBottom
                sx={{fontSize: "30px", marginLeft: "25px", marginTop: "30px"}}
            >
                Reviewing and Approving Spaces
            </Typography>
            <Container>
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "50px",
                    gap: "20px"
                }}>
                    <SearchBar onSearch={handleSearch} testId="searchApproveSpacesPage-1"/>
                    <FormControl
                        style={{
                            width: "100%",
                            maxWidth: "200px",
                        }}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "6px",
                                height: "40px",
                            },
                        }}
                    >
                        <InputLabel htmlFor="sort">Sort by:</InputLabel>
                        <Select
                            id="sort"
                            value={sortOption}
                            onChange={handleSortChange}
                            label="Sort by"
                        >
                            <MenuItem value="default">Default</MenuItem>
                            <MenuItem value="alphabetical">Alphabetical</MenuItem>
                            <MenuItem value="price">Price</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <Paper elevation={4} style={{borderRadius: "9px"}}>
                    <TableContainer>
                        <Table>
                            <TableHead align="center">
                                <TableRow>
                                    <TableCell align="center">Space ID</TableCell>
                                    <TableCell align="center">Location</TableCell>
                                    <TableCell align="center">Size</TableCell>
                                    <TableCell align="center">Price</TableCell>
                                    <TableCell align="center">Owner Id</TableCell>
                                    <TableCell align="center">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody align="center">
                                {filteredSpaces.map((space) => (
                                    <TableRow key={space.id}>
                                        <TableCell align="center">{space.id}</TableCell>
                                        <TableCell align="center">{space.location}</TableCell>
                                        <TableCell align="center">{space.size}</TableCell>
                                        <TableCell align="center">{space.price}</TableCell>
                                        <TableCell align="center">{space.owner_id}</TableCell>
                                        <TableCell align="center" sx={{width: "25%"}}>
                                            <Stack
                                                align="center"
                                                direction="row"
                                                spacing={2}
                                                sx={{justifyContent: "center"}}
                                            >
                                                <Button
                                                    variant="outlined"
                                                    color="success"
                                                    onClick={() => handleApprove(space.id)}
                                                    style={{borderRadius: "7px"}}
                                                >
                                                    Approve
                                                </Button>
                                                <Button
                                                    variant="outlined"
                                                    color="error"
                                                    onClick={() => handleDisapprove(space.id)}
                                                    style={{borderRadius: "7px"}}
                                                >
                                                    Disapprove
                                                </Button>
                                            </Stack>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        margin: "50px",
                    }}
                >
                    <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={handlePageChange}
                        color="primary"
                        size="large"
                    />
                    <Typography variant="body2" style={{marginLeft: "10px"}}>
                        {`Page ${currentPage} of ${totalPages}`}
                    </Typography>
                </div>
            </Container>

        </div>
    );
};

export default ApproveSpacesPage;
