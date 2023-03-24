import { describe, expect, test } from '@jest/globals';
import getTermFrequency from '../src/getTermFrequency.js';

describe('getTermsFrequencies', () => {
  test('Get correct terms frequencies', () => {
    expect(getTermFrequency(['some', 'text'], 'text')).toEqual(0.5);
    expect(getTermFrequency(['some', 'text', 'text', 'too'], 'text')).toEqual(0.5);
    expect(getTermFrequency(['some', 'text', 'text', 'too'], 'some')).toEqual(0.25);
    expect(getTermFrequency(['some', 'text', 'text', 'too'], 'abc')).toEqual(0);
  });
});
