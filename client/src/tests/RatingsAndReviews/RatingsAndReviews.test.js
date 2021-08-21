// REACT
import React from 'react';

// TESTING
import { shallow, mount } from 'enzyme';
import { expect, jest, test, describe, beforeEach, afterEach } from '@jest/globals';
import renderer from 'react-test-renderer';

// COMPONENTS & HELPERS
import { PureRatingsAndReviews as RatingsAndReviews } from '../../RatingsAndReviews/RatingsAndReviews.jsx';
import reviewRoutes from '../../clientRoutes/reviews.js';
import helper from '../../helper-functions/rpHelpers.js';
jest.mock('../../clientRoutes/reviews.js');
const mockEvent = (attr, value) => {
  return {
    target: {
      getAttribute: attr => {
        if (attr === 'remove') return null;
        return value
      }
    }
  }
}

const props = {
  product_id: 36300,
}

let wrapper;

describe('RatingsAndReviews component', () => {
  describe('setStarFilter', () => {
    beforeEach(() => {
      wrapper = shallow(<RatingsAndReviews {...props}/>);
    });
    afterEach(() => {
      jest.clearAllMocks();
    });

    test('should add a star filter if not currently present', () => {
      const instance = wrapper.instance();
      jest.spyOn(instance, 'setStarFilter');
      expect(instance.state.starFilters.length).toBe(0);
      const starEvent = mockEvent('star', '5');
      instance.setStarFilter(starEvent);
      expect(instance.setStarFilter).toBeCalledTimes(1);
      expect(instance.state.starFilters.length).toBe(1);
    });

    test('should remove star filter', () => {
      const instance = wrapper.instance();
      jest.spyOn(instance, 'setStarFilter');
      const starEvent = mockEvent('star', '4');
      instance.setStarFilter(starEvent);
      expect(instance.setStarFilter).toBeCalledTimes(1);
      expect(instance.state.starFilters.length).toBe(1);
      instance.setStarFilter(starEvent);
      expect(instance.setStarFilter).toBeCalledTimes(2);
      expect(instance.state.starFilters.length).toBe(0);
    });

    test('should sort star filters from highest to lowest', () => {
      const instance = wrapper.instance();
      jest.spyOn(instance, 'setStarFilter');
      let starEvent = mockEvent('star', '3');
      instance.setStarFilter(starEvent);
      starEvent = mockEvent('star', '4');
      instance.setStarFilter(starEvent);
      expect(instance.setStarFilter).toBeCalledTimes(2);
      expect(instance.state.starFilters).toEqual([4, 3]);
    });
  });

  describe('hideIfNoReviews', () => {
    beforeEach(() => {
      wrapper = shallow(<RatingsAndReviews {...props}/>);
    })
    afterEach(() => {
      jest.clearAllMocks();
    });

    test('should set the state of hidden to true if true', () => {
      const instance = wrapper.instance();
      jest.spyOn(instance, 'hideIfNoReviews');
      expect(instance.state.hidden).toBe(false);
      instance.hideIfNoReviews(true);
      expect(instance.hideIfNoReviews).toBeCalledTimes(1);
      expect(instance.state.hidden).toBe(true);
    });

    test('should set the state of hidden to false if false', () => {
      const instance = wrapper.instance();
      jest.spyOn(instance, 'hideIfNoReviews');
      expect(instance.state.hidden).toBe(false);
      instance.hideIfNoReviews(false);
      expect(instance.hideIfNoReviews).toBeCalledTimes(1);
      expect(instance.state.hidden).toBe(false);
    });
  });

  describe('setCharacteristics', () => {
    beforeEach(() => {
      wrapper = shallow(<RatingsAndReviews {...props}/>);
    })
    afterEach(() => {
      jest.clearAllMocks();
    });

    let data = {
      "Fit": {
          "id": 94611,
          "value": "3.0000000000000000"
      },
      "Length": {
          "id": 94612,
          "value": "2.7500000000000000"
      },
      "Comfort": {
          "id": 94613,
          "value": "4.5000000000000000"
      },
      "Quality": {
          "id": 94614,
          "value": "4.0000000000000000"
      }
    };

    test('should set the state of characteristics to the object given', () => {
      const instance = wrapper.instance();
      jest.spyOn(instance, 'setCharacteristics');
      expect(instance.state.characteristics).toEqual({});
      instance.setCharacteristics(data);
      expect(instance.setCharacteristics).toBeCalledTimes(1);
      expect(instance.state.characteristics).toEqual(data);
    });
  });
});
