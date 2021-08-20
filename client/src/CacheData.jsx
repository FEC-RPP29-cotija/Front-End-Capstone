import React from 'react';
import propTypes from 'prop-types';


class BounceData extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
       currentTime:0

    }
    this.getBounceDataState =  this.getBounceDataState.bind(this)


  }
  componentDidMount() {

  }
  componentDidUpdate(prevProps, prevState) {

  }
  getBounceDataState() {
    //create new date
    //compare to old
    //if less than 5 minutes has passed, return cached data
    let bounce = true;
    let newDate = new Date().getSeconds()
    let difference = newDate - this.state.currentTime

    console.log(newDate)

    //less then 300 seconds - bounce that requeest
    if (newDate < 500) {
       bounce = false;

    } else {
      bounce = true
      console.log('hi')

    }




    return bounce


  }


  render () {
    const renderProps = {
      getBounceDataState: this.getBounceDataState

    }

    return typeof this.props.children === 'function'
    ? this.props.children(renderProps)
    : this.props.children
  }
}

BounceData.propTypes = {
  children: propTypes.any

}
export default BounceData;