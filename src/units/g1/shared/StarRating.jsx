import React, { useState } from 'react';
import './StarRating.css';

import starFilledUrl from '../unitOne/L1/assets/star-filled.svg';
import starEmptyUrl from '../unitOne/L1/assets/star-empty.svg';

const Star = ({ marked, starId }) => {
  return (
    <span data-star-id={starId} className="star" role="button">
      <img
        src={marked ? starFilledUrl : starEmptyUrl}
        alt={marked ? 'Filled Star' : 'Empty Star'}
        data-star-id={starId} 
      />
    </span>
  );
};

const StarRating = ({ value }) => {
  const [rating, setRating] = useState(parseInt(value) || 0);
  const [selection, setSelection] = useState(0);

  const handleMouseOver = (e) => {
    
    const starId = e.target.dataset.starId;
    if (starId) {
      setSelection(starId);
    }
  };

  const handleMouseLeave = () => {
    setSelection(0);
  };

  const handleClick = (e) => {
    const starId = e.target.dataset.starId;
    if (starId) {
      setRating(starId);
    }
  };

  return (
    <div
      className="star-rating-container" 
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {Array.from({ length: 5 }, (v, i) => (
        <Star
          key={`star_${i + 1}`}
          starId={i + 1}
          marked={selection ? selection >= i + 1 : rating >= i + 1}
        />
      ))}
    </div>
  );
};

export default StarRating;
