import React from "react";
import Stars from "../../stars/stars.jsx";

// name, description, catagory, # of reviews, average review, price & sale price

const getStars = function (starsObject) {
  let total = 0;
  let numberOfRatings = 0;
  for (let star in starsObject) {
    numberOfRatings = numberOfRatings + Number(starsObject[star]);
    total = starsObject[star] * star + total;
  }

  let average = total / numberOfRatings;

  let htmlElements = Stars(average);

  return htmlElements;
};

const ProductInfo = (props) => {
  if (props.state.styles.length > 0) {
    return (
      <div className="product-info">
        {(function () {
          if (Object.keys(props.state.ratings).length > 0) {
            return (
              <div>
                <div className="reviewStars">
                  {getStars(props.state.ratings)}
                </div>
                <a href="#link_to_reviews">
                  Read all {Object.values(props.state.ratings).reduce((acc, cur) => { return parseInt(acc) + parseInt(cur) })} Reviews
                </a>
              </div>
            );
          }
        })()}

        <h3 className="expandedProductCatagory">
          {props.state.productInformation.category}
        </h3>
        <h1 className="expandedProductName">
          {props.state.productInformation.name}
        </h1>
        <h3 className="expandedProductStyleName">
          {props.state.styles[props.OverviewState.styleIndex].name}
        </h3>
        <p className="productDescription">
          {props.state.productInformation.description}
        </p>
        {(function () {
          if (
            props.state.styles[props.OverviewState.styleIndex].sale_price ===
            null
          ) {
            return (
              <p className="productPrice">
                {" "}
                $
                {
                  props.state.styles[props.OverviewState.styleIndex]
                    .original_price
                }{" "}
              </p>
            );
          } else {
            return (
              <>
                <div className="product-original-price">
                  {" "}
                  Original Price: $
                  {
                    props.state.styles[props.OverviewState.styleIndex]
                      .original_price
                  }
                </div>
                <div className="product-sale-price">
                  Sale Price: $
                  {
                    props.state.styles[props.OverviewState.styleIndex]
                      .sale_price
                  }{" "}
                </div>
              </>
            );
          }
        })()}
      </div>
    );
  } else {
    return null;
  }
};

export default ProductInfo;
