const canvas = document.getElementById("LT_CANV");
const context = canvas.getContext("2d");

let mission1display = true;

// Hide dialogue after 5 seconds
setTimeout(() => {
  mission1display = false;
  console.log("Dialogue disappeared after 5 seconds");
}, 5000);

//music
const startBtn = document.getElementById("startMusic");
let newSound1stLevel = new Audio("ASSETS/audio/chillSmooth.mp3");
newSound1stLevel.loop = true;
newSound1stLevel.play();

startBtn.addEventListener("click", () => {
  newSound1stLevel.play();
  startBtn.style.display = "none";
});
//slider from previous codeberg project
const volumeSlider = document.getElementById("volumeSlider");
const volumeValue = document.getElementById("volumeValue");
newSound1stLevel.volume = volumeSlider.value / 100;

volumeSlider.addEventListener("input", () => {
  const volume = volumeSlider.value / 100;
  newSound1stLevel.volume = volume;
  volumeValue.textContent = volumeSlider.value;
});

let scoreCount = 0;

//imgs
let BACKGROUND = new Image();
BACKGROUND.src = "ASSETS/imgs/BGlevel1.png";

let thinking = new Image();
thinking.src = "ASSETS/imgs/thinking.png";

//boxes, pain to code
let box1 = {
  x: 300,
  y: 300,
  width: 150,
  height: 60,
  color: "green",
  text: "Good Path",
  visible: true,
  onClick: () => {
    console.log("You clicked the Good Path!");
    scoreCount += 10;
    window.location.href = "goodEnding.html";
  }
};

//box2
let box2 = {
  x: 500,
  y: 300,
  width: 150,
  height: 60,
  color: "gray",
  text: "Normal Path",
  visible: true,
  onClick: () => {
    console.log("You clicked the Normal Path!");
    scoreCount += 5;
    window.location.href = "normalEnding.html";
  }
};

let box3 = { // what i did was code in once, and then repeat and change values
  x: 700,
  y: 300,
  width: 150,
  height: 60,
  color: "red",
  text: "Dark Path",
  visible: true,
  onClick: () => {
    console.log("You clicked the Dark Path!");
    scoreCount += 5;
    window.location.href = "Evilending.html";
  }
};

//clicking, help in README
canvas.addEventListener("click", (event) => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  if (box1.visible &&
      mouseX >= box1.x && mouseX <= box1.x + box1.width &&
      mouseY >= box1.y && mouseY <= box1.y + box1.height) {
    box1.onClick();
    box1.visible = false; // goes away after someone clicks
  }

  if (box2.visible &&
      mouseX >= box2.x && mouseX <= box2.x + box2.width &&
      mouseY >= box2.y && mouseY <= box2.y + box2.height) {
    box2.onClick();
    box2.visible = false; // goes away after someone clicks
  }

if (box3.visible &&
      mouseX >= box3.x && mouseX <= box3.x + box3.width &&
      mouseY >= box3.y && mouseY <= box3.y + box3.height) {
    box3.onClick();
    box3.visible = false; // goes away after someone clicks
  };
});

function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Background
  context.drawImage(BACKGROUND, 0, 0, canvas.width, canvas.height);

  // Thinking image
  context.drawImage(thinking, 10, 10, 200, 200);

  // Draw boxes, for choices
  if (box1.visible) {
    context.fillStyle = box1.color;
    context.fillRect(box1.x, box1.y, box1.width, box1.height);
    context.fillStyle = "white";
    context.font = "22px sans-serif";
    context.fillText(box1.text, box1.x + 20, box1.y + 38);
  }

  if (box2.visible) {
    context.fillStyle = box2.color;
    context.fillRect(box2.x, box2.y, box2.width, box2.height);
    context.fillStyle = "white";
    context.font = "22px sans-serif";
    context.fillText(box2.text, box2.x + 20, box2.y + 38);
  }

   if (box3.visible) {
    context.fillStyle = box3.color;
    context.fillRect(box3.x, box3.y, box3.width, box3.height);
    context.fillStyle = "white";
    context.font = "22px sans-serif";
    context.fillText(box3.text, box3.x + 20, box3.y + 38);
  }

  // Dialogue box, displaying the pop up text
  if (mission1display) {
    context.fillStyle = "black";
    context.fillRect(50, canvas.height - 120, canvas.width - 100, 80);
    context.fillStyle = "white";
    context.font = "20px sans-serif";
    context.fillText("An Phiast, help I need my ball!", 70, canvas.height - 80);
  }

  // Score
  writeScore();
}

//showing the score
function writeScore() {
  context.font = "21px sans-serif";
  context.fillStyle = "white";
  context.fillText("SCORE: " + scoreCount, 600, 50);
}

//UPDATE (not being used in LEVEL 1)
function update()
{
    // Lots of code here
}

//
function gameloop() {
  update();
  draw();
  window.requestAnimationFrame(gameloop);
}

// Start game loop
window.requestAnimationFrame(gameloop);
