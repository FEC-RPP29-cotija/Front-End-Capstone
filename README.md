# RPP29 Front-End-Capstone

*Team Cotijta for life*

### Overview
---
- This project was aimed at renovating the outdated client-facing retail web-portal for a business that has suffered loss of sales due to poor user experience on their extant website. Our goal was to create a brand new retail website that was optimized for quick load times and accessibility compliance. There were four primary modules assigned critical priority: Product Detail, Ratings & Reviews, Questions & Answers, and Related Items & Outfit Creation. The scope of this project focused on front-end development, with the primary framework being React. Other technologies used include Babel, Webpack, Axios, jQuery, and Jest. The end product was deployed on an AWS EC2 instance.

### Team Members
---
- Jason Mollerup, Quinn Lima, Robert Lawrence, Callum Reid

### Demonstration
---

![demo-gif](https://github.com/FEC-RPP29-cotija/Front-End-Capstone/blob/main/FECdemo1.0.gif)

### Description
---
**Product Overview**

This is the First Section of the Website. This section has a zoomable pannable main product image and multiple carousels for selecting different product styles and images. Once you find a product you like, there is a dynamic size and quantity selector, which changes with each product, and a "Add to Cart" button. 

This section was built using React, CSS3, and Express.

Optimized for load-speed, accessibility, and interactivity using Lighthouse and PageSpeed Insights, Reduced Time-to-Interactive to 1.0s using text compression, preloading images, and tree-shaking.

All sections have a Real User Monitoring (RUM) for click  tracking using higher order components

**Ratings & Reviews**

**Questions & Answers**

Questions and Answers is split into three main modules.   The search bar, question list, and answer list.  There are many sub components that make up the complete layout of the component, but these are the elements everything is centered around.  The search bar component, allows for a user to search the question list for a specific question.  It begins filtering at 3 characters and continues filtering for every character therafter.  If the search bar text is removed or characters are removed so that less than three remain, the search bar resets the question list to the original question state.  The component displays a list of questions/answers.  Initially, only two questions and two answers per question are displayed.  The more answered questions button when clicked, adds two more questions and two more answers to the question scroll section.  The button disappears when all questions are being displayed.  Answers for questions that contain > 2 answers, have a load more answers button displayed.   When clicking load more answers, the button changes text to 'collapse answers' and user is able to see all answers for a specific question in a scroll window.  This allows for the expanding/collapsing of individual questions answers.  The component allows for a user to add a question, with the button located at the bottom of the page.  Questions require a user to enter a valid question, username, and email to be submitted.  Additionally, each question has the ability for a user to add an answer.  The answer requires a user to input the answer, their nickname, and their email.  Optional add photo functionality has been added allowing user to load up to 5 photos.  Questions and Answers both have the ability to be marked helpful.  They can only be marked helpful once per question/answer.  Both questions and answers are sorted by helpfulness.  However, if an answer contains a seller comment/comments - they are displayed at top of list regardless of helpfulness amount.  Answers have the ability to be to reported.  When reported the answer ID is sent to the server to be stored.  The answer report button changes to reported and remains reported.  Later functionality, will allow page admin to view reported answers and make a PUT request to API if needed. 

Their were three main challenges surrounding the creation QA module.

1) Answers needed the ability have images added.  To preserve speed an image caching layer was added through the imgBB API.  This required an additional set of routes to be added client/server side.  The add answer functionality would need to send photos to the ImgBB API, receive urls, and upon photo confirmation - update question answers, with the answer containing photos.

2) The question list component needed to have a scroll bar and each answer needed a scroll bar.   When building this functionality correct spacing had to be ensured between each answer list view and question list view length.  Without proper spacing, it led to poor user scroll experience.  To fix the appearance of scroll bars - webkit was used to hide the display of both user/question scroll bars.  This allowed for the QA component to maintain a clean appearance, without being clusted with scroll bars.

3) Upon product change (from related products) the App changed all data regarding the product.  Technically the product data/ related product data did not need to be updated on each new product load.  This caused for API timeout errors and poor user experience based on load times.  A caching layer was implemented to allow for the app to load off of cached data.  On product change, if it has been > 300 seconds the cached data gets updated with new information for that product (if any).  Upon an question/answer/review being added - the requests are fired, new product information is cached in server, and the new information is displayed.  Caching layer allowed for metrics to improve for desktop on lighthouse from mid 50s to 95 (for performance) .  On google page speed it went from the twenties to mid fifties.  Caching functionality as it sits, only handles related products requests.  Further implementation would include caching ALL data for the app.  This would bring google page speed report to 90+. 
https://drive.google.com/file/d/1tYB0V_hLnxQW_iHp6X10ANrosbfK7FTJ/view?usp=sharing

