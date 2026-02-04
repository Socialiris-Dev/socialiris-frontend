import './style.css'

document.querySelector<HTMLDivElement>('#construction-alert')!.innerHTML = `
    <div id="text-section">
      <video id="construction-video-icon" src="/construction-alert/under-construction-animation-gif-download-4112633.mp4" autoplay loop muted style="width: 120px; height: 120px;"></video><div id="text-and-cursor-wrapper"><h1 id="typing-text"></h1><span id="cursor"></span></div>
    </div>
    <div id="video-section">
      <video id="main-construction-video" src="/construction-alert/under-construction-animation-gif-download-6765279.mp4" autoplay loop muted></video>
    </div>
  `

const textElement = document.getElementById('typing-text');
const cursorElement = document.getElementById('cursor');
const phrases = [
  "Pardon our dust! This site is under construction.",
  "We're busy crafting something special for you."
];
let phraseIndex = 0;
let charIndex = 0;
const typingSpeed = 55; // milliseconds per character
const pauseBetweenPhrases = 700; // milliseconds (faster pause)
const unTypingSpeed = 20; // milliseconds per character for un-typing (faster rollout)
const pauseAfterDust = "Pardon our dust!"; // Define the specific point to pause

function showCursor() {
  if (cursorElement) {
    cursorElement.style.opacity = '1';
  }
}

function hideCursor() {
  if (cursorElement) {
    cursorElement.style.opacity = '0';
  }
}

function typeWriter() {
  showCursor();
  if (phraseIndex < phrases.length) {
    const currentPhrase = phrases[phraseIndex];
    if (charIndex < currentPhrase.length) {
      textElement!.textContent += currentPhrase.charAt(charIndex);
      charIndex++;

      // Check if it's the first phrase and "Pardon our dust!" has just been typed
      if (phraseIndex === 0 && textElement!.textContent === pauseAfterDust) {
        setTimeout(typeWriter, 2000); // Pause for 2 seconds
      } else {
        setTimeout(typeWriter, typingSpeed);
      }
    } else {
      // Phrase completed
      if (phraseIndex === 0) { // First phrase completed
        setTimeout(unTypeWriter, 1000); // Pause for 1 second before un-typing
      } else if (phraseIndex === phrases.length - 1) { // Last phrase completed
        setTimeout(() => {
          hideCursor();
          textElement!.textContent = ''; // Clear the text
          // After clearing the last phrase, reset for the loop
          phraseIndex = 0;
          charIndex = 0;
          setTimeout(typeWriter, pauseBetweenPhrases); // Start the loop again after a pause
        }, 2000); // Pause for 2 seconds before clearing and restarting
      }
    }
  }
}

function unTypeWriter() {
  showCursor();
  const currentPhrase = phrases[phraseIndex];
  if (charIndex > 0) {
    textElement!.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
    setTimeout(unTypeWriter, unTypingSpeed);
  } else {
    // Phrase un-typed, move to the next phrase
    hideCursor(); // Hide cursor when text is fully un-typed
    phraseIndex++;
    if (phraseIndex < phrases.length) {
      setTimeout(typeWriter, pauseBetweenPhrases);
    }
  }
}

typeWriter();
