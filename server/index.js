const express = require("express");
const app = express();
const PORT = 3000;

// SERVER ROUTES
const { reviews, reviewsMeta, reviewsHelpful, reviewsReport, reviewsAdd, reviewsInteraction } = require("./serverRoutes/reviews.js");
const { products, getRelatedProdServerData, postNewRelatedProductsData, productsWithId, productsStyle, productsRelated } = require("./serverRoutes/products.js");
const { questions, answers, updateHelpfulness, updateAnswerHelpfulness, postQuestion, postAnswer, getUrl, addToReported, getReported, interactions} = require("./serverRoutes/qa.js");
const { cart } = require("./serverRoutes/cart.js");

const multer = require('multer')

// const upload = multer({dest:'./temp'})


app.use(express.json({limit:'100mb'}));
app.use(express.urlencoded({ extended: false }));

app.use(express.urlencoded({ extended: true}));
app.use(express.static('client/dist'));

//get requests for page load (chain)
app.get('/products', products)
  .get('/products/:product_id', productsWithId)
  .get('/products/:product_id/styles', productsStyle)
  .get('/products/:product_id/related', productsRelated)
  .get('/reviews', reviews)
  .get('/reviews/meta', reviewsMeta)
  .get('/qa/questions/:product_id?', questions)
  .get('/qa/questions/:question_id/answers', answers)
  .get('/cart', cart)
  //put request for helpfulness Question
  .put('/qa/questions/:question_id?', updateHelpfulness)
  //put request for helpfulness Answer
  .put('/qa/answers/:answer_id?', updateAnswerHelpfulness)
  //post request for new question
  .post('/qa/questions', postQuestion)
  //post request for new answer
  .post('/qa/questions/:question_id?/answers', postAnswer)
  .post('/qa/questions/get/photo-url', getUrl)
  .post('/qa/questions/store-reported-answer', addToReported)
  .get('/reported/answers', getReported)
  .put('/reviews/:review_id/helpful', reviewsHelpful)
  .put('/reviews/:review_id/report', reviewsReport)
  .post('/reviews/add', reviewsAdd)
  .post('/reviews/interaction', reviewsInteraction)
  .post('/qa/interactions', interactions)

  .post('/serverStorage/relatedProducts', postNewRelatedProductsData)
  .get('/serverStorage/:relatedProducts', getRelatedProdServerData)


app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
