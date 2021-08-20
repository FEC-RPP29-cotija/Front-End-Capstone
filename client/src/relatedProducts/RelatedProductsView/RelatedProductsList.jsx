import React from 'react';
import propTypes from 'prop-types';
import RelatedProductsCard from './RelatedProductsCard.jsx';


const RelatedProductsList = (props) => {

  let relatedItemsList = props.allProps.map((product, index) => {
    console.log(props.reviews[index], "👌")
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
        starRating={props.reviews[index] ? props.reviews[index] : []}
       />
     </div>
  });

  let prevButton;
  if (props.displayedProductsIndices[0] > 0) {
    prevButton =  <button
    className='prevButton'
    onClick={() => {props.handlePrevClick()}} >{String.fromCharCode(60)}</button>
  } else {
    prevButton = null;
  }

  let nextButton;
  if (props.displayedProductsIndices[2] === relatedItemsList.length - 1) {
    nextButton = null;
  } else {
    nextButton =<button
    className='nextButton'
    onClick={() => {props.handleNextClick()}} >{String.fromCharCode(62)}</button>
  }


  return (
    <div className='relatedProductsListContainer'>
      <h2 className='relatedProductsTitle'>Related Products:</h2>
      <div className='relatedProductsList'>
        {prevButton}

        {relatedItemsList[props.displayedProductsIndices[0]]}
        {relatedItemsList[props.displayedProductsIndices[1]]}
        {relatedItemsList[props.displayedProductsIndices[2]]}

        {nextButton}

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
  displayedProductsIndices: propTypes.array,
  reviews: propTypes.array
  };

export default RelatedProductsList;

