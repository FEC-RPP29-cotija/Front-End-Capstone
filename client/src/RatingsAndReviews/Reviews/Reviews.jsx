import React from 'react';
import PropTypes from 'prop-types';
import ReviewsHeader from './ReviewsHeader.jsx';
import ReviewsList from './ReviewsList.jsx';
import AddReview from './AddReview.jsx';
import { reviews, reviewsMeta } from '../../clientRoutes/reviews.js';
import helper from '../../helper-functions/rnRHelper.js';
const { sortByRelevance } = helper;

class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      loaded: 1,
      sortBy: 'newest',
      photo: null,
      photoOpen: false,
      addReviewOpen: false
    };

    this.getStateData = this.getStateData.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
    this.viewPhoto = this.viewPhoto.bind(this);
    this.loadTwoMore = this.loadTwoMore.bind(this);
    this.openAddReview = this.openAddReview.bind(this);
  };

  componentDidMount() {
    this.getStateData(this.state.loaded, this.state.sortBy);
  }

  componentDidUpdate(prevProps) {
    if (this.props.product_id !== prevProps.product_id) {
      this.getStateData(this.state.loaded, this.state.sortBy);
    }
  }

  getStateData(loaded, sortBy) {
    reviews(1, 1000, sortBy, this.props.product_id)
      .then(({ data }) => {
        // sortByRelevance(data);
        this.setState({
          reviews: data,
          loaded: loaded,
          sortBy: sortBy
        });
      })
      .catch(err => console.log("REVIEWS MOUNT ERR", err));
  }

  handleSortChange(event) {
    this.getStateData(this.state.loaded, event.target.value);
  }

  viewPhoto(event) {
    this.setState({
      photoOpen: !this.state.photoOpen,
      photo: event.target.getAttribute("src")
    });
  }

  openAddReview() {
    this.setState({
      addReviewOpen: !this.state.addReviewOpen
    });
  }

  loadTwoMore() {
    this.setState({loaded: this.state.loaded + 2})
  }

  render() {
    return (
      <div>
        {/* PHOTO MODAL */}
        <div
          className="review-photo-open"
          style={{display: this.state.photoOpen ? "block" : "none"}}
          onClick={this.viewPhoto}>
            <img className="review-photo-url" src={this.state.photo}/>
        </div>
        {/* FORM MODAL */}
        <div
          className="add-review-open"
          style={{display: this.state.addReviewOpen ? "block" : "none"}}>
            <AddReview close={this.openAddReview}/>
        </div>
        {/* MAIN REVIEWS COMPONENT */}
        <div className="reviews">
          <ReviewsHeader
            starFilters={this.props.starFilters}
            starFilterClick={this.props.starFilterClick}
            numReviews={this.state.reviews.length}
            handleSortChange={this.handleSortChange}
            sortBy={this.state.sortBy}/>
          <ReviewsList
            reviews={this.state.reviews}
            loaded={this.state.loaded}
            viewPhoto={this.viewPhoto}/>
          <div className="review-buttons">
            <button
              className="review-button"
              onClick={this.loadTwoMore}
              style={{display: this.state.reviews.length - 1 <= this.state.loaded ? "none" : "inline-block"}}>
                MORE REVIEWS
            </button>
            <button
              className="review-button"
              onClick={this.openAddReview}>
                ADD A REVIEW +
            </button>
          </div>
        </div>
      </div>
    );
  }
};

Reviews.propTypes = {
  product_id: PropTypes.number,
  starFilters: PropTypes.array,
  starFilterClick: PropTypes.func
}

export default Reviews;