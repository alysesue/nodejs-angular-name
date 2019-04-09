'use strict';

// require packages and modules
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const personController = require('./controllers/person.controller');

// middleware
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// set routes to use express app
personController(app);

// server startup
app.listen(1000, function () {
  console.log('App listening on port 1000');
})

// export module so can use in other modules
module.exports = app;