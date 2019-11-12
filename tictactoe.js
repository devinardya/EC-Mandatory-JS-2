const block = document.querySelectorAll(".block");
const startAgain = document.querySelector("#startAgain");
let counter = 0;
let x = "X"; // even (first player)
let o = "O"; // odd (second player)

let gameOver = false;



// to start the game again
startAgain.addEventListener("click", function(){
    for (let each of block){
        each.innerHTML="";
    }
    counter = 0;
    gameOver = false;
});

// initiating the game
for (let i = 0; i < block.length; i++){
    eachblock = block[i];

    // add event listeners
    if (counter >= 0 || counter <= 8 ){
        eachblock.addEventListener("click", function(){

            let a = document.createElement("a");
            console.log(counter);
            // if statements to see if the block is empty or not

            if (block[i].textContent === "" && gameOver == false){
                if (isEven(counter)){
                    a.textContent = x;
                    block[i].appendChild(a);
                } else {
                    a.textContent = o;
                    block[i].appendChild(a);
                }
                counter++;          // add one to the counter
                currentState();     // check the current game state
            }
            
        });
    }
    
};

// true or false if "n" is even
function isEven(n) {
    return n % 2 == 0;
 };

// function to check the current game state
function currentState(){

    let arrayX = [];
    let arrayO = [];

    for (let j = 0; j < block.length; j++){
        let input = block[j].textContent;
        if (input === x){
            arrayX.push(block[j].id);
        } else if (input === o){
            arrayO.push(block[j].id);
        }    
    }
    console.log("arrx: " + arrayX);
    console.log("arr0: " + arrayO);

    checkWinner(arrayX, arrayO)
};

function checkWinner(input1, input2){

    let arrX = input1;
    let arrO = input2;

    // all the winning combinations
    let winningComb = ["123", "456", "789", "147", "369", "357", "159", "258"];
    
    for (let k = 0; k < winningComb.length; k++){
        let numArr = winningComb[k].split("");

        // console.log(numArr);
        let num1 = numArr[0];   // first winning number
        let num2 = numArr[1];   // second winning number
        let num3 = numArr[2];   // third winning number
         
        //console.log(arrX.indexOf(num1));

        // check if x is winner
        if (arrX.indexOf(num1) !== -1 && arrX.indexOf(num2) !== -1 && arrX.indexOf(num3) !== -1 ){
            console.log("WINNNER CHICKEN DINNER!!")
            gameOver = true;
        }

        if (arrO.indexOf(num1) !== -1 && arrO.indexOf(num2) !== -1 && arrO.indexOf(num3) !== -1 ){
            console.log("O IS THE BEST!!!!!")
            gameOver = true;
        }

    }

};

