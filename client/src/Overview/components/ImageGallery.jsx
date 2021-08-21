import React from "react";

const ImageGallery = (props) => {
  if (props.state.styles.length > 0) {
    let keyOne = -1;
    let keyTwo = -1;

    return (
      <div className="image-gallery">
        <div className="image-sidebar">
          {(function () {
            //console.log('number of photos', props.state.styles[props.OverviewState.styleIndex].photos.length)
            if (props.OverviewState.firstPhotoInPhotoSelectorIndex > 0) {
              return (
                <button className="up-and-down-arrow" onClick={props.upArrow}>
                  ^
                </button>
              );
            }
          })()}

          {props.state.styles[props.OverviewState.styleIndex].photos.map(
            (photo) => {
              keyOne += 1;
              if (
                keyOne >= props.OverviewState.firstPhotoInPhotoSelectorIndex &&
                keyOne <
                  7 + Number(props.OverviewState.firstPhotoInPhotoSelectorIndex)
              ) {
                if (keyOne == props.OverviewState.mainPhoto) {
                  return (
                    <img
                      className="selected-image gallery-image"
                      key={keyOne}
                      value={keyOne}
                      src={photo.url}
                      onClick={props.changeMainPhoto}
                    ></img>
                  );
                } else {
                  return (
                    <img
                      className="gallery-image"
                      key={keyOne}
                      value={keyOne}
                      src={photo.url}
                      onClick={props.changeMainPhoto}
                    ></img>
                  );
                }
              }
            }
          )}
          {(function () {
            if (
              props.OverviewState.firstPhotoInPhotoSelectorIndex + 7 <
              props.state.styles[props.OverviewState.styleIndex].photos.length
            ) {
              return (
                <button className="up-and-down-arrow" onClick={props.downArrow}>
                  v
                </button>
              );
            }
          })()}
        </div>

        <div>
          {props.state.styles[props.OverviewState.styleIndex].photos.map(
            (photo) => {
              keyTwo += 1;
              if (keyTwo == props.OverviewState.mainPhoto) {
                return (
                  <div className="main-image">
                    {(function () {
                      if (props.OverviewState.mainPhoto > 0) {
                        return (
                          <button
                            className="main-image-left-arrow"
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
                      className="main-photo"
                      key={keyTwo}
                      value={keyTwo}
                      src={photo.url}
                      onClick={props.expandedView}
                    ></img>

                    {(function () {
                      if (
                        props.OverviewState.mainPhoto <
                        props.state.styles[props.OverviewState.styleIndex]
                          .photos.length -
                          1
                      ) {
                        return (
                          <button
                            className="main-image-right-arrow"
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
      </div>
    );
  } else {
    return null;
  }
};

export default ImageGallery;
