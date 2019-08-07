// implement your API here
const express = require('express');

const Data = require('./data/db.js');

const port = 5000;

const server = express();

server.get('/api/users', (req, res) => {
  const { name, bio } = req.body;

  if (!name || !bio) {
    res.status(400).json({ message: 'Please provide name and bio' });
  } else {
    Data.insert(req.body)
      .then(user => {
        res.status(201).json(user);
      })
      .catch(err => {
        res.status(500).json({
          err: err,
          message: 'failed to retrieve users'
        });
      });
  }
});

server.get('/api/users', (req, res) => {
  Data.find()
    .then(users => {
      users
        ? res.json(users)
        : res.status(418).json({ message: 'Invalid as heck' });
    })
    .catch(err => {
      res.status(500).json({
        err: err,
        message: 'failed to retrieve users'
      });
    });
});

server.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
