import { rankVoices } from './speech.service';

const voice = (name: string, lang: string, localService = true) => ({ name, lang, localService });

describe('rankVoices', () => {
  it('deja solo inglés estadounidense cuando lo hay', () => {
    const ranked = rankVoices([
      voice('Daniel', 'en-GB'),
      voice('Samantha', 'en-US'),
      voice('Monica', 'es-ES'),
    ]);
    expect(ranked.map((v) => v.name)).toEqual(['Samantha']);
  });

  it('reconoce el guion bajo de Android y cae a cualquier inglés si no hay en-US', () => {
    expect(rankVoices([voice('Android US', 'en_US')]).map((v) => v.name)).toEqual(['Android US']);
    expect(rankVoices([voice('Daniel', 'en-GB'), voice('Jorge', 'es-MX')]).map((v) => v.name)).toEqual([
      'Daniel',
    ]);
  });

  it('pone primero las voces premium y las locales', () => {
    const ranked = rankVoices([
      voice('Zed', 'en-US', false),
      voice('Alex', 'en-US', true),
      voice('Ava (Premium)', 'en-US', true),
    ]);
    expect(ranked.map((v) => v.name)).toEqual(['Ava (Premium)', 'Alex', 'Zed']);
  });

  it('devuelve una lista vacía si no hay voces en inglés', () => {
    expect(rankVoices([voice('Monica', 'es-ES')])).toEqual([]);
    expect(rankVoices([])).toEqual([]);
  });
});
