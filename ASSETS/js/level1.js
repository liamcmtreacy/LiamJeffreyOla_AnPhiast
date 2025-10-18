const canvas = document.getElementById("LT_CANV");
const context = canvas.getContext("2d");

let mission1display = true;

setTimeout(() => {
  mission1display = false;
  console.log("Dialogue disappeared after 5 seconds");
}, 5000);

const startBtn = document.getElementById("startMusic");

startBtn.addEventListener("click", () => {
    newSound1stLevel.play();       // start the music
    startBtn.style.display = "none"; // hide the button after clicking
});

let scoreCount = 0;

let newSound1stLevel = new Audio("ASSETS/audio/chillSmooth.mp3");
newSound1stLevel.loop = true;
newSound1stLevel.play();

const volumeSlider = document.getElementById("volumeSlider");
const volumeValue = document.getElementById("volumeValue");
newSound1stLevel.volume = volumeSlider.value / 100;

volumeSlider.addEventListener("input", () => {
  const volume = volumeSlider.value / 100;
  newSound1stLevel.volume = volume;
  volumeValue.textContent = volumeSlider.value;
});

let BACKGROUND = new Image();
BACKGROUND.src = "ASSETS/imgs/BGlevel1.png";

let thinking = new Image();
thinking.src = "ASSETS/imgs/thinking.png";

let imagesLoaded = 0;

BACKGROUND.onload = () => { imagesLoaded++; checkAllLoaded(); };
thinking.onload = () => { imagesLoaded++; checkAllLoaded(); };

function checkAllLoaded() {
  if (imagesLoaded === 2) {
    console.log("All images loaded — starting gameloop");
    window.requestAnimationFrame(gameloop);
  }
}

function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  context.drawImage(BACKGROUND, 0, 0, canvas.width, canvas.height);
  context.drawImage(thinking, 10, 10, 200, 200);

  if (mission1display) {
    context.fillStyle = "black";
    context.fillRect(50, canvas.height - 120, canvas.width - 100, 80);

    context.fillStyle = "white";
    context.font = "20px sans-serif";
    context.fillText("An Phiast, help I need my ball!", 70, canvas.height - 80);
  }

  writeScore();
}

function writeScore() {
  context.font = '21px sans-serif';
  context.fillStyle = "white";
  context.fillText("SCORE: " + scoreCount, 600, 50);
}

function update() {
  // No movement needed
}

function gameloop() {
  update();
  draw();
  window.requestAnimationFrame(gameloop);
}
