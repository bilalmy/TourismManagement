const mongoose = require('mongoose');

// Connect to MongoDB
const connectdb =mongoose.connect('mongodb://localhost:27017/Tourism',{ useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB successfully!');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });


  module.exports = connectdb;