// elements
const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

// SONG LIST — match these strings to your file names WITHOUT the .mp3/.jpg
const songs = ['the hills', 'this skateboard', 'pearls'];
let songIndex = 0; // start on the first song

// pretty-print the title (capitalizes each word)
function formatTitle(name) {
  return name.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

function loadSong(song) {
  title.innerText = formatTitle(song);
  // encodeURI makes spaces safe in file URLs (turns "the hills" -> "the%20hills")
  audio.src = encodeURI(`music/${song}.mp3`);
  cover.src = encodeURI(`images/${song}.jpg`);
}

// load the first song on page load
loadSong(songs[songIndex]);

let isPlaying = false;

function playSong() {
  isPlaying = true;
  audio.play().catch(err => console.warn('Play prevented:', err));
  playBtn.textContent = '⏸️';
}

function pauseSong() {
  isPlaying = false;
  audio.pause();
  playBtn.textContent = '▶️';
}

// toggle play/pause
playBtn.addEventListener('click', () => {
