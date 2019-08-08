// implement your API here
const express = require('express');

const Data = require('./data/db.js');

const port = 5000;

const server = express();

server.post('/api/users', (req, res) => {
  const { name, bio } = req.body;

  if (!name || !bio) {
    res
      .status(400)
      .json({ message: 'Please provide name and bio for the user.' });
  } else {
    Data.insert(req.body)
      .then(user => {
        res.status(201).json(user);
      })
      .catch(err => {
        res.status(500).json({
          err: err,
          message: 'failed to add user'
        });
      });
  }
});

server.get('/api/users', (req, res) => {
  Data.find()
    .then(users => {
      users
        ? res.status(200).json(users)
        : res.status(418).json({ message: 'Invalid as heck' });
    })
    .catch(err => {
      res.status(500).json({
        err: err,
        error: 'The users information could not be retrieved.'
      });
    });
});

server.get('/api/users/:id', (req, res) => {
  Data.findById(req.params.id)
    .then(user => {
      user
        ? res.status(200).json(user)
        : res.status(404).json({
            message: 'The user with the specified ID does not exist.'
          });
    })
    .catch(err => {
      res.status(500).json({
        err: err,
        message: 'Failed to retrieve user'
      });
    });
});

server.delete('/api/users/:id', (req, res) => {
  Data.remove(req.params.id)
    .then(id => {
      id
        ? res.status(200).json(id)
        : res.status(404).json({
            message: 'The user with the specified ID does not exist.'
          });
    })
    .catch(err => {
      res.status(500).json({
        err: err,
        message: 'failed to retrieve user'
      });
    });
});

server.put('/api/users/:id', (req, res) => {
  const { name, bio } = req.body;

  if (!name || !bio) {
    res.status(400).json({
      errorMessage: 'Please provide name and bio for the user.'
    });
  } else {
    Data.update(req.params.id, req.body)
      .then(user => {
        user
          ? res.status(200).json(user)
          : res
              .status(404)
              .json({ message: 'User with specified ID does not exist' });
      })
      .catch(err => {
        res.status(500).json({
          err: err,
          error: 'User information ccould not be modified'
        });
      });
  }
});

server.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
