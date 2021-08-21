import React from "react";

const ExpandedView = (props) => {
  if (props.state.styles.length > 0) {
  let keyTwo = -1;
  return (
    <>

        <div className="expanded-view-numbers">
          {(function () {
            if (!props.OverviewState.zoomView) {
              let numberOfPicturesArray = [];
              for (
                let i = 1;
                i <=
                props.state.styles[props.OverviewState.styleIndex].photos
                  .length;
                i++
              ) {
                if (i-1 == props.OverviewState.mainPhoto) {
                  numberOfPicturesArray.push(
                    <button
                      className="expanded-view-selected-number-button"
                      value={i - 1}
                      onClick={props.changeMainPhoto}
                    >
                      {i}
                    </button>
                  );

                } else {
                  numberOfPicturesArray.push(
                    <button
                    className="expanded-view-number-buttons"
                    value={i - 1}
                    onClick={props.changeMainPhoto}
                    >
                    {i}
                  </button>
                );
              }
              }
              return numberOfPicturesArray;
            }
          })()}
        </div>
        <button className="expanded-view-exit" onClick={props.expandedView}>
          EXIT
        </button>
      <div className="expanded-view-div">
        {props.state.styles[props.OverviewState.styleIndex].photos.map(
          (photo) => {
            keyTwo += 1;
            if (keyTwo == props.OverviewState.mainPhoto) {
              return (
                <div className="expanded-view-photo">
                  {(function () {
                    if (
                      props.OverviewState.mainPhoto > 0 &&
                      !props.OverviewState.zoomView
                    ) {
                      return (
                        <button
                          className="expanded-view-left-arrow"
                          onClick={props.mainImageLeftArrow}
                        >
                          {(function () {
                            return "<";
                          })()}
                        </button>
                      );
                    }
                  })()}

                  <img
                    className="expanded-view-main-photo"
                    key={keyTwo}
                    value={keyTwo}
                    src={photo.url}
                    onClick={props.zoomView}
                  ></img>

                  {(function () {
                    if (
                      props.OverviewState.mainPhoto <
                        props.state.styles[props.OverviewState.styleIndex]
                          .photos.length -
                          1 &&
                      !props.OverviewState.zoomView
                    ) {
                      return (
                        <button
                          className="expanded-view-right-arrow"
                          onClick={props.mainImageRightArrow}
                        >
                          >
                        </button>
                      );
                    }
                  })()}
                </div>
              );
            }
          }
        )}
      </div>
    </>
  );
        } else {
          return (null)
        }
};

export default ExpandedView;
