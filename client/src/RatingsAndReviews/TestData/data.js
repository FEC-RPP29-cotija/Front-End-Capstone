const reviews = {
  36300: {
    "product": "36300",
    "page": 0,
    "count": 1000,
    "results": [
      {
        "review_id": 407542,
        "rating": 5,
        "summary": "This product was great!",
        "recommend": true,
        "response": "",
        "body": "I really did or did not like this product based on whether it was sustainably sourced. Then I found out that its made from nothing at all.",
        "date": "2019-01-01T00:00:00.000Z",
        "reviewer_name": "funtime",
        "helpfulness": 13,
        "photos": []
      },
      {
        "review_id": 407543,
        "rating": 4,
        "summary": "This product was ok!",
        "recommend": false,
        "response": "",
        "body": "I really did not like this product solely because I am tiny and do not fit into it.",
        "date": "2019-01-11T00:00:00.000Z",
        "reviewer_name": "mymainstreammother",
        "helpfulness": 2,
        "photos": []
      }
    ]
  },
  28213: {
    "product": "28213",
    "page": 0,
    "count": 1000,
    "results": [
      {
        "review_id": 407544,
        "rating": 4,
        "summary": "I am liking these glasses",
        "recommend": true,
        "response": "Glad you're enjoying the product!",
        "body": "They are very dark. But that's good because I'm in very sunny spots",
        "date": "2019-06-23T00:00:00.000Z",
        "reviewer_name": "bigbrotherbenjamin",
        "helpfulness": 22,
        "photos": []
      },
      {
        "review_id": 407546,
        "rating": 3,
        "summary": "I'm enjoying wearing these shades",
        "recommend": true,
        "response": "",
        "body": "Comfortable and practical.",
        "date": "2019-04-14T00:00:00.000Z",
        "reviewer_name": "shortandsweeet",
        "helpfulness": 11,
        "photos": [
          {
            "id": 731061,
            "url": "https://images.unsplash.com/photo-1560570803-7474c0f9af99?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=975&q=80"
          },
          {
            "id": 731062,
            "url": "https://images.unsplash.com/photo-1561693532-9ff59442a7db?ixlib=rb-1.2.1&auto=format&fit=crop&w=975&q=80"
          },
          {
            "id": 731063,
            "url": "https://images.unsplash.com/photo-1487349384428-12b47aca925e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
          }
        ]
      },
      {
        "review_id": 407545,
        "rating": 4,
        "summary": "They look good on me",
        "recommend": true,
        "response": "",
        "body": "I so stylish and just my aesthetic.",
        "date": "2019-03-12T00:00:00.000Z",
        "reviewer_name": "fashionperson",
        "helpfulness": 7,
        "photos": []
      },
      {
        "review_id": 407548,
        "rating": 2,
        "summary": "This product was ok!",
        "recommend": false,
        "response": "",
        "body": "They're fine but I wouldn't buy again.",
        "date": "2019-05-23T00:00:00.000Z",
        "reviewer_name": "anyone",
        "helpfulness": 6,
        "photos": []
      },
      {
        "review_id": 407547,
        "rating": 5,
        "summary": "I'm not a fan!",
        "recommend": false,
        "response": "Sorry to hear. Is there anything in particular you don't like?",
        "body": "I don't like them",
        "date": "2019-06-16T00:00:00.000Z",
        "reviewer_name": "negativity",
        "helpfulness": 2,
        "photos": []
      }
    ]
  },
  28214: {
    "product": "28214",
    "page": 0,
    "count": 1000,
    "results": [],

  }
};

const reviewMeta = {
  36300: {
    "product_id": "36300",
    "ratings": {
      "4": "1",
      "5": "1"
    },
    "recommended": {
      "false": "1",
      "true": "1"
    },
    "characteristics": {
      "Fit": {
        "id": 94611,
        "value": "4.0000000000000000"
      },
      "Length": {
        "id": 94612,
        "value": "3.5000000000000000"
      },
      "Comfort": {
        "id": 94613,
        "value": "5.0000000000000000"
      },
      "Quality": {
        "id": 94614,
        "value": "4.0000000000000000"
      }
    }
  },
  28213: {
    "product_id": "28213",
    "ratings": {
      "2": "1",
      "3": "1",
      "4": "2",
      "5": "1"
    },
    "recommended": {
      "false": "2",
      "true": "3"
    },
    "characteristics": {
      "Quality": {
        "id": 94615,
        "value": "4.2000000000000000"
      }
    }
  },
  28214: {
    "product_id": "28214",
    "ratings": {},
    "recommended": {},
    "characteristics": {
      "Fit": {
        "id": 94616,
        "value": null
      },
      "Length": {
        "id": 94617,
        "value": null
      },
      "Comfort": {
        "id": 94618,
        "value": null
      },
      "Quality": {
        "id": 94619,
        "value": null
      }
    }
  }
}

module.exports = {
  reviewsTD: reviews,
  reviewsMetaTD: reviewMeta
};