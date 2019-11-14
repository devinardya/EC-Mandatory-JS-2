const block = document.querySelectorAll(".block");
const startAgain = document.querySelector("#startAgain");
const reset = document.querySelector("#resetAgain");
const humanPlayers = document.querySelector("#playwithhuman");
const withComp = document.querySelector("#playwithcomp");
let gamestartAlert = document.querySelector(".alert");
let gamestartAlertText = document.querySelector(".gamestart");
let winningAlertText = document.querySelector(".winning");
let introText = document.querySelector(".intro");
let spanP1Score = document.querySelector(".p1");
let spanP2Score = document.querySelector(".p2");
let buttons = document.querySelector(".buttons");
let scoreboard = document.querySelector(".score");
let blackscreen = document.querySelector(".blackscreen");
let belowButton = document.querySelector(".below-button");


let scorep1 = 0;
let scorep2 = 0;
spanP1Score.textContent = scorep1;
spanP2Score.textContent = scorep2;
let counter = 0;
let x = "X"; // even (first player)
let o = "O"; // odd (second player)

let gameOver = false;
let allInput = []

//choosing between playing 2 human players or versus computer
humanPlayers.addEventListener("click", function () {
    startGame("human");
});
withComp.addEventListener("click", function () {
    startGame("computer");
});

// start menu so the players can pick which mode they want to play
gamestartAlert.style.display = "block";
introText.style.display = "block";

// to start the game again
startAgain.addEventListener("click", restartGame);

function restartGame() {
    gamestartAlert.style.display = "none";
    winningAlertText.style.display = "none";
    introText.style.display = "none";
    blackscreen.style.display = "none";
    for (let each of block) {
        each.innerHTML = "";
    }
    counter = 0;
    gameOver = false;
    allInput.length = 0;

};

// to reset the whole game 
reset.addEventListener("click", resetGame);

function resetGame() {
    location.reload();
};

// function to show/hide different element on the game when it's starts
function defaultLayout() {
    gamestartAlert.style.display = "block";
    gamestartAlertText.style.display = "block";
    introText.style.display = "none";
    buttons.style.display = "none";

    setTimeout(function () {
        gamestartAlert.style.display = "none";
        gamestartAlertText.style.display = "none";
        blackscreen.style.display = "none";
        belowButton.style.display = "flex";
        scoreboard.style.display = "block";
    }, 1000);
};

//to run the game on both mode (vs.humans or vs.computer)
function startGame(input) {

    defaultLayout();

    // initiating the game
    for (let i = 0; i < block.length; i++) {
        eachblock = block[i];

        // add event listeners
        if (counter >= 0 || counter <= 8) {
            eachblock.addEventListener("click", function () {

                //pushing all input from both users (humans or humans + comp)
                allInput.push(i);

                //AI do random number
                let iRandom = randomNum(allInput);

                // create HTML elements to show X or O
                let a = document.createElement("a");
                let aComp = document.createElement("a");

                // if the box is empty and the game is not over
                if (block[i].textContent === "" && gameOver === false) {

                    // if the players are humans
                    if (input === "human") {

                        //creating X for first player
                        if (isEven(counter)) {
                            a.textContent = x;
                            block[i].appendChild(a);
                        } else { // creating O for second player
                            a.textContent = o;
                            block[i].appendChild(a);
                            a.style.color = "rgb(3, 97, 100)";
                        }
                        counter++; // add one to the counter
                        currentState(); // check the current game state

                    };

                    // if the game versus computer

                    if (input === "computer") {

                        //console.log("my number", i);
                        //console.log(compInput);

                        //creating X for first player
                        a.textContent = x;
                        block[i].appendChild(a);
                        counter++; // add one to the counter
                        currentState();

                        //checking if the game is not over, then AI still can make a move
                        if (gameOver === false) {

                            //console.log('compInput: ', compInput)
                            //console.log('irandom: ', iRandom)

                            // set timer so the AI can make a move after 0.3 seconds after the player made his/her move
                            setTimeout(function () {

                                //creating O for the computer with random numbers
                                aComp.textContent = o;
                                block[iRandom].appendChild(aComp);
                                aComp.style.color = "rgb(3, 97, 100)";
                                counter++;
                                currentState();
                            }, 300);
                            allInput.push(iRandom)
                        };
                    };
                
                };
            });
        };
    };
};

// creating AI with random numbers between 0 - 8
function randomNum(array) {

    // to make sure if the middle box is not empty, then computer will start from there
    let iRandom = 4;
    //console.log("irandom number", iRandom);

    // how many tries the computer would make to randomize until find an empty spot -- to avoid infinite loop
    let myindex = 0;

    // while loop to keep randomize number if there are already the same number on the allInput array
    while (array.indexOf(iRandom) !== -1) {

        //creating random numbers
        iRandom = Math.floor((Math.random() * 9));

        // if it's the same, then the loop will keep going for 100 times, else it would stop the game
        myindex++;
        if (myindex > 100) {
            break;
        }
    }
    // returning one random number = computer's move
    return iRandom;
};


// true or false if "n" is even
function isEven(n) {
    return n % 2 == 0;
};

// function to check the current game state
function currentState() {

    // empty arrays for saving player 1 and player 2 inputs
    let arrayX = [];
    let arrayO = [];

    // looping through all blocks and push which id of the block that has been chosen
    for (let j = 0; j < block.length; j++) {
        let input = block[j].textContent;
        if (input === x) {
            arrayX.push(block[j].id);
        } else if (input === o) {
            arrayO.push(block[j].id);
        }
    };
    // check which player is the winner
    checkWinner(arrayX, arrayO)
};

// a function to check the winner of the game
function checkWinner(input1, input2) {

    let arrX = input1;
    let arrO = input2;

    // all the winning combinations
    let winningComb = ["123", "456", "789", "147", "369", "357", "159", "258"];

    for (let k = 0; k < winningComb.length; k++) {
        let numArr = winningComb[k].split("");

        let num1 = numArr[0]; // first winning number
        let num2 = numArr[1]; // second winning number
        let num3 = numArr[2]; // third winning number

        // check if Player One is the winner
        if (arrX.indexOf(num1) !== -1 && arrX.indexOf(num2) !== -1 && arrX.indexOf(num3) !== -1) {
            winningCelebration("arrX")
            gameOver = true;
        }
        // check if Player Two is the winner
        if (arrO.indexOf(num1) !== -1 && arrO.indexOf(num2) !== -1 && arrO.indexOf(num3) !== -1) {
            winningCelebration("arrO")
            gameOver = true;
        }
    };

    // if the game is draw
    if (counter === 9 && gameOver !== true) {
        winningCelebration("draw")
        gameOver = true;
    }

};

// winning banner for the winner and change game score

function winningCelebration(winner) {
    if (winner === "arrX") {
        setTimeout(function () {
            winningText("PLAYER 1 WINS")
        }, 200);
        scorep1++;
        spanP1Score.textContent = scorep1;
    } else if (winner === "arrO") {
        setTimeout(function () {
            winningText("PLAYER 2 WINS")
        }, 200);
        scorep2++;
        spanP2Score.textContent = scorep2;
    } else if (winner === "draw") {
        setTimeout(function () {
            winningText("GAME DRAW")
            //winningAlertText.style.transform = "translate(-25%, -50%)";
        }, 200);
    }
};

// function to keep track all the layout changes and text in the winning banner
function winningText(itext) {
    winningAlertText.textContent = itext;
    gamestartAlert.style.display = "block";
    winningAlertText.style.display = "block";
    blackscreen.style.display = "block";
    blackscreen.style.zIndex = "9";
}