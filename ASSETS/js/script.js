const canvas = document.getElementById("LT_CANV") // CANVAS COMING IN
const context = canvas.getContext("2d");
// CONSTANTS
const scale = 2;
const width = 16;
const height = 18;
const scaledWidth = scale * width;
const scaledHeight = scale * height;

let selectedChoice = 0; // This number says which option is currently highlighted (starts at 0 = "Good") // this will change though depending on your choice,
// These are the 3 choices you can pick
let choice1 = "Good";
let choice2 = "Neutral";
let choice3 = "Evil";

// LET DECLARATION METHOD
let username = localStorage.getItem('username'); // OUR USERNAME
let score = localStorage.getItem('score'); // THE SCORE

let scoreCount = 0; // SCORE INITIALISED AS ZERO
if (score){
    scoreCount = score;
} 

// volumeADJUSTMENT

const volumeSlider = document.getElementById("volumeSlider");
const volumeValue = document.getElementById("volumeValue");
newSound1.volume = volumeSlider.value/100;
newSound03.volume = volumeSlider.value/100;
newSound04.volume = volumeSlider.value/100;
newSoudn05.volume = volumeSlider.value/100;
// VOLUME ADJUSTER, I GOT HELP FROM MY FRIEND JEFFREY, FROM WHAT I UNDERSTAND IT TAKES AN INPUT AND CAN BE REDUCED AS THE SLIDER
//GOES DOWN
volumeSlider.addEventListener("input", () => {
const volume = volumeSlider.value / 100;

newSound1.volume = volume;
newSound03.volume = volume;
newSound04.volume = volume;
newSoudn05.volume = volume;
volumeValue.textContent = volumeSlider.value;
});

// The GamerInput is an Object that holds the Current
// GamerInput (Left, Right, Up, Down, MouseClicks)
function GamerInput(input) {
    this.action = input; // Hold the current input as a string
}

// Default GamerInput is set to None
let gamerInput = new GamerInput("None"); //No Input

function input(event) {
    // Take Input from the Player
    // console.log("Input");
    // console.log("Event type: " + event.type);
    //console.log("Keycode: " + event.keyCode);

    if (event.type === "keydown") {
        switch (event.keyCode) {
            case 37: // Left Arrow
                gamerInput = new GamerInput("Left");
                break; //Left key
            case 38: // Up Arrow
                gamerInput = new GamerInput("Up");
                break; //Up key
            case 39: // Right Arrow
                gamerInput = new GamerInput("Right");
                break; //Right key
            case 40: // Down Arrow
                gamerInput = new GamerInput("Down");
                break; //Down key
                
            case 83:
                speed = 4;
                break;
            default:
             gamerInput = new GamerInput("None"); //No Input
        }
    } else {
        gamerInput = new GamerInput("None");
        speed = 2;
    }
}

function update () // important function.
{

}

function writeScore(){ // WRITING THE SCORE TO THE SCREEN
    let scoreString = "score: " + scoreCount;
    context.font = '22px sans-serif';
    context.fillText(scoreString, 1000, 20)
    console.log("score is being counted")
}

function draw() { // DRAWING IMAGES

        // Green square
    context.fillStyle = "green";
    context.fillRect(200, 200, 100, 100); //currently An Phiast stand in.


    context.clearRect(0,0, canvas.width, canvas.height);
    writeScore();

    
    // trying to do a path choice thing,

  if (selectedChoice === choice1) ctx.fillStyle = "yellow"; else ctx.fillStyle = "white";
  ctx.fillText(choice1, 150, 140);

  if (selectedChoice === choice2) ctx.fillStyle = "yellow"; else ctx.fillStyle = "white";
  ctx.fillText(choice2, 150, 170);

  if (selectedChoice === choice3) ctx.fillStyle = "yellow"; else ctx.fillStyle = "white";
  ctx.fillText(choice3, 150, 200);
}

function writeScore(){ // WRITING THE SCORE TO THE SCREEN

    let rankScoreE = "E"; //E
    let rankScoreD = "D"; //D
    let rankScoreC = "C"; //C
    let rankScoreB = "B"; //B
    let rankScoreA = "A"; //A
    let rankScoreS = "S"; //S
    
    let scoreString = ("SCORE: " + scoreCount); // SCORE STRING GRABBING THE NUMBER AND SHOWING IT ON SCREEN
    context.font = '21px sans-serif'; // FONT
    context.fillText(scoreString, 930, 50); //DRAWING STRING
    console.log("score is being counted");

    if (scoreCount <= 10) { // RANKING SYSTEM IF STATEMENTS, ALL WORK BY CHECKING IF A NUMBER MATCHES CERTAIN VALUES, AND WHATEVER ONES IT DOES MATCH DRAW THE CORROSPONDING RANK
            let rankString = ("Rank: " + rankScoreE);
            context.font = '21px sans-serif';
            context.fillText(rankString, 930, 25);
            console.log("RANKING BEING DONE");
        }
        
    else if (scoreCount >= 1 && scoreCount <= 100) {
                    let rankString = ("Rank: " + rankScoreD);
                    context.font = '21px sans-serif';
                    context.fillText(rankString, 930, 25);
                    console.log("RANKING BEING DONE");
                }

    else if (scoreCount >= 101 && scoreCount <= 199){
                    let rankString = ("Rank: " + rankScoreC);
                    context.font = '21px sans-serif';
                    context.fillText(rankString, 930, 25);
                    console.log("RANKING BEING DONE");
                }

    else if (scoreCount>= 200 && scoreCount <= 299){
                    let rankString = ("Rank: " + rankScoreB);
                    context.font = '21px sans-serif';
                    context.fillText(rankString, 930, 25);
                    console.log("RANKING BEING DONE");
                }

    else if (scoreCount>= 300  && scoreCount<= 399){
                    let rankString = ("Rank: " + rankScoreA);
                    context.font = '21px sans-serif';
                    context.fillText(rankString, 930, 25);
                    console.log("RANKING BEING DONE");
                }

    else if (scoreCount > 400){
                    let rankString = ("Rank: " + rankScoreS);
                    context.font = '21px sans-serif';
                    context.fillText(rankString, 930, 25);
                    console.log("RANKING BEING DONE");
                }

         // RANKING SYSTEM, HELP FROM MY OLD C++ GAME, JUST TRIED "JAVASCRIPTIFY" MY CODE
    }//function end


function gameloop() {
    update();
    draw();
    window.requestAnimationFrame(gameloop); // GAME LOOP
}

// Handle Active Browser Tag Animation
window.requestAnimationFrame(gameloop);

// https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame

window.addEventListener('keydown', input);
// disable the second event listener if you want continuous movement
window.addEventListener('keyup', input);