import React, { useState } from "react";
import "./reviewItem.css";
import StarIcon from '@mui/icons-material/Star';

const starIcons = [];

  for (let index = 0; index < review.rating; index++) {
    starIcons.push(<StarIcon key={index} color="black" />);
  }

const ReviewItem = ({review}) => {
  return (
      
    <div>
        <Stack direction="row" spacing={5}>
            <Item>{starIcons}</Item>
            <Item>{review.date}</Item>
        </Stack>
        <Stack direction="row" spacing={5}>
            <Item>{review.title}</Item>
            <Item>{review.name}</Item>
        </Stack>
        <span className="siFeatures">{review.description}</span>
    </div>
     
  );
};

export default ReviewItem;
