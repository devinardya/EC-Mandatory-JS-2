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

let scorep1 = 0;
let scorep2 = 0;
spanP1Score.textContent = scorep1;
spanP2Score.textContent = scorep2;
let counter = 0;
let x = "X"; // even (first player)
let o = "O"; // odd (second player)

let gameOver = false;
let compInput = []

//choosing between playing 2 human players or versus computer
humanPlayers.addEventListener("click", startGameHuman);
withComp.addEventListener("click", startGameComp);

gamestartAlert.style.display = "block";
introText.style.display = "block";

// to start the game again
startAgain.addEventListener("click", restartGame);

function restartGame() {
    gamestartAlert.style.display = "none";
    winningAlertText.style.display = "none";
    introText.style.display = "none";
    for (let each of block) {
        each.innerHTML = "";
    }
    counter = 0;
    gameOver = false;
    compInput.length = 0;

};

// to reset the whole game 
reset.addEventListener("click", resetGame);

function resetGame() {
    location.reload();
}


// when the game have 2 players
function startGameHuman() {

    gamestartAlert.style.display = "block";
    gamestartAlertText.style.display = "block";
    introText.style.display = "none";
    buttons.style.display = "none";
    scoreboard.style.display = "block";


    setTimeout(function () {
        gamestartAlert.style.display = "none";
        gamestartAlertText.style.display = "none";
    }, 1000);

    // initiating the game
    for (let i = 0; i < block.length; i++) {
        eachblock = block[i];

        // add event listeners
        if (counter >= 0 || counter <= 8) {
            eachblock.addEventListener("click", function () {

                let a = document.createElement("a");

                // if statements to see if the block is empty or not
                if (block[i].textContent === "" && gameOver === false) {
                    if (isEven(counter)) {
                        a.textContent = x;
                        block[i].appendChild(a);
                    } else {
                        a.textContent = o;
                        block[i].appendChild(a);
                        a.style.color = "burlywood";
                    }
                    counter++; // add one to the counter
                    currentState(); // check the current game state
                };

            });
        };

    };
};



// when the game playing with computer
function startGameComp() {

    gamestartAlert.style.display = "block";
    gamestartAlertText.style.display = "block";
    introText.style.display = "none";
    buttons.style.display = "none";
    scoreboard.style.display = "block";


    setTimeout(function () {
        gamestartAlert.style.display = "none";
        gamestartAlertText.style.display = "none";
    }, 1000);

    // initiating the game
    for (let i = 0; i < block.length; i++) {
        eachblock = block[i];

        // add event listeners
        if (counter >= 0 || counter <= 8) {
            eachblock.addEventListener("click", function () {
                compInput.push(i);

                let iRandom = randomNum(compInput);

                let a = document.createElement("a");
                let aComp = document.createElement("a");
                // if statements to see if the block is empty or not
                if (block[i].textContent === "" && gameOver === false) {

                    console.log("my number", i);
                    console.log(compInput);
                    a.textContent = x;
                    block[i].appendChild(a);
                    counter++; // add one to the counter
                    currentState();

                    if (gameOver === false) {

                        console.log('compInput: ', compInput)
                        console.log('irandom: ', iRandom)
                        setTimeout(function () {

                            aComp.textContent = o;
                            block[iRandom].appendChild(aComp);
                            aComp.style.color = "burlywood";
                            counter++;
                            currentState();
                        }, 300);
                        compInput.push(iRandom)
                    };
                };

            });
        };

    };
};

function defaultLayout(){
    
}


function randomNum(array) {

    let iRandom = 4;
    console.log("irandom number", iRandom);

    let myindex = 0;

    while (array.indexOf(iRandom) !== -1) {
        iRandom = Math.floor((Math.random() * 9));
        myindex++;
        if (myindex > 100) {
            break;
        }
    }
    return iRandom;
};


// true or false if "n" is even
function isEven(n) {
    return n % 2 == 0;
};

// function to check the current game state
function currentState() {

    let arrayX = [];
    let arrayO = [];

    console.log(arrayX, arrayO)
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
            winningAlertText.style.transform = "translate(-25%, -50%)";
        }, 200);
    }
};

function winningText(itext) {
    winningAlertText.textContent = itext;
    gamestartAlert.style.display = "block";
    winningAlertText.style.display = "block";
}