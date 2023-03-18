import { describe, expect, test } from '@jest/globals';
import search from '../src/index.js';

describe('Search', () => {
  const doc1 = { id: 'doc1', text: "I can't shoot straight unless I've had a pint!" };
  const doc2 = { id: 'doc2', text: "Don't shoot shoot shoot that thing at me." };
  const doc3 = { id: 'doc3', text: "I'm your shooter." };

  const docs = [doc1, doc2, doc3];
  test('Find by word', () => {
    const result = search(docs, 'shoot');

    expect(result).toHaveLength(2);
    expect(result).toEqual(expect.arrayContaining([doc1.id, doc2.id]));
  });

  test('Find even thought word has punctuation marks', () => {
    let result = search(docs, 'pint');

    expect(result).toHaveLength(1);
    expect(result).toEqual(expect.arrayContaining([doc1.id]));

    result = search(docs, 'pint?');

    expect(result).toHaveLength(1);
    expect(result).toEqual(expect.arrayContaining([doc1.id]));
  });

  test('Returns empty array if sample contains punctuation marks only', () => {
    const result = search(docs, '.');

    expect(result).toHaveLength(0);
  });

  test('Returns empty array if sample is empty', () => {
    const result = search(docs, '');

    expect(result).toHaveLength(0);
  });

  test('Returns empty array if no docs', () => {
    const result = search([], 'shoot');

    expect(result).toHaveLength(0);
  });

  test('Returns empty array if no matches', () => {
    const result = search(docs, 'nomatches');

    expect(result).toHaveLength(0);
  });
});
