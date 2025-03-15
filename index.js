const quoteDisplay = document.getElementById('quote-display');
const quoteInput = document.getElementById('quote-input');
const timer = document.getElementById('timer');
const speed = document.getElementById('speed');
const accuracy = document.getElementById('accuracy');
const finishBtn = document.getElementById('finish-btn');
const resetBtn = document.getElementById('reset-btn');

let startTime, endTime;
let timerInterval;

// Sample quotes for the test
const quotes = [
  "The quick brown fox jumps over the lazy dog.",
  "Programming is the art of telling another human what one wants the computer to do.",
  "Success is not final, failure is not fatal: It is the courage to continue that counts.",
  "Innovation distinguishes between a leader and a follower.",
  "The only limit to our realization of tomorrow is our doubts of today."
];

// Load a random quote
function loadQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  quoteDisplay.textContent = quotes[randomIndex];
}

// Start the timer
function startTimer() {
  startTime = new Date();
  timerInterval = setInterval(() => {
    timer.textContent = Math.floor((new Date() - startTime) / 1000);
  }, 1000);
}

// Calculate typing speed (WPM)
function calculateSpeed() {
  const typedText = quoteInput.value.trim();
  const words = typedText.split(/\s+/).filter(word => word.length > 0).length; // Count words
  const timeInMinutes = (new Date() - startTime) / 60000; // Convert time to minutes
  const wpm = Math.round(words / timeInMinutes); // Calculate WPM
  speed.textContent = wpm;
}

// Calculate typing accuracy
function calculateAccuracy() {
  const typedText = quoteInput.value;
  const originalText = quoteDisplay.textContent;
  let correctChars = 0;

  for (let i = 0; i < typedText.length; i++) {
    if (typedText[i] === originalText[i]) {
      correctChars++;
    }
  }

  const accuracyPercentage = (correctChars / originalText.length) * 100;
  accuracy.textContent = accuracyPercentage.toFixed(2);
}

// Stop the test and calculate results
function finishTest() {
  clearInterval(timerInterval);
  calculateSpeed();
  calculateAccuracy();
  quoteInput.disabled = true;
  finishBtn.disabled = true;
}

// Reset the test
function resetTest() {
  clearInterval(timerInterval);
  timer.textContent = '0';
  speed.textContent = '0';
  accuracy.textContent = '100';
  quoteInput.value = '';
  quoteInput.disabled = false;
  finishBtn.disabled = false;
  loadQuote();
  startTime = null; // Reset start time
}

// Event listeners
quoteInput.addEventListener('input', () => {
  if (!startTime) {
    startTimer();
  }
});

finishBtn.addEventListener('click', finishTest);
resetBtn.addEventListener('click', resetTest);

// Initialize
loadQuote();