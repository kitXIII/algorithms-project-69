import { describe, expect, test } from '@jest/globals';
import getTermsFrequencies from '../src/getTermsFrequencies.js';

describe('getTermsFrequencies', () => {
  test('Get correct terms frequencies', () => {
    expect(getTermsFrequencies({ id: 'doc1', terms: ['some', 'text'] })).toEqual({
      some: 0.5,
      text: 0.5,
    });

    expect(getTermsFrequencies({ id: 'doc2', terms: ['some', 'text', 'text', 'too'] })).toEqual({
      some: 0.25,
      text: 0.5,
      too: 0.25,
    });
  });

  test('Get empty terms frequencies', () => {
    expect(getTermsFrequencies({ id: 'doc3', terms: [] })).toEqual({});
  });
});
