import React from 'react';
import Search from './sub-components/search.jsx'
import QuestionsContainer from './sub-components/questionContainer.jsx';
import helper from '../helpers/qnAHelper.js';
import UserQuestion from './sub-components/mini-components/userQuestion.jsx';
import propTypes from 'prop-types';
import UserAnswer from './sub-components/mini-components/userAnswer.jsx';
import {updateHelpfulness, questions, updateAnswerHelpfulness, addToReported, getReportedAns} from '../clientRoutes/qa';
import ClickTracker from './tracker.jsx'



class QuestionsNAnswers extends React.Component {
  constructor(props) {
    super(props)

    this.state ={
      questionSearchVal: 'HAVE A QUESTION? SEARCH FOR ANSWERS...',
      qSearchCharCount: 0,
      reported: [],
      dynamicData: [],
      savedData: []
    };
    this.searchFilter = this.searchFilter.bind(this)
    this.questionSearchChange = this.questionSearchChange.bind(this)
    this.showQuestions = this.showQuestions.bind(this)
    this.updateQuestions = this.updateQuestions.bind(this)
    this.updateAnswers = this.updateAnswers.bind(this)
    this.addToReported = this.addToReported.bind(this)
    this.getReportedAns = getReportedAns.bind(this)
  }
  componentDidMount() {
    getReportedAns()
      .then(data => {
        let answerIds = data.data
        let copy = this.props.data.slice()
        let dynamicData = helper.createDynamicData(copy)
        let finalData = helper.addReportedProp(dynamicData, answerIds)

        this.setState({
          dynamicData: finalData,
          reported: answerIds,
          savedData: finalData.slice(),
        })
      })
  }
  componentDidUpdate(prevProps, prevState) {

    if (prevProps.data.length !== this.props.data.length) {
      let dynamicData = helper.createDynamicData(this.props.data)
      let answerIds = this.state.reported.slice()
      let finalData = helper.addReportedProp(dynamicData, answerIds)
      this.setState({
        dynamicData: finalData,
        reported: answerIds,
        savedData: finalData.slice()
      })
      this.props.allClicksProps.resetState()
    }

    if (prevState.qSearchCharCount !== this.state.qSearchCharCount) {
      if (this.state.qSearchCharCount >= 3) {
        this.searchFilter(this.state.questionSearchVal)
      }
    }
    //new question helpfulness
    if (prevProps.allClicksProps.question_id !== this.props.allClicksProps.question_id) {
      updateHelpfulness(this.props.allClicksProps.question_id)
        .then(data=>
          questions(this.props.product_id)
            .then(newData => {
              let dynamicData = helper.createDynamicData(newData.data)
              let answerIds = this.state.reported.slice()
              let finalData = helper.addReportedProp(dynamicData, answerIds)

              this.setState({
                dynamicData: finalData,
                reported: answerIds,
                savedData: finalData.slice()
              })
            })
        )
    }
    //new answer helpfulness
    if (prevProps.allClicksProps.answerId !== this.props.allClicksProps.answerId) {
      updateAnswerHelpfulness(this.props.allClicksProps.answerId)
        .then(data => {
          questions(this.props.product_id)
            .then(newData => {
              let dynamicData = helper.createDynamicData(newData.data)
              let answerIds = this.state.reported.slice()
              let finalData = helper.addReportedProp(dynamicData, answerIds)

              this.setState({
                dynamicData: finalData,
                reported: answerIds,
                savedData: finalData.slice()
              })
            })
        })
    }

    if (prevState.reported.length !== this.state.reported.length) {
      let answerIds = this.state.reported.slice()
      let finalData = helper.addReportedProp(this.state.dynamicData.slice(), answerIds)
      this.setState({
        dynamicData: finalData,
        reported: answerIds,
        savedData: finalData.slice()

      })
    }


    // if (prevState.dynamicData.length !== this.state.dynamicData.length) {
    //   if (this.state.dynamicData.length <= 2 && this.props.allClicksProps.showQuestionButton) {
    //     this.props.allClicksProps.resetQuestionButton()
    //   }

      // console.log(!this.props.showQuestionButton)

    // }
  }
  searchFilter(searchValue) {
    let copy = this.state.dynamicData.slice()
    let original = this.state.savedData

    if (this.state.qSearchCharCount >= 3 && searchValue.length <=2) {
      this.setState({
        dynamicData: original
      })

    } else {
      let newQuestions = helper.filterSearchInput(copy, searchValue);
      let newDynamic = helper.createDynamicData(newQuestions)
      let answerIds = this.state.reported.slice()
      let finalData = helper.addReportedProp(newDynamic, answerIds)

      this.setState({
        dynamicData: finalData
      })
    }




  }
  questionSearchChange(e) {
    let newCount = this.state.qSearchCharCount + 1

    this.setState({
      questionSearchVal: e.target.value,
      qSearchCharCount: newCount
    })
  }
  showQuestions(currentCount, index) {
    let show = helper.showQuestionsClass(currentCount, index);
    return show
  }
  updateQuestions () {
    return questions(this.props.product_id)
      .then(data => {
        let answerIds = this.state.reported.slice()
        let dynamicData = helper.createDynamicData(data.data);
        let finalData = helper.addReportedProp(dynamicData, answerIds)
        this.setState({
          dynamicData:finalData,
          savedData: finalData.slice()
        })
        this.props.allClicksProps.closeQuestionForm()
      })
  }
  updateAnswers() {
    return questions(this.props.product_id)
      .then(currentQuestions => {
        let dynamicData= helper.createDynamicData(currentQuestions.data)
        let answerIds = this.state.reported.slice()
        let finalData = helper.addReportedProp(dynamicData, answerIds)

        this.setState({
          dynamicData:finalData,
        })
        this.props.allClicksProps.closeAnswerForm()
      })

  }
  addToReported(e, ansId) {
   if(!this.state.reported.includes(ansId)){
    addToReported(ansId)
      .then(data => {

        this.setState({
          reported: data
        })
      })
    }
  }
  render () {
    return (
      <ClickTracker>
        {trackerProps => (
          <div className='mainQnA container'>

            <div className='title container'>
              <h3 className='componentTitle'>Questions & Answers</h3>
              <Search
                recordClick={trackerProps.recordClick}
                currentInput={this.state.questionSearchVal}
                questionSearchChange={this.questionSearchChange}
              />

              <div className={this.props.allClicksProps.QuestionFormDisplayClass}>
                <UserQuestion
                  currentProductPhoto={this.props.currentProductPhoto}
                  recordClick={trackerProps.recordClick}
                  currentItemName={this.props.currentItemName}
                  updateQuestions={this.updateQuestions}
                  addQuestion={this.props.allClicksProps.addQuestion}
                  product_id={this.props.product_id}
                  QuestionFormDisplayClass={this.props.allClicksProps.QuestionFormDisplayClass}
                  closeQuestionForm={this.props.allClicksProps.closeQuestionForm}
                />
              </div>
              <div className={this.props.allClicksProps.answerFormDisplayClass}>
                <UserAnswer
                  currentProductPhoto={this.props.currentProductPhoto}
                  recordClick={trackerProps.recordClick}
                  currentItemName={this.props.currentItemName}
                  updateAnswers={this.updateAnswers}
                  currentQuestion={this.props.allClicksProps.currentQuestion}
                  answerFormDisplayClass={this.props.allClicksProps.answerFormDisplayClass}
                  closeAnswerForm={this.props.allClicksProps.closeAnswerForm}
                  aFormQuestion_id={this.props.allClicksProps.aFormQuestion_id}
                />
              </div>
              <div className={this.state.dynamicData.length ?'list container': 'hide'}>
                {this.state.dynamicData.map((question, index) => {
                  let show = false;
                  if (this.props.allClicksProps.questionClickCount === 1 && index <= this.props.allClicksProps.questionClickCount) {
                    show = true
                  }
                  if (this.props.allClicksProps.questionClickCount >= 3 && index <= this.props.allClicksProps.questionClickCount) {
                    show = true
                  }
                  return (
                    <QuestionsContainer
                          answerState={this.props.allClicksProps.loadAnswerState}
                          recordClick={trackerProps.recordClick}
                          key={index}
                          addToReported={this.addToReported}
                          helpfulAnswerClick={this.props.allClicksProps.helpfulAnswerIndicatorClick}
                          helpfulQuestionClick={this.props.allClicksProps.helpfulQuestionIndicatorClick}
                          currentI={index}
                          showQuestions={this.showQuestions}
                          questionClickCount={this.props.allClicksProps.questionClickCount}
                          answers={question.answers}
                          question={question}
                          addAnswerOnClick={this.props.allClicksProps.addAnswerOnClick}
                          question_id={question.question_id}
                          show={show}
                          loadMoreAnsOrQ={this.props.allClicksProps.loadMoreAnsOrQ}
                          showAns={this.props.allClicksProps.showQAns}
                    />
                )})}
              </div>
                <div className='questionListButton container'>
                <div className='bottomButtons'>
                  <h3 className={this.props.allClicksProps.showQuestionButton ? 'hide' : 'moreAnsweredBtn'}
                      onClick={(e) => {this.props.allClicksProps.loadNewQuestions(this.state.dynamicData.length - 1), trackerProps.recordClick(e)}}
                      >MORE ANSWERED QUESTIONS
                  </h3>
                  <h3 className='addQuestionBtn'
                      onClick={(e) => {trackerProps.recordClick(e), this.props.allClicksProps.addQuestion()}}
                      >ADD A QUESTION +
                  </h3>
                </div>
              </div>
            </div>
          </div>
        )}
      </ClickTracker>
    )
  }
}

QuestionsNAnswers.propTypes = {
  currentItemName: propTypes.string.isRequired,
  currentProductPhoto: propTypes.string.isRequired,
  product_id: propTypes.number.isRequired,
  data: propTypes.array.isRequired,
  allClicksProps: propTypes.any
}

export default QuestionsNAnswers;