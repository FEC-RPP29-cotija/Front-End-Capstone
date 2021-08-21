// REACT
import React from 'react';

// TESTING
import { shallow, mount } from 'enzyme';
import { expect, jest, test, describe, beforeEach, afterEach } from '@jest/globals';
import renderer from 'react-test-renderer';

// COMPONENTS & HELPERS
import IndividualReviewTile from '../../RatingsAndReviews/Reviews/IndividualReviewTile.jsx';
import reviewRoutes from '../../clientRoutes/reviews.js';
import helper from '../../helper-functions/rpHelpers.js';
jest.mock('../../clientRoutes/reviews.js');
const mockEvent = (attr, value) => {
  return { target: { getAttribute: attr => value } }
}

const props = {
  review: {
    "review_id": 407542,
    "rating": 5,
    "summary": "This product was great!",
    "recommend": true,
    "response": "",
    "body": "I really did or did not like this product based on whether it was sustainably sourced. Then I found out that its made from nothing at all.",
    "date": "2019-01-01T00:00:00.000Z",
    "reviewer_name": "funtime",
    "helpfulness": 13,
    "photos": []
  },
  viewPhoto: () => {}
}

let wrapper;

describe('IndividualReviewTile component', () => {
  describe('handleHelpful', () => {
    beforeEach(() => {
      wrapper = shallow(<IndividualReviewTile {...props}/>);
    });
    afterEach(() => {
      jest.clearAllMocks();
    });

    test('should post a review as helpful', () => {
      const instance = wrapper.instance();
      jest.spyOn(instance, 'handleHelpful');
      expect(instance.state.helpfulClicked).toBe(false);
      Promise.resolve(instance.handleHelpful())
        .then(() => {
          expect(instance.state.helpfulClicked).toBe(true);
        });
    });

    test('should increment a reviews helpfulness', () => {
      const instance = wrapper.instance();
      jest.spyOn(instance, 'handleHelpful');
      expect(instance.state.helpful).toBe(0);
      Promise.resolve(instance.handleHelpful())
        .then(() => {
          expect(instance.state.helpful).toBe(1);
        });
    });

    test('user should be able increment a reviews helpfulness more than once', () => {
      const instance = wrapper.instance();
      jest.spyOn(instance, 'handleHelpful');
      expect(instance.state.helpful).toBe(0);
      Promise.resolve(instance.handleHelpful())
        .then(() => {
          expect(instance.state.helpful).toBe(1);
          Promise.resolve(instance.handleHelpful())
            .then(() => {
              expect(instance.state.helpful).toBe(1);
            });
        });
    });
  });

  describe('handleReport', () => {
    beforeEach(() => {
      wrapper = shallow(<IndividualReviewTile {...props}/>);
    });
    afterEach(() => {
      jest.clearAllMocks();
    });

    test('review should not be visible after being reported', () => {
      const instance = wrapper.instance();
      jest.spyOn(instance, 'handleReport');
      expect(instance.state.reportClicked).toBe(false);
      Promise.resolve(instance.handleReport())
        .then(() => {
          expect(instance.state.reportClicked).toBe(true);
        });
    });

    test('reviews should not be able to be reported more than once', () => {
      const instance = wrapper.instance();
      jest.spyOn(instance, 'handleReport');
      expect(instance.state.reportClicked).toBe(false);
      Promise.resolve(instance.handleReport())
        .then(() => {
          expect(instance.state.reportClicked).toBe(true);
          Promise.resolve(instance.handleReport())
          .then(() => {
            expect(instance.state.reportClicked).toBe(true);
          })
        })
    });
  });
});
