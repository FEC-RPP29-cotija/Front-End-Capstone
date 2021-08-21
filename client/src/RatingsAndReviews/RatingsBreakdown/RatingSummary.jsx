import React from 'react';
import PropTypes from 'prop-types';
import Stars from '../../stars/stars.jsx'

const RatingSummary = (props) => {
  return (
    <div className="rating-summary">
      <div className="average-rating-wrapper">
        <div className="average-rating-num">{props.average.toFixed(1)}</div>
        <div className="stars-count-wrapper">
          <div className="average-rating-stars">{Stars(props.average)}</div>
          <div className="count-of-reviews">from {props.total} reviews</div>
        </div>
      </div>
      <div className="recommends">{props.percent}% of reviews recommend this product</div>
    </div>
  );
};

RatingSummary.propTypes = {
  average: PropTypes.number,
  total: PropTypes.number,
  percent: PropTypes.number
}

export default RatingSummary;