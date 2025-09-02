//Initialize the essential arrays and variables.
let gameSeq = [];
let userSeq = [];
let Colors = ['red', 'yellow', 'green', 'purple'] 
let level = 0;
let started = false;
let highestScore = 0;
let h2 = document.querySelector("h2");

//Add event listener on the whole document for starting the game.
let h3 = document.querySelector("h3");
document.addEventListener("keypress", function(){
    if(started == false){
        console.log("Game started!");
        started = true;
        
        levelUp();
        h2.innerHTML = "";
    }
})

//Function for flash the buttons when randon button is choosen by machine using random()
function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash")
    }, 200);
}

//Function for flash the button when user pressed it
function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash")
    }, 200);
}

//Function for update the level
function levelUp(){
    userSeq = [];

    level++;
    h3.innerText = `Level ${level}.`; 
    
    let randIdx = Math.floor(Math.random() * 4);
    let randCol = Colors[randIdx];
    let randBtn = document.querySelector(`.${randCol}`);

    gameSeq.push(randCol);

    gameFlash(randBtn);
}

//Function for checking the answer(sequence matching)
function checkAns(idx){
    if(gameSeq[idx] == userSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp, 500);
        }
    } 
    else{
        h3.innerHTML = `Your score is <b>${level}</b> <br> Press any key to start again.`
        
        highestScore = Math.max(highestScore, level);
        h2.innerHTML = `Highest Score: ${highestScore}!`;
        
        let body = document.querySelector("body");
        body.style.backgroundColor = "red";
        setTimeout(function(){
            body.style.backgroundColor = "white";
        }, 200)
        
        reset();
    }
}

//Function for press the new buttons by user.
function btnPress(){
    let btn = this;
    userFlash(btn);

    let userBtnCol = btn.getAttribute("id");
    userSeq.push(userBtnCol);

    let idx = userSeq.length-1;
    checkAns(idx);
}

//Add event listener for every button whenever "click" event is occuring.
let btns = document.querySelectorAll(".btn");
for(let btn of btns){
    btn.addEventListener("click", btnPress);
}

//Function for reset all the things when game is over!
function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
