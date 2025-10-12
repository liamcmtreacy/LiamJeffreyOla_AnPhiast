
let newSoundNeutral = new Audio("ASSETS/audio/chillSmooth.mp3");

function playEnding(){//PLAY THAT MUSIC!

console.log("ENDING");
newSoundNeutral.play();
}
setInterval(playEnding, 1400);

// THIS SCRIPT'S ONLY PURPOSE IS TO PLAY THE ENDING MUSIC FOR THE GAME