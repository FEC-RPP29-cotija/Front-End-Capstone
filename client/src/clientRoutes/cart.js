const axios = require("axios");

module.exports = {
  cart: () => {
    return axios.get('/cart');
  },
  addToCart: (sku) => {
    return axios.post('/cart', {sku_id: sku, count: 1})
  }
}


