import React from 'react';
import propTypes from 'prop-types';
import helper from '../helpers/qnAHelper.js'
class QnAClicks extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loadAnswerState: false,
      questionClickCount: 1,
      lastIndex:null,
      showQuestionButton: false,
      helpfulQuestionCount: 0,
      question_id: null,
      answerId: null,
      helpfulAnswerCount: 0,
      clickedHQuestions: [],
      clickedHAnswers:[],
      answerFormDisplayClass: 'hide',
      currentQuestion: '',
      aFormQuestion_id: null,
      QuestionFormDisplayClass: 'hide',
      showQAns:[],


    }

    this.moreAnsweredQorLoadMoreAnswers = this.moreAnsweredQorLoadMoreAnswers.bind(this)
    this.loadNewQuestions = this.loadNewQuestions.bind(this)
    this.helpfulQuestionIndicatorClick = this.helpfulQuestionIndicatorClick.bind(this)
    this.helpfulAnswerIndicatorClick = this.helpfulAnswerIndicatorClick.bind(this)
    this.resetQuestionCount =  this.resetQuestionCount.bind(this)
    this.addAnswerOnClick = this.addAnswerOnClick.bind(this)
    this.closeAnswerForm = this.closeAnswerForm.bind(this)
    this.addQuestion = this.addQuestion.bind(this)
    this.closeQuestionForm = this.closeQuestionForm.bind(this)
    this.resetState = this.resetState.bind(this)
    this.resetQuestionButton = this.resetQuestionButton.bind(this)
  }
  componentDidMount() {
    if (this.props.children().props.data.length - 1 === 0 || this.props.children().props.data.length - 1 === 1 || !this.props.children().props.data.length){
      this.setState({
        showQuestionButton: !this.state.showQuestionButton
      })
    }

  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.questionClickCount !== this.state.questionClickCount) {
      let showMoreAnsweredQuestions = helper.moreAnsweredQButtonDisplay(this.state.questionClickCount, this.state.lastIndex);
      this.setState({
        showQuestionButton: showMoreAnsweredQuestions
      })
    }
    if(prevState.showQAns.length !== this.state.showQAns.length) {
      console.log('hi')
      this.setState({
        showQAns: this.state.showQAns
      })
    }
  }

  resetQuestionButton() {
    this.setState({
      showQuestionButton: !this.state.showQuestionButton
    })
  }

  moreAnsweredQorLoadMoreAnswers(currentIndex) {
    // if (e.target.className === 'loadMoreAnswersButton') {
    //   this.setState({
    //     loadAnswerState: !this.state.loadAnswerState


    //   })
    // }

    let copy = this.state.showQAns.slice()
    if (copy.includes(currentIndex)) {

      let index = copy.indexOf(currentIndex)

      copy.splice(index, 1)

      console.log(copy)

    } else

    if (!copy.includes(currentIndex)) {
      copy.push(currentIndex)
    }

    this.setState({
      showQAns: copy
    })

  }

  loadNewQuestions(questionLength){
    let count = this.state.questionClickCount + 2
    let lastI = questionLength
    this.setState({
      questionClickCount: count,
      lastIndex: lastI
    })
  }

  helpfulQuestionIndicatorClick(questionId, index) {
    if (!this.state.clickedHQuestions.includes(questionId)) {
      let copy = this.state.clickedHQuestions.slice()
      copy.push(questionId)
      this.setState({
        helpfulQuestionCount: 1,
        question_id: questionId,
        clickedHQuestions:copy
      })
    }
  }

  helpfulAnswerIndicatorClick(answerId) {
    if (!this.state.clickedHAnswers.includes(answerId)) {
      let copy = this.state.clickedHAnswers.slice()
      copy.push(answerId)
        this.setState({
          helpfulAnswerCount: 1,
          answerId: answerId,
          clickedHAnswers: copy
        })
    }
  }

  addAnswerOnClick(currentQ, currentQId) {
    this.setState({
      answerFormDisplayClass: 'aForm',
      currentQuestion: currentQ,
      aFormQuestion_id: currentQId
    })

  }

  closeAnswerForm() {
    this.setState({
      answerFormDisplayClass:'hide'
    })
  }

  addQuestion() {
    this.setState({
      QuestionFormDisplayClass: 'qForm'
    })

  }

  closeQuestionForm() {
    this.setState({
      QuestionFormDisplayClass: 'hide'
    })
  }

  resetQuestionCount() {
    this.setState({
      helpfulQuestionCount:0
    })
  }
  resetState() {
    this.setState({
      loadAnswerState: false,
      questionClickCount: 1,
      lastIndex:null,
      showQuestionButton: false,
      helpfulQuestionCount: 0,
      question_id: null,
      answerId: null,
      helpfulAnswerCount: 0,
      clickedHQuestions: [],
      clickedHAnswers:[],
      answerFormDisplayClass: 'hide',
      currentQuestion: '',
      aFormQuestion_id: null,
      QuestionFormDisplayClass: 'hide',
      showQAns:[],
    })
  }

  render () {
    const renderProps = {
      loadAnswerState: this.state.loadAnswerState,
      questionClickCount: this.state.questionClickCount,
      lastIndex: this.state.lastIndex,
      showQuestionButton: this.state.showQuestionButton,
      helpfulQuestionCount: this.state.helpfulQuestionCount,
      question_id: this.state.question_id,
      answerId: this.state.answerId,
      helpfulAnswerCount: this.state.helpfulAnswerCount,
      answerFormDisplayClass: this.state.answerFormDisplayClass,
      currentQuestion: this.state.currentQuestion,
      aFormQuestion_id: this.state.aFormQuestion_id,
      QuestionFormDisplayClass: this.state.QuestionFormDisplayClass,
      showQAns: this.state.showQAns,
      closeAnswerForm: this.closeAnswerForm,
      loadMoreAnsOrQ: this.moreAnsweredQorLoadMoreAnswers,
      loadNewQuestions: this.loadNewQuestions,
      helpfulQuestionIndicatorClick: this.helpfulQuestionIndicatorClick,
      helpfulAnswerIndicatorClick: this.helpfulAnswerIndicatorClick,
      resetQuestionCount: this.resetQuestionCount,
      addAnswerOnClick: this.addAnswerOnClick,
      addQuestion: this.addQuestion,
      closeQuestionForm: this.closeQuestionForm,
      resetState: this.resetState,
      resetQuestionButton: this.resetQuestionButton
    }

    return typeof this.props.children === 'function'
    ? this.props.children(renderProps)
    : this.props.children
  }
}

QnAClicks.propTypes = {
  children: propTypes.any

}
export default QnAClicks;