// REACT
import React from 'react';

// TESTING
import { shallow, mount } from 'enzyme';
import { expect, jest, test, describe, beforeEach, afterEach } from '@jest/globals';
import renderer from 'react-test-renderer';

// COMPONENTS & HELPERS
import BreakdownClickable from '../../RatingsAndReviews/RatingsBreakdown/BreakdownClickable.jsx';
import reviewRoutes from '../../clientRoutes/reviews.js';
import helper from '../../helper-functions/rpHelpers.js';
jest.mock('../../clientRoutes/reviews.js');
const mockEvent = (attr, value) => {
  return { target: { getAttribute: attr => value } }
}

const props = {
  stars: 5,
  percent: 100,
  count: 50,
  starFilterClick: () => {}
}

let wrapper;

describe('BreakdownClickable component', () => {
  describe('render', () => {
    beforeEach(() => {
      wrapper = BreakdownClickable(props);
    });
    afterEach(() => {
      jest.clearAllMocks();
    });

    test('should render properly', () => {
      expect(wrapper).not.toBe(null);
    });
  });
});