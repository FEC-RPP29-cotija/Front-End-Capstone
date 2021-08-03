import React from 'react';
import propTypes from 'prop-types';
import RelatedProductsList from './RelatedProductsList.jsx';
import YourOutfitList from '../YourOutfitView/YourOutfitList.jsx';
import helper from '../../helper-functions/rpHelpers.js';
import {productsWithId, productsStyle, outfitStyle} from "../../clientRoutes/products.js";
import axios from 'axios';

const TOKEN = require("../../../../config.js").GITHUB_TOKEN;
const api = require("../../../../config.js").API;



export default class RelatedProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      relatedProducts: [],
      relatedProductsStyles: [],
      yourOutfitItems:[],
      allPropsObj: [],
      outfitPropsObj: [],
      rpLoaded: false,
      yoLoaded: false

    }
    this.handleAddToOutfit = this.handleAddToOutfit.bind(this);
    this.getRelatedStateData = this.getRelatedStateData.bind(this);
    this.getOutfitData = this.getOutfitData.bind(this);

  }

  componentDidMount () {
    //(products request)
    let getProduct = new Promise((resolve, reject) => {
      let result=[]
      this.props.state.relatedProducts.forEach((productId) => {
        return productsWithId(productId)
          .then(data => {
            result.push(data.data)
            if (result.length === this.props.state.relatedProducts.length) {

              resolve(result)
            }
          })
      })
    })
    //(styles request)
    let getStyle = new Promise((resolve, reject) => {
      let result =[]
      this.props.state.relatedProducts.forEach((productId) => {
        return productsStyle(productId)
          .then(data => {
            result.push(data.data)
            if (result.length === this.props.state.relatedProducts.length) {
              resolve(result)
            }
          })
      })
    })

    //(outfit request)
    let outFitData = new Promise((resolve, reject) => {
      axios.get(api + `products/${this.props.state.product_id}/styles`, {
        headers: {
          'Authorization': TOKEN
        }
      })
      .then((styleData)=> {
        let outfitPropsObj = helper.compileYourOutfitDataToProps(this.props.state.productInformation , styleData.data);
        resolve(outfitPropsObj);
      })
    })
    //gather the promises for everything in a single then
    getProduct.then(data => {
      getStyle.then(styleData => {
        outFitData.then(fitData => {
          //use your helper to get correct style data
          let resultStyleWithId=[];
          data.forEach((product, pi) => {
            styleData.forEach((style, si) => {
              if (pi === si) {
              resultStyleWithId.push(helper.addIdToStylesData(style, product.id))
              }
            })
          })
          //use your helper to create allProps obj
          let allPropsObj = helper.compileRelatedProductsDataToProps(data, resultStyleWithId)
          //set state all at once 🤙
          this.setState({
            relatedProducts: data,
            relatedProductsStyles: resultStyleWithId,
            allPropsObj:allPropsObj,
            rpLoaded: true,
            outfitPropsObj: fitData,
            yoLoaded: true
          })
        })
      })
    })
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevProps.state.product_id !== this.props.state.product_id ||
        prevState.yourOutfitItems !== this.state.yourOutfitItems) {
      this.getRelatedStateData();
      this.getOutfitData();
    }
  }



  getRelatedStateData() {


    // this.setState({
    //   rpLoaded: false
    // });
    // // console.log(this)

    // this.props.state.relatedProducts.forEach((productId) => {


    //   Promise.all([

    //     productsWithId(productId),
    //     productsStyle(productId)
    //   ])
    //   .then((results) => {
    //     // console.log(results)


    //     // console.log(JSON.stringify(results[1].data));
    //     let resultStyleWithId = helper.addIdToStylesData(results[1].data, results[0].data.id)
    //     // console.log(resultStyleWithId)
    //     this.setState({
    //       relatedProducts: [...this.state.relatedProducts, results[0].data],
    //       relatedProductsStyles: [...this.state.relatedProductsStyles, resultStyleWithId]
    //     })
    //     // console.log(this.state)
    //   })
    //   .then(() => {
    //     let allPropsObj = helper.compileRelatedProductsDataToProps(this.state.relatedProducts,this.state.relatedProductsStyles);

    //     this.setState({
    //       allPropsObj: allPropsObj,
    //     })
    //   })
    //   .then(() => {
    //     this.setState({
    //       rpLoaded: true,
    //     })


    //   })
    //   .catch((err) => {
    //     // console.log('this is the err 🥲 ', err)
    //   });
    // });
    }

    getOutfitData () {
    // this.setState({
    //   yoLoaded: false
    // });

    // axios.get(api + `products/${this.props.state.product_id}/styles`, {
    //   headers: {
    //     'Authorization': TOKEN
    //   }
    // })
    // .then((styleData)=> {
    //   let outfitPropsObj = helper.compileYourOutfitDataToProps(this.props.state.productInformation , styleData.data);
    //   return outfitPropsObj;
    // })
    // .then(outfitPropsObj => {
    //   this.setState({
    //     outfitPropsObj: outfitPropsObj,
    //     yoLoaded: true
    //   })
    // })
    // .catch((err) => {
    //   // console.log('err errrr', err)
    //   res.status(500).end()
    // })

    }

    handleAddToOutfit (outfitItem, e) {
      e.preventDefault();
      // console.log(`❤️ handler received ${JSON.stringify(outfitItem)}`);
      // console.log(`💙 yourOutfitItemsbefore: ${JSON.stringify(this.state.yourOutfitItems)}`)
      localStorage.setItem('outfitItem', outfitItem);
      this.setState({
        yourOutfitItems: [...this.state.yourOutfitItems, outfitItem]
      })
      // console.log(`🧡 yourOutfitItemsafter: ${JSON.stringify(this.state.yourOutfitItems)}`)
    }


  render() {
    if (this.props.state.loaded === false || this.state.loaded === false) {
      return <div className='isLoading'>Loading...</div>
    }

    return (
      <div className='relatedProducts'>
        <RelatedProductsList
        allProps={this.state.allPropsObj}
        handleProductChange={this.props.handleProductChange}
        state={this.props.state} />
        <YourOutfitList
        outfitProps={this.state.outfitPropsObj}
        handleAddToOutfit={this.handleAddToOutfit}
        outfitItems={this.state.yourOutfitItems}
        state={this.props.state} />
      </div>
    );
  }
}

RelatedProducts.propTypes = {
  handleProductChange: propTypes.func,
  state: propTypes.object
}