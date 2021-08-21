// REACT
import React from 'react';

// TESTING
import { shallow, mount } from 'enzyme';
import { expect, jest, test, describe, beforeEach, afterEach } from '@jest/globals';
import renderer from 'react-test-renderer';

// COMPONENTS & HELPERS
import RatingSummary from '../../RatingsAndReviews/RatingsBreakdown/RatingSummary.jsx';
import reviewRoutes from '../../clientRoutes/reviews.js';
import helper from '../../helper-functions/rpHelpers.js';
jest.mock('../../clientRoutes/reviews.js');
const mockEvent = (attr, value) => {
  return { target: { getAttribute: attr => value } }
}

const props = {
  average: 3.5,
  total: 100,
  percent: 50
}

let wrapper;

describe('RatingSummary component', () => {
  describe('render', () => {
    beforeEach(() => {
      wrapper = RatingSummary(props);
    });
    afterEach(() => {
      jest.clearAllMocks();
    });

    test('should render properly', () => {
      expect(wrapper).not.toBe(null);
    });
  });
});