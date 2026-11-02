import { createReadingState, lookupTranslation, story, toggleSpanish } from './reader.mjs';

let state = createReadingState();
let preferredVoice = 'female';
let activeUtterance = null;
const lines = document.querySelector('#story-lines');
const dialog = document.querySelector('#translation-dialog');

document.querySelector('#story-title').textContent = story.title;
document.querySelector('#story-subtitle').textContent = story.subtitle;
document.querySelector('#story-level').textContent = story.level;
document.querySelector('#story-minutes').textContent = story.minutes;

function decorateWords(text) {
  return text.split(/(\b[A-Za-z]+\b)/).map((part) => {
    const meaning = lookupTranslation(part);
    return meaning ? `<button class="word" data-word="${part.toLowerCase()}">${part}</button>` : part;
  }).join('');
}

function renderStory() {
  lines.innerHTML = story.lines.map(([spanish, english], index) => `
    <article class="line-pair" style="--line:${index}">
      <p class="spanish ${state.showSpanish ? '' : 'is-hidden'}">${spanish}</p>
      <p class="english" lang="en-US">${decorateWords(english)}</p>
    </article>`).join('');
  document.querySelector('#spanish-toggle').textContent = state.showSpanish ? 'Ocultar español' : 'Mostrar español';
}

function pickVoice() {
  const voices = speechSynthesis.getVoices().filter((voice) => voice.lang.startsWith('en-US'));
  const key = preferredVoice === 'female' ? /samantha|zira|aria|female/i : /david|guy|male/i;
  return voices.find((voice) => key.test(voice.name)) ?? voices[0];
}

function speakStory() {
  speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(story.lines.map(([, english]) => english).join(' '));
  utterance.lang = 'en-US';
  utterance.rate = 0.88;
  utterance.voice = pickVoice();
  activeUtterance = utterance;
  utterance.onend = () => { activeUtterance = null; document.querySelector('#listen-button').firstChild.textContent = 'Escuchar esta historia '; };
  document.querySelector('#listen-button').firstChild.textContent = 'Detener audio ';
  speechSynthesis.speak(utterance);
}

renderStory();

document.querySelector('#spanish-toggle').addEventListener('click', () => { state = toggleSpanish(state); renderStory(); });
document.querySelector('#theme-toggle').addEventListener('click', () => document.body.classList.toggle('dawn'));
document.querySelector('#listen-button').addEventListener('click', () => activeUtterance ? speechSynthesis.cancel() : speakStory());
document.querySelectorAll('.voice-button').forEach((button) => button.addEventListener('click', () => {
  preferredVoice = button.dataset.voice;
  document.querySelectorAll('.voice-button').forEach((item) => item.classList.toggle('active', item === button));
}));
document.addEventListener('click', (event) => {
  const word = event.target.closest('.word')?.dataset.word;
  if (!word) return;
  document.querySelector('#translation').textContent = lookupTranslation(word);
  dialog.showModal();
});
document.querySelector('#close-dialog').addEventListener('click', () => dialog.close());
document.querySelector('#speak-button').addEventListener('click', () => {
  const status = document.querySelector('#speech-status');
  if (!('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
    status.textContent = 'Tu navegador no ofrece reconocimiento de voz aquí. Practica repitiendo la frase en voz alta.';
    return;
  }
  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new Recognition();
  recognition.lang = 'en-US';
  recognition.onstart = () => { status.textContent = 'Te escucho…'; };
  recognition.onresult = (event) => { status.textContent = `Dijiste: “${event.results[0][0].transcript}”`; };
  recognition.onerror = () => { status.textContent = 'No pude escuchar con claridad. Inténtalo una vez más.'; };
  recognition.start();
});

