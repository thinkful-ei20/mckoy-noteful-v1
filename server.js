'use strict';

const data = require('./db/notes');

console.log('Hello Noteful!');

// INSERT EXPRESS APP CODE HERE...
const express = require('express');
const app = express();
const PORT = 8080;

app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
  const {searchTerm} = req.query;
  console.log(searchTerm);
  res.json(data.filter(entry => entry.title.includes(searchTerm)));
});

app.get('/api/notes/:id', (req, res) => {
  const query = req.params;
  res.send(data.find(entry => entry.id === Number(query.id)));
});

app.listen(PORT, function () {
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => { console.log(err); });