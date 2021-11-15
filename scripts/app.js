$("body").css({
    "margin-top": "50px",
    "font-family" : "Courier"})

$("#header").css({
    "text-align" : "center",
    "color": "cornflowerblue"
});

$(".box").css({
    "max-width": "100px", 
    "max-height": "100px",
    "border-radius": "10px",
    "border": "2px darkgray solid",
    "margin" : "2px",
    "height": "300px",
    "flex-wrap": "wrap",
});

$(".container").css({
    "display": "grid",
    "grid-template-columns": "repeat(3, auto)",
    "width": "300px",
    "margin" : "20px auto",
});

$("#gameRule").html("Player One : X <br> Player Two : O").css({"text-align": "center", "color": "cornflowerblue"});

$("#gameResult").css({
    "text-align" : "center",
    "color": "tomato",
    "font-size": "20px",
"font-weight": "bold"})

// Game Board
const $boxes = $(".box");
const $topLeft = $("#topLeft");
const $topMiddle = $("#topMiddle");
const $topRight = $("#topRight");
const $middleLeft = $("#middleLeft");
const $middleMiddle = $("#middleMiddle");
const $middleRight = $("#middleRight");
const $bottomLeft = $("#bottomLeft");
const $bottomMiddle = $("#bottomMiddle");
const $bottomRight = $("#bottomRight");

// Set players
const playerOne = "X";
const playerTwo = "O";

// Game Rules, all winning cases
const winningCases = [
    [$("#topLeft")[0], $("#topMiddle")[0], $("#topRight")[0]],
    [$("#topLeft")[0], $("#middleMiddle")[0], $("#bottomRight")[0]],
    [$("#topLeft")[0], $("#middleLeft")[0], $("#bottomLeft")[0]],
    [$("#topMiddle")[0], $("#middleMiddle")[0], $("#bottomMiddle")[0]],
    [$("#topRight")[0], $("#middleRight")[0], $("#bottomRight")[0]],
    [$("#topRight")[0], $("#middleMiddle")[0], $("#bottomLeft")[0]],
    [$("#middleLeft")[0], $("#middleMiddle")[0], $("#middleRight")[0]],
    [$("#bottomLeft")[0], $("#bottomMiddle")[0], $("#bottomRight")[0]]
];

// Initial setup and game start!

let currentPlayer = playerOne;
let playerOneClicked = [];
let playerTwoClicked = [];

$boxes.click(function (event) {
    // Put a mark in the cliced box
    event.target.classList.add("clicked");
    $(this).html(currentPlayer).css({"font-size" : "25px", "text-align": "center", "line-height" : "100px"});
    // Store the clicked box in player's array
    if(currentPlayer == playerOne) {
    playerOneClicked.push(this);
    } else {
    playerTwoClicked.push(this);
    };
    // Winner check
    checkerWinner();
    // Switch Player
    switchPlayer();
});

function checkerWinner() {
    let gameFinished = false;
    for(let i = 0; i < winningCases.length; i++) {
        let checker = (clickedBoxes, winningCase) => winningCase.every(e => clickedBoxes.includes(e));
        if (currentPlayer == playerOne) {
            if(checker(playerOneClicked, winningCases[i])) {
                    gameFinished = true;
                    $("#gameResult").text('Player One won!');
            } 
        } else if (currentPlayer == playerTwo) {
            if(checker(playerTwoClicked, winningCases[i])) {
                gameFinished = true;
                $("#gameResult").text('Player Two won!');
            }
        }
    }
    if($(".clicked").length == 9 && gameFinished == false) {
        $("#gameResult").text('The game is tied!');
    }
}

function switchPlayer() {
    if (currentPlayer == playerOne) 
        currentPlayer = playerTwo;
    else if (currentPlayer == playerTwo) 
        currentPlayer = playerOne;
}