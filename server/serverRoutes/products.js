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

  serverProductsWithId: (req, res) => {
    let id = req.url.split('=')[1]
    fs.readFile(`./client/src/cachedData/relatedProducts/productsWithId${id}.txt`, (err, file) => {

      let finalFile = file.toString()
      res.send(finalFile)
    })
    //

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



  serverProductsStyle: (req, res) => {
    let id = req.url.split('=')[1]
    // console.log(id)

    fs.readFile(`./client/src/cachedData/relatedProducts/style${id}.txt`, (err, file) => {
  //  console.log(file, "✅")
      let finalFile = file.toString()
      res.send(finalFile)
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
  },


}

