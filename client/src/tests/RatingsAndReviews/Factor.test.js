// REACT
import React from 'react';

// TESTING
import { shallow, mount } from 'enzyme';
import { expect, jest, test, describe, beforeEach, afterEach } from '@jest/globals';
import renderer from 'react-test-renderer';

// COMPONENTS & HELPERS
import Factor from '../../RatingsAndReviews/RatingsBreakdown/Factor.jsx';
import reviewRoutes from '../../clientRoutes/reviews.js';
import helper from '../../helper-functions/rpHelpers.js';
jest.mock('../../clientRoutes/reviews.js');
const mockEvent = (attr, value) => {
  return { target: { getAttribute: attr => value } }
}

const props = {
  title: 'example title',
  levels: ['level1', 'level2', 'level3'],
  percent: 50
}

let wrapper;

describe('Factor component', () => {
  describe('render', () => {
    beforeEach(() => {
      wrapper = Factor(props);
    });
    afterEach(() => {
      jest.clearAllMocks();
    });

    test('should render properly', () => {
      expect(wrapper).not.toBe(null);
    });
  });
});