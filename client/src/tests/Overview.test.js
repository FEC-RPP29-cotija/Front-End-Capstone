import React from 'react'
import { shallow, mount } from 'enzyme'
import renderer from 'react-test-renderer'
import mockProps from './mockProps.js'
import { expect, jest, test, describe, beforeEach, afterEach } from '@jest/globals';
import Overview from '../Overview/index.jsx'
import ImageGallery from '../Overview/components/ImageGallery.jsx'
import AddToCart from '../Overview/components/AddToCart.jsx'
import ProductInfo from '../Overview/components/ProductInfo.jsx'
import StyleSelector from '../Overview/components/StyleSelector.jsx'
import ExpandedView from '../Overview/components/ExpandedView.jsx'
//import testData from '../Overview/testData.js'

//OVERVIEW TESTS
//  unit tests:
//   1. does index render?
//   2. does it render current product name/price/catagory?
//   3. does it show appropriate stars?
//   4. does it render 8 images of different styles?
//   5. does 'select size' show all sizes in stock?
//   6. does quantity show integers from 1 to stock or 15 max?
//   7. does add to cart do what its supposed to?
//   8. Do all the buttons produce the required result

// describe('Overview', () => {
//   test('should render', () => {
//     const wrapper = shallow(
//       <Overview />
//     )
//     expect(wrapper.exists()).toBeTruthy()
//   })
// })


// let component;

// const wrapper = mount (
//   <Overview state = {mockProps} />
// )

//component = wrapper.find(Overview).instance()

// afterEach(() => {
//   jest.clearAllMocks()
// })

describe('Overview', () => {
  const wrapper = shallow(
    <Overview state = {mockProps}/>)
    const instance = wrapper.instance()
    test('should display current product information', () => {
      const component = renderer.create(<Overview state = {mockProps}/>);
      const instance = component.getInstance();
      console.log('its a wrap', wrapper.find('.expandedProductCatagory').text())

      console.log('nope', component.toJSON().children[1].children[1].children[0].children[1])

      expect(component.toJSON().children[1].children[1].children[0].children[1].children[0]).toBe('Jackets');
      expect(component.toJSON().children[1].children[1].children[0].children[2].children[0]).toBe('Camo Onesie');
      expect(component.toJSON().children[1].children[1].children[0].children[3].children[0]).toBe('Forest Green & Black')
      expect(component.toJSON().children[1].children[1].children[0].children[4].children[0]).toBe('The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.')
      expect(component.toJSON().children[1].children[1].children[0].children[5].children[2]).toBe('140.00')
      console.log()
    })
    test('changeSelectedQuantity should work', () => {
      instance.changeSelectedQuantity({target: {value: 2}});
      expect(instance.state.quantitySelected).toBe(2);
    })
     test('changeSelectedQuantity should work', () => {
      instance.changeSelectedQuantity({target: {value: 2}});
      expect(instance.state.quantitySelected).toBe(2);
    })



  })

  describe('ImageGallery', () => {
    test('should render sidebar with 7 images', () => {

    })
  })

  describe('snapshot', ()=> {
    test('should be snap shotty', () => {
      const component = renderer.create(<Overview state = {mockProps}/>);
      const instance = component.getInstance();

    })
  })

