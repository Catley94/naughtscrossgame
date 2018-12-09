const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use('/assets', express.static('assets'));

app.get('/', (req, res) => {
  //Logging to console when webpage has been requested
  console.log('request to /');
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/api/time', (req, res) => {
  //Logging to console when webpage has been requested
  console.log('request to /');
  const time = new Date().getTime();
  res.send(time.toString());
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));



const board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];
board[0][0] = 'x';
app.get('/api/board', (req, res) => {
  res.send(JSON.stringify(board));
});

app.get('/api/move', (req, res) => {
  board[parseInt(req.query.row)][parseInt(req.query.column)] = req.query.player;
  res.sendStatus(200);
});




/*
Defining how to change values in array(s)
board[0][0] = 'x';
*/
