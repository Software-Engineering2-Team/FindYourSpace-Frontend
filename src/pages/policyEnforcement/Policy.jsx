// import React, { useState, useEffect } from 'react';
// import { Container, FormControl, InputLabel, MenuItem, Select, Pagination,Typography} from '@mui/material';
// import SearchBar from './SearchUsers';
// import SearchItem from '../../components/searchItemPolicy/SearchItemPolicy';
// import Navbar from '../../components/navbar/Navbar';
// import UserStore from '../../api/UserStore';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// const PolicyPage = () => {
//   const itemsPerPage = 10;
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [users, setUsers] = useState(UserStore.getState().users);
//   const [filteredUsers, setFilteredUsers] = useState(UserStore.getState().users);
//   const [sortOption, setSortOption] = useState('default');
//   const listRef = React.createRef();

//   useEffect(() => {
//     UserStore.getState()
//         .fetchUsers(1000, 0)
//         .then(response => response.json())
//         .then(response => {
//           console.log(response);
//           const totalItems = response.length;
//           setTotalPages(Math.ceil(totalItems / itemsPerPage));
//           UserStore.getState().setUsers(response);
//           setUsers(response);
//           setFilteredUsers(response);
//         })
//         .catch(error => console.error(error));
//   }, []);

//   const handleOfficeUpdate = async () => {
//     try {
//       const response = await UserStore.getState().fetchUsers(1000, 0);
//       const data = await response.json();
//       UserStore.getState().setUsers(data);
//       setUsers(data);
//       setFilteredUsers(data);
//     } catch (error) {
//       console.error("Error updating offices:", error);
//     }
//   };

//   useEffect(() => {
//     const start = (currentPage - 1) * itemsPerPage;
//     const end = start + itemsPerPage;
//     const slicedUsers = users.slice(start, end);
//     setFilteredUsers(slicedUsers);
//   }, [currentPage, users]);

//   const handleSearch = (searchTerm) => {
//     const filteredSpaces = users.filter(user =>
//         user.username.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     setFilteredUsers(filteredSpaces);
//   };

//   const handleSortChange = (event) => {
//     const selectedSortOption = event.target.value;
//     setSortOption(selectedSortOption);

//     let sortedSpaces;
//     switch (selectedSortOption) {
//       case 'alphabetical':
//         sortedSpaces = [...filteredUsers].sort((a, b) =>
//             a.location.localeCompare(b.location)
//         );
//         break;
//       case 'price':
//         sortedSpaces = [...filteredUsers].sort((a, b) =>
//             parseFloat(a.price) - parseFloat(b.price)
//         );
//         break;
//       default:
//         sortedSpaces = [...users];
//         break;
//     }

//     setFilteredUsers(sortedSpaces);
//   };

//   const handlePageChange = (event, newPage) => {
//     setCurrentPage(newPage);
//     if (listRef.current) {
//       listRef.current.scrollIntoView({ behavior: 'smooth' });
//     }
//   };

//   const defaultTheme = createTheme({
//     palette: {
//       primary: {
//         main: '#000000',
//       },
//     },
//     typography: {
//       fontFamily: 'Dubai Medium',
//     },
//   });

//   return (
//       <div data-testid="bookingHistory-1">
//         <ThemeProvider theme={defaultTheme}>
//           <Navbar />
//           <Typography variant="h5" gutterBottom sx={{ fontSize: '30px',marginLeft:'25px',marginTop:'30px' }}>
//             List of Users
//           </Typography>
//           <Container ref={listRef}>
//             <SearchBar onSearchHistory={handleSearch} />
//             <FormControl style={{ margin: '20px 0' }}>
//               <InputLabel htmlFor="sort">Sort by:</InputLabel>
//               <Select id="sort" value={sortOption} onChange={handleSortChange} label="Sort by">
//                 <MenuItem value="default">Default</MenuItem>
//                 <MenuItem value="alphabetical">Alphabetical</MenuItem>
//                 <MenuItem value="price">Price</MenuItem>
//               </Select>
//             </FormControl>
//             <div className="listContainer">
//                 <div className="listWrapper">
//                   <div className="listResult">
//                     {filteredUsers.map(user => (
//                         <SearchItem key={user.id} user={user} onUpdate={handleOfficeUpdate}/>
//                     ))}
//                   </div>
//                   <div
//                       style={{
//                         display: 'flex',
//                         justifyContent: 'flex-end',
//                         alignItems: 'center',
//                         paddingTop: '20px', // Adjust as needed
//                         marginBottom: '30px'
//                       }}
//                   >
//                     <Pagination
//                         count={totalPages}
//                         page={currentPage}
//                         onChange={handlePageChange}
//                         color="primary"
//                         size="large"
//                     />
//                     <div style={{marginLeft: '20px'}}>Page {currentPage} of {totalPages}</div>
//                   </div>
//                 </div>
//             </div>
//           </Container>

