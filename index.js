const express = require('express');
const app = express();

app.route('/', (req, res) => {
  console.log('Hit home');
  res
  .status(200)
  .send('<h1> Node App </h1>')
  .end();
})

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.')
})