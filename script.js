// Debug-friendly player script
window.addEventListener('DOMContentLoaded', () => {
  console.log('script.js: DOMContentLoaded');

  const status = document.getElementById('status');
  const audio = document.getElementById('audio');
  const songImage = document.getElementById('song-image');
  const songTitle = document.getElementById('song-title');
  const playBtn = document.getElementById('play');
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');

  if (!audio || !songImage || !songTitle || !playBtn) {
    console.error('script.js: Missing one or more DOM elements', { audio, songImage, songTitle, playBtn });
    status.textContent = 'Error: page is missing player elements. Let me know.';
    return;
  }

  // ========== EDIT THIS LIST if filenames differ ==========
  const songs = [
    { title: 'The Hills', file: 'music/the hills.mp3', image: 'images/the hills.jpg' },
    { title: 'This Skateboard', file: 'music/this skateboard.mp3', image: 'images/this skateboard.jpg' },
    { title: 'Pearls', file: 'music/pearls.mp3', image: 'images/pearls.jpg' }
  ];
  // =======================================================

  let current = 0;

  function setStatus(msg) {
    status.textContent = msg || '';
    console.log('STATUS:', msg);
  }

  function load(index) {
    const s = songs[index];
    if (!s) {
      console.error('load: invalid index', index);
      setStatus('Internal error: invalid song index');
      return;
    }
    console.log('load:', s);

    // encodeURI handles spaces in filenames
    audio.src = encodeURI(s.file);
    songImage.src = encodeURI(s.image);
    songTitle.textContent = s.title;

    // handlers for load failures
    audio.onerror = () => {
      console.error('Audio failed to load:', audio.src);
      setStatus('Audio not found: ' + audio.src);
    };
    songImage.onerror = () => {
      console.error('Image failed to load:', songImage.src);
      setStatus('Image not found: ' + songImage.src);
    };

    setStatus('Loaded: ' + s.title);
  }

  function play() {
    audio.play().then(() => {
      playBtn.textContent = '⏸';
      setStatus('Playing: ' + songs[current].title);
    }).catch(err => {
      console.warn('Play blocked or error:', err);
      setStatus('Play blocked by browser — click the Play button again.');
    });
  }

  function pause() {
    audio.pause();
    playBtn.textContent = '▶';
    setStatus('Paused');
  }

  playBtn.addEventListener('click', () => {
    if (audio.paused) play(); else pause();
  });

  prevBtn.addEventListener('click', () => {
    current = (current - 1 + songs.length) % songs.length;
    load(current);
    play();
  });

  nextBtn.addEventListener('click', () => {
    current = (current + 1) % songs.length;
    load(current);
    play();
  });

  // When a song ends, automatically move to next
  audio.addEventListener('ended', () => {
    console.log('audio ended, moving to next');
    current = (current + 1) % songs.length;
    load(current);
    play();
  });

  // load first song
  load(current);
});
