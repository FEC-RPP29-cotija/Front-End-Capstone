// REACT
import React from 'react';

// TESTING
import { shallow, mount } from 'enzyme';
import { expect, jest, test, describe, beforeEach, afterEach } from '@jest/globals';
import renderer from 'react-test-renderer';

// COMPONENTS & HELPERS
import RatingBreakdown from '../../RatingsAndReviews/RatingsBreakdown/RatingBreakdown.jsx';
import reviewRoutes from '../../clientRoutes/reviews.js';
import helper from '../../helper-functions/rpHelpers.js';
jest.mock('../../clientRoutes/reviews.js');
const mockEvent = (attr, value) => {
  return { target: { getAttribute: attr => value } }
}

const props = {
  percentages: [0, 10, 20, 30, 40],
  counts: 100,
  starFilters: [],
  starFilterClick: () => {}
}

let wrapper;

describe('RatingBreakdown component', () => {
  describe('render', () => {
    beforeEach(() => {
      wrapper = RatingBreakdown(props);
    });
    afterEach(() => {
      jest.clearAllMocks();
    });

    test('should render properly', () => {
      expect(wrapper).not.toBe(null);
    });
  });
});