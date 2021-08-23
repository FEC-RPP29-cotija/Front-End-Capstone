import React from 'react';
import {mount, shallow} from 'enzyme';
import helper from '../helper-functions/rpHelpers';
import exampleData from '../RelatedProducts/exampleData.js';
import { expect, jest, test, describe, beforeEach, afterEach } from '@jest/globals';
import RelatedProducts from '../relatedProducts/RelatedProductsView/RelatedProducts.jsx';
import RelatedProductsCard from '../RelatedProducts/RelatedProductsView/RelatedProductsCard.jsx';
import RelatedProductsList from '../RelatedProducts/RelatedProductsView/RelatedProductsList.jsx';
import RelatedProductsModal from '../relatedProducts/RelatedProductsView/RelatedProductsModal.jsx';
import YourOutfitCard from '../relatedProducts/YourOutfitView/YourOutfitCard.jsx';
import YourOutfitList from '../relatedProducts/YourOutfitView/YourOutfitList.jsx';
import 'jsdom-global/register';



jest.mock('axios')
jest.mock('../clientRoutes/products.js')


let wrapper;
describe('RelatedProducts methods', () => {
  beforeEach(() => {
    wrapper = shallow(<RelatedProducts {...exampleData.relatedProductsProps} />).dive();

  })
  afterEach(() => {
    jest.clearAllMocks()
  })
  test('expect count to start at 0', () => {
    const instance = wrapper.instance();
    expect(instance.props.count).toEqual(0);
  })
  test('expect state property starting indices to be set as [0, 1, 2]', () => {
    const instance = wrapper.instance();
    expect(instance.state.displayedProductsIndices).toEqual([0,1,2]);
  })
  test('product method should be called a function', () => {
    const instance = wrapper.instance();
    expect(typeof instance.product).toBe('function');
  })
  test('style method should be called a function', () => {
    const instance = wrapper.instance();
    expect(typeof instance.style).toBe('function');
  })
  test('outFit method should be called a function', () => {
    const instance = wrapper.instance();
    expect(typeof instance.outFit).toBe('function');
  })
  test('reviews method should be called a function', () => {
    const instance = wrapper.instance();
    expect(typeof instance.reviews).toBe('function');
  })
  test('handleAddToOutfit method should be called a function', () => {
    const instance = wrapper.instance();
    expect(typeof instance.handleAddToOutfit).toBe('function');
  })
})

let rpcwrapper;
describe('RelatedProductsCard', () => {
  rpcwrapper = mount(<RelatedProductsCard {...exampleData.relatedProductsCardProps} />);
  test('Should be stateless component', () => {
    const instance = rpcwrapper.instance();
    expect(instance).toBe(null);
  })
})

let rplwrapper;
describe('RelatedProductsList', () => {
  rplwrapper = mount(<RelatedProductsList {...exampleData.relatedProductsListProps} />);
  test('Should be stateless component', () => {
    const instance = rplwrapper.instance();
    expect(instance).toBe(null);
  })
})

let rpmwrapper;
describe('RelatedProductsModal', () => {
  rpmwrapper = mount(<RelatedProductsModal {...exampleData.relatedProductsModalProps} />);
  test('Should be stateless component', () => {
    const instance = rpmwrapper.instance();
    expect(instance).toBe(null);
  })
})

let yocwrapper;
describe('YourOutfitCard', () => {
  rpcwrapper = mount(<YourOutfitCard {...exampleData.relatedProductsCardProps} />);
  test('Should be stateless component', () => {
    const instance = yocwrapper.instance();
    expect(instance).toBe(null);
  })
})

