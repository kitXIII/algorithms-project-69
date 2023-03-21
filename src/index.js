import _ from 'lodash';
import stringToTerms from './stringToTerms.js';
import getReverseIndex from './getReverseIndex.js';

const search = (docs, sample) => {
  const sampleTerms = _.uniq(stringToTerms(sample));

  if (!sampleTerms.length) {
    return [];
  }

  const index = getReverseIndex(docs);

  /**
   * results = {
   *  [docId]: sumOfRelevances,
   *  ...
   * }
   */
  const results = sampleTerms
    .map((term) => index[term])
    .filter((v) => v)
    .flat()
    .reduce((acc, item) => {
      const relevance = (acc[item] || 0) + item.relevance;
      return {
        ...acc,
        [item.id]: relevance,
      };
    }, {});

  return Object.entries(results)
    .sort((a, b) => b[1] - a[1])
    .map(([id]) => id);
};

export default search;
