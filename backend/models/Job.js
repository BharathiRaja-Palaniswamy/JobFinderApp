const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  
  title: {
    type: String,
  },
  company: {
    type: String,
  },
  location : {
    type: String,
  }
},{ "strict": false })

module.exports = mongoose.model('Jobs', JobSchema,'jobs');