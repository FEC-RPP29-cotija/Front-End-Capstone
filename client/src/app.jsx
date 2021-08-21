import React from 'react';
import ReactDOM from 'react-dom';
import Overview from './Overview/index.jsx'
import RelatedProducts from './relatedProducts/RelatedProductsView/RelatedProducts.jsx';
import QuestionsNAnswers from './questions-n-answers/qNa.jsx';
import RatingsAndReviews from './RatingsAndReviews/RatingsAndReviews.jsx';
import propTypes from 'prop-types';
import QnAClicks from './questions-n-answers/QnAClicks.jsx';
// CLIENT ROUTES
import { reviews, reviewsMeta } from "./clientRoutes/reviews.js";
import { products, productsWithId, productsStyle, productsRelated } from "./clientRoutes/products.js";
import { questions, getReported } from "./clientRoutes/qa.js";
import { cart } from "./clientRoutes/cart.js";
// CSS to load
import './styles/darkMode.css';
import './styles/displayImageGallery.css'
import './styles/questionsAnswers.css'
import './styles/ratingsReviews.css'
import './styles/relatedProducts.css'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product_id: 36300,
      productInformation: {},
      styles: [],
      relatedProducts: [],
      qNa: [],
      savedQnA: [],
      currentProductPhoto:'',
      loaded: false,
      ratings: {},
      isDarkMode: false,
      time: 0,

    }
    this.handleProductChange = this.handleProductChange.bind(this);
    this.getStateData = this.getStateData.bind(this);
    this.toggleDarkMode = this.toggleDarkMode.bind(this);
    this.handleBounce = this.handleBounce.bind(this)
  }

  componentDidMount() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    const product = params.product_id || this.state.product_id;
    this.getStateData(product);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.product_id !== this.state.product_id) {
      this.getStateData(this.state.product_id)

    }
  }
  handleBounce() {
    let newTime = new Date().getSeconds()
    console.log(newTime)

    let result = false;
    if (newTime > 65) {
      result = true
    }
    this.setState({
      time: newTime
    })
    return result


  }
  toggleDarkMode () {
    this.setState({
      isDarkMode: !this.state.isDarkMode
    })

  }

  handleProductChange(newProductId) {
    this.setState({
      product_id: newProductId
    })
  }

  getStateData(product_id) {
    this.setState({
      loaded: false
    })
    Promise.all([
      products(),
      productsWithId(product_id),
      productsStyle(product_id),
      productsRelated(product_id),
      questions(product_id),
      reviewsMeta(product_id),
      cart()

    ])
      .then((results) => {
        // console.log(results[3].data, "🤙")

        this.setState({
          productInformation: results[1].data,
          styles: results[2].data,
          styles2:results[2],
          relatedProducts: results[3].data,
          qNa: results[4].data,
          currentItemName:results[1].data.name,
          product_id:results[1].data.id,
          ratings: results[5].data.ratings,
          currentProductPhoto: results[2].data[0].photos[0].thumbnail_url
        });
      })
      .then(() => {
        this.setState({
          loaded: true,

        })
      })
      .catch((err) => {
        console.log('this is the err 🥲 ', err)
      });
  }

  render() {

    if (this.state.loaded) {
      return (
        <div className={this.state.isDarkMode ? 'app dark-app' : 'app'}>
          <header className={this.state.isDarkMode ? 'app-header dark-header' : 'app-header'}>
            <div className={this.state.isDarkMode ? "toggle-dark" : "toggle-light"}>
              {this.state.isDarkMode ?
              <h2 className='light-mode' id='darkswitch' onClick={() => {this.toggleDarkMode()}}>Light</h2>
              : <h2 className='dark-mode' id='darkswitch' onClick={() => {this.toggleDarkMode()}}>Dark</h2>}
            </div>
          </header>
          <Overview
            state = {this.state}/>
          <RelatedProducts
          time={this.state.time}
            handleBounce={this.handleBounce}
            state={this.state}
            handleProductChange={this.handleProductChange}/>
          <QnAClicks>
            {allClicksProps => (
              <QuestionsNAnswers
                allClicksProps={allClicksProps}
                product_id={this.state.product_id}
                data={this.state.qNa}
                currentItemName={this.state.currentItemName}
                currentProductPhoto={this.state.currentProductPhoto}
              />
            )}
          </QnAClicks>
          <RatingsAndReviews
            product_id={this.state.product_id}
            productName={this.state.productInformation.name}/>
        </div>
      )
    } else {
      return <div>Loading</div>
    }
  }
}

ReactDOM.render(<App />, document.getElementById('app'));