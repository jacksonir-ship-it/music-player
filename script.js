let songs = [
  {
    title: "The Hills",
    file: "music/the hills.mp3",
    image: "images/the hills.jpg"
  },
  {
    title: "This Skateboard",
    file: "music/this skateboard.mp3",
    image: "images/this skateboard.jpg"
  },
  {
    title: "Pearls",
    file: "music/pearls.mp3",
    image: "images/pearls.jpg"
  }
];

let currentSong = 0;
const audio = document.getElementById("audio");
const songImage = document.getElementById("song-image");
const songTitle = document.getElementById("song-title");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

function loadSong(song) {
  audio.src = song.file;
  songImage.src = song.image;
  songTitle.textContent = song.title;
}

function playSong() {
  audio.play();
  playBtn.textContent = "⏸"; // pause symbol
}

function pauseSong() {
  audio.pause();
  playBtn.textContent = "▶"; // play symbol
}

playBtn.addEventListener("click", () => {
  if (audio.paused) {
    playSong();
  } else {
    pauseSong();
  }
});

prevBtn.addEventListener("click", () => {
  currentSong--;
  if (currentSong < 0) {
    currentSong = songs.length - 1;
  }
  loadSong(songs[currentSong]);
  playSong();
});

nextBtn.addEventListener("click", () => {
  currentSong++;
  if (currentSong >= songs.length) {
    currentSong = 0;
  }
  loadSong(songs[currentSong]);
  playSong();
