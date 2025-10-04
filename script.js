// Simple Music Player Script
window.addEventListener('DOMContentLoaded', () => {
  console.log('script.js loaded');

  const audio = document.getElementById('audio');
  const songImage = document.getElementById('song-image');
  const songTitle = document.getElementById('song-title');
  const playBtn = document.getElementById('play');
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');
  const status = document.getElementById('status');

  // Your exact songs and images (filenames must match exactly in /music and /images folders)
  const songs = [
    { title: 'Pearls', file: 'music/pearls.mp3', image: 'images/pearls.jpg' },
    { title: 'The Hill', file: 'music/the hill.mp3', image: 'images/the hill.jpg' },
    { title: 'This Skateboard', file: 'music/this skateboard.mp3', image: 'images/this skateboard.jpg' }
  ];

  let current = 0;

  function setStatus(msg) {
    if (status) status.textContent = msg || '';
    console.log(msg);
  }

  function loadS
