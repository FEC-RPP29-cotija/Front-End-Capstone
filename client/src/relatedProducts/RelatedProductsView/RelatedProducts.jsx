import React from 'react';
import propTypes from 'prop-types';
import RelatedProductsList from './RelatedProductsList.jsx';
import YourOutfitList from '../YourOutfitView/YourOutfitList.jsx';
import RelatedProductsModal from './RelatedProductsModal.jsx';
import withClickTracker from '../withClickTracker.jsx';
import helper from '../../helper-functions/rpHelpers.js';
import {productsWithId, productsStyle} from "../../clientRoutes/products.js";
import {reviewsMeta} from '../../clientRoutes/reviews.js';
import axios from 'axios';
const TOKEN = require("../../../../config.js").GITHUB_TOKEN;
const api = require("../../../../config.js").API;


class RelatedProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      relatedProducts: [],
      relatedProductsStyles: [],
      yourOutfitItems:[],
      allPropsObj: [],
      outfitPropsObj: {},
      modalShow: false,
      clickedProductInfo: {},
      modifiedCurrent: {},
      features: [],
      displayedProductsIndices: [0, 1, 2],
      reviewData: []
    }
    this.handleAddToOutfit = this.handleAddToOutfit.bind(this);
    this.handleRemoveFromOutfit = this.handleRemoveFromOutfit.bind(this);
    this.handleCompareItems = this.handleCompareItems.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handlePrevClick = this.handlePrevClick.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
    this.product = this.product.bind(this);
    this.style = this.style.bind(this);
    this.outFit = this.outFit.bind(this);
    this.reviews = this.reviews.bind(this);
  }

  componentDidMount () {
    let product = this.product();
    let getStyle = this.style();
    let outFitData = this.outFit();
    let reviewData = this.reviews();

    product.then(data => {
      getStyle.then(styleData => {
        outFitData.then(fitData => {
          reviewData.then(reviewData => {
            let allPropsObj = helper.compileRelatedProductsDataToProps(data, styleData)

            let values = [];
            let keys = Object.keys(localStorage);
            let i = keys.length;
            while ( i-- ) {
              values.push( JSON.parse(localStorage.getItem(keys[i])) );
            }

            this.setState({
              relatedProducts: data,
              relatedProductsStyles: styleData,
              allPropsObj:allPropsObj,
              outfitPropsObj: fitData,
              yourOutfitItems: values,
              reviewData: reviewData
            })
          })
        })
      })
    })
  }


  componentDidUpdate (prevProps, prevState) {
    if (prevProps.state.product_id !== this.props.state.product_id) {
      let product = this.product();
      let getStyle = this.style();
      let outFitData = this.outFit();
      let reviewData = this.reviews();

      product.then(data => {
        getStyle.then(styleData => {
          outFitData.then(fitData => {
            reviewData.then(reviewData => {

            let allPropsObj = helper.compileRelatedProductsDataToProps(data, styleData)
            let values = [];
            let keys = Object.keys(localStorage);
            let i = keys.length;

            while ( i-- ) {
              values.push( JSON.parse(localStorage.getItem(keys[i])) );
              }

            this.setState({
             relatedProducts: data,
             relatedProductsStyles: styleData,
             allPropsObj:allPropsObj,
             outfitPropsObj: fitData,
             yourOutfitItems: values,
             reviewData: reviewData
            })
            })
          })
        })
      })
    }
  }

    outFit() {
      //check time current time
      //if
      return new Promise((resolve, reject) => {
        axios.get(api + `products/${this.props.state.product_id}/styles`, {
          headers: {
            'Authorization': TOKEN
          }
        })
        .then((styleData)=> {
          let outfitPropsObj = helper.compileYourOutfitDataToProps(this.props.state.productInformation , styleData.data);
          resolve(outfitPropsObj);
        })
        .catch(err=> {
           //console.log(err)
        })
      })
    }

    style() {
      return new Promise((resolve, reject) => {
        let result =[]
        this.props.state.relatedProducts.forEach((productId) => {
          return productsStyle(productId)
            .then(data => {

              let splitted = data.config.url.split('?')
              let curId = Number(splitted[1])
              result.push(helper.addIdToStylesData(data.data, curId))

              if (result.length === this.props.state.relatedProducts.length) {
                result.sort((a, b) => a['product_id'] - b['product_id']);
                resolve(result)
              }
            })
        })
      })
    }

    product () {
      return new Promise((resolve, reject) => {
         let result=[]
         this.props.state.relatedProducts.forEach((productId) => {
           return productsWithId(productId)
             .then(data => {
               result.push(data.data);
               if (result.length === this.props.state.relatedProducts.length) {
                 result.sort((a, b) => a['id'] - b['id']);
                 resolve(result);
               }
             })
         })
       })
     }

     reviews () {
       return new Promise((resolve, reject) => {
         let result = [];
         this.props.state.relatedProducts.forEach((productId) => {
           return reviewsMeta(productId)
             .then(data => {
               result.push(data.data);
               if (result.length === this.props.state.relatedProducts.length) {
                 result.sort((a, b) => a['product_id'] - b['product_id']);
                 resolve(result);
               }
             })
         })
       })
     }

    handleAddToOutfit (outfitItem, e) {
      e.preventDefault();
      if (this.state.yourOutfitItems.some(({product_id}) => product_id === outfitItem.product_id)) {
        alert('Item already in outfit')
      } else {
        let itemWithReviews = outfitItem;
        itemWithReviews['reviews'] = this.props.state.ratings;
        localStorage.setItem(outfitItem.product_id, JSON.stringify(outfitItem));
        this.setState({
          yourOutfitItems: [...this.state.yourOutfitItems, outfitItem]
        })
      }
    }

    handleRemoveFromOutfit(outfitItem, e) {
      e.preventDefault();
      let removedItemId = outfitItem.product_id;
      let outfitItemsCopy = Object.assign(this.state.yourOutfitItems);
      let filtered = outfitItemsCopy.filter(product => {
        return product.product_id !== removedItemId
      });
      localStorage.removeItem(removedItemId);
      this.setState({
        yourOutfitItems: filtered
      })
    }

    handleCompareItems(item, e) {
      e.preventDefault();
      e.stopPropagation();

      const formattedFeatures = helper.formatFeatures(this.props.state.productInformation, item);
      const uniqueFeatArray = formattedFeatures[0];
      const modifiedClicked = formattedFeatures[2];
      const modifiedCurrent = formattedFeatures[1];

      this.setState({
        clickedProductInfo: modifiedClicked,
        modifiedCurrent: modifiedCurrent,
        features: uniqueFeatArray,
      }, () => {this.setState({
        modalShow: !this.state.modalShow
        })
      })
    }


    closeModal(e) {
      e.preventDefault();
      this.setState({
        modalShow: !this.state.modalShow
      });
    }

    handlePrevClick() {
      let copy = [...this.state.displayedProductsIndices]
      let incremented = copy.map(index => {
        return index-= 1;
      })
      this.setState({
        displayedProductsIndices: incremented
      })
    }

    handleNextClick() {
      let copy = [...this.state.displayedProductsIndices]
      let incremented = copy.map(index => {
        return index+= 1;
      })
      this.setState({
        displayedProductsIndices: incremented
      })
    }



  render() {
    if (this.props.state.loaded === false) {
      return <div className='isLoading'>Loading...</div>
    }
    const { recordCount } = this.props;


    return (
      <div className='relatedProducts' onClick={recordCount}>
        <RelatedProductsList
        allProps={this.state.allPropsObj}
        handleProductChange={this.props.handleProductChange}
        handleCompareItems={this.handleCompareItems}
        handlePrevClick={this.handlePrevClick}
        handleNextClick={this.handleNextClick}
        state={this.props.state}
        displayedProductsIndices={this.state.displayedProductsIndices}
        reviews={this.state.reviewData}
         />

        <RelatedProductsModal
        modalShow={this.state.modalShow}
        closeModal={this.closeModal}
        clickedProductInfo={this.state.clickedProductInfo}
        modifiedCurrent={this.state.modifiedCurrent}
        features={this.state.features}
         />

        <YourOutfitList
        outfitProps={this.state.outfitPropsObj}
        handleAddToOutfit={this.handleAddToOutfit}
        handleRemoveFromOutfit={this.handleRemoveFromOutfit}
        outfitItems={this.state.yourOutfitItems}
        state={this.props.state}
         />
      </div>
    );
  }
}

RelatedProducts.propTypes = {
  handleProductChange: propTypes.func,
  state: propTypes.object,
  recordCount: propTypes.func
}

export default withClickTracker(RelatedProducts);