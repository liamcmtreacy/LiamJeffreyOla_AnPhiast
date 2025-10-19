const canvas = document.getElementById("LT_CANV");
const context = canvas.getContext("2d");

// CONSTANTS
const scale = 2;
const width = 16;
const height = 18;

// Player
let playerX = 200;
let playerY = 200;

// Dialogue
let mission2display = true;
setTimeout(() => {
    mission2display = false;
    console.log("Dialogue disappeared after 5 seconds");
}, 5000);

// Speed / direction
let speed = 2;
let DpadSpeed = 9;
let currentDirection = 0;

// Choices
let selectedChoice = 0;
let choice1 = "Good";
let choice2 = "Neutral";
let choice3 = "Evil";

// Username & score
let username = localStorage.getItem('username');
let score = localStorage.getItem('score');
let scoreCount = score ? score : 0;

// AUDIO
let newSound02 = new Audio("ASSETS/audio/AcGuitar.mp3");
setInterval(playSound, 1200);
function playSound() {
    console.log("MUSIC LOOP");
    newSound02.play();
    newSound02.loop = true;
}

// Volume slider
const volumeSlider = document.getElementById("volumeSlider");
const volumeValue = document.getElementById("volumeValue");
newSound02.volume = volumeSlider.value / 100;
volumeSlider.addEventListener("input", () => {
    const volume = volumeSlider.value / 100;
    newSound02.volume = volume;
    volumeValue.textContent = volumeSlider.value;
});

// GamerInput
function GamerInput(input) { this.action = input; }
let gamerInput = new GamerInput("None");
function input(event) {
    if (event.type === "keydown") {
        switch (event.keyCode) {
            case 37: gamerInput = new GamerInput("Left"); break;
            case 38: gamerInput = new GamerInput("Up"); break;
            case 39: gamerInput = new GamerInput("Right"); break;
            case 40: gamerInput = new GamerInput("Down"); break;
            case 83: speed = 4; break;
            default: gamerInput = new GamerInput("None");
        }
    } else {
        gamerInput = new GamerInput("None");
        speed = 2;
    }
}

// Update
function update() {

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
    collisionCheck();
}

// Collision
function collisionCheck() {
    if (playerX < 0) playerX = 0;
    if (playerY < 0) playerY = 0;
    if (playerX + 100 > canvas.width) playerX = canvas.width - 100;
    if (playerY + 100 > canvas.height) playerY = canvas.height - 100;
}

// Background image
let BACKGROUND = new Image();
BACKGROUND.src = "ASSETS/imgs/BGlevel1.png";

// DRAW
function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(BACKGROUND, 0, 0, canvas.width, canvas.height);

    // Dialogue
    if (mission2display) {
        context.fillStyle = "black";
        context.fillRect(50, canvas.height - 120, canvas.width - 100, 80);
        context.fillStyle = "white";
        context.font = "20px sans-serif";
        context.fillText("An Phiast, I'm so glad you could make it, welcome to my party", 70, canvas.height - 80);
    }

    // Draw score
    writeScore();

    // Draw walking player animation
    animate();
}

// Score
function writeScore() { //ADDING A RANKING SYSTEM TO ENCOURAGE REPLAYABILITY
let rankScoreE = "E"; //E RANK
let rankScoreD = "D"; // D RANK
let rankScoreC = "C"; // C RANK (AVERAGE)
let rankScoreB = "B"; //B
let rankScoreA = "A"; //A
let rankScoreS = "S"; // S ONLY THE BEST PLAYERS WILL ACHIEVE THIS

let scoreString = "SCORE: " + scoreCount; 
context.font = '21px sans-serif'; 
context.fillStyle = "white"; 
context.fillText(scoreString, 600, 50); 
console.log("score is being counted");

if (scoreCount <= 10) { // SIMPLE RANK SYSTEM FROM MY OLD CODEBERG PROJECT ALSO FIRST YR C++
    let rankString = "Rank: " + rankScoreE; 
    context.fillStyle = "yellow"; 
    context.font = '21px sans-serif'; 
    context.fillText(rankString, 600, 25); 
    console.log("RANKING BEING DONE"); 
} else if (scoreCount >= 1 && scoreCount <= 100) { 
    let rankString = "Rank: " + rankScoreD; 
    context.font = '21px sans-serif'; 
    context.fillStyle = "yellow"; 
    context.fillText(rankString, 600, 25); 
    console.log("RANKING BEING DONE"); 
} else if (scoreCount >= 101 && scoreCount <= 199) {
    let rankString = "Rank: " + rankScoreC; 
    context.font = '21px sans-serif'; 
    context.fillStyle = "yellow"; 
    context.fillText(rankString, 600, 25); 
    console.log("RANKING BEING DONE"); 
} else if (scoreCount >= 200 && scoreCount <= 299) {
    let rankString = "Rank: " + rankScoreB; 
    context.font = '21px sans-serif'; 
    context.fillStyle = "yellow"; 
    context.fillText(rankString, 600, 25); 
    console.log("RANKING BEING DONE"); 
} else if (scoreCount >= 300 && scoreCount <= 399) {
    let rankString = "Rank: " + rankScoreA; 
    context.font = '21px sans-serif'; 
    context.fillStyle = "yellow"; 
    context.fillText(rankString, 600, 25); 
    console.log("RANKING BEING DONE"); 
} else if (scoreCount > 400) {
    let rankString = "Rank: " + rankScoreS; 
    context.font = '21px sans-serif'; 
    context.fillStyle = "yellow"; 
    context.fillText(rankString, 600, 25); 
    console.log("RANKING BEING DONE"); 
}

}

// WALKING ANIMATION FROM CODE 2
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
let aChar = new GameObject(playerChar, canvas.width / 2, canvas.height / 2, 737, 1037);

const scaleChar = 0.1;
const widthChar = 737;
const heightChar = 1037;
const scaledWidth = scaleChar * widthChar;
const scaledHeight = scaleChar * heightChar;
const walkLoop = [0, 1, 2, 3];
const frameLimit = 50;

let currentLoopIndex = 0;
let frameCount = 0;

function drawFrame(image, frameX, frameY, canvasX, canvasY) {
    context.drawImage(
        image,
        frameX * widthChar,
        frameY * heightChar,
        widthChar,
        heightChar,
        canvasX,
        canvasY,
        scaledWidth,
        scaledHeight
    );
}

function animate() {
    if (gamerInput.action != "None") {
        frameCount++;
        if (frameCount >= frameLimit) {
            frameCount = 0;
            currentLoopIndex++;
            if (currentLoopIndex >= walkLoop.length) currentLoopIndex = 0;
        }
    } else {
        currentLoopIndex = 0;
    }
    drawFrame(aChar.spritesheet, walkLoop[currentLoopIndex], currentDirection, aChar.x, aChar.y);
}

// Game loop
function gameloop() {
    update();
    draw();
    window.requestAnimationFrame(gameloop);
}

// Event listeners
window.addEventListener('keydown', input);
window.addEventListener('keyup', input);

// Start
window.requestAnimationFrame(gameloop);
