const axios = require("axios");
const TOKEN = require("../../config.js").GITHUB_TOKEN;
const api = require("../../config.js").API;
const key = require("../../config.js").imgBBKey
const imgbbUploader = require('imgbb-uploader')
const fs = require('fs')

const { Buffer } = require('buffer');

module.exports = {
  questions: (req, res) => {

    let url = req.url.split('=')
    let request = api + `qa/questions?product_id=${Number(url[1])}&page=1&count=25`

    axios.get(request, {
      headers: { 
        'Authorization': TOKEN
      }
    }).then((data) => {
      res.send(data.data.results).end();
    })
  },
  answers: (req, res) => {
    res.status(200).end();

  },
  updateHelpfulness: (req, res) => {

    let id = Number(req.url.split('=')[1])
    axios.put(api + `qa/questions/${id}/helpful`, id.toString(), {
      headers: {
        'Authorization': TOKEN
      }
    }).then(data=> {
      res.send(200)

      })
      .catch(err=> {
        console.log(err)
      })
  },

  updateAnswerHelpfulness: (req, res) => {

    let id = Number(req.url.split('=')[1])

    axios.put(api + `qa/answers/${id}/helpful`, id.toString(), {
      headers: {
        'Authorization': TOKEN
      }
    })
      .then(data => {
        res.send(200)
      })
      .catch(err => console.log(err))
  },

  postQuestion: (req, res) => {

    let newQuestion = req.body
    axios.post(api + `qa/questions`, newQuestion, {
      headers: {
        'Authorization': TOKEN
      }
    }).then(data => {
      res.send(200)
    })
    .catch(err => console.log(err, "🤙"))
  },

  postAnswer: (req, res) => {

  let newAnswer = {
    body: req.body.body,
    name: req.body.name,
    email: req.body.email,
    photos: req.body.photos
  }

  axios.post(api + `qa/questions/${req.body.currentId}/answers`, newAnswer, {
    headers: {
      'Authorization': TOKEN
    }
  }).then(data => res.send(data.status))

  },

  getUrl: (req, res) => {
    let file=req.body.file.split('base64,')[1]
    const options = {
      apiKey: key,
      base64string: file,
    };
    imgbbUploader(options)
     .then((response) =>{
       res.send(response.display_url)
      })
  },

  addToReported: (req, res) => {
    const data = new Uint8Array(Buffer.from(req.body.id.toString()))

    let write = async() => {
      let value = new Promise((resolve, reject) => {
        fs.writeFile(`./client/src/questions-n-answers/reviewAnswers/${req.body.id.toString()}.txt`, data, (err) => {
          if (err) { console.log(err, "😢")}
          resolve(true)
        })
      })

      let final= await(value);
      return final
    }

     write().then(data => {
       fs.readdir('./client/src/questions-n-answers/reviewAnswers/', (err, files) => {
         let answerIds = [];
         files.forEach((file) => {
           let newFile = Number(file.split('.')[0])
           answerIds.push(newFile)
         })
         res.send(answerIds)
       })
     })
  },

  getReported: (req, res) => {
    return fs.readdir('./client/src/questions-n-answers/reviewAnswers/', (err, files) => {
       let answerIds = [];
       if (files !== undefined) {
         files.forEach((file) => {
           let newFile = Number(file.split('.')[0])
           answerIds.push(newFile)

          })
        }
       res.send(answerIds)
     })
  },
  interactions: (req, res) => {
    postAll = () => {
      return new Promise((resolve, reject) => {
        let result = [];

        req.body.interactions.forEach(interaction => {

          return axios.post(api + 'interactions', interaction, {
            headers: {
              'Authorization': TOKEN
            }
          })
          .then(data => {
            // result.push(data.response)
            result.push(data.status)
            if (result.length >=5) {
              resolve(result)
            }
          })
        })
      })
    }

    postAll().then(data => {
      console.log('posted QA interactions, sending response...')
      //once data is received we know request is complete, send 200 to client
      res.send(200)
    })


  },
  bounce: (req, res) => {
    // console.log(req.body, "🔥")
    //stringify date
    let stingifiedData = JSON.stringify(req.body.currentProductDataArray)


    //find or create record with current id\


    let write = async() => {
      let value = new Promise((resolve, reject) => {
        fs.writeFile(`./client/src/cachedData/${req.body.productId.toString()}.txt`, stingifiedData, (err, fileData) => {
          if(err) {console.log(err)}
          resolve(true)
        })
      })

      let final= await(value);
      return final
    }

    write().then(data=> {
      if (data) {

        fs.readFile(`./client/src/cachedData/${req.body.productId.toString()}.txt`, (err, files) => {
          //convert that buffer
          let returnData = JSON.parse(files.toString())

          res.send(returnData)

        })

      }
    })

  },
  getServerData: (req, res) => {
    let id = req.url.split('=')[1]
    console.log(id)
    // console.log(id)
    fs.readFile(`./client/src/cachedData/${id}.txt`, (err, file) => {
      let final = JSON.parse(file.toString())
      // console.log(final, "👌")
      res.send(final)
    })

  }
}
