const axios = require("axios");
const TOKEN = require("../../config.js").GITHUB_TOKEN;
const api = require("../../config.js").API;

const requestConfig = (method, url, data) => {
  return {
    method: method,
    url: url,
    headers: {
      'Authorization': TOKEN
    },
    data: data
  }
}

module.exports = {
  reviews: (req, res) => {
    axios(requestConfig('get', api + req.originalUrl.substring(1)))
      .then((data)=> {
        res.status(200).send(data.data.results);
      })
      .catch(err => console.log('resultErr', err));
  },
  reviewsMeta: (req, res) => {
    axios(requestConfig('get', api + req.originalUrl.substring(1)))
      .then((data)=> {
        res.status(200).send(data.data);
      })
      .catch(err => console.log('resultErr', err));
  },
  reviewsHelpful: (req, res) => {
    axios(requestConfig('put', api + req.originalUrl.substring(1)))
      .then((data)=> {
        res.status(200).send(data.data);
      })
      .catch(err => console.log('resultErr', err));
  },
  reviewsReport: (req, res) => {
    axios(requestConfig('put', api + req.originalUrl.substring(1)))
      .then((data)=> {
        res.status(200).send(data.data);
      })
      .catch(err => console.log('resultErr', err));
  },
  reviewsAdd: (req, res) => {
    axios(requestConfig('post', api + 'reviews', req.body))
      .then((data)=> {
        res.status(200).send(data.data);
      })
      .catch(err => console.log('resultErr', err));
  },
  reviewsInteraction: (req, res) => {
    axios(requestConfig('post', api + 'interactions', req.body))
      .then((data)=> {
        res.status(200).send(data.data);
      })
      .catch(err => console.log('resultErr', err));
  }
}