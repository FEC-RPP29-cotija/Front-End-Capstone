import React from 'react';
import axios from 'axios';
import {API, GITHUB_TOKEN} from '../../../config.js';

const withClickTracker= WrappedComponent => {
  class WithClickTracker extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        interactions: [],
        count: 0
      }
      this.recordCount = this.recordCount.bind(this);
      this.postInteractions = this.postInteractions.bind(this);
    }

    recordCount(e) {
      e.stopPropagation();
      let interaction = {
        element: e.target.nodeName,
        widget: 'Overview',
        time: new Date(Date.now(e.target.timeStamp))
      }
      this.setState(prevState => {
        return {
          interactions: [...prevState.interactions, interaction],
          count: prevState.count + 1
        }
      })

      if (this.state.count >= 20) {
        this.postInteractions();
      }

    }

    postInteractions () {
      return new Promise((resolve, reject) => {
        let result = [];
        this.state.interactions.forEach(interaction => {
          return axios.post(API + 'interactions', interaction, {
                   headers: {
                     'Authorization': GITHUB_TOKEN
                   }
          })
          .then(response => {
            //console.log('responce', response)
            result.push(response);
            if (result.length >= 20) {
              resolve(result)
            }
           })
        })
      })
      .then(data => {
        //console.log('interactions successful', data)
      })
      .then(() => {
        this.setState({interactions: [], count: 0})
      })
    }

    render () {
      return (
        <WrappedComponent
        count={this.state.count}
        recordCount={this.recordCount}
        {...this.props}
         />
      )
    }
  }
  return WithClickTracker;
}

export default withClickTracker;