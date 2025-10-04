// Music Player Script
window.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('audio');
  const songImage = document.getElementById('song-image');
  const songTitle = document.getElementById('song-title');
  const playBtn = document.getElementById('play');
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');
  const status = document.getElementById('status');

  // Your songs — filenames must match exactly
  const songs = [
    { title: 'Pearls', file: 'music/pearls.mp3', image: 'images/pearls.jpg' },
    { title: 'The Hill', file: 'music/the hill.mp3', image: 'images/the hill.jpg' },
    { title: 'This Skateboard', file: 'music/this skateboard.mp3', image: 'images/this skateboard.jpg' }
  ];

  let current = 0;

  function setStatus(msg) {
    if (status) status.textContent = msg;
    console.log(msg);
  }

  function loadSong(index) {
    const song = songs[index];
    audio.src = encodeURI(song.file);
    songImage.src = encodeURI(song.image);
    songTitle.textContent = song.title;

    audio.onerror = () => setStatus('⚠️ Could not load audio: ' + song.file);
    songImage.onerror = () => setStatus('⚠️ Could not load image: ' + song.image);

    setStatus('Loaded: ' + song.title);
  }

  function playSong() {
    audio.play().then(() => {
      playBtn.textContent = '⏸';
      setStatus('Playing: ' + songs[current].title);
    }).catch(err => {
      console.warn(err);
      setStatus('Click the play button to start');
    });
  }

  function pauseSong() {
    audio.pause();
    playBtn.textContent = '▶️';
    setStatus('Paused');
  }

  playBtn.addEventListener('click', () => {
    if (audio.paused) {
      playSong();
    } else {
      pauseSong();
    }
  });

  prevBtn.addEventListener('click', () => {
    current = (current - 1 + songs.length) % songs.length;
    loadSong(current);
    playSong();
  });

  nextBtn.addEventListener('click', () => {
    current = (current + 1) % songs.length;
    loadSong(current);
    playSong();
  });

  audio.addEventListener('ended', () => {
    current = (current + 1) % songs.length;
    loadSong(current);
    playSong();
  });

  // Load the first song initially
  loadSong(current);
});
