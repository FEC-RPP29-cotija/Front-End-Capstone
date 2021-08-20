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
import { questions, createNewServerData, getServerData} from "./clientRoutes/qa.js";
import { cart } from "./clientRoutes/cart.js";
import BounceData from './CacheData.jsx';

//questions/answers test data

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
      currentTime:''
    }
    this.handleProductChange = this.handleProductChange.bind(this);
    this.getStateData = this.getStateData.bind(this);
    this.toggleDarkMode = this.toggleDarkMode.bind(this);
  }

  componentDidMount() {


    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    const product = params.product_id || this.state.product_id;
    this.getStateData(product);
  }

  componentDidUpdate(prevProps, prevState) {

    //used cached data
    if (prevState.product_id !== this.state.product_id) {

      let newBounceState = this.props.bounce.getBounceDataState()
      console.log(newBounceState)


      //if bounce state is false, fire the ajax
      if (!newBounceState) {
        //return saved data
        getServerData(this.state.product_id)
          .then((serverData) => {
            console.log(serverData)
            this.setState({
              productInformation:serverData[1].data,
              styles:serverData[2].data,
              relatedProducts: serverData[3].data,
              //do not remove please
              qNa:serverData[4].data,
              currentItemName:serverData[1].data.name,
              product_id:serverData[1].data.id,
              ratings: serverData[5].data.ratings,
              currentProductPhoto: serverData[2].data[0].photos[0].thumbnail_url
            })
          })
        //handle saving new data in getState data function
      } else {
        this.getStateData(this.state.product_id)
      }
      //else, lets get data from server like a pro



    }
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

        //save new results to server for use later
        return createNewServerData(results[1].data.id, results)
          .then((d) => {


            // console.log(d, '🤙')
            console.log(d.data)

            this.setState({
              productInformation: d.data[1].data,
              styles:d.data[2].data,
              relatedProducts: d.data[3].data,
              //do not remove please
              qNa: d.data[4].data,
              currentItemName:d.data[1].data.name,
              product_id:d.data[1].data.id,
              ratings: d.data[5].data.ratings,
              currentProductPhoto: d.data[2].data[0].photos[0].thumbnail_url
            })
            // this.setState({
            //   productInformation: results[1].data,
            //   styles: results[2].data,
            //   relatedProducts: results[3].data,
            //   //do not remove please
            //   qNa: results[4].data,
            //   currentItemName:results[1].data.name,
            //   product_id:results[1].data.id,
            //   ratings: results[5].data.ratings,
            //   currentProductPhoto: results[2].data[0].photos[0].thumbnail_url
            //   //do not remove

            // })
          })

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
            product_id={this.state.product_id}/>
        </div>
      )
    } else {
      return <div>Loading</div>
    }
  }
}

App.propTypes ={
  qNaTestData: propTypes.array.isRequired

}

ReactDOM.render(
  <BounceData>
    {bounceProps=> (
    <App bounce={bounceProps}/>
    )}
  </BounceData>,
  document.getElementById('app')
);

