
let newSoundEvil = new Audio("ASSETS/audio/horrorHell.mp3");

function playEnding(){//PLAY THAT MUSIC!

console.log("ENDING");
newSoundEvil.play();
}
setInterval(playEnding, 1400);

// THIS SCRIPT'S ONLY PURPOSE IS TO PLAY THE ENDING MUSIC FOR THE GAME