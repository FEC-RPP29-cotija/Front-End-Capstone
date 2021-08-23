import React from 'react';
import propTypes from 'prop-types';

const AddToOutfitCard = (props) => {
  return (
    <div className='addToOutfitCard' >
        <button className='addToOutfitButton'

        onClick={(e) => {props.handleAddToOutfit(props.outfitProps, e)}}>
           <span>+</span>
           <span>Add </span>
           <span>to</span>
           <span>Outfit</span>
        </button>
    </div>
  )
}

AddToOutfitCard.propTypes = {
  handleAddToOutfit: propTypes.func,
  outfitProps: propTypes.object,
  state: propTypes.object
  };

  export default AddToOutfitCard;