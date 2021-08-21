import React from "react";
import axios from "axios";
import ProductInfo from "./components/ProductInfo.jsx";
import AddToCart from "./components/AddToCart.jsx";
import StyleSelector from "./components/StyleSelector.jsx";
import ImageGallery from "./components/ImageGallery.jsx";
import ExpandedView from "./components/ExpandedView.jsx";
import $ from 'jquery';
import {addToCart} from "../clientRoutes/cart.js"
import withClickTracker from "./withClickTracker.jsx"

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      styleIndex: 0,
      quantityAvailable: 0,
      quantitySelected: 0,
      sku: 0,
      sizeSelected: "",
      bag: [],
      mainPhoto: 0,
      firstPhotoInPhotoSelectorIndex: 0,
      expandedView: false,
      zoomView: false,
      dropDown: false
    };
    this.changeAvailableQuantity = this.changeAvailableQuantity.bind(this);
    this.addToBag = this.addToBag.bind(this);
    this.changeSelectedQuantity = this.changeSelectedQuantity.bind(this);
    this.changeStyle = this.changeStyle.bind(this);
    this.changeMainPhoto = this.changeMainPhoto.bind(this);
    this.mainImageLeftArrow = this.mainImageLeftArrow.bind(this);
    this.mainImageRightArrow = this.mainImageRightArrow.bind(this);
    this.upArrow = this.upArrow.bind(this);
    this.downArrow = this.downArrow.bind(this);
    this.expandedView = this.expandedView.bind(this);
    this.expandedClassName = this.expandedClassName.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.zoomView = this.zoomView.bind(this);
    this.dropDown = this.dropDown.bind(this);
    this.dropDownFalse = this.dropDownFalse.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {

    if (prevProps.state.product_id !== this.props.state.product_id) {
      this.setState({
        styleIndex: 0,
        quantitySelected: 0,
        sizeSelected: "",
        mainPhoto: 0,
      });

      let sizeMenu = document.getElementsByClassName("quantity")[0];
      for (let i = 0; i < sizeMenu.options.length; i++) {
        if (sizeMenu.options[i].selected) {
          sizeMenu.options[i].selected = false;
        }
      }

      // let selectMenu = document.getElementsByClassName("selectSize")[0];
      // for (let i = 0; i < selectMenu.options.length; i++) {
      //   if (selectMenu.options[i].selected) {
      //     selectMenu.options[i].selected = false;
      //   }
      // }
    }
    if (this.state.dropDown === true) {

      document.getElementsByClassName('select-items')[0].style.display = 'flex';
    } else {
      document.getElementsByClassName('select-items')[0].style.display = 'none';
    }

  }

  changeStyle(e) {
    if (this.state.mainPhoto > this.props.state.styles[e.target.attributes.value.value].photos.length) {
      this.setState({
        styleIndex: e.target.attributes.value.value,
        sizeSelected: "",
        quantitySelected: 0,
        mainPhoto: this.props.state.styles[e.target.attributes.value.value].photos.length - 1,
        firstPhotoInPhotoSelectorIndex: 0
      });

    } else {
      this.setState({
        styleIndex: e.target.attributes.value.value,
        sizeSelected: "",
        quantitySelected: 0
      });

    }
    //props.state.styles[props.OverviewState.styleIndex].photos.length


    //document.getElementsByClassName('selectSize')[0].options[0].click()
    // let selectMenu = document.getElementsByClassName("selectSize")[0];
    // for (let i = 0; i < selectMenu.options.length; i++) {
    //   if (selectMenu.options[i].selected) {
    //     selectMenu.options[i].selected = false;
    //   }
    // }
    let sizeMenu = document.getElementsByClassName("quantity")[0];
    for (let i = 0; i < sizeMenu.options.length; i++) {
      if (sizeMenu.options[i].selected) {
        sizeMenu.options[i].selected = false;
      }
    }
  }

  changeAvailableQuantity(e) {
    // if (e.target.value == "SELECT SIZE") {
    //   this.setState({
    //     quantityAvailable: 0,
    //     sizeSelected: "",
    //   });

      let split = e.target.getAttribute('value').split(" ");
      this.setState({
        quantityAvailable: split[0],
        sizeSelected: split[1],
        sku: split[2],
        dropDown: false
      });


  }

  changeSelectedQuantity(e) {
    this.setState({
      quantitySelected: e.target.value,
    });
  }

  changeMainPhoto(e) {
    this.setState({
      mainPhoto: e.target.attributes.value.value,
    });
  }

  addToBag() {
    if (this.state.sizeSelected.length === 0) {

      this.setState({
        dropDown: true
      })
       alert("Please Select Size");
    //document.getElementsByClassName('XS')[0].change()
    //document.getElementById('select-size').click()
    //document.getElementsByClassName('style-selector-image')[].click()
    } else {
      // let item = {
      //   product_id: this.props.state.product_id,
      //   styleIndex: this.state.styleIndex,
      //   size: this.state.sizeSelected,
      //   quantity: this.state.quantitySelected,
      // };

      // let cart = this.state.bag;
      // cart.push(item);

      // this.setState({
      //   bag: cart,
      // });

      //make post request with sku
      addToCart(this.state.sku).then(data => {
        console.log(data)
      })
    }
  }

  mainImageLeftArrow () {

    let newMainPhoto = Number(this.state.mainPhoto) - 1;
    this.setState({
      mainPhoto: newMainPhoto
    })

    if (newMainPhoto < this.state.firstPhotoInPhotoSelectorIndex) {
      this.upArrow()
    }

  }

  mainImageRightArrow() {

    let newMainPhoto = Number(this.state.mainPhoto) + 1;
    this.setState({
      mainPhoto: newMainPhoto
    })
    //if mainphoto is larger than firstPhotoIn + 7 then
    if (newMainPhoto >= this.state.firstPhotoInPhotoSelectorIndex + 7) {
      this.downArrow()
    }

}

