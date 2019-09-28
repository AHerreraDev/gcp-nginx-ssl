const express = require('express');
const app = express();

app.route('/', (req, res) => {
  console.log('Hit home');
  res.send('<h1> Node App </h1>')
})

app.listen(3000, () => {
  console.log('Server running on port 3000')
});