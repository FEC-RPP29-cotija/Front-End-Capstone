import React from 'react';
import PropTypes from 'prop-types';

const ReviewsHeader = (props) => {
  return (
    <div className="reviews-header">
      <div className="sort-title-wrapper">
        <div className="sort-title">{props.numReviews} reviews, sorted by
          <select
            className="sort-options"
            value={props.sortBy}
            onChange={props.handleSortChange}>
            <option value="relevant">relevance</option>
            <option value="helpful">helpfulness</option>
            <option value="newest">newest</option>
          </select>
        </div>
      </div>
    </div>
  );
};

ReviewsHeader.propTypes = {
  numReviews: PropTypes.number,
  sortBy: PropTypes.string,
  handleSortChange: PropTypes.func
}

export default ReviewsHeader;