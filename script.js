var squares = document.getElementsByClassName("tttTd");
var btn = document.querySelector("button");
var tdTurns = document.querySelectorAll(".tdTurn");
var gameTable = document.querySelector("table");
var redCountSpan = document.querySelector("#redCount");
var blueCountSpan = document.querySelector("#blueCount");

var turn = "X";
var possibleWins = ["012", "345", "678", "036", "147", "258", "048", "246"];
var gameOver = false;
var freeSquare = 9;

var redCount = 0;
var blueCount = 0;

function changeTurn(color) {
	for(var j = 0; j < tdTurns.length; j++) {
		tdTurns[j].style.backgroundColor = color;
	}
	gameTable.style.borderColor = color;
	for(var j = 0; j < squares.length; j++) {
		squares[j].style.borderColor = color;
	}
}

function changeSymbol() {
	if(!gameOver && freeSquare > 0){
		if(this.textContent == '') {
			if(turn == "X") {
				this.textContent = 'X';
				turn = "O";
				changeTurn("#FF0000");
				freeSquare -= 1;
				if(checkWin(checkX)) {
					addCount("blue");
				}
			}
			else if(turn == "O") {
				this.textContent = 'O';
				turn = "X";
				changeTurn("#0000FF");
				freeSquare -= 1;
				if(checkWin(checkO)) {
					addCount("red");
				}
			}
		}
	}
	else {
		alert("GAME IS OVER");
	}
}

function resetGame() {
	for(var i = 0; i < squares.length; i++) {
		squares[i].textContent = '';
	}
	gameOver = false;
	freeSquare = 9;
}

function resetShot() {
	var answer = prompt("Dou you want to reset SHOT?\n(y/n)");

	if(answer == "y") {
		redCount = 0;
		blueCount = 0;
		redCountSpan.textContent = 0;
		blueCountSpan.textContent = 0;
		gameOver = false;
		freeSquare = 9;
	}
}

// adding event listeners:
for(var i = 0; i < squares.length; i++) {
	squares[i].addEventListener("click", changeSymbol);
}

btn.addEventListener("click", resetGame);

function addCount(team) {
	alert("Team " + team.toUpperCase() + " won!");
	if(team == "red") {
		redCount += 1;
		redCountSpan.textContent = redCount;
	}
	else if(team == "blue") {
		blueCount += 1;
		blueCountSpan.textContent = blueCount;
	}
	gameOver = true;
}

function checkX() {
	var strX = "";
	for(var i = 0; i < squares.length; i++) {
		if(squares[i].textContent == "X") {
			strX += i;
		}
	}
	return strX;
}

function checkO() {
	var strO = "";
	for(var i = 0; i < squares.length; i++) {
		if(squares[i].textContent == "O") {
			strO += i;
		}
	}
	return strO;
}

function checkWin(func) {
	if(func().length >= 3) {
		for(var i = 0; i < possibleWins.length; i++) {
			if(func().includes(possibleWins[i][0])
				&& func().includes(possibleWins[i][1])
				&& func().includes(possibleWins[i][2])) {
				return true;
			}
		}
	}
}