import _ from 'lodash';
import stringToTerms from './stringToTerms.js';
import getReverseIndex from './getReverseIndex.js';

const search = (documents, sample) => {
  const sampleTerms = _.uniq(stringToTerms(sample));

  if (!sampleTerms.length) {
    return [];
  }

  const index = getReverseIndex(documents);

  return _.chain(sampleTerms)
    .map((sampleTerm) => index[sampleTerm])
    .filter((v) => v)
    .flatten()
    .reduce((acc, item) => {
      const { weight } = acc[item.id] || { weight: 0 };
      return {
        ...acc,
        [item.id]: {
          id: item.id,
          weight: item.weight + weight,
        },
      };
    }, {})
    .values()
    .sortBy('weight')
    .reverse()
    .map(({ id }) => id)
    .value();
};

export default search;
