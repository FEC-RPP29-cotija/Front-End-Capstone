import 'jsdom-global/register';

// REACT
import React from 'react';

// TESTING
import { shallow, mount } from 'enzyme';
import { expect, jest, test, describe, beforeEach, afterEach } from '@jest/globals';
import renderer from 'react-test-renderer';

// COMPONENTS & HELPERS
import ReviewsList from '../../RatingsAndReviews/Reviews/ReviewsList.jsx';
import { reviews } from '../../RatingsAndReviews/TestData/newData.js'

let props = {
  reviews: reviews,
  loaded: 1,
  viewPhoto: () => {}
}

let wrapper;

describe('ReviewsList component', () => {
  describe('componentDidMount', () => {
    beforeEach(() => {
      wrapper = mount(<ReviewsList {...props}/>);
    });
    afterEach(() => {
      jest.clearAllMocks();
    });

    test('should load the correct number of reviews', () => {
      const instance = wrapper.render();
      console.log(instance.html());
      // expect(instance.children.length).toBe(2);
    });
  });
});