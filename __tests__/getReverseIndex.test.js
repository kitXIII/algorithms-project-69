import { describe, expect, test } from '@jest/globals';
import getReverseIndex from '../src/getReverseIndex.js';

describe('getReverseIndex', () => {
  const doc1 = { id: 'doc1', text: 'some text' };
  const doc2 = { id: 'doc2', text: 'some text text too' };
  const doc3 = { id: 'doc3', text: 'body' };

  const index = {
    body: [{ id: 'doc3', frequency: 1, criteria: 1.099 }],
    some: [{ id: 'doc1', frequency: 0.5, criteria: 0.203 }, { id: 'doc2', frequency: 0.25, criteria: 0.101 }],
    text: [{ id: 'doc1', frequency: 0.5, criteria: 0.203 }, { id: 'doc2', frequency: 0.5, criteria: 0.203 }],
    too: [{ id: 'doc2', frequency: 0.25, criteria: 0.275 }],
  };

  test('Get correct reverse index from data', () => {
    expect(getReverseIndex([doc1, doc2, doc3])).toEqual(index);
  });

  test('Get empty reverse index from empty data', () => {
    expect(getReverseIndex([])).toEqual({});
  });
});
