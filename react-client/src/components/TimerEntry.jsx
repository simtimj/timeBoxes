import React from 'react';

class TimerEntry extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      tickingFunc: '',
    }
    this.startTimer = this.startTimer.bind(this);
    this.lessThanTenCheck = this.lessThanTenCheck.bind(this);
    this.stringToSeconds = this.stringToSeconds.bind(this);
    this.secondsToString = this.secondsToString.bind(this);
  }

  testFunction(str) {
    this.props.test(str);
  }

  // converts num to proper time format.
  lessThanTenCheck(num) {
    if (num < 10) {
      return '0' + num; 
    }
    return num.toString();
  }

  // Converts time string to seconds
  stringToSeconds(time) { 
    var split = time.split(':'); 
    var seconds = (+split[0]) * 60 * 60 + (+split[1]) * 60 + (+split[2]); 
    return seconds;
  }

  // Converts seconds to time string.
  secondsToString(secs) {   
    var hours = 0;
    var minutes = 0; 
    var seconds = 0;   
    if (secs > 3600) {
      hours = Math.floor(secs / 3600);
      secs -= hours * 3600;
    }
    if (secs > 60) {
      minutes = Math.floor(secs / 60);
      secs -= minutes * 60;
    }
    seconds = secs;
  
    return `${this.lessThanTenCheck(hours)}:${this.lessThanTenCheck(minutes)}:${this.lessThanTenCheck(seconds)}`;
  }

  startTimer(currentString, position) {
    // convert time string to seconds
    var timeInInt = this.stringToSeconds(currentString) + 1;
    // console.log('Check convertion from timeInt to timeString', this.secondsToString(secondsInt));
    // use setInterval to add 1 per second
    var that = this
    this.setState({
      tickingFunc: setInterval(function () {
        // console.log('seconds in int', timeInInt);
  
        var lessThanTenCheck = (num) => {
          if (num < 10) {
            return '0' + num; 
          }
          return num.toString();
        }
  
        var secondsToString = (secs) => {   
          var hours = 0;
          var minutes = 0; 
          var seconds = 0;   
          if (secs > 3600) {
            hours = Math.floor(secs / 3600);
            secs -= hours * 3600;
          }
          if (secs > 60) {
            minutes = Math.floor(secs / 60);
            secs -= minutes * 60;
          }
          seconds = secs;
        
          return `${lessThanTenCheck(hours)}:${lessThanTenCheck(minutes)}:${lessThanTenCheck(seconds)}`;
        }
        var newTime = secondsToString(timeInInt);
        // console.log('check newTime: ', newTime);
        // console.log('check position: ', position);
        that.props.handleTimeChange(newTime, position);
  
        timeInInt++;
      }, 1000)
    }) 
    // set state to new time.
  }

  // keyPressHandler(e) {
  //   var s = e.target.value;
  //   this.setState({
  //     name: s,
  //   })
  // }

  stopTimer(setIntervalName) {
    clearInterval(this.state.tickingFunc);
  }

  deleteTimer(position) {
    this.props.deleteTimer(position);
  }

  render() {
    return (
      <div id='timerEntry'>
        {/* Start Button */}
        <input type='button' value='Start' onClick={ () => { this.startTimer(this.props.timer.time, this.props.timer.position) } }></input>

        {/* Stop Button */}
        <input type='button' value='Stop' onClick={ () => {this.stopTimer()}}></input>

        {/* Reset Button
        <input type='button' value='Reset'></input> */}

        {/* Name Box */}
        <input type='text' placeholder={this.props.timer.name}></input> 

        {/* Time Box lul */}
        <input value={this.props.timer.time}></input>

        {/* Delete Button */}
        {/* <input type='button' value='Delete' onClick={() => {this.deleteTimer()}}></input> */}

        {/* Alter positions Buttons */}
        {/* Up */}
        {/* <input type='button' value='Up'></input> */}

        {/* Down
        <input type='button' value='Down'></input> */}
      </div>
      
    )
  }
}

export default TimerEntry;
