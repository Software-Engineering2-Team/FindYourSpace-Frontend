import React, { useState, useEffect } from 'react';
import { Container, FormControl, InputLabel, MenuItem, Select, Pagination, Checkbox, FormControlLabel, FormGroup, Typography } from '@mui/material';
import SearchBar from './Search';
import SearchItem from '../../components/searchItem/SearchItem';
import Navbar from '../../components/navbar/Navbar';
import OfficeStore from '../../api/OfficeStore';
import MarketingComponent from '../../components/marketingComponent/MarketingComponent';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LoginStore from '../../api/LoginStore';
import NavbarAdmin from '../../components/navbarAdmin/NavbarAdmin';


const List = () => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [officeSpaces, setOfficeSpaces] = useState(OfficeStore.getState().offices);
  const [filteredOfficeSpaces, setFilteredOfficeSpaces] = useState(OfficeStore.getState().offices);
  const [sortOption, setSortOption] = useState('default');
  const listRef = React.createRef();

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);

  useEffect(() => {
    OfficeStore.getState()
        .fetchOffices(1000, 0)
        .then(response => response.json())
        .then(response => {
          console.log(response);
          const totalItems = response.length;
          setTotalPages(Math.ceil(totalItems / itemsPerPage));
          OfficeStore.getState().setOffices(response);
          setOfficeSpaces(response);
          setFilteredOfficeSpaces(response);
        })
        .catch(error => console.error(error));
  }, []);


  const handleCategoryChange = (category) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];
    setSelectedCategories(updatedCategories);
  };
  
  const handleCountryChange = (country) => {
    const updatedCountries = selectedCountries.includes(country)
      ? selectedCountries.filter((c) => c !== country)
      : [...selectedCountries, country];
    setSelectedCountries(updatedCountries);
  };
  
  const handleCityChange = (city) => {
    const updatedCities = selectedCities.includes(city)
      ? selectedCities.filter((c) => c !== city)
      : [...selectedCities, city];
    setSelectedCities(updatedCities);
  };

  const handleOfficeUpdate = async () => {
    try {
      const response = await OfficeStore.getState().fetchOffices(1000, 0);
      const data = await response.json();
      
      OfficeStore.getState().setOffices(data);
      setOfficeSpaces(data);
      setFilteredOfficeSpaces(data);
    } catch (error) {
      console.error("Error updating offices:", error);
    }
  };

  useEffect(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const slicedSpaces = officeSpaces.slice(start, end);
    setFilteredOfficeSpaces(slicedSpaces);
  }, [currentPage, officeSpaces]);

  // const handleSearch = (searchTerm) => {
  //   const filteredSpaces = officeSpaces.filter(space =>
  //       space.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       space.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       space.officeType.toLowerCase().includes(searchTerm.toLowerCase())
  //   );

  //   setFilteredOfficeSpaces(filteredSpaces);
  // };
  const handleSearch = (searchTerm) => {
    let filteredSpaces = officeSpaces.filter((space) =>
      space.location.toLowerCase().includes(searchTerm.toLowerCase())

    );
  
    if (selectedCategories.length > 0) {
      filteredSpaces = filteredSpaces.filter((space) =>
        selectedCategories.includes(space.category)
      );
    }
  
    // Apply similar filtering for countries and cities
  
    setFilteredOfficeSpaces(filteredSpaces);
  };

  const handleSortChange = (event) => {
    const selectedSortOption = event.target.value;
    setSortOption(selectedSortOption);

    let sortedSpaces;
    switch (selectedSortOption) {
      case 'alphabetical':
        sortedSpaces = [...filteredOfficeSpaces].sort((a, b) =>
            a.location.localeCompare(b.location)
        );
        break;
      case 'price':
        sortedSpaces = [...filteredOfficeSpaces].sort((a, b) =>
            parseFloat(a.price) - parseFloat(b.price)
        );
        break;
      // case 'features':
      //   sortedSpaces = [...filteredOfficeSpaces].sort((a, b) =>
      //       a.officeType.localeCompare(b.officeType)
      //   );
      //   break;s
      default:
        sortedSpaces = [...officeSpaces];
        break;
    }

    setFilteredOfficeSpaces(sortedSpaces);
  };

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
    if (listRef.current) {
      listRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleClearFilters = () => {
    setSelectedCategories([]);
    setSelectedCountries([]);
    setSelectedCities([]);
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
    <div data-testid="list-1">
      <ThemeProvider theme={defaultTheme}>
        <Navbar/>
        <div style={{ height: '1px', backgroundColor: 'white' }} />
        <MarketingComponent/>
        <Container ref={listRef} style={{ display: 'flex', justifyContent: 'center'}}>
          <div style={{ width: '250px' ,marginTop: '30px'}}>
          <div style={{ display: 'flex', alignItems: 'center'}}>
            <Typography variant="h6" gutterBottom style={{ fontSize: '1.5rem', marginBottom: '5px', fontWeight: 'bold', marginRight: '10px' }}>Filters</Typography>
            <Typography  variant="subtitle2" gutterBottom style={{ fontSize: '1rem',marginTop:'1.5px',marginLeft:'20px'}}>
              <span style={{ color: 'black', cursor: 'pointer' }} onClick={handleClearFilters}>Clear</span>
            </Typography>
          </div>
            <div style={{ marginBottom: '10px' }}>
              <Typography variant="subtitle2" gutterBottom style={{ fontSize: '1rem', marginBottom: '5px', fontWeight: 'bold' }}>Categories</Typography>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox checked={selectedCategories.includes('Digital Billboard')} onChange={() => handleCategoryChange('Digital Billboard')} />}
                  label={<span style={{ fontSize: '0.9rem' }}>Digital Billboard</span>}
                />
                <FormControlLabel
                  control={<Checkbox checked={selectedCategories.includes('Print Media Spaces')} onChange={() => handleCategoryChange('Print Media Spaces')} />}
                  label={<span style={{ fontSize: '0.9rem' }}>Print Media Spaces</span>}
                />
                <FormControlLabel
                  control={<Checkbox checked={selectedCategories.includes('Transit Advertising')} onChange={() => handleCategoryChange('Transit Advertising')} />}
                  label={<span style={{ fontSize: '0.9rem' }}>Transit Advertising</span>}
                />
                <FormControlLabel
                  control={<Checkbox checked={selectedCategories.includes('Shopping Mall Spaces')} onChange={() => handleCategoryChange('Shopping Mall Spaces')} />}
                  label={<span style={{ fontSize: '0.9rem' }}>Shopping Mall Spaces</span>}
                />
                <FormControlLabel
                  control={<Checkbox checked={selectedCategories.includes('Online Platforms')} onChange={() => handleCategoryChange('Online Platforms')} />}
                  label={<span style={{ fontSize: '0.9rem' }}>Online Platforms</span>}
                />
              </FormGroup>
            </div>
            <div style={{ marginBottom: '10px' }}>
              <Typography variant="subtitle2" gutterBottom style={{ fontSize: '1rem', marginBottom: '5px', fontWeight: 'bold' }}>Countries</Typography>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox checked={selectedCountries.includes('Poland')} onChange={() => handleCountryChange('Poland')} />}
                  label={<span style={{ fontSize: '0.9rem' }}>Poland</span>}
                />
                <FormControlLabel
                  control={<Checkbox checked={selectedCountries.includes('USA')} onChange={() => handleCountryChange('USA')} />}
                  label={<span style={{ fontSize: '0.9rem' }}>USA</span>}
                />
                <FormControlLabel
                  control={<Checkbox checked={selectedCountries.includes('Japan')} onChange={() => handleCountryChange('Japan')} />}
                  label={<span style={{ fontSize: '0.9rem' }}>Japan</span>}
                />
                <FormControlLabel
                  control={<Checkbox checked={selectedCountries.includes('Germany')} onChange={() => handleCountryChange('Germany')} />}
                  label={<span style={{ fontSize: '0.9rem' }}>Germany</span>}
                />
                <FormControlLabel
                  control={<Checkbox checked={selectedCountries.includes('France')} onChange={() => handleCountryChange('France')} />}
                  label={<span style={{ fontSize: '0.9rem' }}>France</span>}
                />
              </FormGroup>
            </div>
            <div>
            <Typography variant="subtitle2" gutterBottom style={{ fontSize: '1rem', marginBottom: '5px', fontWeight: 'bold' }}>Cities</Typography>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox checked={selectedCities.includes('Poznan')} onChange={() => handleCityChange('Poznan')} />}
                  label={<span style={{ fontSize: '0.9rem' }}>Poznan</span>}
                />
                <FormControlLabel
                  control={<Checkbox checked={selectedCities.includes('Wroclaw')} onChange={() => handleCityChange('Wroclaw')} />}
                  label={<span style={{ fontSize: '0.9rem' }}>Wroclaw</span>}
                />
                <FormControlLabel
                  control={<Checkbox checked={selectedCities.includes('Warsaw')} onChange={() => handleCityChange('Warsaw')} />}
                  label={<span style={{ fontSize: '0.9rem' }}>Warsaw</span>}
                />
                <FormControlLabel
                  control={<Checkbox checked={selectedCities.includes('Cracow')} onChange={() => handleCityChange('Cracow')} />}
                  label={<span style={{ fontSize: '0.9rem' }}>Cracow</span>}
                />
                <FormControlLabel
                  control={<Checkbox checked={selectedCities.includes('New York')} onChange={() => handleCityChange('New York')} />}
                  label={<span style={{ fontSize: '0.9rem' }}>New York</span>}
                />
                <FormControlLabel
                  control={<Checkbox checked={selectedCities.includes('Chicago')} onChange={() => handleCityChange('Chicago')} />}
                  label={<span style={{ fontSize: '0.9rem' }}>Chicago</span>}
                />
                <FormControlLabel
                  control={<Checkbox checked={selectedCities.includes('Los Angeles')} onChange={() => handleCityChange('Los Angeles')} />}
                  label={<span style={{ fontSize: '0.9rem' }}>Los Angeles</span>}
                />
                <FormControlLabel
                  control={<Checkbox checked={selectedCities.includes('San Francisco')} onChange={() => handleCityChange('San Francisco')} />}
                  label={<span style={{ fontSize: '0.9rem' }}>San Francisco</span>}
                />
                <FormControlLabel
                  control={<Checkbox checked={selectedCities.includes('Tokyo')} onChange={() => handleCityChange('Tokyo')} />}
                  label={<span style={{ fontSize: '0.9rem' }}>Tokyo</span>}
                />
                <FormControlLabel
                  control={<Checkbox checked={selectedCities.includes('Kyoto')} onChange={() => handleCityChange('Kyoto')} />}
                  label={<span style={{ fontSize: '0.9rem' }}>Kyoto</span>}
                />
                <FormControlLabel
                  control={<Checkbox checked={selectedCities.includes('Osaka')} onChange={() => handleCityChange('Osaka')} />}
                  label={<span style={{ fontSize: '0.9rem' }}>Osaka</span>}
                />
                <FormControlLabel
                  control={<Checkbox checked={selectedCities.includes('Yokohama')} onChange={() => handleCityChange('Yokohama')} />}
                  label={<span style={{ fontSize: '0.9rem' }}>Yokohama</span>}
                />
                <FormControlLabel
                  control={<Checkbox checked={selectedCities.includes('Berlin')} onChange={() => handleCityChange('Berlin')} />}
                  label={<span style={{ fontSize: '0.9rem' }}>Berlin</span>}
                />
                <FormControlLabel
                  control={<Checkbox checked={selectedCities.includes('Hamburg')} onChange={() => handleCityChange('Hamburg')} />}
                  label={<span style={{ fontSize: '0.9rem' }}>Hamburg</span>}
                />
                <FormControlLabel
                  control={<Checkbox checked={selectedCities.includes('Frankfurt')} onChange={() => handleCityChange('Frankfurt')} />}
                  label={<span style={{ fontSize: '0.9rem' }}>Frankfurt</span>}
                />
                <FormControlLabel
                  control={<Checkbox checked={selectedCities.includes('Munich')} onChange={() => handleCityChange('Munich')} />}
                  label={<span style={{ fontSize: '0.9rem' }}>Munich</span>}
                />
                <FormControlLabel
                  control={<Checkbox checked={selectedCities.includes('Paris')} onChange={() => handleCityChange('Paris')} />}
                  label={<span style={{ fontSize: '0.9rem' }}>Paris</span>}
                />
                <FormControlLabel
                  control={<Checkbox checked={selectedCities.includes('Nice')} onChange={() => handleCityChange('Nice')} />}
                  label={<span style={{ fontSize: '0.9rem' }}>Nice</span>}
                />
                <FormControlLabel
                  control={<Checkbox checked={selectedCities.includes('Lyon')} onChange={() => handleCityChange('Lyon')} />}
                  label={<span style={{ fontSize: '0.9rem' }}>Lyon</span>}
                />
                <FormControlLabel
                  control={<Checkbox checked={selectedCities.includes('Marseille')} onChange={() => handleCityChange('Marseille')} />}
                  label={<span style={{ fontSize: '0.9rem' }}>Marseille</span>}
                />

              </FormGroup>
            </div>
          </div>

          <div style={{ width: '80%', marginLeft: '60px' }}>
            <SearchBar onSearch={handleSearch} />
            <FormControl style={{ margin: '20px 0' }}>
              <InputLabel htmlFor="sort">Sort by:</InputLabel>
              <Select id="sort" value={sortOption} onChange={handleSortChange} label="Sort by">
                <MenuItem value="default">Default</MenuItem>
                <MenuItem value="alphabetical">Alphabetical</MenuItem>
                <MenuItem value="price">Price</MenuItem>

              </Select>
            </FormControl>
            <div style={{ display: 'flex', flexWrap: 'wrap'}}>
              {filteredOfficeSpaces.map(space => (
                <div key={space.id} style={{ width: 'calc(100% / 3)' }}>
                  <SearchItem space={space} onUpdate={handleOfficeUpdate} />
                </div>
              ))}
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                paddingTop: '20px',
                marginBottom: '30px'
              }}
            >
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                size="large"
              />
              <div style={{ marginLeft: '20px' }}>Page {currentPage} of {totalPages}</div>
            </div>
          </div>
        </Container>

      </ThemeProvider>
      
    </div>
  );
};

export default List;
