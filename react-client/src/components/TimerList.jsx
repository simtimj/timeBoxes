import React from 'react';
import TimerEntry from './TimerEntry.jsx';

class TimerList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  // handleTimeChange(updatedTime, position) {
  //   this.props.handleTimeChange(updatedTime, position);
  // }

  render() { 
    return (
      <div className='timerList'>
        {this.props.timers.map(timer => 
          <TimerEntry 
          handleTimeChange={this.props.handleTimeChange} 
          deleteTimer={this.props.deleteTimer}
          class='timeBox' 
          timer={timer} />
        )}
      </div>
    )
  }
}




export default TimerList;