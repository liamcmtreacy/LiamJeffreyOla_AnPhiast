const canvas = document.getElementById("LT_CANV");
const context = canvas.getContext("2d");

// CONSTANTS
const scale = 2;
const width = 16;
const height = 18;

// PLAYER
let playerX = 200;
let playerY = 200;

// CUTSCENE SYSTEM
let inCutscene = false;
let cutsceneStep = 0;
let fadeAlpha = 0;
let fadingOut = false;

// DIALOGUE (for cutscene)
let mission2display = false;

// SPEED / DIRECTION USELSS IN LEVEL 2
let speed = 2;
let DpadSpeed = 9;
let currentDirection = 0;

let username = localStorage.getItem("username");
let score = localStorage.getItem("score");
let scoreCount = score ? score : 0;

// AUDIO
let newSound02 = new Audio("ASSETS/audio/AcGuitar.mp3");
setInterval(playSound, 1200);
function playSound() {
  newSound02.play();
  newSound02.loop = true;
}

// VOLUME SLIDER
const volumeSlider = document.getElementById("volumeSlider");
const volumeValue = document.getElementById("volumeValue");
newSound02.volume = volumeSlider.value / 100;
volumeSlider.addEventListener("input", () => {
  const volume = volumeSlider.value / 100;
  newSound02.volume = volume;
  volumeValue.textContent = volumeSlider.value;
});

// INPUT SYSTEM
function GamerInput(input) {
  this.action = input;
}
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

//cutscene system, similar to fade out, got AI help, only here and fade out was AI used in this project
function startCutscene() {
  inCutscene = true;
  cutsceneStep = 0;
  fadeAlpha = 0;
  fadingOut = false;
  playCutscene();
}

function playCutscene() {
  if (cutsceneStep === 0) {
    //show the dialouge
    mission2display = true;
    setTimeout(() => {
      mission2display = false;
      cutsceneStep++;
      playCutscene();
    }, 4000);
  } else if (cutsceneStep === 1) {
    // fade out boolean
    fadingOut = true;
  }
}

// UPDATE
function update() {
  if (inCutscene) {
    if (fadingOut) fadeOut();
    return; // stop movement during cutscene
  }
// movement is actually useless in level 2, due to it being a cutscene to show how we would do them
  if (gamerInput.action === "Left") {
    aChar.x -= speed;
    currentDirection = 2;
  }
  if (gamerInput.action === "Right") {
    aChar.x += speed;
    currentDirection = 3;
  }
  if (gamerInput.action === "Up") {
    aChar.y -= speed;
    currentDirection = 1;
  }
  if (gamerInput.action === "Down") {
    aChar.y += speed;
    currentDirection = 0;
  }

  if (gamerInput.action !== "None") {
    scoreCount += 1;
  }

  collisionCheck();
}

// COLLISION (again useless)
function collisionCheck() {
  if (playerX < 0) playerX = 0;
  if (playerY < 0) playerY = 0;
  if (playerX + 100 > canvas.width) playerX = canvas.width - 100;
  if (playerY + 100 > canvas.height) playerY = canvas.height - 100;
}

// BACKGROUND
let BACKGROUND = new Image();
BACKGROUND.src = "ASSETS/imgs/partyBackground.png";

// DRAW
function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(BACKGROUND, 0, 0, canvas.width, canvas.height);

  // Dialogue box (for cutscene)
  if (mission2display) {
    context.fillStyle = "black";
    context.fillRect(50, canvas.height - 120, canvas.width - 100, 80);
    context.fillStyle = "white";
    context.font = "20px sans-serif";
    context.fillText(
      "An Phiast, please leave my party, I do not want you here",
      70,
      canvas.height - 80
    );
  }

  writeScore();
  animate();

  // Fade overlay
  if (fadeAlpha > 0) {
    context.fillStyle = `rgba(0, 0, 0, ${fadeAlpha})`;
    context.fillRect(0, 0, canvas.width, canvas.height);
  }
}

// FADE OUT EFFECT help from stackoverflow and also some CHATGPT to confirm if what I was doing was correct
function fadeOut() {
  fadeAlpha += 0.02;
  if (fadeAlpha >= 1) {
    fadeAlpha = 1;
    fadingOut = false;
    setTimeout(() => {
      window.location.href = "gameplay.html";
    }, 1000);
  }
}

// SCORE & RANKING
function writeScore() {
  let rank;
  if (scoreCount <= 10) rank = "E";
  else if (scoreCount <= 100) rank = "D";
  else if (scoreCount <= 199) rank = "C";
  else if (scoreCount <= 299) rank = "B";
  else if (scoreCount <= 399) rank = "A";
  else rank = "S";

  context.font = "21px sans-serif";
  context.fillStyle = "white";
  context.fillText("SCORE: " + scoreCount, 600, 50);
  context.fillStyle = "yellow";
  context.fillText("Rank: " + rank, 600, 25);
}

// WALKING ANIMATION
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

// GAME LOOP
function gameloop() {
  update();
  draw();
  window.requestAnimationFrame(gameloop);
}

// EVENT LISTENERS
window.addEventListener("keydown", input);
window.addEventListener("keyup", input);

// START
window.requestAnimationFrame(gameloop);

// --- TEST: AUTO START CUTSCENE ---
window.onload = () => startCutscene();
