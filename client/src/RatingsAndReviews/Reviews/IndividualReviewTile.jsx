import React from 'react';
import PropTypes from 'prop-types';
import Stars from '../../stars/stars.jsx'
import helper from '../../helper-functions/rnRHelper.js';
const { formatDate, truncateSummary, createRecommendDiv, createResponseDiv } = helper;
import { reviewHelpful, reviewReport } from '../../clientRoutes/reviews.js';

class IndividualReviewTile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      helpfulClicked: false,
      reportClicked: false,
      helpful: 0,
      short: '',
      showMoreClicked: false,
    }

    this.showMore = this.showMore.bind(this);
    this.handleReport = this.handleReport.bind(this);
    this.handleHelpful = this.handleHelpful.bind(this);
    this.shortify = this.shortify.bind(this);
  }

  componentDidMount() {
    this.shortify();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.review.body !== this.props.review.body) {
      this.shortify();
    }
  }

  shortify() {
    let len = this.props.review.body.length;
    if (len > 250) {
      let short = this.props.review.body.substring(0, 250);
      this.setState({
        short: short + '...'
      });
    } else {
      this.setState({
        short: this.props.review.body,
        showMoreClicked: true
      })
    }
  }

  showMore() {
    this.setState({
      showMoreClicked: true,
      short: this.props.review.body
    });
  }

  handleHelpful() {
    if (this.state.helpfulClicked) {
      return
    }

    reviewHelpful(this.props.review.review_id);
    this.setState({
      helpfulClicked: true,
      helpful: 1
    });
  }

  handleReport() {
    if (this.state.reportClicked) {
      return
    }

    reviewReport(this.props.review.review_id);
    this.setState({
      reportClicked: true
    });
  }

  render() {
    if (this.state.reportClicked) {
      return <div></div>
    } else {
      return (
        <div className="irt">
          <div className="irt-header">
            <div className="irt-star-rating">{Stars(this.props.review.rating)}</div>
            <div className="irt-username-and-date">✓ {this.props.review.reviewer_name}, {formatDate(this.props.review.date)}</div>
          </div>
          <div className="irt-review-summary">
            <div className="irt-summary-trunc">{this.props.review.summary}</div>
          </div>
          <div className="irt-review-body">
            <div className="irt-body-text">{this.state.short}</div>
            <div
              className="irt-body-show"
              onClick={this.showMore}
              style={{display: this.state.showMoreClicked ? 'none' : 'block'}}>
                Show more
            </div>
            <div className="irt-photos">
              {this.props.review.photos.map((photo, index) => {
                return (
                  <img
                    className="irt-photo"
                    key={index} src={photo.url}
                    alt="image"
                    onClick={this.props.viewPhoto}/>
                )
              })}
            </div>
          </div>
          <div className="irt-additional-info">
            {createRecommendDiv(this.props.review.recommend)}
            {createResponseDiv(this.props.review.response)}
            <div className="irt-helpfulness-info">
              <div className="irt-helpful-text">Helpful?</div>
              <div
                className="irt-yes-clickable"
                onClick={this.handleHelpful}>Yes</div>
              <div className="irt-rating-helpfulness">({this.props.review.helpfulness + this.state.helpful})</div>
              <div
                className="irt-report-clickable"
                onClick={this.handleReport}>Report</div>
            </div>
          </div>
        </div>
      );
    }
  }
};

IndividualReviewTile.propTypes = {
  review: PropTypes.object,
  viewPhoto: PropTypes.func
};

export default IndividualReviewTile;