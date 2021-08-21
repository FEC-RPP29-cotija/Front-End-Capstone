import React from 'react';
import differenceInMonths from 'date-fns/differenceInMonths';

const factorDetail = {
  Size: ['A size too small', 'Perfect', 'A size too wide'],
  Width: ['Too narrow', 'Perfect', 'Too wide'],
  Comfort: ['Uncomfortable', '', '', 'Perfect'],
  Quality: ['Poor', '', '', 'Perfect'],
  Length: ['Runs Short', 'Perfect', 'Runs long'],
  Fit: ['Runs tight', 'Perfect', 'Runs long']
};

const factorDetailFull = {
  Size: ['A size too small', '½ a size too small', 'Perfect', '½ a size too big', 'A size too wide'],
  Width: ['Too narrow', 'Slightly narrow', 'Perfect', 'Slightly wide', 'Too wide'],
  Comfort: ['Uncomfortable', 'Slightly uncomfortable', 'Ok', 'Comfortable', 'Perfect'],
  Quality: ['Poor', 'Below average', 'What I expected', 'Pretty great', 'Perfect'],
  Length: ['Runs Short', 'Runs slightly short', 'Perfect', 'Runs slightly long', 'Runs long'],
  Fit: ['Runs tight', 'Runs slightly tight', 'Perfect', 'Runs slightly long', 'Runs long']
};

const helper = {
  round: (value, precision) => {
    const multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
  },
  ratingsToTotalAverageAndPercentages: (ratings) => {
    let count = 0;
    let multipleTotals = 0;
    let countsForEach = new Array(5).fill(0);
    for (let key in ratings) {
      let countOfRating = parseInt(ratings[key]);
      count += countOfRating;
      let multiple = countOfRating * key;
      multipleTotals += multiple;
      countsForEach[parseInt(key) - 1] = countOfRating;
    }

    let percentages = countsForEach.map((percentage) => {
      return helper.round((percentage / count * 100), 1)
    });

    return {
      count: count,
      average: helper.round(multipleTotals / count, 1),
      countsForEach: countsForEach,
      percentages: percentages
    }
  },
  recommendedToPercentage: (recommended) => {
    const yes = parseInt(recommended.true);
    const no = parseInt(recommended.false);
    return Math.round((yes / (yes + no) * 100), 0);
  },
  createRecommendDiv: (bool) => {
    if (bool) {
      return <div className="irt-recommend">✓ I recommend this product</div>
    }
  },
  formatDate: (date) => {
    const newDate = new Date(date);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return newDate.toLocaleDateString(undefined, options);
  },
   createResponseDiv: (response) => {
    if (response !== '' && response !== undefined && response != null) {
      return (
        <div className="irt-response-to-review">
          <div className="irt-response-title">Response:</div>
          <div className="irt-response">{response}</div>
        </div>
      )
    }
  },
  getFactorDetailArray: (factor, full) => {
    if (full) {
      return factorDetailFull[factor];
    }
    return factorDetail[factor];
  },
  mapCharacteristicsToProps: (characteristics) => {
    let props = [];
    for (let char in characteristics) {
      props.push({
        key: characteristics[char].id,
        title: char,
        levels: helper.getFactorDetailArray(char),
        percent: Math.round((characteristics[char].value - 1) / 4 * 100)
      });
    }
    return props;
  },
  sortByRelevance: (reviews) => {
    const today = new Date();
    // add a position prop to sort by on reviews
    for (let i = 0; i < reviews.length; i++) {
      // subtract how many months ago this review was written from the rating
      let months = differenceInMonths(today, (new Date(reviews[i].date)));
      reviews[i].position = reviews[i].helpfulness - months;
    }
    // sort by highest "position" scored
    return reviews.sort(function (a, b) {
      return b.position - a.position;
    });
  },
  filterReviewsByStars: (reviews, starFilters) => {
    if (starFilters.length === 0) {
      return reviews
    }
    return reviews.filter((review) => {
      return starFilters.includes(review.rating);
    })
  },
  validateEmail: (email) => {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return regex.test(String(email).toLowerCase());
  },
  auditReviews: (review, chars) => {
    let { rating, summary, body, recommend, name, email, characteristics } = review;
    let warnings = '';
    if (rating === 0) warnings += 'Star Rating not selected\n';
    if (recommend === '') warnings += 'Recommend not selected\n';
    if (body.length < 49) warnings += 'Review body must be 50 characters or longer\n';
    if (body.length > 999) warnings += 'Review body is longer than maximum characters allowed of 1000'
    if (name === '') warnings += 'Nickname not entered\n';
    if (!helper.validateEmail(email)) warnings += 'Email invalid\n';
    if (Object.keys(characteristics).length !== Object.keys(chars).length) warnings += 'One or more factors is not selected\n';
    return warnings;
  }
}

export default helper;