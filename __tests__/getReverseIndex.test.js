import { describe, expect, test } from '@jest/globals';
import getReverseIndex from '../src/getReverseIndex.js';

describe('getReverseIndex', () => {
  const doc1 = { id: 'doc1', text: 'some text' };
  const doc2 = { id: 'doc2', text: 'some text text too' };

  const docs = [doc1, doc2];

  const index = {
    some: [{ id: 'doc1', frequency: 0.5 }, { id: 'doc2', frequency: 0.25 }],
    text: [{ id: 'doc1', frequency: 0.5 }, { id: 'doc2', frequency: 0.5 }],
    too: [{ id: 'doc2', frequency: 0.25 }],
  };

  test('Get correct reverse index from data', () => {
    expect(getReverseIndex(docs)).toEqual(index);
  });

  test('Get empty reverse index from empty data', () => {
    expect(getReverseIndex([])).toEqual({});
  });
});
