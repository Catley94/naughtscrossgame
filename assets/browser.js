//Variable choiceX is so X cannot be chosen more than once.
var choiceX = 0;
//Variable choiceO is so O cannot be chosen more than once.
var choiceO = 0;
//Variable classButtonX is finding the element by id of ButtonX
var classButtonX = document.getElementById("buttonX");
//Variable classButtonO is finding the element by id of ButtonO
var classButtonO = document.getElementById("buttonO");

//Function hides board, before game and after game has been won.
function hideBoard() {
  document.getElementById("board").style.visibility = "hidden";
  startRefresh();
}
//Function displays board after being hidden.
function showBoard() {
  document.getElementById("board").style.visibility = "visible";
}

/*Function linked to the button of choosing "O" for their character
Takes note to how many times O has been clicked, if more than once,
it will decide for the player and give them the other character.
After choosing, will hide both buttons so not to confuse the player or the game.
*/
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
//Shows AlertX, displays after choosing X, to remind player of which character they had chosen.
function showAlertX() {
  document.getElementById("AlertX").style.visibility = "visible";
}
//Shows AlertX, displays after choosing O, to remind player of which character they had chosen.
function showAlertO() {
  document.getElementById("AlertO").style.visibility = "visible";
}
//Hides AlertX, displays after choosing X, this is for pre-game for tidyness.
function hideAlertX() {
  document.getElementById("AlertX").style.visibility = "hidden";
}
//Hides AlertO, displays after choosing X, this is for pre-game for tidyness.
function hideAlertO() {
  document.getElementById("AlertO").style.visibility = "hidden";
}

/*Function linked to the button of choosing "O" for their character
Takes note to how many times O has been clicked, if more than once,
it will decide for the player and give them the other character.
After choosing, will hide both buttons so not to confuse the player or the game.
*/
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



//Creates a constant variable for the div with the id of 'board'
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
  checkGameOver();
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

/*Function handles the clicking on the cells,
takes the row and column index, passes it to playerMove.
*/
function handleClick(rowIndex, columnIndex) {
  playerMove(rowIndex, columnIndex);
  //setTimeout(getBoard, 100);

}

/*Function manages each move that is made.
Takes note of the Row and Column of where the cell is,
plus the player's chosen letter/character (X or O).
*/
function playerMove(rowIndex, columnIndex) {

  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", `/api/move?row=${rowIndex}&column=${columnIndex}&player=${_playerInput}`, true);
  xhttp.send();


}
//Function that updates all the variables with the relevant cells for cleaner code.
function updateCellsVar() {
cell1 = boardTable.rows[0].cells[0].innerText;
cell2 = boardTable.rows[0].cells[1].innerText;
cell3 = boardTable.rows[0].cells[2].innerText;
cell4 = boardTable.rows[1].cells[0].innerText;
cell5 = boardTable.rows[1].cells[1].innerText;
cell6 = boardTable.rows[1].cells[2].innerText;
cell7 = boardTable.rows[2].cells[0].innerText;
cell8 = boardTable.rows[2].cells[1].innerText;
cell9 = boardTable.rows[2].cells[2].innerText;
cells123 = cell1 + cell2 + cell3;
cells456 = cell4 + cell5 + cell6;
cells789 = cell7 + cell8 + cell9;
cells147 = cell1 + cell4 + cell7;
cells258 = cell2 + cell5 + cell8;
cells369 = cell3 + cell6 + cell9;
cells159 = cell1 + cell5 + cell9;
cells357 = cell3 + cell5 + cell7;


}

/*Function calls updateCellsVar()
if statement checks all possibilities for winning (3 X's or O's in a row, in any direction)
if the statement returns true, it means the game is over, so returns an alert with "Game Over!"
if the statement returns false, it will write to the console "Game Continues!", this is for development purposes,
to show the timer working.
Added on feature for game drawn, looks at the legth of "allCells" if 9, all cells have been used.
If all cells have been used and it does not equal to a win or lose, it must be a draw.
*/
function checkGameOver() {
  updateCellsVar();
var allCells = cell1 + cell2 + cell3 + cell4 + cell5 + cell6 + cell7 + cell8 + cell9;
   if(cells123 === "XXX" ||
      cells456 === "XXX" ||
        cells789 === "XXX" ||
          cells147 === "XXX" ||
            cells258 === "XXX" ||
              cells369 === "XXX" ||
                cells159 === "XXX" ||
                  cells357 === "XXX" || ) {
    //Add the "Player's choice onto message, such as: Player X won!"
    alert('Game over!');
    stopRefresh();
    hideBoard();
  } else if(cells123 === "OOO" ||
              cells456 === "OOO" ||
                cells789 === "OOO" ||
                  cells147 === "OOO" ||
                    cells258 === "OOO" ||
                  cells369 === "OOO" ||
                cells159 === "OOO" ||
                cells357 === "OOO" {

  } else if(allCells.length === 9) {
    alert('Game Drawn!')
    stopRefresh();
    hideBoard();
  } else {
    console.log('Refreshing per second');
  }



}


//Function that triggers setInterval, also clears the refresh variable first so not to stack refresh rate.
function startRefresh() {
clearInterval(refresh);
refresh = setInterval(getBoard, 1000);
}

//Variable for refresh, used to set a refresh rate with setInerval and clear it with clearInterval.
var refresh;
//Function that triggers clearInterval.
function stopRefresh() {
clearInterval(refresh);
}



//Hides alert for choosing X
hideAlertX();
//Hides alert for choosing O
hideAlertO();
//Calls the getBoard function to generate the board
getBoard();
//Hides the board before the game begins
hideBoard();


//Variables for cells and cell combinations
var cell1 = boardTable.rows[0].cells[0].innerText;
var cell2 = boardTable.rows[0].cells[1].innerText;
var cell3 = boardTable.rows[0].cells[2].innerText;
var cell4 = boardTable.rows[1].cells[0].innerText;
var cell5 = boardTable.rows[1].cells[1].innerText;
var cell6 = boardTable.rows[1].cells[2].innerText;
var cell7 = boardTable.rows[2].cells[0].innerText;
var cell8 = boardTable.rows[2].cells[1].innerText;
var cell9 = boardTable.rows[2].cells[2].innerText;
var cells123 = cell1 + cell2 + cell3;
var cells456 = cell4 + cell5 + cell6;
var cells789 = cell7 + cell8 + cell9;
var cells147 = cell1 + cell4 + cell7;
var cells258 = cell2 + cell5 + cell8;
var cells369 = cell3 + cell6 + cell9;
var cells159 = cell1 + cell5 + cell9;
var cells357 = cell3 + cell5 + cell7;



/*
All archived comments below:
//onload="hideBoard()"
//Getting current time in seconds and updates per second
//checkInput(_playerInput);
/*
Calling the board function
//var refresh = setInterval(getBoard, 1000);
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
/*
const hiddenBoard = document.getElementById("board").style.visibility = "hidden";
const showBoard = document.getElementById("board").style.visibility = "hidden";
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
