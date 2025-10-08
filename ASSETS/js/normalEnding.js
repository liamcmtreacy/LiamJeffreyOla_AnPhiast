
let newSound01 = new Audio("ASSETS/audio/doom.mp3");

function playEnding(){//PLAY THAT MUSIC!

console.log("ENDING");
newSound01.play();
}
setInterval(playEnding, 1400);

// THIS SCRIPT'S ONLY PURPOSE IS TO PLAY THE ENDING MUSIC FOR THE GAME