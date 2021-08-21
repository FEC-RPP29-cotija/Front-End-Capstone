const axios = require("axios");
const TOKEN = require("../../config.js").GITHUB_TOKEN;
const api = require("../../config.js").API;
const fs = require('fs')

module.exports = {
  products: (req, res) => {
    //res.send(200)
    //implement API request for list of products
    //send info to client
    // axios.get(api + 'products', {
    //   headers: {
    //     'Authorization': TOKEN
    //   }
    // }).then((data)=> {
    //   console.log("data", data.data)
    // })
    // .catch(err => console.log('erroryuh', err))

  res.status(200).end();
  },
  postNewRelatedProductsData: (req, res) =>{
    console.log(req.body[0].outfitPropsObj.product_id)
    let data = JSON.stringify(req.body)



    fs.writeFile(`./server/cachedData/relatedProducts${req.body[0].outfitPropsObj.product_id}.txt`, data, (err, file) => {
      console.log('here')

      res.send('new data written')
    })




  },
  getRelatedProdServerData: (req, res) => {
    let id = req.url.split('=')[1]
    console.log(id)
    fs.readFile(`./server/cachedData/relatedProducts${id}.txt`, (err, file) => {
      if (err) {res.send(400)}
      let result = file.toString()
      console.log(result)
      res.send(file)
    })
  },

  productsWithId: (req, res) => {
    let request = req.originalUrl.split('?');
    axios.get(api + `products/${request[1]}`, {
      headers: {
        'Authorization': TOKEN
      }
    }).then((data)=> {
      // console.log(data)
      res.send(data.data)
    })
    .catch((err) => {
      console.log('erroryuh', err)
      res.status(500).end()
    })
  },
  productsStyle: (req, res) => {
    let request = req.originalUrl.split('?');

    axios.get(api + `products/${request[1]}/styles`, {
      headers: {
        'Authorization': TOKEN
      }
    }).then((data)=> {
      res.send(data.data.results);
    })
    .catch((err) => {
      console.log('erroryuh', err)
      res.status(500).end()
    })
  },
  productsRelated: (req, res) => {
    let request = req.originalUrl.split('?');

    axios.get(api + `products/${request[1]}/related`, {
      headers: {
        'Authorization': TOKEN
      }
    })
    .then((data) => {
      res.send(data.data)
    })
    .catch((err) => {
      console.log('err err errrr, ', err);
      res.status(500).end();
    })
  }
}

