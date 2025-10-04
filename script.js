const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
let isPlaying = false;

function playMusic() {
  isPlaying = true;
  audio.play();
  playBtn.textContent = "⏸️"; // change button to pause
}

function pauseMusic() {
  isPlaying = false;
  audio.pause();
  playBtn.textContent = "▶️"; // change button to play
}

playBtn.addEventListener("click", () => {
  if (isPlaying) {
    pauseMusic();
  } else {
    playMusic();
  }
});
