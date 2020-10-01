const express = require('express');
const postsRouter = require('./posts/posts-router');
const server = express();

server.use(express.json());

server.use('/api/posts', postsRouter);

server.get('/', (req, res) => {
  res.send(`<h1>Welcome to Posts API</h1>`);
});
 
const port = 5000;
server.listen(port, () => {
  console.log(`API running on http://localhost:${port}`);
}); 