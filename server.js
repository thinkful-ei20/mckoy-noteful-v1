'use strict';

const data = require('./db/notes');
const simDB = require('./db/simDB');
const notes = simDB.initialize(data);
const {PORT} = require('./config');
const {requestLogger} = require('./middleware/logger');

console.log('Hello Noteful!');

// INSERT EXPRESS APP CODE HERE...
const express = require('express');
const app = express();

app.use(express.static('public'));
app.use(requestLogger);

app.get('/api/notes', (req, res, next) => {
  const {searchTerm} = req.query;
  notes.filter(searchTerm, (err, list) => {
    if (err) {
      return next(err);
    }
    res.json(list);
  });
});

app.get('/api/notes/:id', (req, res) => {
  const query = req.params;
  res.send(data.find(entry => entry.id === Number(query.id)));
});

app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.status(404).json({ message: 'Not Found' });
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

app.listen(PORT, function () {
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => { console.log(err); });