// REACT
import React from 'react';

// TESTING
import { shallow, mount } from 'enzyme';
import { expect, jest, test, describe, beforeEach, afterEach } from '@jest/globals';
import renderer from 'react-test-renderer';

// COMPONENTS & HELPERS
import RatingsBreakdown from '../../RatingsAndReviews/RatingsBreakdown/RatingsBreakdown.jsx';
import reviewRoutes from '../../clientRoutes/reviews.js';
import helper from '../../helper-functions/rpHelpers.js';
jest.mock('../../clientRoutes/reviews.js');
const mockEvent = (attr, value) => {
  return { target: { getAttribute: attr => value } }
}

const props = {
  product_id: 36300,
  starFilterClick: () => {},
  hideIfNoReviews: () => {},
  setCharacteristics: () => {}
}

let wrapper;

describe('RatingsBreakdown component', () => {
  describe('componentDidMount', () => {
    beforeEach(() => {
      wrapper = shallow(<RatingsBreakdown {...props}/>);
    });
    afterEach(() => {
      jest.clearAllMocks();
    });

    test('should get data for rating breakdown', () => {
      const instance = wrapper.instance();
      jest.spyOn(instance, 'getStateData');
      instance.componentDidMount();
      expect(instance.getStateData).toBeCalledTimes(1);
    });
  });

  describe('componentDidUpdate', () => {
    beforeEach(() => {
      wrapper = shallow(<RatingsBreakdown {...props}/>);
    });
    afterEach(() => {
      jest.clearAllMocks();
    });

    test('should update breakdown when a new review is selected', () => {
      const instance = wrapper.instance();
      let prevProps = { product_id: 36301 };
      jest.spyOn(instance, 'getStateData');
      instance.componentDidUpdate(prevProps);
      expect(instance.getStateData).toBeCalledTimes(1);
    });
  });

  describe('getStateData', () => {
    beforeEach(() => {
      wrapper = shallow(<RatingsBreakdown {...props}/>);
    });
    afterEach(() => {
      jest.clearAllMocks();
    });

    test('should retrieve meta data for review breakdown', () => {
      const instance = wrapper.instance();
      Promise.resolve(instance.getStateData(36300))
        .then(() => {
          expect(instance.state.totalRatings).toBe(2);
        });
    });

    test('should hide review component if no reviews are available', () => {
      const instance = wrapper.instance();
      console.log(instance.state);
      Promise.resolve(instance.getStateData(28214))
        .then(() => {
          console.log(instance.state);
          expect(instance.state.totalRatings).toBe(0);
        })
        .catch((err) => {
          console.log(instance.state);
        });
    });
  });
});