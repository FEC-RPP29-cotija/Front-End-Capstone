import React from 'react';
import propTypes from 'prop-types';
import RelatedProductsCard from './RelatedProductsCard.jsx';


const RelatedProductsList = (props) => {
  let relatedItemsList = props.allProps.map((product, index) => {
    return <div key={index}>
      <RelatedProductsCard
        key={product.itemId}
        name={product.itemName}
        category={product.itemCategory}
        originalPrice={product.originalPrice}
        salePrice={product.salePrice}
        photo={product.photoUrl.thumbnail_url}
        id={product.itemId}
        features={product.features}
        handleProductChange={props.handleProductChange}
        handleCompareItems={props.handleCompareItems}
        starRating={product.starRating}
       />
     </div>
  })

  return (
    <div className='relatedProductsListContainer'>
      <h2>Related Products:</h2>
      <div className='relatedProductsList'>

        <button
        className='prevButton'
        onClick={() => {props.handlePrevClick()}} >Prev</button>

        {relatedItemsList[props.displayedProductsIndices[0]]}
        {relatedItemsList[props.displayedProductsIndices[1]]}
        {relatedItemsList[props.displayedProductsIndices[2]]}


        <button
        className='nextButton'
        onClick={() => {props.handleNextClick()}} >Next</button>
      </div>
    </div>
  )
}

RelatedProductsList.propTypes = {
  allProps: propTypes.array,
  handleProductChange: propTypes.func,
  handleCompareItems: propTypes.func,
  handlePrevClick: propTypes.func,
  handleNextClick: propTypes.func,
  displayedProductsIndices: propTypes.array
  };

export default RelatedProductsList;