**Related Items & Outfit Creation**

  The core of the Related Items & Outfit Creation module rests in two lists for the end user. The first of these is a list of related products, determined internally, that change depending on the current product a user is viewing. This list is comprised of card elements in a horizontally scrolling carousel that have information such as name, price, star rating, and image of a related product. The scrolling of this list is done by buttons that conditionally render and dissapear depending on if there are items available in the desired direction of scroll. The cards feature a clickable action button that opens a comparison modal that displays the features of the current item being viewed and the related item that was clicked. If a related product card is clicked outside of this action button, the user is redirected to the landing page for the item that they clicked.

  The Outfit Creation list initially appears as empty, except for a button reading 'Add to Outfit'. Clicking this button will add the current product being viewed to a user's outfit list, populating the list with a card similar to the related products cards above. Users can add as many items as they want to their outfit, but are prevented from adding the same item twice. The user's outfit persists through navigation to other pages and exiting browser windows by relying on local storage. These outfit cards contain an action button that remove an item from the outfit. 

  The primary challenge in creating this module came from needing data from numerous different endpoints that than needed to be altered and combined in order to reach the desired functionality. I had to be mindful of when and where to make API calls so I would have the necessary data for each subcomponent without overloading the server with requests. A change in the primary product being displayed means that a new list of 5-10 related product cards needs to be generated, of which each card would need data from multiple endpoints. This data then had to be run through numerous helper functions to be formatted in a useable way. The end result was accomplished by careful consideration and constant refactor to the base data structures I rely on the display each list and card.
  
  
     
**Additional Features**

Click Tracker: 
Each module within the application has implemented a click tracker that records the element clicked, the module that element is within, and the time of click. This data is then posted to client's API. There were two approaches taken in recording clicks- higher order components, and the render props method. Both accomplish the same goal, and are implemented individually for each module.

Dark Mode: 
The web page includes the option a user to toggle light or dark mode. This allows optimal experience in very bright areas, and battery savings in dimmer settings.


### Optimizations
---
- The client wanted their new site to meet to following metrics
  * Time to first paint: 0.8s
  * Time to first meaningful paint: 2.0s
  * Time to interactive: 2.5s

- To reach these goals, we performed a number of optimizations
  * Text Compression: Using `uglifyjs-webpack-plugin`, we reduced our bundle.js size from 1.6 MiB to 352 KiB
  * Preload Images: Through preloading above the fold images on our landing page, our largest contentful paint dropped by 3.4s
  * Adding a caching layer for requests made through the Related Products component.  This brought metrix from on lighthouse from 50s to mid 90s and      twenties to mid 50s on google page speed.  Caching layer ensurings new requests are only fired upon adding an review/answer/question or  every 300    seconds with (instead of firing every single product load) https://drive.google.com/file/d/1tYB0V_hLnxQW_iHp6X10ANrosbfK7FTJ/view?usp=sharing
  * adjusted images to have a prefdefined size - to improve loading time.

### Accessibility
---
- To increase our accessibility, we made the following improvements
  * Focused on semantic HTML throughout the development process
  * Included important aspects such as title, language, and doctype to our index.html
  * Included alt properties on all images

### Setup and Developement
---
- Clone a copy of the repository onto your local machine
- In the root directory where the repository was cloned, run `npm install` to install dependancies
- Create a `config.js` file in the root directory. Within this file, add the necessary credentials listed below:
 ```
 module.exports = {
  GITHUB_TOKEN: 'githubToken',
  API: 'hrseiApiToekn',
  imgBBkey: 'imgBBToken'
};
 ```
- In your terminal run `npm run build` to build webpack in dev mode.
- In your terminal run `npm run start` to start the express server on localhost:3000
- To build webpack in production mode (reduce bundle.js size, treeshaking, but loss of helpful error messages), run `npm run buildProd`


### Testing
---
- We used Jest as our testing framework, ensuring we did not only test happy-path scenarios. Our goal was to achieve around 70% coverage using only meaningful tests for each module. 
- To run tests:
  * In your terminal run `npm run test` to run all tests with jest.
  * If you want to run a just one particular test suite, run `npm run /path/to/test/file`
