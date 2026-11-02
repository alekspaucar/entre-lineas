import { Injectable, signal } from '@angular/core';

export type SpeakResult = 'ended' | 'stopped';
export type ListenFailure = 'unsupported' | 'permission' | 'no-speech' | 'network' | 'unknown';

export class ListenError extends Error {
  constructor(readonly reason: ListenFailure) {
    super(reason);
  }
}

export interface VoiceLike {
  readonly name: string;
  readonly lang: string;
  readonly localService: boolean;
}

/** Voces en inglés estadounidense (o inglés en general si no hay), las de mejor calidad primero. */
export function rankVoices<T extends VoiceLike>(voices: readonly T[]): readonly T[] {
  const inLang = (voice: T, prefix: string) =>
    voice.lang.replace('_', '-').toLowerCase().startsWith(prefix);
  const american = voices.filter((voice) => inLang(voice, 'en-us'));
  const pool = american.length > 0 ? american : voices.filter((voice) => inLang(voice, 'en'));
  const score = (voice: T) =>
    (/premium|enhanced|natural|neural/i.test(voice.name) ? 2 : 0) + (voice.localService ? 1 : 0);
  return [...pool].sort((a, b) => score(b) - score(a) || a.name.localeCompare(b.name));
}

// `SpeechRecognition` aún no forma parte de los tipos estándar de TypeScript.
interface RecognitionEvent {
  readonly results: ArrayLike<ArrayLike<{ readonly transcript: string }>>;
}
interface Recognition {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  onresult: ((event: RecognitionEvent) => void) | null;
  onerror: ((event: { readonly error: string }) => void) | null;
  onend: (() => void) | null;
  start(): void;
  abort(): void;
}
type RecognitionConstructor = new () => Recognition;

function recognitionConstructor(): RecognitionConstructor | undefined {
  const w = globalThis as unknown as {
    SpeechRecognition?: RecognitionConstructor;
    webkitSpeechRecognition?: RecognitionConstructor;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition;
}

function failureFor(error: string): ListenFailure {
  if (error === 'not-allowed' || error === 'service-not-allowed') return 'permission';
  if (error === 'no-speech') return 'no-speech';
  if (error === 'network') return 'network';
  return 'unknown';
}

/** Voz del navegador: narración en inglés estadounidense y reconocimiento para hablar. */
@Injectable({ providedIn: 'root' })
export class SpeechService {
  readonly canSpeak = typeof speechSynthesis !== 'undefined';
  readonly canListen = recognitionConstructor() !== undefined;
  readonly voices = signal<readonly SpeechSynthesisVoice[]>([]);

  /** Referencia viva: Chrome puede descartar una locución sin referencias y no emitir `end`. */
  private utterance?: SpeechSynthesisUtterance;
  private recognition?: Recognition;

  constructor() {
    if (!this.canSpeak) return;
    // Chrome carga las voces de forma asíncrona: hay que escuchar `voiceschanged`.
    const load = () => this.voices.set(rankVoices(speechSynthesis.getVoices()));
    load();
    speechSynthesis.addEventListener('voiceschanged', load);
  }

  async speak(text: string, voiceUri: string | null, rate: number): Promise<SpeakResult> {
    if (!this.canSpeak) throw new Error('unsupported');
    if (speechSynthesis.speaking || speechSynthesis.pending) {
      speechSynthesis.cancel();
      // Chrome descarta un `speak()` que llega justo después de `cancel()`.
      await new Promise((resolve) => setTimeout(resolve, 40));
    }
    return new Promise<SpeakResult>((resolve, reject) => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = rate;
      const voice = this.voices().find((v) => v.voiceURI === voiceUri) ?? this.voices()[0];
      if (voice) utterance.voice = voice;
      utterance.onend = () => resolve('ended');
      utterance.onerror = (event) =>
        event.error === 'canceled' || event.error === 'interrupted'
          ? resolve('stopped')
          : reject(new Error(event.error));
      this.utterance = utterance;
      speechSynthesis.speak(utterance);
    });
  }

  stop(): void {
    if (this.canSpeak) speechSynthesis.cancel();
  }

  /** Escucha una sola intervención y devuelve lo que entendió. */
  listen(lang = 'en-US'): Promise<string> {
    const Recognizer = recognitionConstructor();
    if (!Recognizer) return Promise.reject(new ListenError('unsupported'));
    return new Promise<string>((resolve, reject) => {
      const recognition = new Recognizer();
      recognition.lang = lang;
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;
      let transcript = '';
      recognition.onresult = (event) => {
        transcript = event.results[0]?.[0]?.transcript ?? '';
      };
      recognition.onerror = (event) => reject(new ListenError(failureFor(event.error)));
      recognition.onend = () =>
        transcript ? resolve(transcript) : reject(new ListenError('no-speech'));
      this.recognition = recognition;
      recognition.start();
    });
  }

  stopListening(): void {
    this.recognition?.abort();
  }
}
