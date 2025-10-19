
let newSoundHooray = new Audio("ASSETS/audio/acGuitar.mp3");

function playEnding(){//PLAY THAT MUSIC!

console.log("ENDING");
newSoundHooray.play();
}
setInterval(playEnding, 1400);

// THIS SCRIPT'S ONLY PURPOSE IS TO PLAY THE ENDING MUSIC FOR THE GAME