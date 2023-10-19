/*
Youngseo Yi
10/19/23
CS20-Web Programming
HW5: Tic Tac Toe
Content: Javascript file for Tic Tac Toe
*/


//start off with the player 'X'
var player = "X";

//writing the top label of player's turn
var topBox = player + "'s turn"
document.write("<div class = 'label' id='label'>X's turn</div>");

//writing the reset button
document.write("<div class = 'reset'>Play Again?</div>");
$(".reset").hide();

//writing the grid
document.write("<div class='grid'>");
//make cells; id based on index number of that cell
for (i = 0; i < 9; i++) {
    document.write("<div class='cell' class='gameon' id='"+i+"'></div>");          
}

//internal representation of the tic tac toe board
var myBoard = ["","","","","","","","",""];
var cell = 0;

//When the user clicks the button; updates myBoard, checks if there's a win
//also resets the board when the reset button is clicked
$(document).ready(function(){
    $(".cell").click(function(){
        $(this).text(player);
        cell = $(this).attr('id');
        $(this).off("click");
        updateBoard();
    }
    )
    $(".reset").click(function(){
        $(".reset").hide();
        resetBoard();
    }
    )
});

//updateBoard: called when user clicks a cell; checks a win
//If there's a winner or tie, ends the game; if not, continues the game by 
//changing the player
function updateBoard() {
    myBoard[cell] = player;
    var dispWin = checkWin();
    if(dispWin !="") {
        //if there's a winner or tie
        endgame(dispWin);
    } else {
        //change player
        if (player=="X") {
            player = "O";
        } else {
            player = "X";
        }  
        var divlabel = document.getElementById('label');
        divlabel.textContent= player + "'s turn";
    }

}

//Checks if there's a winner; goes through list of possible ways to win
//Returns X/O if there's a winner, T if there's a tie (all squares are filled)
//Returns "" if there's no winner and there are still spaces on the board
function checkWin() {
    var filled = "T";
    wins = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    //checking each win condition
    for (t=0;t<8;t++) {
        var word =[myBoard[wins[t][0]],myBoard[wins[t][1]],myBoard[wins[t][2]]];
        var strword = word.join("");
        if(strword == "XXX") {
            return "X";
        }
        if (strword=="OOO") {
            return "O";
        } 
        if (strword.length != 3) {
            filled = "";
        }
    }
    return filled;
}

//Function called when there is a tie or winner; ends the game by locking in
// the board and declares the winner/tie
//Shows the reset button, when user clicks it resets the game
function endgame(dispWin) {
    var divlabel = document.getElementById('label');
    if (dispWin == "T") {
        divlabel.textContent="It's a tie!";
    } else {
        divlabel.textContent= dispWin + " wins!";
    }
    $(".cell").off("click");
    for (i = 0; i < 9; i++) {
        var element = document.getElementById(i);
        element.classList.remove("gameon");
        element.classList.add("gameover");       
    }
    $(".reset").show();
}

//Function called when user clicks reset button
//Clears myBoard, the player's tic tac toe board, enables click for the cells,
//and resets styling of the board to when the game is active
//First player is whoever won the previous game
function resetBoard() {
    myBoard = ["","","","","","","","",""];
    $(".cell").text("");
    for (i = 0; i < 9; i++) {
        var element = document.getElementById(i);
        element.classList.remove("gameover");
        element.classList.add("gameon");   
    }
    var divlabel = document.getElementById('label');
    divlabel.textContent= player + "'s turn";
    $(".cell").on("click");

    //redefine how to handle the cell being clicked
    $(".cell").click(function(){
        $(this).text(player);
        cell = $(this).attr('id');
        $(this).off("click");
        updateBoard();
    })
}