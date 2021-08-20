module.exports = {

  sortAnswers(currentAnsArr) {
    let sellers = currentAnsArr.filter((ans) => {
      if (ans.answerer_name.toLowerCase() === 'seller') {
        return ans
      }
    })

    sellers = sellers.sort((a, b) => {
      return b.helpfulness - a.helpfulness
    })

    let noSellers = currentAnsArr.filter((ans) => {
      if (ans.answerer_name.toLowerCase() !== 'seller') {
        return ans
      }
    })

    noSellers = noSellers.sort((a, b) => {
      return b.helpfulness - a.helpfulness
    })

    let finalAnswers = sellers.concat(noSellers)
    return finalAnswers

  },

  createDynamicData(questions) {


    let finalQuestions = questions.sort((a, b) => {
      return b.question_helpfulness - a.question_helpfulness
      // return b = a
    })

    let newQuestionsWithAnsArr = finalQuestions.filter((question) => {

      let newAns = Object.values(question.answers)
      let finalAns = this.sortAnswers(newAns)
      question.answers = finalAns
      return finalQuestions
    })
    return newQuestionsWithAnsArr


  },

  filterSearchInput(currentQuestions, searchTerm) {
    let newQuestions = currentQuestions.filter((question) => {
      let lowerCaseQuestion = question.question_body.toLowerCase().replace(/\s+/g, '')
      let lowerCaseInput = searchTerm.toLowerCase().replace(/\s+/g, '')

      if (lowerCaseQuestion.includes(lowerCaseInput)) {
        return question
      }
    })

    return newQuestions
  },

  moreAnsweredQButtonDisplay(qClickCount, index) {
    let result = false;
    if (qClickCount>=3) {
      if (qClickCount === index || qClickCount -1 === index) {
        result = true
      } else {
        result = false
      }
    }

    return result
  },

  showQuestionsClass(clickCount, index) {

    let show;

    if (index <= clickCount) {
      show = true
    } else {
      show = false
    }


    return show
  },

  addReportedProp(currentQuestions, answerIds) {
    currentQuestions.forEach((question) => {
      question.answers.forEach((answer) => {
        if (answerIds.includes(answer.id)) {
          answer.report = 'Reported'
        } else {
          answer.report ='Report'
        }
      })
    })

    return currentQuestions
  },

  bounceRequest: (oldBounceTime, newTime) => {
    //create boolean that will represent if ajax should be fired
    let bounce = false;






    //return bounce boolean
    return bounce

  }

}


