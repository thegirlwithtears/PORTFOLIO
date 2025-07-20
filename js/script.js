// Simple typing effect for the hero section
const textElement = document.getElementById('type-text');
const words = ['rebellious', 'real', 'raw', 'redefined'];
let wordIndex = 0;
let charIndex = 2;
let typing = true;

function typeEffect() {
  if (typing) {
    if (charIndex < words[wordIndex].length) {
      textElement.textContent += words[wordIndex].charAt(charIndex);
      charIndex++;
      setTimeout(typeEffect, 150);
    } else {
      typing = false;
      setTimeout(typeEffect, 1500);
    }
  } else {
    if (charIndex > 2) {
      textElement.textContent = words[wordIndex].substring(0, --charIndex);
      setTimeout(typeEffect, 50);
    } else {
      typing = true;
      wordIndex = (wordIndex + 1) % words.length;
      setTimeout(typeEffect, 500);
    }
  }
}

document.addEventListener('DOMContentLoaded', typeEffect);