upArrow() {
    let newFirstPhoto = Number(this.state.firstPhotoInPhotoSelectorIndex) - 1;
    this.setState({
      firstPhotoInPhotoSelectorIndex: newFirstPhoto
    })

}

downArrow() {
    let newFirstPhoto = Number(this.state.firstPhotoInPhotoSelectorIndex) + 1;
    this.setState({
      firstPhotoInPhotoSelectorIndex: newFirstPhoto
    })

}

expandedView() {
  if (this.state.expandedView) {
    this.setState({
      expandedView: false
    })
  } else {
    this.setState({
      expandedView: true
    })
  }

}

handleMouseMove(e) {
  let magnifying_area = document.getElementsByClassName('expanded-view-div')[0];
  let magnifying_img = document.getElementsByClassName('expanded-view-main-photo')[0];
  let total_area = document.getElementsByClassName('overview-expanded')[0]


  let clientX = e.pageX - total_area.offsetWidth/2;
  let clientY = e.pageY - total_area.offsetHeight/2;

  let mWidth = magnifying_area.offsetWidth
  let mHeight = magnifying_area.offsetHeight



  let X = ((clientX / mWidth) * 200) * -1;
  let Y = ((clientY / mHeight) * 200) * -1;

  if (this.state.zoomView) {
    magnifying_img.style.transform = 'translate(' + X + '%,' + Y + '%) scale(2.5)'
  } else {
    magnifying_img.style.transform = 'translate(' + 0 + '%,' + 0 + '%) scale(1)'

  }

}

zoomView () {
  let magnifying_img = document.getElementsByClassName('expanded-view-main-photo')[0];
  if (this.state.zoomView) {
    this.setState({
      zoomView: false
    })
    magnifying_img.style.transform = 'translate(' + 0 + '%,' + 0 + '%) scale(1)'
    magnifying_img.style.cursor = 'crosshair'
  } else {
    this.setState({
      zoomView: true
    })
    magnifying_img.style.transform = 'translate(' + 0 + '%,' + 0 + '%) scale(2.5)'
    magnifying_img.style.cursor = 'zoom-out'


  }
}

dropDown() {

  this.setState({
    dropDown: true
  })
}

dropDownFalse() {
  if (this.state.dropDown){
    this.setState({
      dropDown: false
    })
  }

}


expandedClassName() {
  return  (this.state.expandedView ? "overview-expanded" : "overview")
}

  render() {

    return (
      <div onClick = {this.props.recordCount}>
      <div onClick = {this.dropDownFalse}>
        <div className = "overview-expanded" onMouseMove = {this.handleMouseMove} style={{display: this.state.expandedView ? "flex" : "none"}}>
      <ExpandedView
      state={this.props.state}
        OverviewState={this.state}
        changeMainPhoto={this.changeMainPhoto}
        mainImageLeftArrow = {this.mainImageLeftArrow}
        mainImageRightArrow = {this.mainImageRightArrow}
        upArrow = {this.upArrow}
        downArrow = {this.downArrow}
        expandedView = {this.expandedView}
        handleMouseMove = {this.handleMouseMove}
        zoomView = {this.zoomView}
        />
      </div>
      <div className = "overview">
        <div className="column-one">
          <ImageGallery
            state={this.props.state}
            OverviewState={this.state}
            changeMainPhoto={this.changeMainPhoto}
            mainImageLeftArrow = {this.mainImageLeftArrow}
            mainImageRightArrow = {this.mainImageRightArrow}
            upArrow = {this.upArrow}
            downArrow = {this.downArrow}
            expandedView = {this.expandedView}
          />
        </div>
        <div className="column-two">
          <ProductInfo state={this.props.state} OverviewState={this.state} />
          <StyleSelector
            state={this.props.state}
            OverviewState={this.state}
            changeStyle={this.changeStyle}
          />
          <AddToCart
            state={this.props.state}
            OverviewState={this.state}
            changeAvailableQuantity={this.changeAvailableQuantity}
            addToBag={this.addToBag}
            changeSelectedQuantity={this.changeSelectedQuantity}
            dropDown = {this.dropDown}
          />
        </div>
      </div>
      </div>
      </div>
    );
  }

}

export default withClickTracker(Overview);
