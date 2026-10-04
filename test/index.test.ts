import { beforeEach, describe, expect, it, vi } from 'vitest';

/**
 * Mutable native module used by every test in this file. `vi.hoisted` makes it
 * available to the hoisted `vi.mock` factory below.
 */
const native = vi.hoisted(() => ({ language: 'en-US' as string | undefined }));

vi.mock('react-native', () => ({
  NativeModules: {
    ReactLocalization: native,
  },
}));

import LocalizedStrings, { getInterfaceLanguage } from '../src/index';

const props = {
  'en-US': {
    how: 'How do you want your egg today?',
    boiledEgg: 'Boiled egg',
    question: "I'd like {0} and {1}, or just {0}",
    greeting: 'Hello {0}',
  },
  it: {
    how: 'Come vuoi il tuo uovo oggi?',
    boiledEgg: 'Uovo sodo',
    question: 'Vorrei {0} e {1}, o solo {0}',
  },
};

beforeEach(() => {
  native.language = 'en-US';
  vi.spyOn(console, 'log').mockImplementation(() => {});
  vi.spyOn(console, 'error').mockImplementation(() => {});
});

describe('getInterfaceLanguage', () => {
  it('returns the native interface language', () => {
    expect(getInterfaceLanguage()).toBe('en-US');
  });

  it('normalizes underscores to dashes', () => {
    native.language = 'en_US';
    expect(getInterfaceLanguage()).toBe('en-US');
  });

  it('falls back to "en" when the native module has no language', () => {
    native.language = undefined;
    expect(getInterfaceLanguage()).toBe('en');
  });
});

describe('LocalizedStrings', () => {
  it('selects the interface language on creation', () => {
    const strings = new LocalizedStrings(props);

    expect(strings.getLanguage()).toBe('en-US');
    expect(strings.how).toBe(props['en-US'].how);
  });

  it('lists the available languages', () => {
    const strings = new LocalizedStrings(props);

    expect(strings.getAvailableLanguages()).toEqual(['en-US', 'it']);
  });

  it('forces a specific language with setLanguage', () => {
    const strings = new LocalizedStrings(props);
    strings.setLanguage('it');

    expect(strings.getLanguage()).toBe('it');
    expect(strings.how).toBe(props.it.how);
  });

  it('returns a string for a specific language with getString', () => {
    const strings = new LocalizedStrings(props);

    expect(strings.getString('boiledEgg', 'it')).toBe('Uovo sodo');
  });

  it('formats numbered placeholders', () => {
    const strings = new LocalizedStrings(props);

    expect(
      strings.formatString(strings.question, 'bread', 'butter')
    ).toBe("I'd like bread and butter, or just bread");
  });

  it('exposes and replaces the content', () => {
    const strings = new LocalizedStrings(props);

    expect(strings.getContent()).toBe(props);

    strings.setContent({ it: { how: 'Ciao' } });

    expect(strings.getContent()).toEqual({ it: { how: 'Ciao' } });
  });

  it('falls back to the default language for missing translations', () => {
    const strings = new LocalizedStrings({
      'en-US': props['en-US'],
      it: {} as typeof props['en-US'],
    });

    strings.setLanguage('it');

    expect(strings.how).toBe(props['en-US'].how);
    expect(console.log).toHaveBeenCalled();
  });
});
