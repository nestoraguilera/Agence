const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('cors')());

app.use('/hola', (req, res, next) => {
  console.log(JSON.stringify(req.params));
  res.status(200).send("<h1>Hola!</h1>");
});

app.use('/file', require('./routes/file'));
app.use('/chart', require('./routes/chart'));
app.use('/consultor', require('./routes/consultor'));

app.use((req, res, next) => {
  res.status(404).send(JSON.stringify({ message: 'not found' }));
});

module.exports = app;
