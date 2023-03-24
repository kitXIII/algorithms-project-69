import _ from 'lodash';
import stringToTerms from './stringToTerms.js';
import getReverseIndex from './getReverseIndex.js';
import getTermsFrequencies from './getTermsFrequencies.js';

const search = (documents, sample) => {
  const sampleTerms = _.uniq(stringToTerms(sample));

  if (!sampleTerms.length) {
    return [];
  }

  const index = getReverseIndex(documents);

  const results = sampleTerms
    .map((term) => {
      const docs = index[term];

      if (_.isEmpty(docs)) {
        return null;
      }

      const idf = Math.log(documents.length / docs.length);

      return docs.map((doc) => {
        const tf = getTermsFrequencies(doc)[term];

        return { ...doc, criteria: tf * idf };
      });
    })
    .filter((v) => v)
    .flat()
    .reduce((acc, item) => {
      const criteria = (acc[item] || 0) + item.criteria;
      return {
        ...acc,
        [item.id]: criteria,
      };
    }, {});

  return Object.entries(results)
    .sort((a, b) => b[1] - a[1])
    .map(([id]) => id);
};

export default search;
