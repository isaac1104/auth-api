const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 5000;
const mongoose = require('mongoose');
const keys = require('./config/keys');

mongoose.connect(keys.mongoURI);

app.use(express.json());

require('./routes/auth_route')(app);

app.listen(PORT, () => {
  console.log(`Server on PORT: ${PORT}`);
});

/*
1. create dev.js file inside config folder.
2. provide your credentials as an object like below.

module.exports = {
  secret: '',
  mongoURI: ''
}
*/