let yolwrapper;
describe('YourOutfitList', () => {
  yolwrapper = mount(<YourOutfitList {...exampleData.relatedProductsListProps} />);
  test('Should be stateless component', () => {
    const instance = yolwrapper.instance();
    expect(instance).toBe(null);
  })
})


  describe('addIdToStylesData helper function', () => {
    test('Should add an id property to styles data', () => {
      let stylesData = [
      {style_id: 214503, name: "Black Lenses & Black Frame", original_price: "69.00"},
      {style_id: 214504, name: "Black Lenses & Gold Frame", original_price: "69.00"},
      {style_id: 214505, name: "Gold Lenses & Black Frame", original_price: "69.00"},
      {style_id: 214506, name: "Gold Lenses & Gold Frame", original_price: "69.00"}
      ]
      let productId = 36301;
      let result = helper.addIdToStylesData(stylesData, productId)

      expect(result.product_id).toBe(36301);
    })

    test('Should move styles data into a results array', () => {
      let stylesData = [
      {style_id: 214503, name: "Black Lenses & Black Frame", original_price: "69.00"},
      {style_id: 214504, name: "Black Lenses & Gold Frame", original_price: "69.00"},
      {style_id: 214505, name: "Gold Lenses & Black Frame", original_price: "69.00"},
      {style_id: 214506, name: "Gold Lenses & Gold Frame", original_price: "69.00"}
      ]
      let productId = 36301;
      let result = helper.addIdToStylesData(stylesData, productId)

      expect(result.results).toBe(stylesData);
    })

    test('Should not alter stylesData in any other way', () => {
      let stylesData = [
        {style_id: 214503, name: "Black Lenses & Black Frame", original_price: "69.00"},
        {style_id: 214504, name: "Black Lenses & Gold Frame", original_price: "69.00"},
        {style_id: 214505, name: "Gold Lenses & Black Frame", original_price: "69.00"},
        {style_id: 214506, name: "Gold Lenses & Gold Frame", original_price: "69.00"}
        ]
        let productId = 36301;
        let expected = {'product_id': 36301, 'results': [
          {style_id: 214503, name: "Black Lenses & Black Frame", original_price: "69.00"},
          {style_id: 214504, name: "Black Lenses & Gold Frame", original_price: "69.00"},
          {style_id: 214505, name: "Gold Lenses & Black Frame", original_price: "69.00"},
          {style_id: 214506, name: "Gold Lenses & Gold Frame", original_price: "69.00"}
          ]}
          let result = helper.addIdToStylesData(stylesData, productId)
          expect(result).toEqual(expected);
    })

  })
  describe('compileRelatedProductsDataToProps helper function', () => {
    test('Create an array with objects for each product', () => {
      let relatedProductsData = exampleData.relatedProductsData;
      let relatedProductsStyles = exampleData.relatedProductsStyles;
      let compiled = helper.compileRelatedProductsDataToProps(relatedProductsData, relatedProductsStyles);
      let values = Object.values(compiled)
      expect(values.length).toEqual(4);
    })

    test('Each object should contain both style and non-style data', () => {
      let relatedProductsData = exampleData.relatedProductsData;
      let relatedProductsStyles = exampleData.relatedProductsStyles;
      let compiled = helper.compileRelatedProductsDataToProps(relatedProductsData, relatedProductsStyles);
      let values = Object.values(compiled);
      expect(values[1].itemId).toBeDefined();
      expect(values[1].photoUrl).toBeDefined();
      expect(values[3].itemName).toBeDefined();
      expect(values[3].features).toBeDefined();

    })

    test('Each object should have an original price and either a sales price or null', () => {
      let relatedProductsData = exampleData.relatedProductsData;
      let relatedProductsStyles = exampleData.relatedProductsStyles;
      let compiled = helper.compileRelatedProductsDataToProps(relatedProductsData, relatedProductsStyles);
      let values = Object.values(compiled);
      expect(values[0].originalPrice).toBeDefined();
      expect(values[1].originalPrice).toBeDefined();
      expect(values[2].originalPrice).toBeDefined();
      expect(values[3].originalPrice).toBeDefined();
      expect(values[0].salePrice).not.toBeUndefined();
      expect(values[1].salePrice).not.toBeUndefined();
      expect(values[2].salePrice).not.toBeUndefined();
      expect(values[3].salePrice).not.toBeUndefined();
    })

  })

  describe('compileYourOutfitDataToProps helper function', () => {
    test('Should return an object with style data and product data', () => {
      let currentProductInfo = exampleData.currentProductInfo;
      let currentProductStyles = exampleData.currentProductStyles;
      let compiled = helper.compileYourOutfitDataToProps(currentProductInfo, currentProductStyles);
      expect(compiled.product_id).not.toBeUndefined();
      expect(compiled.name).not.toBeUndefined();
      expect(compiled.originalPrice).not.toBeUndefined();
      expect(compiled.salePrice).not.toBeUndefined();
      expect(compiled.photoUrl).not.toBeUndefined();
    })

    test('The outfit props object values should equal expected data', () => {
      let currentProductInfo = exampleData.currentProductInfo;
      let currentProductStyles = exampleData.currentProductStyles;
      let expected = exampleData.outfitPropsObj;
      let compiled = helper.compileYourOutfitDataToProps(currentProductInfo, currentProductStyles);
      expect(compiled).toEqual(expected);
    })

    test('The photo url property should have an object with two properties inside of it', () => {
      let currentProductInfo = exampleData.currentProductInfo;
      let currentProductStyles = exampleData.currentProductStyles;
      let compiled = helper.compileYourOutfitDataToProps(currentProductInfo, currentProductStyles);
      expect(compiled.photoUrl.thumbnail_url).toBeDefined();
      expect(compiled.photoUrl.url).toBeDefined();
    })

  })
  describe('formatFeatures helper function', () => {
    test('Result array at 0 should contain an array of features', () => {
      let currentProd = exampleData.currentProd;
      let clickedProd = exampleData.clickedProd;
      let formattedArray = helper.formatFeatures(currentProd, clickedProd);
      let expected = [ 'Fabric', 'Cut', 'Buttons' ]
      expect(formattedArray[0]).toEqual(expect.arrayContaining(expected));
    })

    test('The list of features should have no repeated features', () => {
      let currentProd = exampleData.currentProd;
      let clickedProd = exampleData.clickedProd;
      let formattedArray = helper.formatFeatures(currentProd, clickedProd);

      expect(formattedArray[0][0]).not.toEqual(formattedArray[0][1]);
      expect(formattedArray[0][0]).not.toEqual(formattedArray[0][2]);
      expect(formattedArray[0][1]).not.toEqual(formattedArray[0][2]);
    })

    test('Modified currentProd should have features property with an object as value ', () => {
      let currentProd = exampleData.currentProd;
      let clickedProd = exampleData.clickedProd;
      let formattedArray = helper.formatFeatures(currentProd, clickedProd);
      let modCurrentObj = formattedArray[1];
      let expectedObj = { Fabric: '100% Cotton', Cut: 'Skinny' };
      expect(modCurrentObj.features).toEqual(expectedObj);
    })

    test('Modified clickedProd should have features property with an object as value ', () => {
      let currentProd = exampleData.currentProd;
      let clickedProd = exampleData.clickedProd;
      let formattedArray = helper.formatFeatures(currentProd, clickedProd);
      let modClickedObj = formattedArray[2];
      let expectedObj = { Fabric: 'Canvas', Buttons: 'Brass' };
      expect(modClickedObj.features).toEqual(expectedObj);
    })

  })



      // product
      //   .then(data => {

      //     style
      //       .then((styleData) => {



      //         let resultStyleWithId = [];
      //         data.forEach((product, pi) => {
      //           styleData.forEach((style, si) => {

      //             if (pi === si) {
      //               resultStyleWithId.push(helper.addIdToStylesData(style, product.id))
      //         //     // console.log(resultStyleWithId)
      //             }
      //           })
      //         })


      //         let allPropsObj = helper.compileRelatedProductsDataToProps(data, resultStyleWithId)
      //         let outfitPropsObj = helper.compileYourOutfitDataToProps(props.state.productInformation, styleData.data)

      //         console.log(allPropsObj)


      //       })
      //   })

       // test('on mount, should call componenDidMount once',() => {
    //   //create new instance to test specific functionality.
    //   const instance = wrapper.instance()

    //   let product = instance.product()
    //   let style = instance.style()

    //  return  Promise.all([
    //     product,
    //     style
    //   ]).then(results => {
    //     // console.log(results[1])
    //       let resultStyleWithId = [];
    //       results[0].forEach((product, pi) => {
    //         results[1].forEach((style, si) => {

    //           if (pi === si) {
    //             resultStyleWithId.push(helper.addIdToStylesData(style, product.id))

    //           }
    //         })
    //       })

    //       let allPropsObj = helper.compileRelatedProductsDataToProps(results[0], resultStyleWithId)
    //       let outfitPropsObj = helper.compileYourOutfitDataToProps(props.state.productInformation, resultStyleWithId[0])
    //       instance.setState({
    //         relatedProducts: results[0],
    //         relatedProductsStyles: resultStyleWithId,
    //         allPropsObj : allPropsObj,
    //         outfitPropsObj: outfitPropsObj
    //       })

    //       // console.log(instance)
    //   })

    // })
    //unfinished new test for componentDidMount here - this one is for rendering
    //test('on mount, component displays correct styles for current related product', () => {

      //console.log('innatest')

      // const component = renderer.create(<RelatedProducts state={props.state}/>)
      // const instance = component.getInstance()

      // let product = instance.product()
      // let style = instance.style()
      // return  Promise.all([
      //   product,
      //   style
      // ]).then(results => {
      //   // console.log(results[1])
      //     let resultStyleWithId = [];
      //     results[0].forEach((product, pi) => {
      //       results[1].forEach((style, si) => {

      //         if (pi === si) {
      //           resultStyleWithId.push(helper.addIdToStylesData(style, product.id))

      //         }
      //       })
      //     })

      //     let allPropsObj = helper.compileRelatedProductsDataToProps(results[0], resultStyleWithId)
      //     let outfitPropsObj = helper.compileYourOutfitDataToProps(props.state.productInformation, resultStyleWithId[0])
      //     instance.setState({
      //       relatedProducts: results[0],
      //       relatedProductsStyles: resultStyleWithId,
      //       allPropsObj : allPropsObj,
      //       outfitPropsObj: outfitPropsObj
      //     })

      //     console.log(component.toJSON().children[0].children[1].children[0].children[0].children)
      //     console.log(instance)
      // })

    //})

    //const props = {
      //   state: {
      //     relatedProducts: [28213, 28214, 28215, 28216],
      //     product_id: 28212,
      //     ratings: {4: "1", 5: "1"},
      //     productInformation: {
      //       id: 28213,
      //       campus: "hr-rpp",
      //       name: "Bright Future Sunglasses",
      //       slogan: "You've got to wear shades",
      //       description: "Where you're going you might not need roads, but you definitely need some shades. Give those baby blues a rest and let the future shine bright on these timeless lenses.",
      //       category: "Accessories",
      //       default_price: "69.00",
      //       created_at: "2021-07-10T17:00:03.509Z",
      //       updated_at: "2021-07-10T17:00:03.509Z"
      //     }

      //   }
      // }