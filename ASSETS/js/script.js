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


// replaced with one player value declared near bottom for player animation (wip)
// let playerX = 200;
// let playerY = 200;


//choice boxes, gonna change to text boxes, but for our demo it will be very simple.

let speed = 2;
let DpadSpeed = 9;
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

let newSound1 = new Audio("ASSETS/audio/cinematic.mp3");

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
            aChar.x -= speed;
            console.log("Player Moveed Left");
            currentDirection = 2;//DIRECTOION
        }
    if (gamerInput.action === "Right") 
        {
            aChar.x += speed;
            console.log("Player Moveed Right");
            currentDirection = 3;//DIRECTION
        }
    if (gamerInput.action === "Up")    
        {
            aChar.y -= speed;
            console.log("Player Went Up");
            currentDirection = 1; // DIRECTION
        }
    if (gamerInput.action === "Down")  
    {
        aChar.y += speed;
        console.log("Player Went Down");
        currentDirection = 0;//DIRECTION
    }

     if (gamerInput.action !== "None") { // TESTING PURPOSES, WHILE THE PLAYER NOVES, POINTS GO UP 
        scoreCount += 1;
    }
    choiceManager();
    collisionCheck();
}

function collisionCheck() {
       // MAKE PLAYER STAY IN CANVAS
    if (aChar.x < 0) aChar.x = 0;
    if (aChar.y < 0) aChar.y = 0;
    if (aChar.x + 100 > canvas.width) aChar.x = canvas.width - 100;
    if (aChar.y + 100 > canvas.height) aChar.y = canvas.height - 100;
}


// DRAWING IMAGES
  function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height); // Clear first

    // Draw green square
    //context.fillStyle = "green";
    //context.fillRect(aChar.x, aChar.y, 100, 100);

    context.fillStyle = "red";
    context.fillRect(60, 140, 100, 100);

  context.fillStyle = "white";
  context.font = "12px sans-serif";
  context.fillText("Phiast Plantation", 60, 180);

    context.fillStyle = "black";
    context.fillRect(400, 400, choice1width, choice1height);

      context.fillStyle = "white";
  context.font = "16px sans-serif";
  context.fillText("Dan's Party", 400, 450);

    context.fillStyle = "blue";
    context.fillRect(550, 80, choice1width, choice1height);

      context.fillStyle = "white";
  context.font = "16px sans-serif";
  context.fillText("The Papers", 550, 120);

    animate();
}

    function choiceManager() { // used logic from old codeberg projects, also some assistance from StackOverflow as I had to make changes.
              if (choice1Xpos < aChar.x + 100 && //collision from left to right
            choice1Xpos + choiWidth > aChar.x && // collision from right to left
            choice1Ypos < aChar.y + 100  && // collision from top to bottom
            choice1Ypos + choiHieght > aChar.y// collision from bottom to top
            ){
            window.location.href = "level1.html" // TAKES US TO THE BAD ENDING
            console.log("TEST FINISHED, EVIL ENDING LOAD");
        }

              if (choice2Xpos < aChar.x + 100  && //collision from left to right
            choice2Xpos + choiWidth > aChar.x && // collision from right to left
            choice2Ypos < aChar.y + 100  && // collision from top to bottom
            choice2Ypos + choiHieght > aChar.y // collision from bottom to top
            ){
            window.location.href = "level2.html" // TAKES US TO THE BAD ENDING
            console.log("TEST FINISHED, NICE ENDING LOAD");
        }

          if (choice3Xpos < aChar.x + 100  && //collision from left to right
            choice3Xpos + choiWidth > aChar.x && // collision from right to left
            choice3Ypos < aChar.y + 100 && // collision from top to bottom
            choice3Ypos + choiHieght > aChar.y // collision from bottom to top
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
    aChar.y -= DpadSpeed
    collisionCheck();
    console.log("MOVE UP, ENEMY INVERSED");
    currentDirection = 1; // DIRECTION
}
function clickDpadBlue(){
    console.log("dpad blue pressed");
    console.log("Move Left");
    aChar.x -= DpadSpeed
    collisionCheck();
    console.log("MOVE LEFT");
    currentDirection = 2;//DIRECTOION
}
function clickDpadRed(){
    console.log("dpad red pressed");
    console.log("Move Right");
    aChar.x += DpadSpeed
    console.log("MOVE RIGHT");
    collisionCheck();
    currentDirection = 3;//DIRECTION
}
function clickDpadGreen(){
    console.log("dpad green pressed");
    console.log("Move Down");
    aChar.y += DpadSpeed
    collisionCheck();
    currentDirection = 0; // DIRECTION
    }


function gameloop() {
    update();
    draw();
    window.requestAnimationFrame(gameloop); // GAME LOOP
}


function GameObject(spritesheet, x, y, width, height) {
    this.spritesheet = spritesheet;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.currentDirection = "None";
}

let playerChar = new Image();
playerChar.src = "ASSETS/imgs/anPhiastSpritesheet1.png";
let aChar = new GameObject(playerChar, canvas.width/2, canvas.height/2, 750, 1037);

const scaleChar = 0.1;
const widthChar = 750;
const heightChar = 1037;
const scaledWidth = scaleChar * widthChar;
const scaledHeight = scaleChar * heightChar;
const walkLoop = [0, 1, 2, 3];
const frameLimit = 50;

let currentLoopIndex = 0;
let frameCount = 0;

function drawFrame(image, frameX, frameY, canvasX, canvasY) {
    context.drawImage(image,
                  frameX * widthChar, frameY * heightChar, widthChar, heightChar,
                  canvasX, canvasY, scaledWidth, scaledHeight);
}

function animate() {
    if (gamerInput.action != "None"){
        frameCount++;
        if (frameCount >= frameLimit) {
            frameCount = 0;
            currentLoopIndex++;
            if (currentLoopIndex >= walkLoop.length) {
                currentLoopIndex = 0;
            }
        }      
    }
    else{
        currentLoopIndex = 0;
    }
    drawFrame(aChar.spritesheet, walkLoop[currentLoopIndex], currentDirection, aChar.x, aChar.y);
}

function step() {

      frameCount++;
      if (frameCount < 15) {
        window.requestAnimationFrame(step);
        return;
      }
      frameCount = 0;
      context.clearRect(0, 0, canvas.width, canvas.height);
      
      drawFrame(walkLoop[currentLoopIndex], currentDirection, 0, 0);
      currentLoopIndex++;
      if (currentLoopIndex >= walkLoop.length) {
        currentLoopIndex = 0;
        console.log("changing direction to dir: " + currentDirection);
        currentDirection++;
      }
      if (currentDirection >= 4) {
        currentDirection = 0;
      }
      window.requestAnimationFrame(step);
    }

// Handle Active Browser Tag Animation
window.requestAnimationFrame(gameloop);

// https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame

window.addEventListener('keydown', input);
// disable the second event listener if you want continuous movement
window.addEventListener('keyup', input);