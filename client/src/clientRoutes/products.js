const axios = require("axios");

module.exports = {
  products: () => {
    return axios.get('/products');
  },
  postNewRelatedProductsData: (data) => {
    console.log(data)
    return axios.post(`/serverStorage/relatedProducts`, data);
  },
  getRelatedProdServerData:(id) => {
    return axios.get(`/serverStorage/:relatedProducts=${id}`)

  }

,
  productsWithId: (id) => {
    return axios.get(`/products/:product_id?${id}`);
  },
  productsStyle: (id) => {
    return axios.get(`/products/:product_id/styles?${id}`);
  },
  productsRelated: (id) => {
    return axios.get(`/products/:product_id/related?${id}`);
  }
}
