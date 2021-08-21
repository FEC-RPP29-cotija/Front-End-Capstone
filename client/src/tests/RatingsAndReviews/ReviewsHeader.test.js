import 'jsdom-global/register';

// REACT
import React from 'react';

// TESTING
import { shallow, mount } from 'enzyme';
import { expect, jest, test, describe, beforeEach, afterEach } from '@jest/globals';
import renderer from 'react-test-renderer';

// COMPONENTS & HELPERS
import ReviewsHeader from '../../RatingsAndReviews/Reviews/Reviews.jsx';
import reviewRoutes from '../../clientRoutes/reviews.js';
import helper from '../../helper-functions/rpHelpers.js';
jest.mock('../../clientRoutes/reviews.js');
const mockEvent = (attr, attrVal, mainValue) => {
  return { target: { getAttribute: attr => attrVal, value: mainValue } }
}

let props = {
  starFilters: [5],
  starFilterClick: () => {
    this.starFilters = [];
  },
  numReviews: 3,
  sortBy: 'relevance',
  handleSortChange: (value) => {
    this.sortBy = value;
  }
}

let wrapper;

describe('ReviewsHeader component', () => {
  describe('componentDidMount', () => {
    beforeEach(() => {
      wrapper = mount(<ReviewsHeader {...props}/>);
    });
    afterEach(() => {
      jest.clearAllMocks();
    });

    test('should call handleSortChange on sort selection', () => {
      const event = { target: { value: 'newest' } };
      Promise.resolve(wrapper.find('select').simulate('change', event))
      .then(() => {
        wrapper.update();
      })
      .then(() => {
        expect(wrapper.find('select').props().value).toBe('newest');
      });
    });
  });
});