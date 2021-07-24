import React from 'react';
import propTypes from 'prop-types';


const YourOutfitCard = (props) => {

  return (
    <div className='yourOutfitCard'>
        <button className='addToOutfitButton'>+</button>
        <h2 className='productName'>{props.name}</h2>
        <h3 className='productCategory'>{props.category}</h3>
        <h3 className='originalProductPrice'>{props.originalPrice}</h3>
        <h3 className='saleroductPrice'>{props.salePrice}</h3>
        <img src={props.photo}></img>
        <span className="material-icons actionStar">star</span><span className="material-icons actionStar">star</span><span className="material-icons actionStar">star</span><span className="material-icons actionStar">star</span><span className="material-icons actionStar">star</span>
    </div>
  )

}

YourOutfitCard.propTypes = {
  photo: propTypes.any,
  salePrice: propTypes.any,
  originalPrice: propTypes.any,
  category: propTypes.any,
  name: propTypes.any
  };

  export default YourOutfitCard;
