/*
//Get ID which is linked to the button
const button = document.getElementById("buttonTime");
const currentTime = document.getElementById("currentTime");
//button.addEventListener('click', gettingTime);
*/
// declaring a variable that finds the board HTML element by ID.
/*
function playerChoice (choice) {
  prompt("Please choose your player", "X or O");
};

if (playerChoice !== 'X' || playerChoice !== 'O') {
  alert('You have not picked correctly, please try again');
  playerChoice();
  } else {
  alert('Let the game begin!');
}
*/
//TODO: Put a check if player has already chosen X or O and tries to click the other option (x or o)
var choiceX = 0;
var choiceO = 0;
var classButtonX = document.getElementById("buttonX");
var classButtonO = document.getElementById("buttonO");
/*
const hiddenBoard = document.getElementById("board").style.visibility = "hidden";
const showBoard = document.getElementById("board").style.visibility = "hidden";
*/
function hideBoard() {
  document.getElementById("board").style.visibility = "hidden";
}

function showBoard() {
  document.getElementById("board").style.visibility = "visible";
}
function chooseX() {
  if(choiceX === 0) {
  choiceX = 1;
  _playerInput = "X";

    classButtonX.style.visibility = "hidden";
    classButtonO.style.visibility = "hidden";
    alert("You have chosen X");
    showAlertX();
    showBoard();

    //var hidden =
    //Button now visible after pressing if X was chosen

  } else {
    alert("X has already been chosen, you will be O");
    choiceO = 1;
    _playerInput = "O";
    showAlertO();
    showBoard();
    classButtonO.style.visibility = "hidden";
    classButtonX.style.visibility = "hidden";
  }
}

function showAlertX() {
  document.getElementById("AlertX").style.visibility = "visible";
}

function showAlertO() {
  document.getElementById("AlertO").style.visibility = "visible";
}

function hideAlertX() {
  document.getElementById("AlertX").style.visibility = "hidden";
}

function hideAlertO() {
  document.getElementById("AlertO").style.visibility = "hidden";
}

function chooseO() {
  if(choiceO === 0) {
  choiceO = 1;
    _playerInput = "O";
    classButtonO.style.visibility = "hidden";
    classButtonX.style.visibility = "hidden";
    alert("You have chosen O");
    showAlertO();
    showBoard();

    //Button now visible after pressing if O was chosen
    classButtonO.style.visibility = "hidden";
  } else {
    alert("O has already been chosen, you will be X");
    showAlertX();
    showBoard();
    choiceX = 1;
    _playerInput = "X";
    classButtonX.style.visibility = "hidden";
    classButtonO.style.visibility = "hidden";
  }
}


/*
function playerChoice (checkInput) {
_playerInput = prompt("Please choose your player", "X or O");
}
//TODO - Currently _playerInput check does not work for checking correctly.
function checkInput(_playerInput) {
if (_playerInput !== "X") {
  alert('Please try again!');
  _playerInput = 0;
  playerChoice(checkInput);

  } else {
  alert('You have picked ' + _playerInput + " Let the game begin!");
  }
}
*/
const board = document.getElementById('board');
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
  };
  xhttp.open("GET", "/api/board", true);
  xhttp.send();
}
/*
This function will take board data and generate a table from the data.
*/
function generateBoard(board) {
  var HTML = '<table id="boardTable" align="center">';
  board.forEach( function(row, rowIndex) {
    HTML += '<tr>';
    row.forEach( function(column, columnIndex) {
      HTML += `<td onclick="handleClick(${rowIndex}, ${columnIndex})">${column}</td>`;

    });
    HTML += '</tr>';
  });
  HTML += '</table>';
  return HTML;
}

function handleClick(rowIndex, columnIndex) {
  playerMove(rowIndex, columnIndex);
  setTimeout(getBoard, 100);
}

function playerMove(rowIndex, columnIndex) {
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", `/api/move?row=${rowIndex}&column=${columnIndex}&player=${_playerInput}`, true);
  xhttp.send();

}
function updateVar() {
cell1 = boardTable.rows[0].cells[0].innerText;
cell2 = boardTable.rows[0].cells[1].innerText;
cell3 = boardTable.rows[0].cells[2].innerText;
}
function checkGameOver() {
  updateVar()
  if(cell1 === cell2 && cell2 === cell3) {
    alert('Game over!')
  } else {
    alert('Game Continues!')
  }
}

//checkInput(_playerInput);
/*
Calling the board function
*/
hideAlertX();
hideAlertO();
getBoard();

hideBoard();
//Getting current time in seconds and updates per second
setInterval(getBoard, 1000 );

var cell1 = boardTable.rows[0].cells[0].innerText;
var cell2 = boardTable.rows[0].cells[1].innerText;
var cell3 = boardTable.rows[0].cells[2].innerText;
