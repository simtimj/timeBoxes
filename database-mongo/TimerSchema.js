const mongoose = require('mongoose');
require('./index.js');

var timerSchema = mongoose.Schema({
    name: String,
    time: String, 
    position: Number
  });

const Timer = mongoose.model('Timer', timerSchema);

module.exports = Timer;