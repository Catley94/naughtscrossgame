/*
//Get ID which is linked to the button
const button = document.getElementById("buttonTime");
const currentTime = document.getElementById("currentTime");
//button.addEventListener('click', gettingTime);
*/
// declaring a variable that finds the board HTML element by ID.
const board = document.getElementById("board");

function playerChoice (checkInput) {
_playerInput = prompt("Please choose your player", "X or O");
};
function checkInput() {
if (_playerInput == 'X' || _playerInput == 'O') {
  alert('You have picked ' + _playerInput);
  alert('Let the game begin!');
  } else {
  alert('Please try again!');
  playerChoice();
}
};


/*
Function getBoard will call board API endpoint and retrieve the board data.
*/
function getBoard() {
  var xhttp = new XMLHttpRequest();

  //could create below function into individual function and call.
  xhttp.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
      const boardHTML = generateBoard(JSON.parse(this.responseText));
      //generate table marker into the HTML page.
      board.innerHTML = boardHTML;
    }
  }
  xhttp.open("GET", "/api/board", true);
  xhttp.send();
};
/*
This function will take board data and generate a table from the data.
*/

function generateBoard() {

  let HTML = '<table>'
  board.forEach( function(row, rowIndex) {
    HTML += '<tr>'
    row.forEach( function(column, columnIndex) {
      HTML += `<td onclick="handleClick(${rowIndex}, ${columnIndex})">${column}</td>`
    })
    HTML += '</tr>'
  })
  HTML += '</table>'
  return HTML;
}

function handleClick(rowIndex, columnIndex) {
  playerMove(rowIndex, columnIndex);
  setTimeout(getBoard, 500);
}

function playerMove(rowIndex, columnIndex) {
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", `/api/move?row=${rowIndex}&column=${columnIndex}&player=${playerInput}`, true);
  xhttp.send();

};
generateBoard();

playerChoice();


/*
Calling the board function
*/


/*
//Getting current time in seconds and updates per second
setInterval(gettingTime, 1000 );
*/
