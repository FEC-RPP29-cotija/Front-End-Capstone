const axios = require("axios");
const TOKEN = require("../../config.js").GITHUB_TOKEN;
const api = require("../../config.js").API;

module.exports = {
  cart: (req, res) => {
    //console.log('cart', req)
    res.status(200).end();
    //implement API request for current cart
    //send info to client
  },
  addToCart: (req, res) => {
    console.log('dope', [req.body])
    axios.post(api + 'cart', (req.body), {
      headers: {
        'Authorization': TOKEN
      }}).then(responce => {console.log('yuuuuuu', responce)}).catch(err => {console.log('nooooo', err)})
  }
}
