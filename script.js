// Music Player Script
window.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('audio');
  const songImage = document.getElementById('song-image');
  const songTitle = document.getElementById('song-title');
  const playBtn = document.getElementById('play');
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');
  const status = document.getElementById('status');

  const progress = document.getElementById('progress');
  const progressContainer = document.getElementById('progress-container');
  const currentTimeEl = document.getElementById('current-time');
  const durationEl = document.getElementById('duration');

  // Songs — filenames must match exactly
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

  // Load a song
  function loadSong(index) {
    const song = songs[index];
    audio.src = encodeURI(song.file);
    songImage.src = encodeURI(song.image);
    songTitle.textContent = song.title;

    audio.onerror = () => setStatus('⚠️ Could not load audio: ' + song.file);
    songImage.onerror = () => setStatus('⚠️ Could not load image: ' + song.image);

    setStatus('Loaded: ' + song.title);
  }

  // Play / Pause
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

  // Previous / Next song
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

  // Auto next song when current ends
  audio.addEventListener('ended', () => {
    current = (current + 1) % songs.length;
    loadSong(current);
    playSong();
  });

  // Update duration once metadata is loaded
  audio.addEventListener('loadedmetadata', () => {
    const duration = audio.duration;
    let durMinutes = Math.floor(duration / 60);
    let durSeconds = Math.floor(duration % 60);
    if (durSeconds < 10) durSeconds = '0' + durSeconds;
    durationEl.textContent = `${durMinutes}:${durSeconds}`;
  });

  // Update progress bar and current time
  audio.addEventListener('timeupdate', () => {
    const { duration, currentTime } = audio;
    const percent = (currentTime / duration) * 100;
    progress.style.width = `${percent}%`;

    // Current time
    let minutes = Math.floor(currentTime / 60);
    let seconds = Math.floor(currentTime % 60);
    if (seconds < 10) seconds = '0' + seconds;
    currentTimeEl.textContent = `${minutes}:${seconds}`;
  });

  // Click on progress bar to seek
  progressContainer.addEventListener('click', (e) => {
    const width = progressContainer.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
  });

  // Load first song initially
  loadSong(current);
});
