import React from "react";

const AddToCart = (props) => {
  if (props.state.styles.length > 0) {
    let val = 0;
    return (
      <>
        <div className = "select-size-and-quantity">
          <div className = "select-items" style = {{marginBottom: `${2- (Object.keys(props.state.styles[props.OverviewState.styleIndex].skus)).length}em`}}>
          {Object.entries(
            props.state.styles[props.OverviewState.styleIndex].skus
          ).map(([key, value]) => {
            if (value.quantity > 0) {
              val += 1;
              return (
                <div key={val} className = {'drop-down ' + value.size} value={value.quantity + ' ' + value.size + ' ' + key} onClick={props.changeAvailableQuantity}>
                  {value.size}
                </div>
              );
            }
          })}
          </div>
          <div className="selectSize" >
          <div id = "select-size" onClick = {props.dropDown}>{function() {
            if (props.OverviewState.sizeSelected.length > 0) {
              return (props.OverviewState.sizeSelected)
            } else if (val == 0) {
              return ('OUT OF STOCK')
            } else {
              return ('SELECT SIZE')
            }
          }()}</div>
          </div>
        <select className="quantity" onChange = {props.changeSelectedQuantity}>
          {(function () {
            let jsxElements = [];
            if (props.OverviewState.quantityAvailable > 0 && props.OverviewState.sizeSelected.length > 0) {
              if (props.OverviewState.quantityAvailable > 15) {
                for (let i = 1; i <= 15; i++) {
                  jsxElements.push(<option key={i}>{i}</option>);
                }
              } else {
                for (let i = 1; i <= props.OverviewState.quantityAvailable; i++) {
                  jsxElements.push(<option key={i}>{i}</option>);
                }
              }
              return jsxElements;
            } else {
              return <option>-</option>;
            }
          })()}
        </select>
        </div>
        <div className = "bag-and-favorite">
        <button className="addToBag" onClick = {props.addToBag} style = {{display: val ? "flex" : "none"}}>ADD TO BAG +</button>
        <button className="favoriteStar">⭒</button>
        </div>
        </>

    );
  } else {
    return null;
  }
};

export default AddToCart;
