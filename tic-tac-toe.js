/*  A simple Tic-Tac-Toe game
Players 'X' and 'O' take turn inputing their position on the command line using numbers 1-9
1 | 2 | 3
---------
4 | 5 | 6
---------
7 | 8 | 9
*/

// importing user import library
// missed ({sigint: true});
const prompt = require('prompt-sync')({sigint: true});

let board = {
    1: ' ', 2: ' ', 3: ' ',
    4: ' ', 5: ' ', 6: ' ',
    7: ' ', 8: ' ', 9: ' '
};

// TODO: update the gameboard with the user input
function markBoard(position, mark) {
    board[position] = mark
}

// TODO: print the game board as described at the top of this code skeleton
function printBoard() {
    /*
    console.log('Game started: \n\n' +
    ' 1 | 2 | 3 \n' +
    ' --------- \n' +
    ' 4 | 5 | 6 \n' +
    ' --------- \n' +
    ' 7 | 8 | 9 \n')
    */
    board_print = []
    for (ele in board){
        if (board[ele] == ' '){
            board_print.push(ele)
        }
        else {
            board_print.push(board[ele])
        }
    }
    finalString = 'Current: \n\n' +
    ' '+ board_print[0] + ' | '+ board_print[1] + ' | '+ board_print[2] + ' \n' +
    ' --------- \n' +
    ' '+ board_print[3] + ' | '+ board_print[4] + ' | '+ board_print[5] + ' \n' +
    ' --------- \n' +
    ' '+ board_print[6] + ' | '+ board_print[7] + ' | '+ board_print[8] + ' \n\nInput q to quit anytime'
    console.log(finalString)
}


// TODO: check for wrong input, this function should return true or false.
// true denoting that the user input is correct
// you will need to check for wrong input (user is entering invalid position) or position is out of bound
// another case is that the position is already occupied
function validateMove(position) {
    if (position > 9 || position < 1 ){
        return false
    }

    if (board[position] == ' '){
        return true
    }
    else{
        return false
    }
}

// TODO: list out all the combinations of winning, you will neeed this
// one of the winning combinations is already done for you
let winCombinations = [
    [1, 2, 3],[4 ,5 ,6],[7, 8, 9],[1, 4, 7],[2, 5, 8],[3, 6, 9],[1, 5, 9],[3, 5, 7]
];

// TODO: implement a logic to check if the previous winner just win
// This method should return with true or false
function checkWin(player) {
    fullCheck = 0
    currCount = 0
    while (currCount < 8){
        currCheck = winCombinations[currCount]
        for (let e of currCheck){
            if (board[e] == player){
                fullCheck += 1
            }
        }

        if (fullCheck == 3){
            return true
        }
        else{
            fullCheck = 0
            currCount += 1
        }
    }

    return false
}

// TODO: implement a function to check if the game board is already full
// For tic-tac-toe, tie bascially means the whole board is already occupied
// This function should return with boolean
function checkFull() {
    let check = 0
    for (pos in board){
        if (board[pos] != ' '){
            check += 1
        }
    }
    if (check == 9){
        return true
    }
    else{
        return false
    }
}

// *****************************************************
// Copy all your code/fucntions in Part 1 to above lines
// (Without Test Cases)
// *****************************************************


// TODO: the main part of the program
// This part should handle prompting the users to put in their next step, checking for winning or tie, etc
function playTurn(player) {
    // request for move from Player
    const move = prompt('Player ' + player + ' move: ');
    // early termination
    if (move == "q"){
        winner = 'q'
        return
    }
    // check whether move is valid, if it is not request for valid input
    if (!validateMove(move)){
        console.log('Invalid Input, try another input')
    }
    // valid move, check whether win, if win end playTurn
    else{
        markBoard(move,player)
        printBoard()
        if (checkWin(player)){
            winner = player
        }
        else{
            if (currentTurnPlayer == 'X'){
                currentTurnPlayer = 'O'
            }
            else{
                currentTurnPlayer = 'X'
            }
        }
    }

}


// feel free to add logic here if needed, e.g. announcing winner or tie
// Bonus Point: Implement the feature for the user to restart the game after a tie or game over
// I have also added a feature to quit game anytime user inputs q
let t = true
let currentTurnPlayer = 'X'
let winner = ''
while (t != "q"){ 
    // entry point of the whole program
    console.log('Game started: \n\n' +
    ' 1 | 2 | 3 \n' +
    ' --------- \n' +
    ' 4 | 5 | 6 \n' +
    ' --------- \n' +
    ' 7 | 8 | 9 \n\nInput q to quit anytime');

    // While the board is not full and there is no winner
    while (checkFull() == false && winner == ''){
        playTurn(currentTurnPlayer)
        if (winner == 'q'){
            break
        }
    }

    
    if (winner == 'q'){
        console.log("quitting game...")
        break
    }
    else if (winner != ''){
        console.log("\nPlayer " + winner + " wins!\n")
    }
    else{
        console.log("\nGame is tied, there is no winner\n")
    }
    t = prompt("Input any number to Restart, input q to quit :")
    if (t == 'q'){
        console.log('\nquitting game...\n')
    }
    //reset variables to original
    board = {
        1: ' ', 2: ' ', 3: ' ',
        4: ' ', 5: ' ', 6: ' ',
        7: ' ', 8: ' ', 9: ' '
    };
    currentTurnPlayer = 'X'
    winner = ''
}



