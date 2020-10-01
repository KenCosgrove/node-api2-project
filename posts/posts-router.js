const express = require('express');
const router = express.Router();

const Posts = require('../data/db');

router.post('/', (req, res) => {
  if (req.body.title && req.body.contents) {
    Posts.insert(req.body)
      .then((post) => {
        res.status(201).json(post);
      })
      .catch((err) => {
        res.status(500).json({
          message: err.message, 
        });
      });
  } else {
    res.status(400).json({
      errorMessage: 'Please provide title and contents for the post.',
    });
  }
});

router.get('/', (req, res) => {
  Posts.find(req.query)
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      });
    });
});

router.get('/:id', (req, res) => {
  Posts.findById(req.params.id)
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((err) => {
      res.status(500).json({
        error: 'The post information could not be retrieved.',
      });
    });
});

router.post('/:id/comments', (req, res) => {
  Posts.insertComment(req.body)
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      });
    });
});

router.get('/:id/comments', (req, res) => {
  Posts.findPostComments(req.params.id)
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      });
    });
});

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const content = req.body;

  Posts.update(id, content)
    .then((post) => {
      res.status(202).json(post);
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      });
    });
});

router.delete('/:id', (req, res) => {
  Posts.remove(req.params.id)
    .then((post) => {
      res.status(204).json(post);
    })
    .catch((err) => {
      res
        .status(404)
        .json({ message: 'The post with the specified ID does not exist.' });
    });
});

module.exports = router;