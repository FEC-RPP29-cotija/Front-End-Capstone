// REACT
import React from 'react';

// TESTING
import { shallow, mount } from 'enzyme';
import { expect, jest, test, describe, beforeEach, afterEach } from '@jest/globals';
import renderer from 'react-test-renderer';

// COMPONENTS & HELPERS
import ReviewsClicker from '../../RatingsAndReviews/ReviewsClicker.jsx';
import reviewRoutes from '../../clientRoutes/reviews.js';
import helper from '../../helper-functions/rpHelpers.js';
jest.mock('../../clientRoutes/reviews.js');
const mockEvent = (attr, value) => {
  return { target: { getAttribute: attr => value } }
}

const props = {
  test: 'test'
}

class Test extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div>test</div>
  }
}

let wrapper;

describe('ReviewsClicker component', () => {
  describe('clicker', () => {

    test('should return a wrapped react class component', () => {
      const wrapped = ReviewsClicker(<Test {...props}/>);
    });
  });
});