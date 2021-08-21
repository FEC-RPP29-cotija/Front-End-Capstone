import { reviewsTD, reviewsMetaTD } from '../../../src/RatingsAndReviews/TestData/data.js';
import newData from '../../RatingsAndReviews/TestData/newData.js'

module.exports = {
  //parameters wont be used for didMountTests as mock data is going to be returned
  reviews: jest.fn((page, count, sort, productId) => {
    return Promise.resolve({ data: newData.reviews })
  }),
  reviewsInteraction: jest.fn(() => {}),
  reviewHelpful: jest.fn(() => {}),
  reviewReport: jest.fn(() => {}),
  reviewsMeta: jest.fn((id) => {
    return Promise.resolve({ data: reviewsMetaTD[id] });
  })
}