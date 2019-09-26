import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import TimerList from './components/TimerList.jsx';
import * as firebase from 'firebase';


const firebaseConfig = {
  apiKey: "AIzaSyD0YD4fRv2miE3HTUyJ8OUH7xInqlapumk",
  authDomain: "time-boxes.firebaseapp.com",
  databaseURL: "https://time-boxes.firebaseio.com",
  projectId: "time-boxes",
  storageBucket: "",
  messagingSenderId: "788235968609",
  appId: "1:788235968609:web:006612afe24091120aca20"
};
firebase.initializeApp(firebaseConfig);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      timers: []
    }
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.addTimer = this.addTimer.bind(this);
    this.saveTimers = this.saveTimers.bind(this);
  }

  componentDidMount() {
    // $.ajax ({
    //   type: 'GET',
    //   url: '/api/timers',
    //   success: (data) => {
    //     console.log('successful get request')
    //     this.setState({
    //       timers: data
    //     })
    //   }
    // })

    // recieve timer from firebase
    const rootRef = firebase.database().ref();
    
    rootRef.on('value', snap => {
      let timers = [];

      snap.forEach((timer) => {
        var timerData = timer.val();
        timers.push(timerData);
      })
      console.log(timers);

      this.setState({
        timers
      })
    })
  }

  saveTimers() {
    console.log("saved!")
    $.ajax({
      type:'DELETE',
      url:'/api/timers',
      success : function(data) {
        console.log('success');
      },
      error : function() {
        console.log('error');
      }
    })
    // $.post('/api/timers', {timers: this.state.timers}, (err) => {
    //   if (err) {console.log(err)}
    //   console.log('Post successful', this.state.timers);
    // });
  }

  handleTimeChange(updatedTime, position) {
    // // passed an updated timer
    var newTimer = this.state.timers[position];
    newTimer.time = updatedTime;

    var newTimers= this.state.timers;
    newTimers[position] = newTimer;

    // update firebase 
    let firebaseRoot = firebase.database().ref();
    firebaseRoot.child(newTimer.name).set(newTimer);


    // change state
    this.setState({
      timers: newTimers
    })
  }

  addTimer() {
    var newTimer = {
      name: `timer${this.state.timers.length}`,
      time: '00:00:00', 
      position: this.state.timers.length
    }
    // var newTimers = this.state.timers;
    // newTimers.push(newTimer);

    // firebase add timer
    let firebaseRoot = firebase.database().ref();
    firebaseRoot.child(newTimer.name).set(newTimer);

    // this.setState({
    //   timers: newTimers
    // })

  }

  changeName(e) {
    var inbox = e.target.value;
  }

  // deleteTimer(position) {
  //   var newTimers = this.state.timers;
  //   for (var i = 0; i < newTimers.length; i++) {
  //     var timer = newTimers[i];
  //     if (timer[position] === position) {
  //       // delete from array
  //       newTimers.splice(i,1);
  //     }
  //   }
  //   this.setState({
  //     timers: newTimers
  //   })
  //   // delete from database
  //   $.ajax({
  //     type:'DELETE',
  //     url:'/api/timers',
  //     success : function(data) {
  //       console.log('success');
  //      },
  //     error : function() {
  //       console.log('error');
  //     }
  //   })
  // }

  deleteAll() {
    // this.setState({
    //   timers: []
    // })

    // $.ajax({
    //   type:'DELETE',
    //   url:'/api/timers',
    //   success : function(data) {
    //     console.log('success');
    //     },
    //   error : function() {
    //     console.log('error');
    //   }
    // })

    // delete all stopwatches in firebase

    let firebaseRef = firebase.database().ref();
    firebaseRef.remove();
    
  }

  render () {
    return (
    <div className='mainCont'>
      <h1>Time Boxes</h1>
      <input type='button' value='Make Stopwatch' onClick={() => { this.addTimer() } }></input>
      <input type='button' value='Save Stopwatches' onClick={() => { this.saveTimers() } }></input>
      <input type='button' value='Delete all Stopwatches' onClick={() => { this.deleteAll() } }></input>
      <TimerList 
      handleTimeChange={this.handleTimeChange} 
      timers={this.state.timers}
      deleteTimer={this.deleteTimer}
      saveTimers={this.saveTimers}
      />
    </div>)
  }
}


ReactDOM.render(<App />, document.getElementById('app'));