//         </ThemeProvider>
        
//       </div>
// );
// };

// export default PolicyPage;

import React, { useState, useEffect } from 'react';
import { Container, FormControl, InputLabel, MenuItem, Select, Pagination, Typography,Paper,Button} from '@mui/material';
import SearchBar from './SearchUsers';
import Navbar from '../../components/navbar/Navbar';
import UserStore from '../../api/UserStore';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const PolicyPage = () => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [sortOption, setSortOption] = useState('default');

  useEffect(() => {
    // Fetch user data when the component mounts
    UserStore.getState()
      .fetchUsers(1000, 0)
      .then((response) => response.json())
      .then((data) => {
        console.log("Users:", data);
        setTotalPages(Math.ceil(data.length / itemsPerPage));
        setUsers(data);
        setFilteredUsers(data);
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  useEffect(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const slicedUsers = users.slice(start, end);
    setFilteredUsers(slicedUsers);
  }, [currentPage, users]);

  const handleSearch = (searchTerm) => {
    const filteredUsers = users.filter(user =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) || user.first_name.toLowerCase().includes(searchTerm.toLowerCase())
      || user.last_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filteredUsers);
  };

  const handleSortChange = (event) => {
    const selectedSortOption = event.target.value;
    setSortOption(selectedSortOption);

    let sortedUsers;
    switch (selectedSortOption) {
      case 'alphabetical':
        sortedUsers = [...filteredUsers].sort((a, b) =>
          a.username.localeCompare(b.username)
        );
        break;
      // Add more sorting options if needed
      default:
        sortedUsers = [...users];
        break;
    }

    setFilteredUsers(sortedUsers);
  };

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
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

  return (
    <div data-testid="policyPage">
      <ThemeProvider theme={defaultTheme}>
        <Navbar />
        <Typography variant="h5" gutterBottom sx={{ fontSize: '30px', marginLeft: '25px', marginTop: '30px' }}>
          List of Users
        </Typography>
        <Container>
          <SearchBar onSearchHistory={handleSearch} />
          <FormControl style={{ margin: '20px 0' }}>
            <InputLabel htmlFor="sort">Sort by:</InputLabel>
            <Select id="sort" value={sortOption} onChange={handleSortChange} label="Sort by">
              <MenuItem value="default">Default</MenuItem>
              <MenuItem value="alphabetical">Alphabetical</MenuItem>
            </Select>
          </FormControl>
          <Paper elevation={4}>
            <TableContainer>
              <Table>
                <TableHead align="center">
                  <TableRow>
                  <TableCell align="center">User ID</TableCell>
                  <TableCell align="center">Username</TableCell>
                  <TableCell align="center">First Name</TableCell>
                  <TableCell align="center">Last Name</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">Date Joined</TableCell>
                  <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody align="center">
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell align="center">{user.id}</TableCell>
                      <TableCell align="center">{user.username}</TableCell>
                      <TableCell align="center">{user.first_name}</TableCell>
                      <TableCell align="center">{user.last_name}</TableCell>
                      <TableCell align="center">{user.email}</TableCell>
                      <TableCell align="center">{user.date_joined}</TableCell>
                      <TableCell align="center">
                        <Button variant="outlined" color="error">
                              Delete Account
                        </Button>   
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
          
          <Pagination sx={{ marginLeft: '88%', marginTop:'50px' }}
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            size="large"
          />
          <Typography variant="body2" sx={{marginLeft: '91%', marginTop:'10px' }}>{`Page ${currentPage} of ${totalPages}`}</Typography>
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default PolicyPage;
