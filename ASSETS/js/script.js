const canvas = document.getElementById("LT_CANV") // CANVAS COMING IN
const context = canvas.getContext("2d");
// CONSTANTS
const scale = 2;
const width = 16;
const height = 18;
//choice boxes, gonna change to text boxes, but for our demo it will be very simple.
const choice1height = 100;
const choice1width = 100;

const choice2height = 100;
const choice2width = 100;

const choice3height = 100;
const choice3width = 100;

const choice1Xpos = 60;
const choice1Ypos = 140;

const choice2Xpos = 400;
const choice2Ypos = 400;

const choice3Xpos = 550;
const choice3Ypos = 80;

let choiWidth = 100;
let choiHieght = 100;

let playerX = 200;
let playerY = 200;


//choice boxes, gonna change to text boxes, but for our demo it will be very simple.

let speed = 2;
let currentDirection = 0;

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

//AUDIO Declaring

let newSound1 = new Audio("assets/audio/cinematic.mp3");

    // audioplayer
    setInterval(playSound, 1200); //gap between audio playing
    
    function playSound(){ // function
    console.log ("MUSIC LOOP"); // message to the console

    newSound1.play(); // BACKGROUND MUSIC
    newSound1.loop = true;
    }

// volumeADJUSTMENT

const volumeSlider = document.getElementById("volumeSlider");
const volumeValue = document.getElementById("volumeValue");
newSound1.volume = volumeSlider.value/100;

// VOLUME ADJUSTER, I GOT HELP FROM MY FRIEND JEFFREY, FROM WHAT I UNDERSTAND IT TAKES AN INPUT AND CAN BE REDUCED AS THE SLIDER
//GOES DOWN
volumeSlider.addEventListener("input", () => {
const volume = volumeSlider.value / 100;

newSound1.volume = volume;
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
    // laughably simple movement attempt
    if (gamerInput.action === "Left")  
        {
            playerX -= speed;
            console.log("Player Moveed Left");
        }
    if (gamerInput.action === "Right") 
        {
            playerX += speed;
            console.log("Player Moveed Right");
        }
    if (gamerInput.action === "Up")    
        {
            playerY -= speed;
            console.log("Player Went Up");
        }
    if (gamerInput.action === "Down")  
    {
        playerY += speed;
        console.log("Player Went Down");
    }

     if (gamerInput.action !== "None") { // TESTING PURPOSES, WHILE THE PLAYER NOVES, POINTS GO UP 
        scoreCount += 1;
    }
    choiceManager();
}

// DRAWING IMAGES
  function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height); // Clear first

    // Draw green square
    context.fillStyle = "green";
    context.fillRect(playerX, playerY, 100, 100);

    // choice boxes
    context.fillStyle = "red";
    context.fillRect(60, 140, choice1width, choice1height);

    context.fillStyle = "yellow";
    context.fillRect(400, 400, choice1width, choice1height);

    context.fillStyle = "blue";
    context.fillRect(550, 80, choice1width, choice1height);
    
    // trying to do a path choice thing,
/*
  if (selectedChoice === choice1) ctx.fillStyle = "yellow"; else ctx.fillStyle = "white";
  ctx.fillText(choice1, 150, 140);

  if (selectedChoice === choice2) ctx.fillStyle = "yellow"; else ctx.fillStyle = "white";
  ctx.fillText(choice2, 150, 170);

  if (selectedChoice === choice3) ctx.fillStyle = "yellow"; else ctx.fillStyle = "white";
  ctx.fillText(choice3, 150, 200); // won't work until more code written, may not even work all together. */
}

    function choiceManager() { // used logic from old codeberg projects, also some assistance from StackOverflow as I had to make changes.
              if (choice1Xpos < playerX + 100 && //collision from left to right
            choice1Xpos + choiWidth > playerX && // collision from right to left
            choice1Ypos < playerY + 100  && // collision from top to bottom
            choice1Ypos + choiHieght > playerY// collision from bottom to top
            ){
            window.location.href = "level1.html" // TAKES US TO THE BAD ENDING
            console.log("TEST FINISHED, EVIL ENDING LOAD");
        }

              if (choice2Xpos < playerX + 100  && //collision from left to right
            choice2Xpos + choiWidth > playerX && // collision from right to left
            choice2Ypos < playerY + 100  && // collision from top to bottom
            choice2Ypos + choiHieght > playerY // collision from bottom to top
            ){
            window.location.href = "level2.html" // TAKES US TO THE BAD ENDING
            console.log("TEST FINISHED, NICE ENDING LOAD");
        }

          if (choice3Xpos < playerX + 100  && //collision from left to right
            choice3Xpos + choiWidth > playerX && // collision from right to left
            choice3Ypos < playerY + 100 && // collision from top to bottom
            choice3Ypos + choiHieght > playerY // collision from bottom to top
            ){
            window.location.href = "level3.html" // TAKES US TO THE BAD ENDING
            console.log("TEST FINISHED, NEUTRAL ENDING LOAD");
        }
    }     

    function clickableDpadReleased() {
    console.log("dpad released"); // REPORT TO THE CONSOLE
}
function clickDpadYellow(){ // ORIGINALLY YELLOW BUT NOW ALL BUTTONS ARE BLUE
    console.log("dpad yellow pressed");
    console.log("Move Up");
    playerY -= speed
    console.log("MOVE UP, ENEMY INVERSED");
    currentDirection = 1; // DIRECTION
}
function clickDpadBlue(){
    console.log("dpad blue pressed");
    console.log("Move Left");
    playerX -= speed
    console.log("MOVE LEFT");
    currentDirection = 2;//DIRECTOION
}
function clickDpadRed(){
    console.log("dpad red pressed");
    console.log("Move Right");
    playerX += speed
    console.log("MOVE RIGHT");
    currentDirection = 3;//DIRECTION
}
function clickDpadGreen(){
    console.log("dpad green pressed");
    console.log("Move Down");
    playerY += speed
    currentDirection = 0; // DIRECTION
    }


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