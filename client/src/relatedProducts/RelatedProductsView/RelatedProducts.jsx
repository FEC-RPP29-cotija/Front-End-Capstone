import React from 'react';
import propTypes from 'prop-types';
import RelatedProductsList from './RelatedProductsList.jsx';
import YourOutfitList from '../YourOutfitView/YourOutfitList.jsx';
import RelatedProductsModal from './RelatedProductsModal.jsx';
import withClickTracker from '../withClickTracker.jsx';
import helper from '../../helper-functions/rpHelpers.js';
import {productsWithId, productsStyle, postNewRelatedProductsData, getRelatedProdServerData} from "../../clientRoutes/products.js";
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

    //  console.log(this.props.state.relatedProducts)
    //  console.log(this.props.state.styles)
    // get saved data

    let newtime =this.props.handleBounce()
    console.log(newtime)
    if(this.props.time <=50) {


     getRelatedProdServerData(this.props.state.product_id)
      .then(data => {
        console.log('server data received')

      this.setState({
        relatedProducts: data.data[0].relatedProducts,
        relatedProductsStyles: data.data[0].relatedProductsStyles,
        allPropsObj:data.data[0].allPropsObj,
        outfitPropsObj: data.data[0].outfitPropsObj,
        yourOutfitItems: data.data[0].yourOutfitItems,
        reviewData: data.data[0].reviewData
      })



      })
    } else {
        let fetchProducts = () => {




      return new Promise((resolve, reject) => {

        let newS =[]
        let result =[]
        let newP = []
        let newR =[]
        let reviewData=[];
        this.props.state.relatedProducts.forEach((productId) => {

          productsWithId(productId).then(p => {

            newP.push(p.data)
            productsStyle(productId).then(s => {
              newS.push(s)
              reviewsMeta(productId).then(r => {
                newR.push(r.data)
                // newS.push(s)
                result = [newP, newS, newR]
                if (result[0].length === this.props.state.relatedProducts.length && result[1].length === this.props.state.relatedProducts.length) {
                  resolve(result)
                }
              })
            })
          })
        })
      })
    }


    fetchProducts().then((currentProductsAndStyles) => {


      let sortedProducts = (data) => {
        let result = data.sort((a, b) => {
          return a.id -b.id
        })
        return result
      }

      let finalProducts = sortedProducts(currentProductsAndStyles[0])

      let sortStyles = (data) => {

        let result =[];
        data.forEach((style) => {

          let splitted = style.config.url.split('?')
          let curId = Number(splitted[1])
          result.push(helper.addIdToStylesData(style.data, curId))
          result = result.sort((a, b) =>{

            return a.product_id - b.product_id
          });
        })
        return result
      }

      let finalStyles = sortStyles(currentProductsAndStyles[1])

      let styleData = {
        data: {results:this.props.state.styles2.data},
        product_id: this.props.state.productInformation.id
      }

      let finalOutfit =helper.compileYourOutfitDataToProps(this.props.state.productInformation, styleData.data)
      let allPropsObj = helper.compileRelatedProductsDataToProps(finalProducts, finalStyles)

      let values = [];
      let keys = Object.keys(localStorage);
      let i = keys.length;
      while ( i-- ) {
        values.push( JSON.parse(localStorage.getItem(keys[i])) );
      }
      console.log(currentProductsAndStyles)
      let reviews =  currentProductsAndStyles[2].slice()
      console.log(reviews, "🔥")
      //post state to server then set state
      postNewRelatedProductsData([{
        relatedProducts: finalProducts,
        relatedProductsStyles: finalStyles,
        allPropsObj:allPropsObj,
        outfitPropsObj: finalOutfit,
        yourOutfitItems: values,
        reviewData: reviews
      }]).then((data) => {
        console.log(data)

        // console.log(data)


      this.setState({
        relatedProducts: finalProducts,
        relatedProductsStyles: finalStyles,
        allPropsObj:allPropsObj,
        outfitPropsObj: finalOutfit,
        yourOutfitItems: values,
        reviewData: reviews
      })
     })
    })

    }
    // }






    // let fetchProducts = () => {




    //   return new Promise((resolve, reject) => {

    //     let newS =[]
    //     let result =[]
    //     let newP = []
    //     let newR =[]
    //     let reviewData=[];
    //     this.props.state.relatedProducts.forEach((productId) => {

    //       productsWithId(productId).then(p => {

    //         newP.push(p.data)
    //         productsStyle(productId).then(s => {
    //           newS.push(s)
    //           reviewsMeta(productId).then(r => {
    //             newR.push(r.data)
    //             // newS.push(s)
    //             result = [newP, newS, newR]
    //             if (result[0].length === this.props.state.relatedProducts.length && result[1].length === this.props.state.relatedProducts.length) {
    //               resolve(result)
    //             }
    //           })
    //         })
    //       })
    //     })
    //   })
    // }


    // fetchProducts().then((currentProductsAndStyles) => {


    //   let sortedProducts = (data) => {
    //     let result = data.sort((a, b) => {
    //       return a.id -b.id
    //     })
    //     return result
    //   }

    //   let finalProducts = sortedProducts(currentProductsAndStyles[0])

    //   let sortStyles = (data) => {

    //     let result =[];
    //     data.forEach((style) => {

    //       let splitted = style.config.url.split('?')
    //       let curId = Number(splitted[1])
    //       result.push(helper.addIdToStylesData(style.data, curId))
    //       result = result.sort((a, b) =>{

    //         return a.product_id - b.product_id
    //       });
    //     })
    //     return result
    //   }

    //   let finalStyles = sortStyles(currentProductsAndStyles[1])

    //   let styleData = {
    //     data: {results:this.props.state.styles2.data},
    //     product_id: this.props.state.productInformation.id
    //   }

    //   let finalOutfit =helper.compileYourOutfitDataToProps(this.props.state.productInformation, styleData.data)
    //   let allPropsObj = helper.compileRelatedProductsDataToProps(finalProducts, finalStyles)

    //   let values = [];
    //   let keys = Object.keys(localStorage);
    //   let i = keys.length;
    //   while ( i-- ) {
    //     values.push( JSON.parse(localStorage.getItem(keys[i])) );
    //   }
    //   console.log(currentProductsAndStyles)
    //   let reviews =  currentProductsAndStyles[2].slice()
    //   console.log(reviews, "🔥")
    //   //post state to server then set state
    //   postNewRelatedProductsData([{
    //     relatedProducts: finalProducts,
    //     relatedProductsStyles: finalStyles,
    //     allPropsObj:allPropsObj,
    //     outfitPropsObj: finalOutfit,
    //     yourOutfitItems: values,
    //     reviewData: reviews
    //   }]).then((data) => {
    //     console.log(data)

    //     // console.log(data)


    //   this.setState({
    //     relatedProducts: finalProducts,
    //     relatedProductsStyles: finalStyles,
    //     allPropsObj:allPropsObj,
    //     outfitPropsObj: finalOutfit,
    //     yourOutfitItems: values,
    //     reviewData: reviews
    //   })
    //  })
    // })




  }


  componentDidUpdate (prevProps, prevState) {


    // if (prevProps.state.product_id !== this.props.state.product_id) {

    //   // if (newtime) {



    // let fetchProducts = () => {




    //   return new Promise((resolve, reject) => {

    //     let newS =[]
    //     let result =[]
    //     let newP = []
    //     let newR =[]
    //     let reviewData=[];
    //     this.props.state.relatedProducts.forEach((productId) => {

    //       productsWithId(productId).then(p => {

    //         newP.push(p.data)
    //         productsStyle(productId).then(s => {
    //           newS.push(s)
    //           reviewsMeta(productId).then(r => {
    //             newR.push(r.data)
    //             // newS.push(s)
    //             result = [newP, newS, newR]
    //             if (result[0].length === this.props.state.relatedProducts.length && result[1].length === this.props.state.relatedProducts.length) {
    //               resolve(result)
    //             }
    //           })
    //         })
    //       })
    //     })
    //   })
    // }


    // fetchProducts().then((currentProductsAndStyles) => {


    //   let sortedProducts = (data) => {
    //     let result = data.sort((a, b) => {
    //       return a.id -b.id
    //     })
    //     return result
    //   }

    //   let finalProducts = sortedProducts(currentProductsAndStyles[0])

    //   let sortStyles = (data) => {

    //     let result =[];
    //     data.forEach((style) => {

    //       let splitted = style.config.url.split('?')
    //       let curId = Number(splitted[1])
    //       result.push(helper.addIdToStylesData(style.data, curId))
    //       result = result.sort((a, b) =>{

    //         return a.product_id - b.product_id
    //       });
    //     })
    //     return result
    //   }

    //   let finalStyles = sortStyles(currentProductsAndStyles[1])

    //   let styleData = {
    //     data: {results:this.props.state.styles2.data},
    //     product_id: this.props.state.productInformation.id
    //   }

    //   let finalOutfit =helper.compileYourOutfitDataToProps(this.props.state.productInformation, styleData.data)
    //   let allPropsObj = helper.compileRelatedProductsDataToProps(finalProducts, finalStyles)

    //   let values = [];
    //   let keys = Object.keys(localStorage);
    //   let i = keys.length;
    //   while ( i-- ) {
    //     values.push( JSON.parse(localStorage.getItem(keys[i])) );
    //   }
    //   console.log(currentProductsAndStyles)
    //   let reviews =  currentProductsAndStyles[2].slice()
    //   console.log(reviews, "🔥")
    //   //post state to server then set state
    //   postNewRelatedProductsData([{
    //     relatedProducts: finalProducts,
    //     relatedProductsStyles: finalStyles,
    //     allPropsObj:allPropsObj,
    //     outfitPropsObj: finalOutfit,
    //     yourOutfitItems: values,
    //     reviewData: reviews
    //   }]).then((data) => {
    //     console.log(data)

    //     // console.log(data)


    //   this.setState({
    //     relatedProducts: finalProducts,
    //     relatedProductsStyles: finalStyles,
    //     allPropsObj:allPropsObj,
    //     outfitPropsObj: finalOutfit,
    //     yourOutfitItems: values,
    //     reviewData: reviews
    //   })
    //  })
    // })

    // }





  // }
// } else {
//       return getRelatedProdServerData(this.props.state.product_id)
//       .then(data => {
//         console.log('server data received')

//       this.setState({
//         relatedProducts: data.data[0].relatedProducts,
//         relatedProductsStyles: data.data[0].relatedProductsStyles,
//         allPropsObj:data.data[0].allPropsObj,
//         outfitPropsObj: data.data[0].outfitPropsObj,
//         yourOutfitItems: data.data[0].yourOutfitItems,
//         reviewData: data.data[0].reviewData
//       })

//       })
// // }












  }

    outFit() {
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
              // console.log(data, 'hiiii')
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
              //  console.log(data)
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