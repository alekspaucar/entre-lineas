import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { SpeechService } from '../../shared/audio/speech.service';
import { ReaderStore } from './reader.store';

type Result = 'ended' | 'stopped';

/** Voz falsa: cada locución queda pendiente hasta que la prueba decide cómo termina. */
class FakeSpeech {
  readonly canSpeak = true;
  readonly canListen = true;
  readonly voices = signal([]);
  readonly spoken: string[] = [];
  private readonly pending: ((result: Result) => void)[] = [];

  speak(text: string): Promise<Result> {
    this.spoken.push(text);
    return new Promise((resolve) => this.pending.push(resolve));
  }
  finish(result: Result = 'ended'): void {
    this.pending.shift()?.(result);
  }
  stop(): void {
    this.finish('stopped');
  }
}

class BrokenSpeech extends FakeSpeech {
  override speak(): Promise<Result> {
    return Promise.reject(new Error('synthesis-unavailable'));
  }
}

function setup(speech: FakeSpeech = new FakeSpeech()) {
  localStorage.clear();
  TestBed.resetTestingModule();
  TestBed.configureTestingModule({ providers: [{ provide: SpeechService, useValue: speech }] });
  return { store: TestBed.inject(ReaderStore), speech };
}

describe('ReaderStore · anotaciones', () => {
  it('anota cada palabra una sola vez y en orden', () => {
    const { store } = setup();
    store.addNote('server');
    store.addNote('password');
    store.addNote('server');
    expect(store.notes()).toEqual(['server', 'password']);
    expect(store.noteEntries()[0]).toEqual({ word: 'server', gloss: 'servidor' });
  });

  it('las guarda en este dispositivo y las recupera', () => {
    const { store } = setup();
    store.addNote('laptop');
    TestBed.tick();
    TestBed.resetTestingModule();
    expect(TestBed.inject(ReaderStore).notes()).toEqual(['laptop']);
  });
});

describe('ReaderStore · audio', () => {
  it('lee una sola frase y vuelve a reposo al terminar', async () => {
    const { store, speech } = setup();
    const done = store.playLine(2);
    expect(store.mode()).toBe('line');
    expect(store.playingIndex()).toBe(2);
    expect(speech.spoken).toEqual(['The smell of coffee made him smile.']);

    speech.finish('ended');
    await done;
    expect(store.mode()).toBe('idle');
    expect(store.playingIndex()).toBeNull();
  });

  it('encadena las frases y, al detenerse, retoma justo donde se quedó', async () => {
    const { store, speech } = setup();
    void store.toggleAll();
    speech.finish('ended');
    await vi.waitFor(() => expect(speech.spoken).toHaveLength(2));
    expect(store.playingIndex()).toBe(1);

    store.stop();
    expect(store.mode()).toBe('idle');

    void store.toggleAll();
    expect(speech.spoken[2]).toBe(speech.spoken[1]);
    expect(store.playingIndex()).toBe(1);
  });

  it('pulsar la misma frase mientras suena la detiene', async () => {
    const { store } = setup();
    void store.playLine(0);
    await store.playLine(0);
    expect(store.mode()).toBe('idle');
  });

  it('si el audio falla lo explica y no deja la lectura bloqueada', async () => {
    const { store } = setup(new BrokenSpeech());
    await store.playLine(0);
    expect(store.audioProblem()).toContain('No pudimos reproducir el audio');
    expect(store.mode()).toBe('idle');
  });

  it('estima una duración mayor cuanto más despacio se lee', () => {
    const { store } = setup();
    const text = 'Alexander left early because he wanted to finish a small project.';
    expect(store.estimatedMs(text)).toBeGreaterThan(900);
  });
});
