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
const typingSpeed = 25; // milliseconds per character
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

let lastTime = 0;

function typeWriter(timestamp: number = 0) {
  showCursor();
  
  if (!lastTime) lastTime = timestamp;
  const deltaTime = timestamp - lastTime;

  if (phraseIndex < phrases.length) {
    const currentPhrase = phrases[phraseIndex];
    
    if (charIndex < currentPhrase.length) {
      // Determine the target speed
      let currentSpeed = typingSpeed;
      if (phraseIndex === 0 && textElement!.textContent === pauseAfterDust) {
        currentSpeed = 2600; // 2 second pause
      }

      if (deltaTime >= currentSpeed) {
        textElement!.textContent += currentPhrase.charAt(charIndex);
        charIndex++;
        lastTime = timestamp;
      }
      requestAnimationFrame(typeWriter);
    } else {
      // Phrase completed
      lastTime = 0;
      if (phraseIndex === 0) {
        setTimeout(() => requestAnimationFrame(unTypeWriter), 2400);
      } else if (phraseIndex === phrases.length - 1) {
        setTimeout(() => requestAnimationFrame(unTypeWriter), 4000);
      }
    }
  }
}

function unTypeWriter(timestamp: number = 0) {
  showCursor();
  
  if (!lastTime) lastTime = timestamp;
  const deltaTime = timestamp - lastTime;

  const currentPhrase = phrases[phraseIndex];
  if (charIndex > 0) {
    if (deltaTime >= unTypingSpeed) {
      textElement!.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      lastTime = timestamp;
    }
    requestAnimationFrame(unTypeWriter);
  } else {
    lastTime = 0;
    hideCursor();
    phraseIndex++;
    if (phraseIndex >= phrases.length) {
      phraseIndex = 0;
    }
    setTimeout(() => requestAnimationFrame(typeWriter), pauseBetweenPhrases);
  }
}

const mainVideo = document.getElementById('main-construction-video') as HTMLVideoElement;

if (mainVideo) {
  if (mainVideo.readyState >= 3) {
    requestAnimationFrame(typeWriter);
  } else {
    mainVideo.addEventListener('canplay', () => {
      requestAnimationFrame(typeWriter);
    }, { once: true });
  }
} else {
  requestAnimationFrame(typeWriter);
}
