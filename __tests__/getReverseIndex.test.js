import { describe, expect, test } from '@jest/globals';
import getReverseIndex from '../src/getReverseIndex.js';

describe('getReverseIndex', () => {
  const doc1 = { id: 'doc1', text: 'some text' };
  const doc2 = { id: 'doc2', text: 'some text text too' };

  const terms1 = ['some', 'text'];
  const terms2 = ['some', 'text', 'text', 'too'];

  const index = {
    some: [{ id: 'doc1', terms: terms1 }, { id: 'doc2', terms: terms2 }],
    text: [{ id: 'doc1', terms: terms1 }, { id: 'doc2', terms: terms2 }],
    too: [{ id: 'doc2', terms: terms2 }],
  };

  test('Get correct reverse index from data', () => {
    expect(getReverseIndex([doc1, doc2])).toEqual(index);
  });

  test('Get empty reverse index from empty data', () => {
    expect(getReverseIndex([])).toEqual({});
  });
});
