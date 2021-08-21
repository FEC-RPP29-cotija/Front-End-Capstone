import React from "react";

const StyleSelector = (props) => {
  if (props.state.styles.length > 0) {
    let keyOne = -1;
    let keyTwo = -1;

    return (
      <div className="style-selector">
        <p>STYLE > {props.state.styles[props.OverviewState.styleIndex].name}</p>
        <table>
          <tbody key = "tbody">
            {(function () {
              let styleSelectorArray = [];
              for (let i = 0; i < props.state.styles.length; i += 4) {
                let styleIndex = -1;
                styleSelectorArray.push(
                  <tr>
                    {props.state.styles.map((style) => {
                      styleIndex += 1;
                      if (i <= styleIndex && styleIndex < i + 4) {
                        if (props.OverviewState.styleIndex == styleIndex) {
                          return (
                            <td key={styleIndex} onClick={props.changeStyle}>
                              <div className="check-mark">✓</div>
                              <img
                                value={styleIndex}
                                src={style.photos[0].thumbnail_url}
                                className="style-selector-image"
                              ></img>
                            </td>
                          );
                        } else {
                          return (
                            <td key={styleIndex} onClick={props.changeStyle}>
                              <img
                                value={styleIndex}
                                src={style.photos[0].thumbnail_url}
                                className="style-selector-image"
                              ></img>
                            </td>
                          );
                        }
                      } else {
                        return;
                      }
                    })}
                  </tr>
                );
              }
              return styleSelectorArray;
            })()}
          </tbody>
        </table>
      </div>
    );
  } else {
    return null;
  }
};

export default StyleSelector;

{
  /* <tr>
{props.state.styles.map((style)=> {
  keyOne += 1;
  if (keyOne >= 4) {
    return;
  } else {
    if (props.OverviewState.styleIndex == keyOne) {
     return (
       <td key = {keyOne} onClick = {props.changeStyle}>
         <div className = "check-mark">✓</div>
  <img value = {keyOne} src={style.photos[0].thumbnail_url} className = "style-selector-image"></img>
  </td>
  )} else {

    return (
      <td key = {keyOne} onClick = {props.changeStyle}>
 <img value = {keyOne} src={style.photos[0].thumbnail_url} className = "style-selector-image"></img>
 </td>
 )
}
}
})
}
</tr>
<tr>
{props.state.styles.map((style)=> {
  keyTwo += 1;
  if (keyTwo < 4) {
    return;
  } else {
   if (props.OverviewState.styleIndex == keyTwo) {
     return (
       <td key = {keyTwo} onClick = {props.changeStyle}>
         <div className = "check-mark">✓</div>
  <img value = {keyTwo} src={style.photos[0].thumbnail_url} className = "style-selector-image"></img>
  </td>
  )} else {
    return (
      <td key = {keyTwo} onClick = {props.changeStyle}>
 <img value = {keyTwo} src={style.photos[0].thumbnail_url} className = "style-selector-image"></img>
 </td>
 )
}
}
})
}
</tr> */
}
