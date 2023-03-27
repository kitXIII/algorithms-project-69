import _ from 'lodash';
import stringToTerms from './stringToTerms.js';
import getReverseIndex from './getReverseIndex.js';

const search = (documents, sample) => {
  const sampleTerms = _.uniq(stringToTerms(sample));

  if (!sampleTerms.length) {
    return [];
  }

  const index = getReverseIndex(documents);

  const results = sampleTerms
    .map((sampleTerm) => index[sampleTerm])
    .filter((v) => v)
    .flat()
    .reduce((acc, item) => {
      const criteria = acc[item.id] || 0;
      return {
        ...acc,
        [item.id]: criteria > item.criteria ? criteria : item.criteria,
      };
    }, {});

  return Object.entries(results)
    .sort((a, b) => b[1] - a[1])
    .map(([id]) => id);
};

export default search;
