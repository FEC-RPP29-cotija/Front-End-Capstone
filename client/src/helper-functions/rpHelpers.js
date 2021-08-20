
const helper = {
  compileRelatedProductsDataToProps: (relatedProducts, relatedProductsStyles) => {
    // console.log(relatedProductsStyles, "✅")
    let allPropsObj = {};
    let relatedProductsCopy = relatedProducts.slice();
    let relatedProductsStylesCopy= relatedProductsStyles.slice();

    relatedProductsCopy.forEach(item => {
      let itemDetail = {};
      itemDetail['itemId'] = item['id'];
      itemDetail['itemName'] = item['name'];
      itemDetail['itemCategory'] = item['category'];
      itemDetail['features'] = item['features'];
      allPropsObj[item['id']] = itemDetail;
    })

    relatedProductsStylesCopy.forEach(item => {
      let itemDetail = {};
      itemDetail['itemId'] = item.product_id;

      const firstResult = item.results.filter(result => result['default?'] === true)[0] ?? item.results[0];

      itemDetail['originalPrice'] = firstResult['original_price'];
      itemDetail['salePrice'] = firstResult['sale_price'];
      itemDetail['photoUrl'] =firstResult['photos'][0];


      allPropsObj[item.product_id] = {
        ...allPropsObj[item.product_id],
        'originalPrice': firstResult['original_price'],
        'salePrice': firstResult['sale_price'],
        'photoUrl': firstResult['photos'][0],
      };
    })


    return Object.values(allPropsObj);
  },

  compileYourOutfitDataToProps: (currentProductInfo, currentProductStyles) => {
    let outfitPropsObj = {};
    // console.log(currentProductInfo)
    let currentProductInfoCopy = Object.assign(currentProductInfo);

    outfitPropsObj['product_id'] = currentProductInfoCopy.id;
    outfitPropsObj['name'] = currentProductInfoCopy.name;
    outfitPropsObj['category'] = currentProductInfoCopy.category;

    const defaultResult = currentProductStyles.results.filter(result => result['default?'] === true)[0] ?? currentProductStyles.results[0];

    outfitPropsObj['originalPrice'] = defaultResult.original_price;
    outfitPropsObj['salePrice'] = defaultResult.sale_price;
    outfitPropsObj['photoUrl'] = defaultResult['photos'][0];

    return outfitPropsObj;
  },

  addIdToStylesData: (stylesData, productId) => {
    let stateStylesCopy = Object.assign(stylesData);
    let productStylesWithId = {};
    productStylesWithId['product_id'] = productId;
    productStylesWithId['results'] = stateStylesCopy;
    return productStylesWithId;
  },

  formatFeatures: (currentProd, clickedProd) => {
    const allFeatureKeys = [
      ...currentProd.features,
      ...clickedProd.features
    ]
    const uniqueFeatureKeys = allFeatureKeys.reduce((acc, curFeature) => {
      if (acc.indexOf(curFeature.feature) > -1 ) {
        return acc;
      } else {
        return [...acc, curFeature.feature]
      }
     },[])

     const modifiedCurrentProd = {
      ...currentProd,
      features: currentProd.features.reduce((acc, curFeature) => {
        return {...acc, [curFeature.feature]: curFeature.value}
      }, {})
    }
    const modifiedClickedProd = {
      ...clickedProd,
      features: clickedProd.features.reduce((acc, curFeature) => {
        return {...acc, [curFeature.feature]: curFeature.value}
      }, {})
    }
    return [uniqueFeatureKeys, modifiedCurrentProd, modifiedClickedProd];
  }
}

module.exports = helper;