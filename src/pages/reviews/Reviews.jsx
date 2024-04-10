import React, { useState, useEffect } from 'react';
import { Container, FormControl, InputLabel, MenuItem, Select, Pagination } from '@mui/material';
import Navbar from '../../components/navbar/Navbar';
import ReviewsStore from '../../api/ReviewsStore';
import ReviewItem from '../../components/reviewItems/reviewItem';
const Reviews = () => {
  const {id} = useParams()
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [reviews,setReviews] = useState([])

  const listRef = React.createRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ReviewsStore.getState().fetchReviewsBySpaceId(id);
        const data = await response.json();
        setReviews(data);
        setTotalPages(Math.ceil(data.length / itemsPerPage));
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };
    fetchData();
  }, [id]);

  
  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
    if (listRef.current) {
      listRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
      <div>
        <Navbar />
        <Typography>Reviews</Typography>
        <Container ref={listRef}>
          <div className="listContainer">
              <div className="listWrapper">
                <div className="listResult">
                  {reviews.map(review => (
                      <ReviewItem key={space.id} review={review}/>
                  ))}
                </div>
                <div
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                      paddingTop: '20px', // Adjust as needed
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
                  <div style={{marginLeft: '20px'}}>Page {currentPage} of {totalPages}</div>
                </div>
              </div>
          </div>
        </Container>
      </div>
);
};

export default Reviews;