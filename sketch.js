// Global variable for the Tetris music
let tetrisMusic;

function preload() {
  // Load the Tetris music
  soundFormats('mp3', 'ogg');
  tetrisMusic = loadSound('https://example.com/tetris-theme.mp3');
}

function setup() {
  createCanvas(625, 750);
  gameboard = new Gameboard();
  // Start playing the Tetris music
  tetrisMusic.loop();
}

// Function to toggle music play/pause
function toggleMusic() {
  if (tetrisMusic.isPlaying()) {
    tetrisMusic.pause();
  } else {
    tetrisMusic.loop();
  }
}

// Function to set music volume
function setMusicVolume(volume) {
  // Assuming volume is a value between 0 and 1
  tetrisMusic.setVolume(volume);
}

// Example usage
// Call toggleMusic() to play/pause the music
// Call setMusicVolume(0.5) to set the volume to 50%