import React from 'react';
import PropTypes from 'prop-types';
import ReviewsHeader from './ReviewsHeader.jsx';
import ReviewsList from './ReviewsList.jsx';
import AddReview from './AddReview.jsx';
import { reviews, reviewsMeta } from '../../clientRoutes/reviews.js';
import helper from '../../helper-functions/rnRHelper.js';
const { sortByRelevance, filterReviewsByStars } = helper;

class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      loaded: 1,
      sortBy: 'relevant',
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
    this.getStateData(this.state.loaded, this.state.sortBy, 2);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.product_id !== prevProps.product_id || this.props.starFilters !== prevProps.starFilters) {
      this.getStateData(this.state.loaded, this.state.sortBy, this.props.numReviews);
    }
    if (prevState) {
      if (this.state.loaded !== prevState.loaded && prevState.loaded === 1) {
        this.getStateData(this.state.loaded, this.state.sortBy, this.props.numReviews);
      }
    }
  }

  getStateData(loaded, sortBy, numReviews) {
    reviews(1, numReviews, sortBy, this.props.product_id)
      .then(({ data }) => {
        // if sort selected is relevance sort the data
        let reviews = sortBy === 'relevant'
          ? sortByRelevance(data)
          : data;
        // filter the data by star filters selected
        reviews = filterReviewsByStars(data, this.props.starFilters);
        // set the state
        this.setState({
          reviews: reviews,
          loaded: loaded,
          sortBy: sortBy
        });
      })
      .catch(err => console.log("REVIEWS MOUNT ERR", err));
  }

  handleSortChange(event) {
    this.getStateData(this.state.loaded, event.target.value, this.props.numReviews);
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
    if (this.props.hidden) {
      return (
        <div className="review-list-full">
          {/* FORM MODAL */}
          <div
            className="add-review-open"
            style={{display: this.state.addReviewOpen ? "block" : "none"}}>
              <AddReview
                close={this.openAddReview}
                characteristics={this.props.characteristics}
                product_id={this.props.product_id}/>
          </div>
          {/* MAIN MODAL WHEN NO REVIEWS */}
          <button
            className="review-button"
            onClick={this.openAddReview}>
              ADD A REVIEW +
          </button>
        </div>
      );
    } else {
      return (
        <div className="review-list-full">
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
              <AddReview
                close={this.openAddReview}
                characteristics={this.props.characteristics}
                product_id={this.props.product_id}
                productName={this.props.productName}/>
          </div>
          {/* MAIN REVIEWS COMPONENT */}
          <div className="reviews">
            <ReviewsHeader
              starFilters={this.props.starFilters}
              numReviews={this.props.numReviews}
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
                style={{display: this.props.numReviews - 1 <= this.state.loaded ? "none" : "inline-block"}}>
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
  }
};

Reviews.propTypes = {
  product_id: PropTypes.number,
  productName: PropTypes.string,
  starFilters: PropTypes.array,
  characteristics: PropTypes.object,
  hidden: PropTypes.bool,
  numReviews: PropTypes.number
}

export default Reviews;