import React from 'react';
import BreakdownClickable from './BreakdownClickable.jsx';
import PropTypes from 'prop-types';

const RatingBreakdown = (props) => {
  return (
    <div className="rating-breakdown">
      <BreakdownClickable stars={5} percent={props.percentages[4]} count={props.counts[4]} starFilterClick={props.starFilterClick}/>
      <BreakdownClickable stars={4} percent={props.percentages[3]} count={props.counts[3]} starFilterClick={props.starFilterClick}/>
      <BreakdownClickable stars={3} percent={props.percentages[2]} count={props.counts[2]} starFilterClick={props.starFilterClick}/>
      <BreakdownClickable stars={2} percent={props.percentages[1]} count={props.counts[1]} starFilterClick={props.starFilterClick}/>
      <BreakdownClickable stars={1} percent={props.percentages[0]} count={props.counts[0]} starFilterClick={props.starFilterClick}/>
      <div
        className="sort-options-selected"
        style={{display: props.starFilters.length === 0 ? "none" : "block"}}>
        <div
          className="sort-option-title"
          remove="all"
          onClick={props.starFilterClick}>
            ✕ Remove all filters: {props.starFilters.join(', ')}
        </div>
      </div>
    </div>
  );
};

RatingBreakdown.propTypes = {
  percentages: PropTypes.array,
  counts: PropTypes.array,
  starFilters: PropTypes.array,
  starFilterClick: PropTypes.func
}

export default RatingBreakdown;