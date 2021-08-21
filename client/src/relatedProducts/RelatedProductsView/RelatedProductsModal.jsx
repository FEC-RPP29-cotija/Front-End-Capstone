import React from 'react';
import propTypes from 'prop-types';


const RelatedProductsModal = (props) => {

  return (
    <div className='relatedProductsModal'
         style={{'display': props.modalShow ? 'flex' : 'none'}} >
      <div className='modalOpen' onClick={(e) => {props.closeModal(e)}}>
        <div className='modalTable' >
          <h1 className='modalTitle'>Comparing</h1>
          <table className='rpModalTable'>
            <tbody className='rpModalTbody'>
              <tr className='rpModalTrow'>
                <th className='rpModalTdheader'>{props.modifiedCurrent.name}</th>
                <th className='rpModalTdheader'></th>
                <th className='rpModalTdheader'>{props.clickedProductInfo.name}</th>
                </tr>
           {props.features.map((feature, i) => {
            return (
              <React.Fragment key={i++} >
                <tr className='rpModalTrow'>
                  <td className='rpModalTdata'>

                  {
                    props.modifiedCurrent.features[feature] === null ? '√'
                      : props.modifiedCurrent.features[feature] !== undefined ? props.modifiedCurrent.features[feature]
                      : ''
                    }
                  </td>
                  <td className='rpModalTdata'>{feature}</td>
                  <td className='rpModalTdata'>
                  {
                    props.clickedProductInfo.features[feature] === null ? '√'
                      : props.clickedProductInfo.features[feature] !== undefined ? props.clickedProductInfo.features[feature]
                      : ''
                    }
                  </td>
                </tr>

              </React.Fragment>
            )
            })}
              </tbody>
            </table>
          <button className='closeModal' onClick={(e) => {props.closeModal(e)}}>close</button>
        </div>
      </div>
    </div>
  )
};


RelatedProductsModal.propTypes = {
  modalShow: propTypes.any,
  handleCompareItems: propTypes.func,
  clickedProductInfo: propTypes.object,
  features: propTypes.array,
  closeModal: propTypes.func,
  modifiedCurrent: propTypes.object
};

  export default RelatedProductsModal;

