var express = require('express');
var bodyParser = require('body-parser');
require('../database-mongo/index.js');

var Timer = require('../database-mongo/TimerSchema.js');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// UNCOMMENT FOR REACT
app.use(express.static(__dirname + '/../react-client/dist'));

// UNCOMMENT FOR ANGULAR
// app.use(express.static(__dirname + '/../angular-client'));
// app.use(express.static(__dirname + '/../node_modules'));

app.get('/api/timers', function (req, res) {
  Timer.find({}, (err, timers) => {
    if (err) { return err; }
    console.log('Successful db read', timers);
    res.send(timers);
  })
});

app.post('/api/timers', function (req, res) {
  var timers = req.body.timers;
  Timer.collection.insert(timers, function (err) {
    if (err) { console.log(err) };
    console.log("Timers successfully saved");
  });
})

// delete all
app.delete('/api/timers', (req, res) => {
  Timer.remove({}, (err) => {
    if (err) {console.log(err)}
    else {
      console.log("Successfully deleted.")
    }
  })
})

// // delete one
// app.delete('/api/timers/:id', (req, res) => {
//   Timer.remove({}, (err) => {
//     if (err) {console.log(err)}
//     else {
//       console.log("Successfully deleted.")
//     }
//   })
// })


app.listen(3333, function() {
  console.log('listening on localhost:3333');
});
