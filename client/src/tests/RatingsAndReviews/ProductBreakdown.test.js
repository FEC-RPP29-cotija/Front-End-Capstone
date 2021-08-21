// REACT
import React from 'react';

// TESTING
import { shallow, mount } from 'enzyme';
import { expect, jest, test, describe, beforeEach, afterEach } from '@jest/globals';
import renderer from 'react-test-renderer';

// COMPONENTS & HELPERS
import ProductBreakdown from '../../RatingsAndReviews/RatingsBreakdown/ProductBreakdown.jsx';
import reviewRoutes from '../../clientRoutes/reviews.js';
import helper from '../../helper-functions/rpHelpers.js';
jest.mock('../../clientRoutes/reviews.js');
const mockEvent = (attr, value) => {
  return { target: { getAttribute: attr => value } }
}

const props = {
  characteristics: ['comfort', 'fit']
}

let wrapper;

describe('ProductBreakdown component', () => {
  describe('render', () => {
    beforeEach(() => {
      wrapper = ProductBreakdown(props);
    });
    afterEach(() => {
      jest.clearAllMocks();
    });

    test('should render properly', () => {
      expect(wrapper).not.toBe(null);
    });
  });
});