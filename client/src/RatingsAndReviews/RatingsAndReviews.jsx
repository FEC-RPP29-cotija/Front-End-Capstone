import React from 'react';
import RatingsBreakdown from './RatingsBreakdown/RatingsBreakdown.jsx';
import Reviews from './Reviews/Reviews.jsx';
import PropTypes from 'prop-types';
import ReviewsClicker from './ReviewsClicker.jsx';

class RatingsAndReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      starFilters: [],
      hidden: false,
      characteristics: {},
      numReviews: 0
    };
    this.setStarFilter = this.setStarFilter.bind(this);
    this.hideIfNoReviews = this.hideIfNoReviews.bind(this);
    this.setCharacteristics = this.setCharacteristics.bind(this);
    this.setNumReviews = this.setNumReviews.bind(this);
  };

  setStarFilter(event) {
    if (event.target.getAttribute('remove')) {
      this.setState({
        starFilters: []
      });
    } else {
      let stars = parseInt(event.target.getAttribute('star'));
      let filters = this.state.starFilters.slice();
      let index = filters.indexOf(stars);

      if (index !== -1) {
        filters.splice(index, 1);
      } else {
        filters.push(stars);
      }

      this.setState({
        starFilters: filters.sort().reverse()
      });
    }
  }

  hideIfNoReviews(bool) {
    this.setState({
      hidden: bool
    });
  }

  setCharacteristics(data) {
    this.setState({
      characteristics: data
    });
  }

  setNumReviews(num) {
    this.setState({
      numReviews: num
    })
  }

  render() {
    return (
      <div className="rnr">
        <h2 className="rnr-title">Ratings & Reviews</h2>
        <div
          className="ratings-and-reviews"
          id="link_to_reviews"
          onClick={this.props.recordClick}>
          <RatingsBreakdown
            product_id={this.props.product_id}
            starFilters={this.state.starFilters}
            starFilterClick={this.setStarFilter}
            hideIfNoReviews={this.hideIfNoReviews}
            setCharacteristics={this.setCharacteristics}
            setNumReviews={this.setNumReviews}
            hidden={this.state.hidden}/>
          <Reviews
            product_id={this.props.product_id}
            characteristics={this.state.characteristics}
            starFilters={this.state.starFilters}
            productName={this.props.productName}
            hidden={this.state.hidden}
            numReviews={this.state.numReviews}/>
        </div>
      </div>
    );
  }
};

RatingsAndReviews.propTypes = {
  product_id: PropTypes.number,
  recordClick: PropTypes.func,
  productName: PropTypes.string
}

export default ReviewsClicker(RatingsAndReviews);
export { RatingsAndReviews as PureRatingsAndReviews };