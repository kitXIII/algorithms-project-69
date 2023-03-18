import _ from 'lodash';

import stringToTerms from './stringToTerms.js';

const search = (docs, sample) => {
  const sampleTerms = new Set(stringToTerms(sample));

  if (!sampleTerms.size) {
    return [];
  }

  const results = _.chain(docs)
    .map((doc) => {
      const terms = stringToTerms(doc.text);
      const relevance = _.sumBy(terms, (t) => sampleTerms.has(t));

      return { ...doc, relevance };
    })
    .filter(({ relevance }) => relevance > 0)
    .value();

  return results
    .sort((a, b) => b.relevance - a.relevance)
    .map(({ id }) => id);
};

export default search;
