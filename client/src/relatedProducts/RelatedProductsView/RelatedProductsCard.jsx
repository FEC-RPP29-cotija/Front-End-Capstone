import React from 'react';
import propTypes from 'prop-types';
import Stars from "../../stars/stars.jsx";



const getStars = function (starsObject) {
  let total = 0;
  let numberOfRatings = 0;
  for (let star in starsObject) {
    numberOfRatings = numberOfRatings + Number(starsObject[star]);
    total = starsObject[star] * star + total;
  }

  let average = total / numberOfRatings;
  let htmlElements = Stars(average);

  if (numberOfRatings !== 0) {
    return htmlElements
  } else {
    return <div className='stars'>{htmlElements.props.children[0]}</div>
  }
};

const RelatedProductsCard = (props) => {
  return (
    <div className='relatedProductsCard' onClick={() => props.handleProductChange(props.id)} >
        <div className='relatedProductsCardTop'>
          <h3 className='productName'>{props.name}</h3>
          <button className='relatedProductsActionButton'onClick={(e) => {props.handleCompareItems(props, e)}}>★</button>
        </div>
        <div className='relatedProductsCardBottom'>
        <h4 className='productCategory'>{props.category}</h4>
        {(function() {
          if (props.salePrice === null) {
            return (
              <h4 className='originalProductPrice'>{props.originalPrice}</h4>
            )
          } else {
            return (
              <div className='salePriceWrapper'>
                <h4 className='originalProductPriceWithSale'>{props.originalPrice}</h4>
                <h4 className='saleProductPrice'>{props.salePrice}</h4>
              </div>
            )
          }
        })()}
        <img id='rpImage' src={props.photo || 'https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg'}
        alt='related clothing product'
        className='relatedProductImage'></img>
        {/* https://tinyurl.com/4mfm7zxv */}
        <span className="reviewStars">{getStars(props.starRating.ratings)}</span>
        </div>
    </div>
  )

}

RelatedProductsCard.propTypes = {
  photo: propTypes.string,
  salePrice: propTypes.any,
  originalPrice: propTypes.any,
  category: propTypes.string,
  name: propTypes.string,
  handleProductChange: propTypes.func,
  handleCompareItems: propTypes.func,
  id: propTypes.number,
  starRating: propTypes.any,

  };

  export default RelatedProductsCard;