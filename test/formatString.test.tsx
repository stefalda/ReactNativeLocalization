import { createElement } from 'react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('react-native', () => ({
  NativeModules: {
    ReactLocalization: { language: 'en-US' },
  },
}));

import LocalizedStrings from '../src/index';

const props = {
  'en-US': {
    greeting: 'Hello {0}!',
  },
};

describe('formatString with React elements', () => {
  it('keeps React elements instead of flattening them into strings', () => {
    const strings = new LocalizedStrings(props);

    const element = createElement('b', null, 'World');
    const result = strings.formatString(strings.greeting, element);

    expect(Array.isArray(result)).toBe(true);
    expect(JSON.stringify(result)).toContain('World');
  });
});
