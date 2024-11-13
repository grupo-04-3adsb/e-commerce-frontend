// StarRating.js
import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const StarRating = ({ rating }) => {
  const stars = [];
  const ratingValue = isNaN(rating) ? 0 : rating; 

  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(ratingValue)) {
      stars.push(<FaStar key={i} color="#FFD700" />); // Estrela cheia
    } else if (i === Math.ceil(ratingValue) && !Number.isInteger(ratingValue)) {
      stars.push(<FaStarHalfAlt key={i} color="#FFD700" />); // Meia estrela
    } else {
      stars.push(<FaRegStar key={i} color="#FFD700" />); // Estrela vazia
    }
  }

  return <div style={{ display: 'flex', gap: '4px' }}>{stars}</div>;
};

export default StarRating;
